using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects {
    public class Date : IValueObject
    {

        public string Date1 { 
            get;
        }

        public Date(string date)
        {
            if (Verify(date))
            {
                this.Date1 = date;
            }
            else
            {
                throw new BusinessRuleValidationException("Date is invalid");
            }

        }

        protected Date()
        {
        }

        private bool Verify(string date)
        {
            if (date.Length > 0){
                return true;
            }
            else {
                return false;
            }
        }

    }
}