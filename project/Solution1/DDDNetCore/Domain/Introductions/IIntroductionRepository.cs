using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.ValueObjects;
using DDDSample1.Domain.Introductions;
using DDDSample1.Domain.Users;

namespace DDDSample1.Domain.Introductions
{
    public interface IIntroductionRepository: IRepository<Introduction, IntroductionId>
    {
        public Task<List<Introduction>> GetPendingIntroductionsByFriendAsync(FriendId id);    
        
    }
}