using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.ValueObjects;
using Projeto.Domain.Users;

namespace DDDSample1.Domain.Users
{
    public interface IUserService
    {
        public Task<List<UserDto>> GetAllAsync();

        public Task<UserDto> GetByIdAsync(UserId id);

        public Task<UserDto> GetLogin(List<UserDto> ls, CreatingUserDto dto);

        public Task<UserDto> GetByNameAsync(string name);

        public Task<UserDto> GetByEmailAsync(string email);

        public Task<UserDto> AddAsync(CreatingUserDto dto);

        public Task<UserDto> ChangeMood(UserDto dto, string newState);

        public Task<UserDto> ChangeUserProfile(UserDto updatedU);

        //public Task<UserDto> UpdateAsync(UserDto dto);

        public Task<UserDto> InactivateAsync(UserId id);

        public Task<UserDto> DeleteAsync(UserId id);

        public Task<UserDto> AddFriendship(string userId, string frienshipId);

        public Task<List<FriendId>> GetFriendships(string userId);

        public Task<List<UserDto>> SugestedFriendships(UserId id, List<UserDto> allUsersDtos);
        
        public Task<int> NetworkLength();
        public Task<List<TagCloud>> GetTagCloudFromUsers();
        public Task<List<TagCloud>> GetTagCloudFromUser(string userId);
    }
}