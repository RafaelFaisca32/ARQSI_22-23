using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Users;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.Users
{
    public class UserRepository : BaseRepository<User, UserId>, IUserRepository
    {
        private DDDSample1DbContext _ctx;
        public UserRepository(DDDSample1DbContext context) : base(context.Users)
        {
            this._ctx = context;
        }
            
            public async Task<List<User>> GetAllUsersAsync()
            {
                return await _ctx.Users.Include(p => p.Tag).ToListAsync();
            }

            public async Task<User> GetUserByIdAsync(UserId id)
            {
                return await _ctx.Users.Where(p => p.Id == id).Include(p => p.Tag).FirstAsync();
            }
            
            public async Task<User> GetByNameAsync(string name)
            {
                return await _ctx.Users.Where(p => p.Name.Name1 == name).Include(p => p.Tag).FirstAsync();
            }
            
            public async Task<User> GetByEmailAsync(string email)
            {
                return await _ctx.Users.Where(p => p.Email.Address == email).Include(p => p.Tag).FirstAsync();
            }
        }

    }
