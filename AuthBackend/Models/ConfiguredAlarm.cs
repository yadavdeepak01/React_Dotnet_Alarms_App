public class ConfiguredAlarm
{
    public int Id { get; set; }
    public string TagName { get; set; }
    public string Description { get; set; }
    public float LimitValue { get; set; }
    public string Unit { get; set; }
    public DateTime Timestamp { get; set; }
}