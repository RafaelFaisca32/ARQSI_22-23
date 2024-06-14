using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects {
    public class FriendshipState : IValueObject
    {

        public string State1 { 
            get;
        }

        protected FriendshipState(){}

        public FriendshipState(string state)
        {
            if (Verify(state))
            {
                this.State1 = state;
            }
            else
            {
                throw new BusinessRuleValidationException("FriendshipState is invalid");
            }

        }

        private bool Verify(string state)
        {
            if (state.Length > 0){
                return true;
            }
            else {
                return false;
            }
        }

    }
}
