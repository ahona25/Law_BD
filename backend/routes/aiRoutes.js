import express from 'express';
import { processAiChat } from '../services/aiService.js';

const router = express.Router();

/**
 * POST /api/ai/chat
 * Analyzes legal incident, grounds in BD law, invokes Gemini/OpenAI (or grounded engine),
 * and recommends specialized advocates.
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [], language = 'en' } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message cannot be empty' });
    }

    const result = await processAiChat({
      message: message.trim(),
      conversationHistory,
      language
    });

    res.json(result);
  } catch (err) {
    console.error('AI chat processing error:', err);
    res.status(500).json({
      success: false,
      error: 'AI Assistant processing failed',
      details: err.message
    });
  }
});

/**
 * GET /api/ai/status
 * Returns current AI assistant readiness and active provider (without revealing sensitive keys)
 */
router.get('/status', (req, res) => {
  const hasGemini = Boolean(process.env.GEMINI_API_KEY?.trim());
  const hasOpenAi = Boolean(process.env.OPENAI_API_KEY?.trim());
  const configuredProvider = process.env.AI_PROVIDER || 'auto';

  let activeProvider = 'Grounded BD Statutory Engine';
  if (hasGemini && (configuredProvider === 'gemini' || configuredProvider === 'auto')) {
    activeProvider = `Google Gemini (${process.env.GEMINI_MODEL || 'gemini-1.5-flash'})`;
  } else if (hasOpenAi && (configuredProvider === 'openai' || configuredProvider === 'auto')) {
    activeProvider = `OpenAI (${process.env.OPENAI_MODEL || 'gpt-4o-mini'})`;
  }

  res.json({
    success: true,
    status: 'online',
    hasGemini,
    hasOpenAi,
    activeProvider,
    geminiModel: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    openaiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini'
  });
});

export default router;
