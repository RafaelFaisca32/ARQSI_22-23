using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects {
    public class Tag : IValueObject
    {

        public string Tag1 { 
            get;
        }

        protected Tag(){}

        public Tag(string tag)
        {
            if (Verify(tag))
            {
                this.Tag1 = tag;
            }
            else
            {
                throw new BusinessRuleValidationException("Tag is invalid");
            }

        }

        private bool Verify(string tag)
        {
            if (tag.Length is > 0 and < 255){
                return true;
            }
            else {
                return false;
            }
        }

    }
}
