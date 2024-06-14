using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.ValueObjects;
using DDDSample1.Domain.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;

namespace DDDSample1.Domain.Friendships
{
    public class FriendshipService : IFriendshipService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFriendshipRepository _repo;
        private readonly IUserRepository _repoUser;

        public FriendshipService(IUnitOfWork unitOfWork, IFriendshipRepository repo, IUserRepository repoUser)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoUser = repoUser;
        }

        public async Task<List<FriendshipDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllFriendshipsAsync();

            List<FriendshipDto> listDto = list.ConvertAll<FriendshipDto>(f => FriendShipToDto(f));

            return listDto;
        }

        public async Task<FriendshipDto> GetByIdAsync(FriendshipId id)
        {
            var f = await this._repo.GetFriendshipByIdAsync(id);

            if (f == null)
                return null;

            return FriendShipToDto(f);
        }

 /*       public async Task<FriendshipDto> GetFriendshipByNamesAsync(String name1, String name2)
        {
            Name n1 = new Name(name1);
            Name n2 = new Name(name2);
            var f = await this._repo.GetFriendshipByNames(n1, n2);
            if (f == null)
                return null;
            return FriendShipToDto(f);
        }*/

        public async Task<List<FriendshipDto>> GetPendingFriendshipsFromAsync(UserId id)
        {
            var list = await this._repo.GetPendingFriendshipsAsync(id);
            var dtoList = new List<FriendshipDto>();
            foreach (var f in list)
            {
                var dto = FriendShipToDto(f);
                dtoList.Add(dto);
            }

            return dtoList;
        }

        public async Task<List<FriendshipDto>> GetFriendshipsFromAsync(UserId id)
        {
            var list = await GetAllAsync();

            if (list == null)
                return null;

            List<FriendshipDto> listFriendshipsDto = new List<FriendshipDto>();

            foreach (var f in list)
            {
                //check the friend who got requested
                if (f.FriendA.Id.ToString().Equals(id.Value))
                {
                    listFriendshipsDto.Add(f);
                    Console.WriteLine("adicionei" + f.FriendB.Name);
                }
            }

            return listFriendshipsDto;
        }

        private FriendshipDto FriendShipToDto(Friendship f)
        {
            return new FriendshipDto
            {
                Id = f.Id.AsGuid(), RelationTag = f.RelationTag.RelationTag1,
                ConnectionStrength = f.ConnectionStrength.Number, RelationshipStrength = f.RelationshipStrength.Number,
                FriendA = new UserDto
                {
                    Id = f.FriendA.Id.AsGuid(), Name = f.FriendA.Name.Name1, Password = f.FriendA.Password.Pass,
                    BirthDate = f.FriendA.BirthDate.birthD, Email = f.FriendA.Email.Address,
                    PhoneNumber = f.FriendA.PhoneNumber.Number, State = f.FriendA.State.State1,
                    Tag = f.FriendA.Tag.Select(tag => tag.Tag1).ToList(),
                    Friendship = f.FriendA.Friendship.Select(friend => friend.FriendId1).ToList()
                },
                FriendB = new UserDto
                {
                    Id = f.FriendB.Id.AsGuid(), Name = f.FriendB.Name.Name1, Password = f.FriendB.Password.Pass,
                    BirthDate = f.FriendB.BirthDate.birthD, Email = f.FriendB.Email.Address,
                    PhoneNumber = f.FriendB.PhoneNumber.Number, State = f.FriendB.State.State1,
                    Tag = f.FriendB.Tag.Select(tag => tag.Tag1).ToList(),
                    Friendship = f.FriendB.Friendship.Select(friend => friend.FriendId1).ToList()
                },
                FriendshipState = f.FriendshipState.State1
            };
        }

        public async Task<List<List<FriendshipDto>>> GetNetwork(List<List<FriendshipDto>> llf,int nivel){
            
            List<List<FriendshipDto>> aux = new List<List<FriendshipDto>>();
            for (int i = 0; i < nivel; i++)
            {
                foreach (var Friendship in llf)
                {
                    foreach (var friend in Friendship)
                    {
                        aux.Add(await GetFriendshipsFromAsync(new UserId(friend.FriendB.Id)));
                    }
                }

                llf.AddRange(aux);
            }
            return llf;
        }

        public async Task<List<List<FriendshipDto>>> GetCommonFriendshipsFromAsync(UserDto uDto, UserDto fDto)
        {
            var returnList = new List<List<FriendshipDto>>();
            var auxList = new List<FriendshipDto>();

            foreach (var friendshipId in uDto.Friendship)
            {
                var f = await _repo.GetFriendshipByIdAsync((new FriendshipId(friendshipId)));
                var commonFriendship =
                    await _repo.GetOppositeFriendshipByFriendshipAsync(new UserId(fDto.Id.ToString()), f.FriendB.Id);

                auxList.Add(FriendShipToDto(f));
                auxList.Add(FriendShipToDto(commonFriendship));
            }

            returnList.Add(auxList);
            return returnList;
        }

        public async Task<FriendshipDto> AddAsync(CreateFriendshipDto dto)
        {
            var friendA = await _repoUser.GetByIdAsync(new UserId(dto.FriendAID));
            var friendB = await _repoUser.GetByIdAsync(new UserId(dto.FriendBID));
            var f = new Friendship(dto.RelationTag, dto.ConnectionStrength, dto.RelationshipStrength,
                friendA, friendB, dto.FriendshipState);

            await this._repo.AddAsync(f);

            await this._unitOfWork.CommitAsync();

            return FriendShipToDto(f);
        }

        public async Task<FriendshipDto> changeFriendshipState(Guid id, FriendshipState friendshipState)
        {
            var f = await this._repo.GetFriendshipByIdAsync(new FriendshipId(id.ToString()));

            if (!f.FriendshipState.State1.Equals("PENDING"))
            {
                throw new BusinessRuleValidationException("Friendship state is not PENDING");
            }

            f.ChangeFriendshipState(friendshipState);
            await this._unitOfWork.CommitAsync();

            return FriendShipToDto(f);
        }

        public async Task<FriendshipDto> UpdateAsync(FriendshipDto dto)
        {
            var f = await this._repo.GetByIdAsync(new FriendshipId(dto.Id));

            if (f == null)
                return null;

            // change all fields, except users
            f.ChangeConnectionStrength(new ConnectionStrength(dto.ConnectionStrength));
            f.ChangeRelationshipStrength(new RelationshipStrength(dto.RelationshipStrength));
            f.ChangeRelationTag(new RelationTag(dto.RelationTag));
            f.ChangeFriendshipState(new FriendshipState(dto.FriendshipState));

            await this._unitOfWork.CommitAsync();

            return FriendShipToDto(f);
        }

        public async Task<FriendshipDto> InactivateAsync(FriendshipId id)
        {
            var f = await this._repo.GetByIdAsync(id);

            if (f == null)
                return null;

            // change all fields
            f.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return FriendShipToDto(f);
        }

        public async Task<FriendshipDto> DeleteAsync(FriendshipId id)
        {
            var f = await this._repo.GetByIdAsync(id);

            if (f == null)
                return null;

            if (f.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active friendship.");

            this._repo.Remove(f);
            await this._unitOfWork.CommitAsync();

            return FriendShipToDto(f);
        }

        public async Task<FriendshipDto> ChangeRelationshipTagConnectionStrength(String id, String name,
            String relationTag, String connectionStrength)
        {
            var idd = new UserId(id);
            var user2 = await this._repoUser.GetUserByIdAsync(idd);
            var user1 = await this._repoUser.GetByNameAsync(name);
            var f1 = await this._repo.GetOppositeFriendshipByFriendshipAsync(user1.Id, user2.Id);
            if (f1 == null)
            {
                return null;
            }

            f1.ChangeConnectionStrength(new ConnectionStrength(connectionStrength));
            f1.ChangeRelationTag(new RelationTag(relationTag));

            await this._unitOfWork.CommitAsync();
            return FriendShipToDto(f1);
        }

        public async Task<ActionResult<int>> getNetWorkStrengthByUser(UserDto userDto)
        {
            var strength = 0;
            foreach (var friendshipId in userDto.Friendship)
            {
                var f = await this.GetByIdAsync(new FriendshipId(friendshipId));
                strength += Int32.Parse(f.ConnectionStrength);
            }

            return strength;
        }
        
        public async Task<List<TagCloud>> GetTagCloudFromFriendships()
        {
            var friendships = await GetAllAsync();
            List<string> tags = new List<string>();
            List<TagCloud> tagClouds = new List<TagCloud>();
            
            foreach (var f in friendships)
            {
                tags.Add(f.RelationTag);
            }
            
            List<string> distinctTags = tags.Distinct().ToList();

            int count=0;
            foreach (var dt in distinctTags)
            {
                foreach (var t in tags)
                {
                    if (dt.Equals(t))
                    {
                        count++;
                    }
                }
                double percentagem = ((double)count/tags.Count)*100.0;
                tagClouds.Add(new TagCloud(dt, percentagem));
                count = 0;
            }

            return tagClouds;
        }
        
        public async Task<List<TagCloud>> GetTagCloudFromUserFriendships(UserId id)
        {
            var user = _repoUser.GetUserByIdAsync(id);
            List<FriendshipDto> friendships = new List<FriendshipDto>();
            foreach (var f in user.Result.Friendship)
            {
                friendships.Add(GetByIdAsync(new FriendshipId(f.FriendId1)).Result);
            }
            List<string> tags = new List<string>();
            List<TagCloud> tagClouds = new List<TagCloud>();
            
            foreach (var f in friendships)
            {
                tags.Add(f.RelationTag);
            }
            
            List<string> distinctTags = tags.Distinct().ToList();

            int count=0;
            foreach (var dt in distinctTags)
            {
                foreach (var t in tags)
                {
                    if (dt.Equals(t))
                    {
                        count++;
                    }
                }
                double percentagem = ((double)count/tags.Count)*100.0;
                tagClouds.Add(new TagCloud(dt, percentagem));
                count = 0;
            }

            return tagClouds;
        }

        public async Task<Friendship> GetRelationStrengthBetweenUsers(string id, string name)
        {
            
            var friend2 = _repoUser.GetByNameAsync(name).Result;
            var id2 = friend2.Id.Value;
            
            var friendship = await this._repo.GetOppositeFriendshipByFriendshipAsync(new UserId(id), new UserId(id2));

            return friendship;
        }
    }
}