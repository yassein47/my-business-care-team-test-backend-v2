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
            prompt: `\n\nHuman: ${transcription}\n\nAssistant:`,
            model: 'claude-2',
            max_tokens_to_sample: 50,
            stop_sequences: ['\n\nHuman:'],
            temperature: 0.7,
        }),
    });
    const data = await response.json();
    return data;
}

}

module.exports = { HTTP };