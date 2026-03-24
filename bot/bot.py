import logging
import sys
from handlers import dp, bot
from config import WEBAPP_URL

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("bot.log", encoding='utf-8'),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)


async def on_startup():
    """Действия при запуске бота"""
    logger.info("Bot started")
    logger.info(f"WebApp URL: {WEBAPP_URL}")
    
    # Установка команд бота
    from aiogram.types import BotCommand
    await bot.set_my_commands([
        BotCommand(command="start", description="Запустить бота"),
        BotCommand(command="help", description="Помощь"),
        BotCommand(command="status", description="Статус заказа"),
    ])
    logger.info("Bot commands set")


async def on_shutdown():
    """Действия при остановке бота"""
    logger.info("Bot stopped")
    await bot.session.close()


async def main():
    """Главная функция запуска бота"""
    # Регистрируем хуки
    dp.startup.register(on_startup)
    dp.shutdown.register(on_shutdown)
    
    logger.info("Starting polling...")
    
    # Запуск бота
    try:
        await dp.start_polling(bot, skip_updates=True)
    except (KeyboardInterrupt, SystemExit):
        logger.info("Bot stopped by user")
    except Exception as e:
        logger.error(f"Error in main loop: {e}", exc_info=True)
        raise


if __name__ == "__main__":
    import asyncio
    
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Bot stopped")
