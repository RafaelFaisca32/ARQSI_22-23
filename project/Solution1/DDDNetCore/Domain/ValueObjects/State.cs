using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects
{
    public class State : IValueObject
    {
        public string State1 { get; }

        protected State()
        {
        }

        public State(string state)
        {
            if (Verify(state))
            {
                this.State1 = state;
            }
            else
            {
                throw new BusinessRuleValidationException("State is invalid, it must be one of these : Joyful,Distressed,Hopeful,Fearful,Relieve,Disappointed,Proud,Remorseful,Grateful,Angry");
            }
        }

        private bool Verify(string state)
        {
            return state.Equals(Mood.Angry.ToString()) || state.Equals(Mood.Disappointed.ToString()) ||
                   state.Equals(Mood.Distressed.ToString()) || state.Equals(Mood.Fearful.ToString()) ||
                   state.Equals(Mood.Grateful.ToString()) || state.Equals(Mood.Hopeful.ToString()) ||
                   state.Equals(Mood.Joyful.ToString()) || state.Equals(Mood.Proud.ToString()) ||
                   state.Equals(Mood.Relieve.ToString()) || state.Equals(Mood.Remorseful.ToString()) || 
                   state.Equals(Mood.Accepted.ToString()) || state.Equals(Mood.Rejected.ToString()) || state.Equals(Mood.Pending.ToString());
        }

        private enum Mood
        {
            Joyful,
            Distressed,
            Hopeful,
            Fearful,
            Relieve,
            Disappointed,
            Proud,
            Remorseful,
            Grateful,
            Angry,
            Accepted,
            Rejected,
            Pending
        }
    }
}