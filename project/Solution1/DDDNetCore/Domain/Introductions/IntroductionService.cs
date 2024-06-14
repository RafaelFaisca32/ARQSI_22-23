using System;
using System.Globalization;
using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;
using DDDSample1.Domain.Friendships;

namespace DDDSample1.Domain.Introductions
{
    public class IntroductionService:IIntroductionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IIntroductionRepository _repo;
        private readonly IUserRepository _userRepo;

        private readonly IFriendshipService _friendshipService;
        private readonly IUserService _userService;

        public IntroductionService(IUnitOfWork unitOfWork, IIntroductionRepository repo, IUserRepository userRepo,
                    IFriendshipService friendshipService, IUserService userService)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._userRepo = userRepo;
            this._friendshipService = friendshipService;
            this._userService = userService;
        }

        public async Task<List<IntroductionDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<IntroductionDto> listDto = list.ConvertAll<IntroductionDto>(
                introduction => new IntroductionDto(introduction.Id.AsString(), 
                                    introduction.Requester.FriendId1,
                                       introduction.CommonFriend.FriendId1,
                                       introduction.Friend.FriendId1,
                                       introduction.State.State1,
                                       introduction.Date.Date1, 
                                       introduction.Active));

            return listDto;
        }

        public async Task<List<IntroductionNames>> GetPendingIntroductionsByFriendAsync(FriendId id){
            
           var list = await _repo.GetPendingIntroductionsByFriendAsync(id);

           //var map = new Dictionary<string, string>();
           List<IntroductionNames> map = new List<IntroductionNames>();
           foreach (var i in list)
           {
               IntroductionNames aux = new IntroductionNames(i.Id.Value, _userRepo.GetUserByIdAsync(new UserId(i.Requester.FriendId1)).Result.Name.Name1,_userRepo.GetUserByIdAsync(new UserId(i.Friend.FriendId1)).Result.Name.Name1);
               map.Add(aux);
           }
           
           return map;
        }

        public async Task<IntroductionDto> GetByIdAsync(IntroductionId id)
        {
            var introduction = await this._repo.GetByIdAsync(id);
            
            if(introduction == null)
                return null;

            return new IntroductionDto(introduction.Id.AsString(), 
                                       introduction.Requester.FriendId1,
                                       introduction.CommonFriend.FriendId1,
                                       introduction.Friend.FriendId1,
                                       introduction.State.State1,
                                       introduction.Date.Date1, 
                                       introduction.Active);
        }

        public async Task<IntroductionDto> AddAsync(CreatingIntroductionDto dto)
        {
                
            var requester = await _userRepo.GetByIdAsync(new UserId(dto.requester));
            if (requester == null)
                throw new BusinessRuleValidationException("Invalid Requester Id.");

            var commonFriend = await _userRepo.GetByNameAsync(dto.commonFriend);
            if (commonFriend == null)
                throw new BusinessRuleValidationException("Invalid RequCommon Friend ester Id.");

            var friend = await _userRepo.GetByNameAsync(dto.friend);
            if (friend == null)
                throw new BusinessRuleValidationException("Invalid Friend Id.");

            var introduction = new Introduction(new FriendId(dto.requester), new FriendId(commonFriend.Id.Value), new FriendId(friend.Id.Value), new State(dto.state), new Date(DateTime.UtcNow.ToString("yyyy-MM-dd")));

            await this._repo.AddAsync(introduction);

            await this._unitOfWork.CommitAsync();

            return new IntroductionDto(introduction.Id.AsString(), 
                                       introduction.Requester.FriendId1,
                                       introduction.CommonFriend.FriendId1,
                                       introduction.Friend.FriendId1,
                                       introduction.State.State1,
                                       introduction.Date.Date1, 
                                       introduction.Active);
        }
/*
        public async Task<IntroductionDto> UpdateAsync(IntroductionDto dto)
        {
            var introduction = await this._repo.GetByIdAsync(new IntroductionId(dto.Id)); 

            if (introduction == null)
                return null;   

            // change all fields, except users
            introduction.ChangeDate(dto.Date);
            introduction.ChangeAnswer(dto.Answer);
            
            await this._unitOfWork.CommitAsync();

            return new IntroductionDto {Id = introduction.Id.AsString(), Date = introduction.Date, Answer = introduction.Answer};
        }
*/
        public async Task<IntroductionDto> InactivateAsync(IntroductionId id)
        {
            var introduction = await this._repo.GetByIdAsync(id); 

            if (introduction == null)
                return null;   

            // change all fields
            introduction.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new IntroductionDto(introduction.Id.AsString(), 
                                       introduction.Requester.FriendId1,
                                       introduction.CommonFriend.FriendId1,
                                       introduction.Friend.FriendId1,
                                       introduction.State.State1,
                                       introduction.Date.Date1, 
                                       introduction.Active);
        }

         public async Task<IntroductionDto> DeleteAsync(IntroductionId id)
        {
            var introduction = await this._repo.GetByIdAsync(id); 

            if (introduction == null)
                return null;   

            if (introduction.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active introduction.");
            
            this._repo.Remove(introduction);
            await this._unitOfWork.CommitAsync();

            return new IntroductionDto(introduction.Id.AsString(), 
                                       introduction.Requester.FriendId1,
                                       introduction.CommonFriend.FriendId1,
                                       introduction.Friend.FriendId1,
                                       introduction.State.State1,
                                       introduction.Date.Date1, 
                                       introduction.Active);
        }

        public async Task<IntroductionDto> changeIntroductionState(Guid id, State state)
        {
            var introduction = await this._repo.GetByIdAsync(new IntroductionId(id.ToString()));

            if (!introduction.State.State1.Equals("Pending")){
                throw new BusinessRuleValidationException("Introduction state is not PENDING");
            }

            introduction.ChangeState(state);

            //var requested = await _userService.GetByIdAsync(new UserId(introduction.Requester.FriendId1));
            //var friend = await _userService.GetByIdAsync(new UserId(introduction.Friend.FriendId1));

            if (state.State1.Equals("Accepted")){
                CreateFriendshipDto friendshipDto = new CreateFriendshipDto (
                    "Introduction",
                    "1",
                    "1",
                    introduction.Requester.FriendId1, 
                    introduction.Friend.FriendId1, 
                    "PENDING"
                );
                
                FriendshipDto fdto = await _friendshipService.AddAsync(friendshipDto);
            }else{
                await this._unitOfWork.CommitAsync();
            }

            return new IntroductionDto(introduction.Id.AsString(), 
                                       introduction.Requester.FriendId1,
                                       introduction.CommonFriend.FriendId1,
                                       introduction.Friend.FriendId1,
                                       introduction.State.State1,
                                       introduction.Date.Date1, 
                                       introduction.Active);
        }





    }
}