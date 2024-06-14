using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects {
    public class Answer : IValueObject
    {

        public string Answer1 { 
            get;
        }

        

        public Answer(string answer)
        {
            if (Verify(answer))
            {
                this.Answer1 = answer;
            }
            else
            {
                throw new BusinessRuleValidationException("Answer is invalid");
            }

        }

        protected Answer()
        {
        }

        private bool Verify(string answer)
        {
            if (answer.Length > 0){
                return true;
            }
            else {
                return false;
            }
        }

    }
}