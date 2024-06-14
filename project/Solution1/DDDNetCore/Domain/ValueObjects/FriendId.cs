using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects
{

    public class FriendId : IValueObject
    {
        public string FriendId1 { get; }

        protected FriendId()
        {
        }

        public FriendId(string friendId)
        {
            if (Verify(friendId))
            {
                this.FriendId1 = friendId;
            }
            else
            {
                throw new BusinessRuleValidationException("FriendId is invalid");
            }

        }


        private bool Verify(string friendId)
        {
            if (friendId.Length > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool Equals(FriendId other)
        {
            if (other == null)
                return false;
            if (this.GetType() != other.GetType())
                return false;
            return this.FriendId1 == other.FriendId1;
        }

    }
}