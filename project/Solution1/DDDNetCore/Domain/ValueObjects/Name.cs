using System.Linq;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects
{

    public class Name : IValueObject
    {
        public string Name1
        {
            get;
        }

        protected Name() { }

        public Name(string name)
        {
            if (Verify(name))
            {
                this.Name1 = name;
            }
            else
            {
                throw new BusinessRuleValidationException("Name is invalid");
            }
        }

        private bool Verify(string name)
        {
            if (NameDigit(name) || NameSpecialChar(name))
            {
                return false;
            }
            return true;
        }

        public static bool NameDigit(string name)
        {
            return name.Any(c => char.IsDigit(c));
        }

        public static bool NameSpecialChar(string name)
        {
            return name.IndexOfAny("!@#$%^&*?_~-£().,".ToCharArray()) != -1;
        }
    }
}