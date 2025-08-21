export async function onRequestGet(context) {
  try {
    const apiKey = context.env.GEMINI_API_KEY; // Access the secret key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const prompt = "Provide a short, uplifting, one-sentence mental wellness tip for today. Be creative and encouraging.";

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const tip = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ tip: tip.trim() }), {
        headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response('Could not fetch wellness tip: ' + error.message, { status: 500 });
  }
}