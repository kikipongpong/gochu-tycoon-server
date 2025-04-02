const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = '7439662090:AAGa4BiNyaQAjZKkDbn4ZUdjwHEwAM_n9Kc'; // 봇 토큰
const GAME_URL = 'https://gochu-tycoon-vqow.vercel.app/'; // 게임 iframe URL

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const callbackQuery = req.body.callback_query;
  const message = req.body.message;

  try {
    // 1️⃣ /start 또는 아무 메시지 처리 → 게임 메시지 전송
    if (message && message.chat && message.chat.id) {
      const chatId = message.chat.id;

      // Play 버튼이 있는 게임 메시지 보내기
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendGame`, {
        chat_id: chatId,
        game_short_name: 'GochuTycoon'
      });
    }

    // 2️⃣ 버튼 클릭 후 callback_query 처리 → iframe 링크 전달
    if (callbackQuery) {
      const chatId = callbackQuery.from.id;
      const callbackQueryId = callbackQuery.id;

      // 상태 메시지 전송
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: '서버가 깨어나는 중입니다... 잠시만 기다려 주세요 ⏳'
      });

      // iframe URL 응답
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
        callback_query_id: callbackQueryId,
        url: GAME_URL
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});