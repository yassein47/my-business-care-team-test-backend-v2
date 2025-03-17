# Audio Transcription and Analysis API /Backend/  (My Business Care Team Test)

This project provides an API for transcribing audio files and analyzing the transcribed text using external AI services.

## Features
- **Audio Transcription:** Converts spoken words in an audio file to text using Deepgram API.
- **Text Analysis:** Analyzes the transcribed text using Anthropic AI API.
- **RESTful API:** Simple endpoints for uploading audio and processing text.


---

## Live Demo
[Live Demo](https://distinctive-faunie-my-bisuness-care-team-frontend-274b3477.koyeb.app/)


---


## Prerequisites
Before running this project, ensure you have the following:
- Node.js installed
- Deepgram API key
- Anthropic API key

---


## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yassein47/my-business-care-team-backend.git
   cd my-business-care-team-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your API keys:
   ```env
   DEEPGRAM_API_KEY=your-deepgram-key
   ANTHROPIC_API_KEY=your-anthropic-key
   ```

---


## Usage
### Start the server
```sh
node index.js
```

---


### API Endpoints
#### 1. Transcribe Audio
**Endpoint:** `POST /transcribe`
- **Description:** Uploads an audio file (`.wav` format) and returns its transcription.
- **Request:**
  - `multipart/form-data`
  - `audio`: The audio file.
- **Response:**
  ```json
  {
    "transcription": "Hello world."
  }
  ```

#### 2. Analyze Text
**Endpoint:** `POST /analyze`
- **Description:** Analyzes a given text and provides AI-generated insights.
- **Request:**
  ```json
  {
    "text": "Sample transcription text."
  }
  ```
- **Response:**
  ```json
  {
    "analysis": "This text appears to be about..."
  }
  ```

---


## Project Structure
```
├── src/
│   ├── http.js         # Handles HTTP requests to APIs
│   ├── url.js          # Stores API URLs
├── uploads/            # Temporary storage for uploaded audio files
├── index.js            # Main server file
├── .env                # Environment variables
├── package.json        # Project dependencies
```

---


## Dependencies
- `express`
- `multer`
- `cors`
- `dotenv`
- `axios`

---


## License
This project is licensed under the MIT License.

---

## Writer
node.js with love..

---

# Yassein



# Yassein

