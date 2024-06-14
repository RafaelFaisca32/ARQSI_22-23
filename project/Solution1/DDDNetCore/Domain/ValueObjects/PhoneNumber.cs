using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects
{
    public class PhoneNumber : IValueObject
    {

        public string Number
        {
            get;
        }

        protected PhoneNumber(){}

        public PhoneNumber(string phonenumber)
        {
            if (Verify(phonenumber))
            {
                this.Number = phonenumber;
            }
            else
            {
                throw new BusinessRuleValidationException("Phone number is invalid");
            }
        }

        private bool Verify(string phonenumber)
        {
            return NumberLimit(phonenumber);
        }

        public static bool NumberLimit(string phonenumber)
        {
            return phonenumber.Length == 9;
        }
    }
}
