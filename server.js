// 📁 server.js — 텔레그램 HTML5 게임용 최소 서버 템플릿

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// 👇 여기에 너의 봇 토큰과 게임 URL 입력
const BOT_TOKEN = '7439662090:AAGa4BiNyaQAjZKkDbn4ZUdjwHEwAM_n9Kc';
const GAME_URL = 'https://gochu-tycoon-vqow.vercel.app/';

app.use(bodyParser.json());

// 📌 텔레그램이 webhook으로 호출할 엔드포인트
app.post('/webhook', async (req, res) => {
  const callbackQuery = req.body.callback_query;

  if (callbackQuery) {
    const callbackQueryId = callbackQuery.id;

    // 텔레그램에게 iframe으로 보여줄 URL 전달
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
      callback_query_id: callbackQueryId,
      url: GAME_URL
    });
  }

  res.sendStatus(200); // 응답은 꼭 보내야 함
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});