const { HTTP } = require("./src/http");
const { DB_Manager } = require("./src/db_manager");

require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const http = new HTTP;
const DB = new DB_Manager;

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
    const transcript = response.data.results.channels[0].alternatives[0].transcript;
    DB.saveTranscript(transcript, (err, id) => {
        if (err) return res.status(500).json({ error: "Failed to save transcript" });
        res.json({ id: id, transcription: transcript });
    });

    fs.unlinkSync(audioFilePath);
  } catch (error) {
    res.status(506).json({ error: "Transcription failed" });
  }
});


app.get("/transcripts", (req, res) => {
  DB.getAllTranscripts((err, transcripts) => {
      if (err) {
          return res.status(500).json({ error: "Failed to fetch transcripts" });
      }
      res.json(transcripts);
  });
});

app.post("/analyze", async (req, res) => {
  try {
    //const  transcription  = req.body.text;
    const  transcription  = await DB.getTranscriptById(req.body.id);
    if (!transcription) {
      return res.status(502).json({ error: "No transcription provided" });
    }
    const response = await http.analyze(transcription);
    DB.updateAnalyze(req.body.id, response, (err, changes) => {
      if (err) {
        res.status(501).json({ error: "Save DB Analysis failed", details: err });
      } else {
          res.json({ analysis: response , n:changes});
      }
  });
    
  } catch (error) {
    res.status(500).json({ error: "Analysis failed", details: error.message });
  }
});


app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  DB.deleteRecord(id,(err, changes) => {
    if (err) {
      res.status(501).json({ error: "failed Delete", details: err });
    } else {
        res.json({ message: changes });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
