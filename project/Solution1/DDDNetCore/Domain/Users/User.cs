using System;
using System.Collections.Generic;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.ValueObjects;

namespace DDDSample1.Domain.Users
{
    public class User : Entity<UserId>, IAggregateRoot
    {
        public Password Password { get; private set; }

        public BirthDate BirthDate { get; private set; }

        public Email Email { get; private set; }

        public Name Name { get; private set; }

        public PhoneNumber PhoneNumber { get; private set; }

        public State State { get; private set; }

        public List<Tag> Tag { get; private set; }

        public List<FriendId> Friendship { get; private set; }

        public bool Active { get; private set; }

        private User()
        {
            this.Active = true;
        }

        public User(string name, string password, string birthDate, string email, string phoneNumber, string state,
            List<string> tags, List<string> friendships)
        {
            this.Id = new UserId(Guid.NewGuid());
            this.Name = new Name(name);
            this.Password = new Password(password);
            this.BirthDate = new BirthDate(birthDate);
            this.Email = new Email(email);
            this.PhoneNumber = new PhoneNumber(phoneNumber);
            this.State = new State(state);
            this.Tag = Tag;
            Tag = new List<Tag>();
            for (int i = 0; i < tags.Count; i++)
            {
                Tag.Add(new Tag(tags[i]));
            }

            Friendship = new List<FriendId>();
            for (int i = 0; i < friendships.Count; i++)
            {
                //guarda o id da friendship
                Friendship.Add(new FriendId(friendships[i]));
            }

            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }

        public void ChangeMood(State newState)
        {
            
            this.State = newState;
        }

        public void ChangePassword(Password password) => this.Password = password;

        public void ChangeName(Name name) => this.Name = name;

        public void ChangeEmail(Email email) => this.Email = email;

        public void ChangeBirthDate(BirthDate bDate) => this.BirthDate = bDate;

        public void ChangePhoneNumber(PhoneNumber phoneNumber) => this.PhoneNumber = phoneNumber;
        public void AddFriendship(FriendId friendshipId) => this.Friendship.Add(friendshipId);

        public void ChangeTags(List<Tag> tags) => this.Tag = tags;

       
    }
}