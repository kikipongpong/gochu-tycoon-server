// 📁 server.js — /start 명령어 자동 응답 + callback_query 처리

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = '7439662090:AAGa4BiNyaQAjZKkDbn4ZUdjwHEwAM_n9Kc'; // 👈 텔레그램 봇 토큰
const GAME_URL = 'https://gochu-tycoon-vqow.vercel.app/'; // 👈 iframe에서 실행될 게임 URL
const GAME_SHORT_NAME = 'GochuTycoon'; // 👈 BotFather에서 등록한 게임 short name

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const body = req.body;

  // 1️⃣ 사용자가 "/start" 입력 시 게임 메시지 전송
  if (body.message && body.message.text === '/start') {
    const chatId = body.message.chat.id;

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendGame`, {
      chat_id: chatId,
      game_short_name: GAME_SHORT_NAME,
    });
  }

  // 2️⃣ 버튼 클릭 시 iframe URL 응답
  if (body.callback_query) {
    const callbackQueryId = body.callback_query.id;

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
      callback_query_id: callbackQueryId,
      url: GAME_URL,
    });
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});