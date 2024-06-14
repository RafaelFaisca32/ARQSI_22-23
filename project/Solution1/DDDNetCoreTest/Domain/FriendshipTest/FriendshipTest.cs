using System;
using System.Collections.Generic;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;
using Xunit;

namespace FriendshipTest
{
    public class UnitTest1
    {
        [Fact]
        public void ChangeRelationTag()
        {
            var tags = new List<string>();
            tags.Add(new string("teste"));
            var userA = new User("TesteA","Teste123","10/10/2000","teste@isep.pt","987654321","Hopeful",tags,new List<string>());
            var userB = new User("TesteB","Teste123","10/10/2000","teste@isep.pt","987654321","Hopeful",tags,new List<string>());      
                
            var friendship = new Friendship("None", "0", "0", userA, userB, "PENDING");
            
            RelationTag newRelationTag = new RelationTag("Brother");
            friendship.ChangeRelationTag(newRelationTag);
            Assert.True(friendship.RelationTag.Equals(newRelationTag));
        }

        [Fact]
        public void ChangeConnectionStrength()
        {
            var tags = new List<string>();
            tags.Add(new string("teste"));
            var userA = new User("TesteA","Teste123","10/10/2000","teste@isep.pt","987654321","Hopeful",tags,new List<string>());
            var userB = new User("TesteB","Teste123","10/10/2000","teste@isep.pt","987654321","Hopeful",tags,new List<string>());     
                
            var friendship = new Friendship("None", "0", "0", userA, userB, "PENDING");
            
            ConnectionStrength newConnectionStrength = new ConnectionStrength("100");
            friendship.ChangeConnectionStrength(newConnectionStrength);
            Assert.True(friendship.ConnectionStrength.Equals(newConnectionStrength));
        }

        [Fact]
        public void ChangeRelationshipStrength()
        {
            var tags = new List<string>();
            tags.Add(new string("teste"));

            var userA = new User("TesteA","Teste123","10/10/2000","teste@isep.pt","987654321","Hopeful",tags,new List<string>());
            var userB = new User("TesteB","Teste123","10/10/2000","teste@isep.pt","987654321","Hopeful",tags,new List<string>());     
                
            var friendship = new Friendship("None", "0", "0", userA, userB, "PENDING");
            
            RelationshipStrength newRelationshipStrength = new RelationshipStrength("100");
            friendship.ChangeRelationshipStrength(newRelationshipStrength);
            Assert.True(friendship.RelationshipStrength.Equals(newRelationshipStrength));
        }

        [Fact]
        public void ChangeFriendshipState()
        {
            var tags = new List<string>();
            tags.Add(new string("teste"));
            var userA = new User("TesteA","Teste123","10/10/2000","teste@isep.pt","987654321","Hopeful",tags,new List<string>());
            var userB = new User("TesteB","Teste123","10/10/2000","teste@isep.pt","987654321","Hopeful",tags,new List<string>());     
                
            var friendship = new Friendship("None", "0", "0", userA, userB, "PENDING");
            
            FriendshipState newFriendshipState = new FriendshipState("ACCEPTED");
            friendship.ChangeFriendshipState(newFriendshipState);
            Assert.True(friendship.FriendshipState.Equals(newFriendshipState));
        }
    }
}
