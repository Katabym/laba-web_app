# 🤖 Telegram Бот + WebApp для продажи цифровых товаров

Многофункциональный Telegram бот с интегрированным WebApp для продажи лабораторных работ, курсовых и проектов.

## 📋 Содержание

- [Возможности](#возможности)
- [Архитектура](#архитектура)
- [Установка и настройка](#установка-и-настройка)
- [Настройка Telegram бота](#настройка-telegram-бота)
- [Настройка YooMoney](#настройка-yoomoney)
- [Развертывание WebApp](#развертывание-webapp)
- [Использование](#использование)
- [API Endpoints](#api-endpoints)

## ✨ Возможности

### Бот
- ✅ Приветственное сообщение с лицензионным соглашением
- ✅ Кнопка принятия соглашения
- ✅ Кнопка открытия WebApp
- ✅ Автоматическая отправка файлов после оплаты
- ✅ Проверка статуса платежа YooMoney

### WebApp
- 📱 3 страницы: Категории → Товары → Детали товара
- 🎨 Современный адаптивный дизайн
- 📷 Генерация QR-кода для оплаты
- 🔗 Прямая ссылка на оплату YooMoney
- 💫 Анимации и haptic feedback

## 🏗 Архитектура

```
project/
├── bot/
│   ├── bot.py              # Точка входа бота
│   ├── handlers.py         # Обработчики команд
│   ├── payment.py          # Интеграция YooMoney
│   ├── config.py           # Конфигурация
│   └── requirements.txt    # Python зависимости
├── webapp/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── pages/          # Страницы приложения
│   │   ├── context/        # Telegram Context
│   │   ├── data/           # Данные каталога
│   │   └── types/          # TypeScript типы
│   └── dist/               # Сборка для деплоя
└── README.md
```

## 🚀 Установка и настройка

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/yourusername/study-market-bot.git
cd study-market-bot
```

### 2. Настройка Python-бота

```bash
# Создайте виртуальное окружение
python -m venv venv

# Активируйте
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Установите зависимости
pip install -r bot/requirements.txt
```

### 3. Настройка WebApp

```bash
cd webapp
npm install
npm run build
```

## 🤖 Настройка Telegram бота

### Создание бота через @BotFather

1. Напишите [@BotFather](https://t.me/botfather)
2. Отправьте `/newbot`
3. Укажите имя бота (например: "Study Market")
4. Укажите username (например: `study_market_bot`)
5. **Сохраните полученный токен**

### Настройка WebApp в BotFather

```
/mybots → Выберите бот → Bot Settings → Menu Button → Configure menu button
```

- **Button text**: 🛍 Каталог
- **WebApp URL**: Ваш URL (например: `https://yourusername.github.io/study-market-bot/`)

Или через команду:
```
/setmenubutton
```

### Настройка переменных окружения

Создайте файл `bot/.env`:

```env
BOT_TOKEN=your_telegram_bot_token_here
WEBAPP_URL=https://yourusername.github.io/study-market-bot/
LICENSE_URL=https://telegra.ph/License-Agreement-01-01
YOOMONEY_WALLET=410015910066269
YOOMONEY_TOKEN=your_yoomoney_access_token
```

## 💳 Настройка YooMoney

### 1. Создайте кошелек

- Зарегистрируйтесь на [yoomoney.ru](https://yoomoney.ru)
- Получите номер кошелька (начинается с 4100...)

### 2. Получите Access Token

```bash
curl -X POST \
  https://yoomoney.ru/oauth/authorize \
  -d 'client_id=YOUR_CLIENT_ID' \
  -d 'response_type=code' \
  -d 'redirect_uri=YOUR_REDIRECT_URI' \
  -d 'scope=account-info operation-history operation-details'
```

Подробнее: [YooMoney API Docs](https://yoomoney.ru/docs/wallet)

## 🌐 Развертывание WebApp

### GitHub Pages (Бесплатно)

1. Создайте репозиторий на GitHub
2. Загрузите код WebApp
3. Включите GitHub Pages в настройках репозитория
4. Укажите source: `main` branch, `/docs` folder или GitHub Actions

### Альтернативные варианты

- **Vercel**: `vercel --prod`
- **Netlify**: Подключите GitHub репозиторий
- **Firebase Hosting**: `firebase deploy`

## 📖 Использование

### Запуск бота локально

```bash
cd bot
python bot.py
```

### Запуск WebApp для разработки

```bash
cd webapp
npm run dev
```

### Продакшен сборка

```bash
cd webapp
npm run build
# Содержимое dist/ загрузите на хостинг
```

## 🔌 API Endpoints

### Создание платежа

```http
POST /api/create-payment
Content-Type: application/json

{
  "amount": 150,
  "product_id": "lab-cpp-1",
  "user_id": 123456789
}

Response:
{
  "payment_url": "https://yoomoney.ru/quickpay/confirm?...",
  "label": "order_123456789_1234567890_lab-cpp-1",
  "qr_code": "base64_encoded_qr"
}
```

### Проверка статуса платежа

```http
GET /api/check-payment?label=order_123456789_1234567890_lab-cpp-1

Response:
{
  "paid": true,
  "amount": 150,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Вебхук для уведомлений (опционально)

```http
POST /api/webhook/yoomoney
Content-Type: application/x-www-form-urlencoded

# YooMoney отправляет уведомление о платеже
```

## 📝 Добавление новых товаров

Отредактируйте `webapp/src/data/catalog.ts`:

```typescript
export const products: Product[] = [
  {
    id: 'your-product-id',
    categoryId: 'labs',
    name: 'Название товара',
    description: 'Описание товара',
    price: 200,
    image: 'https://your-image-url.jpg',
    filePath: 'D:\\Projects\\...',
    fileType: 'zip'
  },
  // ...
];
```

## 🔒 Безопасность

- ⚠️ Никогда не коммитьте `.env` файл в публичный репозиторий
- ⚠️ Используйте HTTPS для WebApp
- ⚠️ Проверяйте подпись `hash` от Telegram WebApp в продакшене
- ⚠️ Храните YooMoney токен в безопасности

## 🐛 Отладка

### Проблемы с WebApp

1. Откройте WebApp в браузере: `http://localhost:5173`
2. Откройте DevTools (F12)
3. Проверьте консоль на ошибки

### Проблемы с оплатой

```bash
# Проверьте токен YooMoney
curl https://yoomoney.ru/api/account-info \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📱 Тестирование

1. Отправьте `/start` боту
2. Нажмите "Принять соглашение"
3. Нажмите "🛍 Каталог"
4. Выберите товар и нажмите "Купить"
5. Оплатите через QR-код или ссылку
6. Получите файл автоматически

## 🤝 Поддержка

По вопросам и предложениям:
- Telegram: [@your_username](https://t.me/your_username)
- Email: your@email.com

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE)

---

⭐ Не забудьте поставить звезду, если проект вам помог!
