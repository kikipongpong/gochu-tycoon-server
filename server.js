// 📁 server.js — 텔레그램 HTML5 게임용 서버 (자동 메시지 전송 포함)

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = '7439662090:AAGa4BiNyaQAjZKkDbn4ZUdjwHEwAM_n9Kc';
const GAME_SHORT_NAME = 'GochuTycoon';

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const callbackQuery = req.body.callback_query;
  const message = req.body.message;

  // 버튼 눌렀을 때 iframe URL 응답
  if (callbackQuery) {
    const callbackQueryId = callbackQuery.id;
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
      callback_query_id: callbackQueryId,
      url: 'https://gochu-tycoon-vqow.vercel.app/'
    });
  }

  // 누군가 채팅방에 들어오면 자동으로 게임 메시지 전송
  if (message && message.chat && message.chat.type === "private") {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendGame`, {
      chat_id: message.chat.id,
      game_short_name: GAME_SHORT_NAME
    });
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});