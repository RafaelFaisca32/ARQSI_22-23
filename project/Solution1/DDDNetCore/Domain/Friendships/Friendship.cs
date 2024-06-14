using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.ValueObjects;
using DDDSample1.Domain.Users;

namespace DDDSample1.Domain.Friendships
{
    public class Friendship : Entity<FriendshipId>, IAggregateRoot {
        public RelationTag RelationTag {
            get;
            private set;
        }

        public ConnectionStrength ConnectionStrength {
            get;
            private set;
        }

        public RelationshipStrength RelationshipStrength{
            get;
            private set;
        }
        
        public User FriendA{    //the one who made the request
            get;
            private set;
        }
        
        public User FriendB{    //the one who got requested
            get;
            private set;
        }
        
        public FriendshipState FriendshipState{
            get;
            private set;
        }
        
        public bool Active{ 
            get;  private set; 
        }

        private Friendship(){
            this.Active = true;
        }

        public Friendship(string relationTag, string connectionStrength, string relationshipStrength, User friendA, User friendB, string friendshipState){
            this.Id = new FriendshipId(Guid.NewGuid());
            this.RelationTag = new RelationTag(relationTag);
            this.ConnectionStrength = new ConnectionStrength(connectionStrength);
            this.RelationshipStrength = new RelationshipStrength(relationshipStrength);
            this.FriendA = friendA;
            this.FriendB = friendB;
            this.FriendshipState = new FriendshipState(friendshipState);
            this.Active = true;
        }
        public void ChangeRelationTag(RelationTag relationTag)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the relation tag to an inactive friendship.");
            this.RelationTag = relationTag;
        }
        public void ChangeConnectionStrength(ConnectionStrength connectionStrength)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the connection strength to an inactive friendship.");
            this.ConnectionStrength = connectionStrength;
        }
        public void ChangeRelationshipStrength(RelationshipStrength relationshipStrength)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the relationship strength to an inactive friendship.");
            this.RelationshipStrength = relationshipStrength;
        }
        public void ChangeFriendshipState(FriendshipState friendshipState)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the friendship state an inactive friendship.");
            this.FriendshipState = friendshipState;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}