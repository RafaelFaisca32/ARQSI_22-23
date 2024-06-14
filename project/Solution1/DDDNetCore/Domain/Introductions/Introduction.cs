using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.ValueObjects;
using DDDSample1.Domain.Users;

namespace DDDSample1.Domain.Introductions
{
    public class Introduction : Entity<IntroductionId>, IAggregateRoot {
        
        public FriendId Requester{get; private set;}
        public FriendId CommonFriend{get; private set;}
        public FriendId Friend{get; private set;}
        public State State{get; private set;}        
        public Date Date {get;private set;}

        public bool Active{ 
            get;  private set; 
        }

        private Introduction(){
            this.Active = true;
        }

        public Introduction(FriendId requester, FriendId commonFriend, FriendId friend, State state, Date date){
            this.Id = new IntroductionId(Guid.NewGuid());
            this.Requester=requester;
            this.CommonFriend = commonFriend;
            this.Friend=friend;
            this.State=state;
            this.Date = date;
            this.Active = true;
        }
        public void ChangeDate(Date date)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the date to an inactive introduction.");
            this.Date = date;
        }

        public void ChangeState(State State)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the state of an inactive introduction.");
            this.State = State;
        }        

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}