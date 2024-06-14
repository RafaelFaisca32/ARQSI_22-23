using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects
{
    public class RelationshipStrength : IValueObject
    {

        public string Number
        {
            get;
        }

        protected RelationshipStrength(){}

        public RelationshipStrength(string relationshipStrength)
        {
            if (Verify(relationshipStrength))
            {
                this.Number = relationshipStrength;
            }
            else
            {
                throw new BusinessRuleValidationException("Relationship Strength is invalid");
            }
        }

        private bool Verify(string relationshipStrength)
        {
            return NumberLimit(relationshipStrength);
        }

        public static bool NumberLimit(string relationshipStrength)
        {
            return (relationshipStrength.Length <= 100 && relationshipStrength.Length >=0);
        }
    }
}