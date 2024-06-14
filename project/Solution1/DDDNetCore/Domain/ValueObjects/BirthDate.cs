using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects
{
    public class BirthDate : IValueObject
    {

        public string birthD
        {
            get;
        }

        protected BirthDate() { }

        public BirthDate(string birthDate)
        {
            if (Verify(birthDate))
            {
                this.birthD = birthDate;
            }
            else
            {
                throw new BusinessRuleValidationException("BirthDate is invalid");
            }
        }

        private bool Verify(string birthDate)
        {
            return dateValidate(birthDate);
        }

        public static bool dateValidate(string birthDate)
        {

            DateTime dt;
            if (DateTime.TryParse(birthDate, out dt) == true)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
    }

}