using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Introductions;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;

namespace DDDSample1.Domain.Friendships
{
    public interface IIntroductionService
    {
        public Task<List<IntroductionDto>> GetAllAsync();
        
        public Task<List<IntroductionNames>> GetPendingIntroductionsByFriendAsync(FriendId id);

        public Task<IntroductionDto> GetByIdAsync(IntroductionId id);

        public Task<IntroductionDto> AddAsync(CreatingIntroductionDto dto);

        public Task<IntroductionDto> InactivateAsync(IntroductionId id);

        public Task<IntroductionDto> DeleteAsync(IntroductionId id);

        public Task<IntroductionDto> changeIntroductionState(Guid id, State state);
        
    }
}