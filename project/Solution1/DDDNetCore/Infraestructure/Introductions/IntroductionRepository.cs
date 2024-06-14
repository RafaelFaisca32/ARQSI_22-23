using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Introductions;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Introductions
{
    public class IntroductionRepository : BaseRepository<Introduction, IntroductionId>, IIntroductionRepository
    {
        private DDDSample1DbContext _ctx;
      
        public IntroductionRepository(DDDSample1DbContext context):base(context.Introductions)
        {
    
        }

        public async Task<List<Introduction>> GetPendingIntroductionsByFriendAsync(FriendId id){
            List<Introduction> list = new List<Introduction>();

            foreach (var f in await GetAllAsync())
            {
                //check the common friend 
                if (f.CommonFriend.Equals(id) && f.State.State1.Equals("Pending"))
                    list.Add(f);
            }
            return list;

        }

    }
}