using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Domain.Friendships
{
    public interface IFriendshipService
    {
        public Task<List<FriendshipDto>> GetAllAsync();

        public Task<FriendshipDto> GetByIdAsync(FriendshipId id);

        public Task<List<FriendshipDto>> GetPendingFriendshipsFromAsync(UserId id);

        public Task<List<FriendshipDto>> GetFriendshipsFromAsync(UserId id);

        public Task<List<List<FriendshipDto>>> GetNetwork(List<List<FriendshipDto>> llf,int nivel);

        public Task<FriendshipDto> AddAsync(CreateFriendshipDto dto);

        public Task<FriendshipDto> changeFriendshipState(Guid id, FriendshipState friendshipState);

        public Task<FriendshipDto> UpdateAsync(FriendshipDto dto);

        public Task<FriendshipDto> InactivateAsync(FriendshipId id);

        public Task<FriendshipDto> DeleteAsync(FriendshipId id);

        public Task<FriendshipDto> ChangeRelationshipTagConnectionStrength(string id,string name, string relationTag,
            string connectionStrength);

        public Task<ActionResult<int>> getNetWorkStrengthByUser(UserDto userDto);

        public Task<List<List<FriendshipDto>>> GetCommonFriendshipsFromAsync(UserDto uDto, UserDto fDto);
        
        public Task<List<TagCloud>> GetTagCloudFromFriendships();
        public Task<List<TagCloud>> GetTagCloudFromUserFriendships(UserId id);
        public Task<Friendship> GetRelationStrengthBetweenUsers(string id, string name);
    }
}