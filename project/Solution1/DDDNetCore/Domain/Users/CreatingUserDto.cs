using System.Collections.Generic;

namespace Projeto.Domain.Users
{
    public class CreatingUserDto
    {
        public string Password {
            get;
            set;
        }

        public string BirthDate {
            get;
            set;
        }

        public string Email{
            get;
            set;
        }

        public string Name{
            get;
            set;
        }

        public string PhoneNumber{
            get;
            set;
        }

        public string State{
            get;
            set;
        }

        public List<string> Tag{
            get;
            set;
        }

        public List<string> Friendship{
            get;
            set;
        }
        public CreatingUserDto(string password, string birthDate, string email, string name, string phoneNumber, string state, List<string> tag, List<string> friendship)
        {
            this.Password = password;
            this.BirthDate = birthDate;
            this.Email = email;
            this.Name = name;
            this.PhoneNumber = phoneNumber;
            this.State = state;
            this.Tag = tag;
            this.Friendship = friendship;
        }
    }
}