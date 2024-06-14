using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.ValueObjects;
using Xunit;

namespace UserTest
{
    public class UnitTest1
    {
        [Fact]
        public void UserInvalidName()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new DDDSample1.Domain.Users.User("Rafael9","Rafael9","05/05/2000","1180658@isep.ipp.pt","919191919","Hopeful",new List<string>(),new List<string>()));
        }

        [Fact]
        public void UserInvalidPassword()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new DDDSample1.Domain.Users.User("Rafael","Rafael","05/05/2000","1180658@isep.ipp.pt","919191919","Hopeful",new List<string>(),new List<string>()));
        }

        [Fact]
        public void UserInvalidDate()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new DDDSample1.Domain.Users.User("Rafael","Rafael9","ola","1180658@isep.ipp.pt","919191919","Hopeful",new List<string>(),new List<string>()));
        }

        [Fact]
        public void UserInvalidEmail()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new DDDSample1.Domain.Users.User("Rafael","Rafael9","05/05/2000","email","919191919","Hopeful",new List<string>(),new List<string>()));
        }

        [Fact]
        public void UserInvalidPhoneNumber()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new DDDSample1.Domain.Users.User("Rafael","Rafael9","05/05/2000","1180658@isep.ipp.pt","2","Hopeful",new List<string>(),new List<string>()));
        }
        
        [Fact]
        public void ChangeMoodTest(){
            var user = new DDDSample1.Domain.Users.User("Rafael","Rafael9","05/05/2000","1180658@isep.ipp.pt","919191919","Hopeful",new List<string>(),new List<string>());
            State newMood = new State("Hopeful");
            user.ChangeMood(newMood);
            Assert.True(user.State.Equals(newMood));
        }

        [Fact]
        public void ChangePasswordTest(){
            var user = new DDDSample1.Domain.Users.User("Rafael","Rafael9","05/05/2000","1180658@isep.ipp.pt","919191919","Hopeful",new List<string>(),new List<string>());
            Password newPw = new Password("Password2");
            user.ChangePassword(newPw);
            Assert.True(user.Password.Equals(newPw));
        }

        [Fact]
        public void ChangeNameTest(){
            var user = new DDDSample1.Domain.Users.User("Rafael","Rafael9","05/05/2000","1180658@isep.ipp.pt","919191919","Hopeful",new List<string>(),new List<string>());
            Name newName = new Name("Vasco");
            user.ChangeName(newName);
            Assert.True(user.Name.Equals(newName));
        }

        [Fact]
        public void ChangeEmailTest(){
            var user = new DDDSample1.Domain.Users.User("Rafael","Rafael9","05/05/2000","1180658@isep.ipp.pt","919191919","Hopeful",new List<string>(),new List<string>());
            Email newEmail = new Email("111111@isep.ipp.pt");
            user.ChangeEmail(newEmail);
            Assert.True(user.Email.Equals(newEmail));
        }
        
        [Fact]
        public void ChangeBirthdateTest(){
            var user = new DDDSample1.Domain.Users.User("Rafael","Rafael9","05/05/2000","1180658@isep.ipp.pt","919191919","Hopeful",new List<string>(),new List<string>());
            BirthDate newBd = new BirthDate("26/09/2004");
            user.ChangeBirthDate(newBd);
            Assert.True(user.BirthDate.Equals(newBd));
        }

        [Fact]
        public void ChangePhoneNumberTest(){
            var user = new DDDSample1.Domain.Users.User("Rafael","Rafael9","05/05/2000","1180658@isep.ipp.pt","919191919","Hopeful",new List<string>(),new List<string>());
            PhoneNumber newPn = new PhoneNumber("912121211");
            user.ChangePhoneNumber(newPn);
            Assert.True(user.PhoneNumber.Equals(newPn));
        }

        [Fact]
        public void AddFriendshipTest(){
            var user = new DDDSample1.Domain.Users.User("Rafael","Rafael9","05/05/2000","1180658@isep.ipp.pt","919191919","Hopeful",new List<string>(),new List<string>());
            FriendId newFId = new FriendId("1");
            user.AddFriendship(newFId);
            Assert.True(user.Friendship[0].Equals(newFId));
        }

        [Fact]
        public void ChangeTagsTest(){
            List<string> tags = new List<string>();
            tags.Add("ola");
            var user = new DDDSample1.Domain.Users.User("Rafael","Rafael9","05/05/2000","1180658@isep.ipp.pt","919191919","Hopeful",new List<string>(),tags);
            Tag newTag = new Tag("1");
            List<Tag> tags1 = new List<Tag>();
            tags1.Add(newTag);
            user.ChangeTags(tags1);
            Assert.True(user.Tag.Equals(tags1));
        }
    }
}
