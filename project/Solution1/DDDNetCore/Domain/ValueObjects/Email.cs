using System;
using System.Net.Mail;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects
{
    public class Email : IValueObject
    {


        public string Address
        {
            get;
        }

        protected Email() { }

        public Email(string email)
        {
            if (Verify(email))
            {
                this.Address = email;
            }
            else
            {
                throw new BusinessRuleValidationException("Email is invalid");
            }
        }

        private bool Verify(string email)
        {
            try
            {
                MailAddress mail = new MailAddress(email);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }
    }
}