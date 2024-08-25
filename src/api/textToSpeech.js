import axios from 'axios';

const API_KEY = process.env.REACT_APP_GOOGLE_TTS_API_KEY;
const BASE_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';

export const getAudio = async (text) => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        input: { text },
        voice: { languageCode: 'en-US', name: 'en-US-Wavenet-D' },
        audioConfig: { audioEncoding: 'MP3' },
      },
      { headers: { 'X-Goog-Api-Key': API_KEY } }
    );

    const audioContent = response.data.audioContent;
    const audioBlob = new Blob([new Uint8Array(atob(audioContent).split('').map(c => c.charCodeAt(0)))], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(audioBlob);

    return audioUrl;
  } catch (error) {
    console.error('Error fetching audio:', error);
    return null;
  }
};
