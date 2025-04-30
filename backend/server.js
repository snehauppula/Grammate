const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyCImlZVR_8QCYQ-dm56h7mMxhytBubW1MI');

// Routes
app.post('/api/check-grammar', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    console.log('Received text:', text);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Single prompt to get both correction and score
    const prompt = `Analyze this text for grammar: "${text}"
    
    Please provide:
    1. The corrected version
    2. A score from 0-100
    3. A brief explanation of the corrections
    
    Format your response exactly like this:
    Corrected: [corrected text]
    Score: [number]
    Explanation: [explanation]`;
    
    console.log('Sending request to Gemini API...');
    const result = await model.generateContent({
      contents: [{
        parts: [{ text: prompt }]
      }]
    });
    
    const response = await result.response;
    const responseText = response.text();
    console.log('Received response:', responseText);

    // Parse the response
    const correctedMatch = responseText.match(/Corrected: (.*?)(?:\n|$)/i);
    const scoreMatch = responseText.match(/Score: (\d+)/i);
    const explanationMatch = responseText.match(/Explanation: (.*?)(?:\n|$)/i);

    const correctedText = correctedMatch ? correctedMatch[1].trim() : text;
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;
    const explanation = explanationMatch ? explanationMatch[1].trim() : 'No explanation provided';

    const formattedResponse = {
      originalText: text,
      correctedText: correctedText,
      grammarScore: score,
      explanation: explanation
    };

    console.log('Sending formatted response:', formattedResponse);
    res.json(formattedResponse);
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      status: error.status,
      statusText: error.statusText,
      errorDetails: error.errorDetails
    });
    res.status(500).json({ 
      error: 'Failed to process the text',
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 