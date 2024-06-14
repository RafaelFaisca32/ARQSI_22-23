using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects {
    public class RelationTag : IValueObject
    {

        public string RelationTag1 { 
            get;
        }

        protected RelationTag()
        {
        }

        public RelationTag(string relationTag)
        {
            if (Verify(relationTag))
            {
                this.RelationTag1 = relationTag;
            }
            else
            {
                throw new BusinessRuleValidationException("Relation Tag is invalid");
            }

        }

        private bool Verify(string relationTag)
        {
            if (relationTag.Length > 0){
                return true;
            }
            else {
                return false;
            }
        }

    }
}