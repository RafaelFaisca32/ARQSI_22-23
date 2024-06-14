using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;


namespace DDDSample1.Domain.Friendships
{
    public interface IFriendshipRepository : IRepository<Friendship, FriendshipId>
    {
        public Task<List<Friendship>> GetAllFriendshipsAsync();

        public Task<Friendship> GetFriendshipByIdAsync(FriendshipId id);

        public Task<List<Friendship>> GetPendingFriendshipsAsync(UserId id);
        public Task<Friendship> GetOppositeFriendshipByFriendshipAsync(UserId friendB, UserId friendA);
        
    }
}