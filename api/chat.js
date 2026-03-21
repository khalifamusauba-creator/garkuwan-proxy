export default async function handler(req, res) {
  const { prompt, image, mimeType } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    let contents = [];
    
    if (image) {
      // Idan akwai hoto
      contents.push({
        parts: [
          { text: "Sunanka Garkuwan AI. Imrana Umar Abubakar ne ya kera ka. Ka duba wannan hoton ka amsa tambayar: " + (prompt || "Menene wannan?") },
          { inline_data: { mime_type: mimeType, data: image } }
        ]
      });
    } else {
      // Idan rubutu ne kawai
      contents.push({
        parts: [{ text: "Sunanka Garkuwan AI. Imrana Umar Abubakar ne ya kera ka. Tambaya: " + prompt }]
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    const data = await response.json();
    const reply = data.candidates ? data.candidates[0].content.parts[0].text : "Ina neman gafara, ban samu damar karanta wannan ba.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Matsalar server ce." });
  }
}
