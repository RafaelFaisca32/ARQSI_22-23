using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects
{
    public class IntroductionNames : IValueObject
    {
        public string Id
        {
            get;
        }
        public string Requester
        {
            get;
        }
        public string Friend
        {
            get;
        }
        
        public IntroductionNames(string id, string requester, string friend)
        { 
            this.Id = id;
            this.Requester = requester;
            this.Friend = friend;
        }
    }
}