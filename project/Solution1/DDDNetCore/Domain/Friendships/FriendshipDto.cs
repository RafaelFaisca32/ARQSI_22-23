using System;
using System.Collections.Generic;
using DDDSample1.Domain.ValueObjects;
using DDDSample1.Domain.Users;

namespace DDDSample1.Domain.Friendships
{
    public class FriendshipDto
    {
        public Guid Id { get; set; }
        public string RelationTag { get; set; }

        public string ConnectionStrength { get; set; }

        public string RelationshipStrength { get; set; }
        public UserDto FriendA { get; set; }
        public UserDto FriendB { get; set; }
        public string FriendshipState { get; set; }
    }
}