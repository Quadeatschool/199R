// See https://aka.ms/new-console-template for more information
using System;

class Program
{
    public static void Main(string[] args)
    {
        // Create a Karma object and set trait values
        Karma karma = new Karma
        {
            Trust = 8,
            Altruism = 7,
            Compliance = 6,
            Modesty = 5,
            Empathy = 9,
            Critical = 2,
            Demanding = 1

            
        };

        float score = karma.GetKarmaScore();
        string aura = karma.GetKarmaAura();
        string color = karma.GetKarmaColor();

        Console.WriteLine($"Karma Score: {score:F2}");
        Console.WriteLine($"Karma Aura: {aura}");
        Console.WriteLine($"Karma Color: {color}");
    }
}
