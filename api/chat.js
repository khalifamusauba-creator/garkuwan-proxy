export default async function handler(req, res) {
  // Wannan zai karbi sakon daga App dinka
  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ text: "Sunanka Garkuwan AI. Imrana Umar Abubakar ne ya kera ka. Ka amsa wannan tambayar: " + prompt }] 
        }]
      })
    });

    const data = await response.json();
    const reply = data.candidates ? data.candidates[0].content.parts[0].text : "Ina neman gafara, akwai matsala wajen samun amsa.";
    
    // Maido da amsar zuwa App din
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Matsalar sadarwa ce ta faru." });
  }
}
