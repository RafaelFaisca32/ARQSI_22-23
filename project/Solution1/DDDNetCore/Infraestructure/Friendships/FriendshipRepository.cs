using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.Friendships
{
    public class FriendshipRepository : BaseRepository<Friendship, FriendshipId>, IFriendshipRepository
    {
        private DDDSample1DbContext _ctx;

        public FriendshipRepository(DDDSample1DbContext context) : base(context.Friendships)
        {
            this._ctx = context;
        }

        public async Task<List<Friendship>> GetAllFriendshipsAsync()
        {
            return await _ctx.Friendships.Include(p => p.FriendA).Include(p => p.FriendB).ToListAsync();
        }

        public async Task<Friendship> GetFriendshipByIdAsync(FriendshipId id)
        {
            return await _ctx.Friendships.Where(p => p.Id == id).Include(p => p.FriendA).Include(p => p.FriendB).FirstAsync();
        }

        public async Task<Friendship> GetOppositeFriendshipByFriendshipAsync(UserId friendB, UserId friendA)
        {
            return await _ctx.Friendships.Where(p => p.FriendA.Id == friendB).Where(p => p.FriendB.Id == friendA).Include(p => p.FriendA).Include(p => p.FriendB).FirstAsync();
        }

        public async Task<List<Friendship>> GetPendingFriendshipsAsync(UserId id)
        {
            return await _ctx.Friendships.Where(p => p.FriendB.Id == id).Where(p=>p.FriendshipState.State1 == "PENDING").Include(p => p.FriendA).Include(p => p.FriendB).ToListAsync();
        }
    }
}