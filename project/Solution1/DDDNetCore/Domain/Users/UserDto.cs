using System;
using System.Collections.Generic;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.ValueObjects;

namespace DDDSample1.Domain.Users
{
    public class UserDto
    {
        public Guid Id { get; set; }

        public string Password { get; set; }

        public string BirthDate { get; set; }

        public string Email { get; set; }

        public string Name { get; set; }

        public string PhoneNumber { get; set; }

        public string State { get; set; }

        public List<string> Tag { get; set; }

        public List<string> Friendship { get; set; }
    }
}