using System;
using System.Collections.Generic;
using DDDSample1.Domain.ValueObjects;
using DDDSample1.Domain.Users;

namespace DDDSample1.Domain.Introductions
{
    public class IntroductionDto
    {
        public String Id { get; set; }
        
        public String Requester { get; set; }
        public String CommonFriend { get; set; }
        public String Friend { get; set; }        
        public String State { get; set; }        
        
        
        public string Date { get; set; }
        public bool Active{ get;  private set; }

        public IntroductionDto(string id, string requester, string commonFriend, string friend, string state, string date, bool active){
            this.Id = id;
            this.Requester=requester;
            this.CommonFriend = commonFriend;
            this.Friend=friend;
            this.State=state;
            this.Date = date;
            this.Active = active;
        }


    }
}