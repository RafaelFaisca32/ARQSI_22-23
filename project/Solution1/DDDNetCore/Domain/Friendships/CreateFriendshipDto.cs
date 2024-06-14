using System.Collections.Generic;
using DDDSample1.Domain.Users;

namespace DDDSample1.Domain.Friendships
{
    public class CreateFriendshipDto
    {
        public string RelationTag {
            get;
            set;
        }

        public string ConnectionStrength{
            get;
            set;
        }

        public string RelationshipStrength{
            get;
            set;
        }

        public string FriendAID{
            get;
            set;
        }
        public string FriendBID{
            get;
            set;
        }
        public string FriendshipState{
            get;
            set;
        }

        public CreateFriendshipDto(string relationTag, string connectionStrength, string relationshipStrength, string friendA, string friendB, string friendshipState)
        {
            this.RelationTag = relationTag;
            this.ConnectionStrength = connectionStrength;
            this.RelationshipStrength = relationshipStrength;
            this.FriendAID = friendA;
            this.FriendBID = friendB;
            this.FriendshipState = friendshipState;
        }
    }
}