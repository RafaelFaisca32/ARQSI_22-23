using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ValueObjects
{
    public class TagCloud : IValueObject
    {
        public string Tag
        {
            get;
        }
        public double Percentage
        {
            get;
        }
        
        public TagCloud(string tag, double percentage)
        { 
            this.Tag = tag;
            this.Percentage = percentage;
        }
    }
}