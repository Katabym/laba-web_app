import os
from dotenv import load_dotenv

load_dotenv()

# Telegram Bot
BOT_TOKEN = os.getenv('BOT_TOKEN')
if not BOT_TOKEN:
    raise ValueError("BOT_TOKEN не установлен в .env файле")

# WebApp
WEBAPP_URL = os.getenv('WEBAPP_URL', 'https://yourusername.github.io/study-market-webapp/')
WEBAPP_HOST = os.getenv('WEBAPP_HOST', 'localhost')
WEBAPP_PORT = int(os.getenv('WEBAPP_PORT', 3000))

# License Agreement
LICENSE_URL = os.getenv('LICENSE_URL', 'https://telegra.ph/License-Agreement-01-01')

# YooMoney
YOOMONEY_WALLET = os.getenv('YOOMONEY_WALLET', '410015910066269')
YOOMONEY_TOKEN = os.getenv('YOOMONEY_TOKEN', '')

# Files storage
FILES_BASE_PATH = os.getenv('FILES_BASE_PATH', 'D:\\Projects\\Labo_mar\\materia')

# Payment settings
PAYMENT_CHECK_INTERVAL = 30  # секунды
PAYMENT_MAX_WAIT_TIME = 600  # 10 минут в секундах

# Admin IDs (список ID администраторов)
ADMIN_IDS = [int(x) for x in os.getenv('ADMIN_IDS', '').split(',') if x]

# Database
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///bot.db')
