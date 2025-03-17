const { URL } = require("./url");

require("dotenv").config();
const axios = require("axios");
const url =  new URL;

class HTTP{
 soundToText = async (audioBuffer) =>{
    return await axios.post(url.deepgramURL, audioBuffer, {
        headers: {
            "Authorization": `Token ${process.env.DEEPGRAM_API_KEY}`,
            "Content-Type": "audio/wav",
        },
        });
}


analyze = async (transcription) => {
    const response = await fetch(url.anthropicURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: 'claude-2',
            max_tokens: 100,
            temperature: 0.7,
            messages: [
                { role: "user", content: transcription }
            ]
        }),
    });
    const data = await response.json();
    return data.content[0].text;
}

}

module.exports = { HTTP };