public class Karma
{
    // Positive traits
    public float Trust { get; set; }
    public float Altruism { get; set; }
    public float Compliance { get; set; }
    public float Modesty { get; set; }
    public float Empathy { get; set; }

    // Negative traits (reduce agreeableness)
    public float Critical { get; set; }
    public float Demanding { get; set; }

    // Get raw score (normalized to 0-100 range for avatar use)
    public float GetKarmaScore()
    {
        float positive = Trust + Altruism + Compliance + Modesty + Empathy;
        float negative = Critical + Demanding;

        // Normalize: max positive = 5 traits * 10 = 50
        //            max negative = 2 traits * 10 = 20
        float rawScore = positive - negative;
        float normalized = (rawScore + 20) / 70 * 100;  // Maps -20 to 50 into 0 to 100

        return Math.Clamp(normalized, 0, 100);
    }

    // Optional: Avatar mood or aura type based on karma
    public string GetKarmaAura()
    {
        float score = GetKarmaScore();

        if (score >= 80) return "Radiant";
        if (score >= 60) return "Harmonious";
        if (score >= 40) return "Neutral";
        if (score >= 20) return "Tense";
        return "Dark";
    }

    // Optional: Color or icon indicator for UI/avatar
    public string GetKarmaColor()
    {
        float score = GetKarmaScore();

        if (score >= 80) return "#9CFF9C"; // soft green
        if (score >= 60) return "#CCFFCC"; // mint
        if (score >= 40) return "#FFFFCC"; // light yellow
        if (score >= 20) return "#FFDD99"; // orange
        return "#FF9999";                 // red
    }
}
