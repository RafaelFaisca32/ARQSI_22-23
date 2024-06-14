using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;


namespace DDDSample1.Domain.Users
{
    public interface IUserRepository:IRepository<User,UserId>
    {
        public Task<List<User>> GetAllUsersAsync();

        public Task<User> GetUserByIdAsync(UserId id);

        public Task<User> GetByNameAsync(string name);

        public Task<User> GetByEmailAsync(string email);

    }
}