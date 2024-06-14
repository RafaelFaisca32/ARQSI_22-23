using System;
using System.Collections.Generic;
using DDDSample1.Domain.ValueObjects;
using DDDSample1.Domain.Users;

namespace DDDSample1.Domain.Introductions
{
    public class CreatingIntroductionDto
    {
        public String requester { get; set; }
        public String commonFriend { get; set; }
        public String friend { get; set; }
        public String state { get; set; }
    }
}