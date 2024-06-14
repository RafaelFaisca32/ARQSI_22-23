using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.ValueObjects;
using Projeto.Domain.Users;
using System;
using System.Linq;
using Castle.Components.DictionaryAdapter;

namespace DDDSample1.Domain.Users
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;

        public UserService(IUnitOfWork unitOfWork, IUserRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllUsersAsync();

            var listDto = new List<UserDto>();
            foreach (var us in list)
            {
                var tagList = us.Tag.Select(tag => tag.Tag1).ToList();
                var friendshipList = us.Friendship.Select(friend => friend.FriendId1).ToList();

                listDto.Add(new UserDto
                {
                    Id = us.Id.AsGuid(), Name = us.Name.Name1, Password = us.Password.Pass,
                    BirthDate = us.BirthDate.birthD, Email = us.Email.Address,
                    PhoneNumber = us.PhoneNumber.Number, State = us.State.State1,
                    Tag = tagList,
                    Friendship = friendshipList
                });
            }


            return listDto;
        }

        public async Task<UserDto> GetLogin(List<UserDto> ls, CreatingUserDto dto)
        {
            UserDto user = null;
            foreach (var u in ls)
            {
                if (u.Email.Equals(dto.Email) && dto.Password.Equals(u.Password))
                {
                    user = u;
                }
            }

            return user;
        }

        public async Task<UserDto> GetByIdAsync(UserId id)
        {
            var us = await this._repo.GetUserByIdAsync(id);

            if (us == null)
                return null;
            var tagList = us.Tag.Select(tag => tag.Tag1).ToList();
            var friendshipList = us.Friendship.Select(friend => friend.FriendId1).ToList();

            return new UserDto
            {
                Id = us.Id.AsGuid(), Name = us.Name.Name1, Password = us.Password.Pass, BirthDate = us.BirthDate.birthD,
                Email = us.Email.Address,
                PhoneNumber = us.PhoneNumber.Number, State = us.State.State1,
                Tag = tagList,
                Friendship = friendshipList
            };
        }

        public async Task<UserDto> GetByEmailAsync(string email){
            
            var result = await this._repo.GetByEmailAsync(email);
            if (result == null)
                return null;

            return new UserDto
            {
                Id = result.Id.AsGuid(), Name = result.Name.Name1, Password = result.Password.Pass,
                BirthDate = result.BirthDate.birthD,
                Email = result.Email.Address, PhoneNumber = result.PhoneNumber.Number, State = result.State.State1,
                Tag = result.Tag.Select(tag => tag.Tag1).ToList(),
                Friendship = result.Friendship.Select(friend => friend.FriendId1).ToList()
            };
        }

        public async Task<UserDto> GetByNameAsync(string name)
        {
            var result = await this._repo.GetByNameAsync(name);
            if (result == null)
                return null;

            return new UserDto
            {
                Id = result.Id.AsGuid(), Name = result.Name.Name1, Password = result.Password.Pass,
                BirthDate = result.BirthDate.birthD,
                Email = result.Email.Address, PhoneNumber = result.PhoneNumber.Number, State = result.State.State1,
                Tag = result.Tag.Select(tag => tag.Tag1).ToList(),
                Friendship = result.Friendship.Select(friend => friend.FriendId1).ToList()
            };
        }

        public async Task<UserDto> AddAsync(CreatingUserDto dto)
        {
            var us = new User(dto.Name, dto.Password, dto.BirthDate, dto.Email, dto.PhoneNumber, dto.State, dto.Tag,
                dto.Friendship);

            await this._repo.AddAsync(us);

            await this._unitOfWork.CommitAsync();

            return new UserDto
            {
                Id = us.Id.AsGuid(), Name = us.Name.Name1, Password = us.Password.Pass, BirthDate = us.BirthDate.birthD,
                Email = us.Email.Address,
                PhoneNumber = us.PhoneNumber.Number, State = us.State.State1, Tag = dto.Tag,
                Friendship = dto.Friendship
            };
        }

        public async Task<UserDto> ChangeMood(UserDto dto, string newState)
        {
            var us = await this._repo.GetUserByIdAsync(new UserId(dto.Id));
            us.ChangeMood(new State(newState));
            await this._unitOfWork.CommitAsync();
            var tagList = us.Tag.Select(tag => tag.Tag1).ToList();
            var friendshipList = us.Friendship.Select(friend => friend.FriendId1).ToList();

            return new UserDto
            {
                Id = us.Id.AsGuid(), Name = us.Name.Name1, Password = us.Password.Pass, BirthDate = us.BirthDate.birthD,
                Email = us.Email.Address,
                PhoneNumber = us.PhoneNumber.Number, State = us.State.State1,
                Tag = tagList,
                Friendship = friendshipList
            };
        }

        public async Task<UserDto> ChangeUserProfile(UserDto updatedU)
        {
            var us = await this._repo.GetUserByIdAsync(new UserId(updatedU.Id));
            var tagList1 = us.Tag.ToList();
            if (!string.IsNullOrEmpty(updatedU.Email)) us.ChangeEmail(new Email(updatedU.Email));
            if (!string.IsNullOrEmpty(updatedU.PhoneNumber))
                us.ChangePhoneNumber(new PhoneNumber(updatedU.PhoneNumber));
            if (!string.IsNullOrEmpty(updatedU.Password)) us.ChangePassword(new Password(updatedU.Password));
            if (!string.IsNullOrEmpty(updatedU.BirthDate)) us.ChangeBirthDate(new BirthDate(updatedU.BirthDate));
            if (!string.IsNullOrEmpty(updatedU.Name)) us.ChangeName(new Name(updatedU.Name));
            if (updatedU.Tag.Count != 0)
            {
                var tagsList = updatedU.Tag.Select(tag => new Tag(tag)).ToList();
                us.ChangeTags(tagsList);
            }

            await this._unitOfWork.CommitAsync();
            var tagList = us.Tag.Select(tag => tag.Tag1).ToList();
            var friendshipList = us.Friendship.Select(friend => friend.FriendId1).ToList();

            return new UserDto
            {
                Id = us.Id.AsGuid(), Name = us.Name.Name1, Password = us.Password.Pass, BirthDate = us.BirthDate.birthD,
                Email = us.Email.Address,
                PhoneNumber = us.PhoneNumber.Number, State = us.State.State1,
                Tag = tagList,
                Friendship = friendshipList
            };
        }

        // public async Task<UserDto> UpdateAsync(UserDto dto)
        // {
        //     await this._unitOfWork.CommitAsync();

        //     return dto;
        // }

        public async Task<UserDto> InactivateAsync(UserId id)
        {
            var us = await this._repo.GetByIdAsync(id);

            if (us == null)
                return null;

            // change all fields
            us.MarkAsInative();

            await this._unitOfWork.CommitAsync();
            var tagList = us.Tag.Select(tag => tag.Tag1).ToList();
            var friendshipList = us.Friendship.Select(friend => friend.FriendId1).ToList();

            return new UserDto
            {
                Id = us.Id.AsGuid(), Name = us.Name.Name1, Password = us.Password.Pass, BirthDate = us.BirthDate.birthD,
                Email = us.Email.Address,
                PhoneNumber = us.PhoneNumber.Number, State = us.State.State1,
                Tag = tagList,
                Friendship = friendshipList
            };
        }

        public async Task<UserDto> DeleteAsync(UserId id)
        {
            var us = await this._repo.GetByIdAsync(id);

            if (us == null)
                return null;

            if (us.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active user.");

            this._repo.Remove(us);
            await this._unitOfWork.CommitAsync();
            var tagList = us.Tag.Select(tag => tag.Tag1).ToList();
            var friendshipList = us.Friendship.Select(friend => friend.FriendId1).ToList();

            return new UserDto
            {
                Id = us.Id.AsGuid(), Name = us.Name.Name1, Password = us.Password.Pass, BirthDate = us.BirthDate.birthD,
                Email = us.Email.Address,
                PhoneNumber = us.PhoneNumber.Number, State = us.State.State1,
                Tag = tagList,
                Friendship = friendshipList
            };
        }

        public async Task<UserDto> AddFriendship(string userId, string frienshipId)
        {
            var us = await this._repo.GetUserByIdAsync(new UserId(userId));
            us.AddFriendship(new FriendId(frienshipId));
            await this._unitOfWork.CommitAsync();
            var tagList = us.Tag.Select(tag => tag.Tag1).ToList();
            var friendshipList = us.Friendship.Select(friend => friend.FriendId1).ToList();

            return new UserDto
            {
                Id = us.Id.AsGuid(), Name = us.Name.Name1, Password = us.Password.Pass, BirthDate = us.BirthDate.birthD,
                Email = us.Email.Address,
                PhoneNumber = us.PhoneNumber.Number, State = us.State.State1,
                Tag = tagList,
                Friendship = friendshipList
            };
        }

        public async Task<List<FriendId>> GetFriendships(string userId)
        {
            var us = await this._repo.GetUserByIdAsync(new UserId(userId));
            return us.Friendship;
        }

        public async Task<List<UserDto>> SugestedFriendships(UserId id, List<UserDto> allUsersDtos)
        {
            //Changes User to UserDto
            var us = await this._repo.GetUserByIdAsync(id);
            var tagList = us.Tag.Select(tag => tag.Tag1).ToList();
            var friendshipList = us.Friendship.Select(friend => friend.FriendId1).ToList();

            UserDto userDto = new UserDto
            {
                Id = us.Id.AsGuid(), Name = us.Name.Name1, Password = us.Password.Pass, BirthDate = us.BirthDate.birthD,
                Email = us.Email.Address,
                PhoneNumber = us.PhoneNumber.Number, State = us.State.State1,
                Tag = tagList,
                Friendship = friendshipList
            };
            //Checks which user dtos have at least one similar tag and adds them to a list
            List<UserDto> similarTags = new List<UserDto>();
            var userTags = userDto.Tag;
            foreach (var item in allUsersDtos)
            {
                List<string> thisUserTag = item.Tag;
                foreach (var tag in userTags)
                {
                    foreach (var elem in thisUserTag)
                    {
                        if (tag == elem && item.Id != userDto.Id)
                        {
                            similarTags.Add(item);
                        }
                    }
                }
            }
            List<UserDto> nonDupSimilarTags = similarTags.ToList();
            
            //Randomizes the list of possible sugested userss

            return nonDupSimilarTags.OrderBy(arg => Guid.NewGuid()).Distinct().Take(5).ToList();
        }
        
        public async Task<int> NetworkLength()
        {
            var n = GetAllAsync().Result.Count;
            return n;
        }

        public async Task<List<TagCloud>> GetTagCloudFromUsers()
        {
            var users = await GetAllAsync();
            List<String> tags = new List<string>();
            List<TagCloud> tagClouds = new List<TagCloud>();

            foreach (var u in users)
            {
                foreach (var tag in u.Tag)
                {
                    tags.Add(tag);
                }
            }

            List<string> distinctTags = tags.Distinct().ToList();
            int count = 0;

            foreach (var dt in distinctTags)
            {
                foreach (var t in tags)
                {
                    if (dt.Equals(t))
                    {
                        count++;
                    }
                }

                double percentagem = ((double) count / tags.Count) * 100.0;
                tagClouds.Add(new TagCloud(dt,percentagem));
                count = 0;
            }

            return tagClouds;
        }

        public async Task<List<TagCloud>> GetTagCloudFromUser(String userId)
        {
            var user = await GetByIdAsync(new UserId(userId));
            var users = await GetAllAsync();
            List<String> tags = new List<string>();
            List<TagCloud> tagCloud = new List<TagCloud>();
            List<TagCloud> userTagCloud = new List<TagCloud>();

            foreach (var u in users)
            {
                foreach (var tag in u.Tag)
                {
                    tags.Add(tag);
                }
            }

            List<string> distinctTags = tags.Distinct().ToList();
            int count = 0;

            foreach (var dt in distinctTags)
            {
                foreach (var t in tags)
                {
                    if (dt.Equals(t))
                    {
                        count++;
                    }
                }

                double percentagem = (double) count / tags.Count * 100.0;
                tagCloud.Add(new TagCloud(dt,percentagem));
                count = 0;
            }

            // filter tag cloud for user
            foreach (var t in tagCloud)
            {
                if (user.Tag.Contains(t.Tag))
                {
                    userTagCloud.Add(t);
                }
            }

            return userTagCloud;
        }
    }
}