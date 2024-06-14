using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects
{
    public class ConnectionStrength : IValueObject
    {

        public string Number
        {
            get;
        }

        protected ConnectionStrength(){}

        public ConnectionStrength(string connectionStrength)
        {
            if (Verify(connectionStrength))
            {
                this.Number = connectionStrength;
            }
            else
            {
                throw new BusinessRuleValidationException("Connection Strength is invalid");
            }
        }

        private bool Verify(string connectionStrength)
        {
            return NumberLimit(connectionStrength);
        }

        public static bool NumberLimit(string connectionStrength)
        {
            return (connectionStrength.Length <= 100 && connectionStrength.Length >=0);
        }
    }
}