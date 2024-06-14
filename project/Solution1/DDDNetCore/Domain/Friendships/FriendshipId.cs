using System;
using Newtonsoft.Json;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Friendships
{
    public class FriendshipId : EntityId
    {        
        [JsonConstructor]
        public FriendshipId(Guid value):base(value)
        {

        }

        public FriendshipId(String value):base(value)
        {

        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }
        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}