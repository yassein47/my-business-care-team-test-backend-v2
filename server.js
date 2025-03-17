const { HTTP } = require("./src/http");
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const http = new HTTP;

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/transcribe", upload.single("audio"), async (req, res) => {
  if (!req.file || req.file.mimetype !== "audio/wav") {
    return res.status(400).json({ error: "Invalid file type" });
  }

  try {
    const audioFilePath = req.file.path;
    const audioBuffer = fs.readFileSync(audioFilePath);

    const response = await http.soundToText(audioBuffer);
  
    fs.unlinkSync(audioFilePath); 

    res.json({ transcription: response.data.results.channels[0].alternatives[0].transcript });
  } catch (error) {
    //console.error("Error transcribing audio:", error);
    res.status(506).json({ error: "Transcription failed" });
  }
});




app.post("/analyze", async (req, res) => {
  try {
    const  transcription  = req.body.text;
    if (!transcription) {
      return res.status(400).json({ error: "No transcription provided" });
    }
    const response = await http.analyze(transcription);
    //console.log(response)
    res.json({ analysis: response });
  } catch (error) {
    //console.error("Error analyzing text:", error);
    res.status(500).json({ error: "Analysis failed", details: error.message });
  }
});



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
