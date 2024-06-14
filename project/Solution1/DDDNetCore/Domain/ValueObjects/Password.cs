using System.Linq;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects
{
    public class Password : IValueObject
    {

        public string Pass
        {
            get;
        }

        protected Password() { }

        public Password(string password)
        {
            if (Verify(password))
            {
                this.Pass = password;
            }
            else
            {
                throw new BusinessRuleValidationException("Password is invalid");
            }
        }

        private bool Verify(string password)
        {

            return PasswordLength(password) && PasswordLowerCase(password) && PasswordUpperCase(password);
        }

        public static bool PasswordLength(string password)
        {
            return password.Length >= 7;
        }

        public static bool PasswordLowerCase(string password)
        {
            return password.Any(c => char.IsLower(c));
        }

        public static bool PasswordUpperCase(string password)
        {
            return password.Any(c => char.IsUpper(c));
        }
    }
}