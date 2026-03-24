import os
import asyncio
import logging
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import Command
from aiogram.types import FSInputFile, WebAppInfo, MenuButtonWebApp
from aiogram.utils.keyboard import ReplyKeyboardBuilder, InlineKeyboardBuilder
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.storage.memory import MemoryStorage

from config import BOT_TOKEN, WEBAPP_URL, LICENSE_URL, PAYMENT_CHECK_INTERVAL, PAYMENT_MAX_WAIT_TIME
from payment import create_quickpay, is_payment_successful, register_payment
from database import (
    add_user, get_user, set_license_agreed, has_agreed_to_license,
    create_order, get_order_by_label, mark_order_paid, add_sent_file
)

logger = logging.getLogger(__name__)

# Инициализация бота и диспетчера
storage = MemoryStorage()
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(storage=storage)


# Состояния FSM
class Form(StatesGroup):
    WAITING_LICENSE_ACCEPT = State()
    WAITING_PAYMENT = State()


# Словарь с данными о файлах (в реальном проекте можно вынести в БД)
FILES = {
    "lab-cpp-1": {
        "name": "Лаба C++ #9",
        "path": "D:\\Projects\\Labo_mar\\materia\\Sourse.cpp",
        "caption": "✅ Ваша лабораторная работа на C++"
    },
    "lab-py-1": {
        "name": "Лаба Python #5",
        "path": "D:\\Projects\\Labo_mar\\materia\\lab_python.zip",
        "caption": "✅ Ваша лабораторная работа на Python"
    },
    "lab-java-1": {
        "name": "Лаба Java #3",
        "path": "D:\\Projects\\Labo_mar\\materia\\lab_java.rar",
        "caption": "✅ Ваша лабораторная работа на Java"
    },
    "course-db-1": {
        "name": "Курсовая Базы Данных",
        "path": "D:\\Projects\\Labo_mar\\materia\\course_db.rar",
        "caption": "✅ Ваша курсовая работа по БД"
    },
    "course-web-1": {
        "name": "Курсовая Веб-разработка",
        "path": "D:\\Projects\\Labo_mar\\materia\\course_web.zip",
        "caption": "✅ Ваш курсовой проект"
    },
    "proj-bot-1": {
        "name": "Telegram Bot",
        "path": "D:\\Projects\\Labo_mar\\materia\\telegram_bot.zip",
        "caption": "✅ Шаблон Telegram бота"
    },
    "proj-parser-1": {
        "name": "Парсер данных",
        "path": "D:\\Projects\\Labo_mar\\materia\\parser.zip",
        "caption": "✅ Готовый парсер данных"
    },
    "doc-manual-1": {
        "name": "Инструкция по запуску",
        "path": "D:\\Projects\\Labo_mar\\materia\\Инструкция запуска.docx",
        "caption": "✅ Инструкция по запуску"
    },
    "doc-report-1": {
        "name": "Шаблон отчета",
        "path": "D:\\Projects\\Labo_mar\\materia\\report_template.docx",
        "caption": "✅ Шаблон отчета"
    }
}


# Вспомогательная функция для установки WebApp кнопки
async def set_webapp_button():
    """Устанавливает кнопку меню WebApp"""
    await bot.set_chat_menu_button(
        menu_button=MenuButtonWebApp(
            text="🛍 Каталог",
            web_app=WebAppInfo(url=WEBAPP_URL)
        )
    )


@dp.message(Command("start"))
async def cmd_start(message: types.Message, state: FSMContext):
    """Обработчик команды /start - показывает приветствие и лицензионное соглашение"""
    user = message.from_user
    
    # Добавляем пользователя в БД
    add_user(
        user_id=user.id,
        username=user.username or "",
        first_name=user.first_name or "",
        last_name=user.last_name or "",
        language_code=user.language_code or "ru"
    )
    
    # Проверяем принял ли пользователь лицензионное соглашение
    if has_agreed_to_license(user.id):
        # Если да - сразу показываем кнопку открытия приложения
        await show_main_menu(message, state)
        return
    
    # Показываем лицензионное соглашение
    builder = InlineKeyboardBuilder()
    builder.button(
        text="📋 Прочитать соглашение",
        url=LICENSE_URL
    )
    builder.button(
        text="✅ Принять соглашение",
        callback_data="accept_license"
    )
    builder.adjust(1)
    
    welcome_text = f"""
👋 <b>Привет, {user.first_name}!</b>

Добро пожаловать в <b>StudyMarket</b> - магазин готовых лабораторных работ, курсовых и проектов!

📚 <b>Что у нас есть:</b>
• Лабораторные работы (C++, Python, Java)
• Курсовые проекты
• Готовые приложения и боты
• Шаблоны документов

⚠️ <b>Перед использованием необходимо принять лицензионное соглашение.</b>

Нажмите кнопку ниже, чтобы ознакомиться с условиями:
    """
    
    await message.answer(
        welcome_text,
        reply_markup=builder.as_markup(),
        parse_mode="HTML"
    )
    
    await state.set_state(Form.WAITING_LICENSE_ACCEPT)


@dp.callback_query(F.data == "accept_license")
async def process_license_accept(callback: types.CallbackQuery, state: FSMContext):
    """Обработчик принятия лицензионного соглашения"""
    user_id = callback.from_user.id
    
    # Сохраняем в БД
    set_license_agreed(user_id)
    
    await callback.answer("✅ Соглашение принято!")
    await callback.message.delete()
    
    # Показываем главное меню
    await show_main_menu(callback.message, state)


async def show_main_menu(message: types.Message, state: FSMContext):
    """Показывает главное меню с кнопкой WebApp"""
    builder = ReplyKeyboardBuilder()
    builder.button(
        text="🛍 Открыть каталог",
        web_app=WebAppInfo(url=WEBAPP_URL)
    )
    builder.adjust(1)
    
    menu_text = """
✅ <b>Отлично! Теперь вы можете пользоваться каталогом.</b>

Нажмите кнопку ниже, чтобы открыть приложение:

💡 <b>Совет:</b> Вы также можете открыть каталог через кнопку меню (≡) внизу экрана.
    """
    
    await message.answer(
        menu_text,
        reply_markup=builder.as_markup(resize_keyboard=True),
        parse_mode="HTML"
    )
    
    # Устанавливаем кнопку меню
    await set_webapp_button()
    
    await state.clear()


@dp.message(F.web_app_data)
async def process_webapp_data(message: types.Message, state: FSMContext):
    """Обработчик данных от WebApp"""
    try:
        import json
        data = json.loads(message.web_app_data.data)
        
        action = data.get('action')
        product_id = data.get('product_id')
        
        if action == 'buy' and product_id:
            await process_purchase(message, product_id, state)
            
    except Exception as e:
        logger.error(f"Error processing webapp data: {e}")
        await message.answer("❌ Произошла ошибка. Попробуйте снова.")


async def process_purchase(message: types.Message, product_id: str, state: FSMContext):
    """Обрабатывает покупку товара"""
    user_id = message.from_user.id
    
    if product_id not in FILES:
        await message.answer("❌ Товар не найден.")
        return
    
    file_data = FILES[product_id]
    
    # Генерируем уникальный label для платежа
    payment_label = f"order_{user_id}_{int(asyncio.get_event_loop().time())}_{product_id}"
    
    # Создаем заказ в БД
    order_id = create_order(
        user_id=user_id,
        product_id=product_id,
        product_name=file_data['name'],
        amount=150,  # Цена товара (можно вынести в конфиг)
        payment_label=payment_label,
        file_path=file_data['path']
    )
    
    # Регистрируем платеж
    register_payment(payment_label, user_id, product_id, file_data['path'])
    
    # Создаем ссылку на оплату
    payment_url = create_quickpay(
        label=payment_label,
        amount=150,
        description=f"Оплата: {file_data['name']}"
    )
    
    # Отправляем информацию об оплате
    builder = InlineKeyboardBuilder()
    builder.button(
        text="💳 Перейти к оплате",
        url=payment_url
    )
    builder.adjust(1)
    
    await message.answer(
        f"""
🛒 <b>Оформление заказа</b>

📦 <b>Товар:</b> {file_data['name']}
💰 <b>Сумма к оплате:</b> 150 ₽

🔽 Нажмите кнопку ниже для оплаты:

⏱ <i>После оплаты файл будет отправлен автоматически.</i>
        """,
        reply_markup=builder.as_markup(),
        parse_mode="HTML"
    )
    
    # Запускаем проверку платежа
    await state.set_state(Form.WAITING_PAYMENT)
    asyncio.create_task(
        check_payment_and_send_file(
            user_id=user_id,
            payment_label=payment_label,
            file_data=file_data,
            state=state
        )
    )


async def check_payment_and_send_file(user_id: int, payment_label: str, 
                                     file_data: dict, state: FSMContext):
    """Проверяет статус платежа и отправляет файл после оплаты"""
    elapsed_time = 0
    check_interval = PAYMENT_CHECK_INTERVAL
    max_wait_time = PAYMENT_MAX_WAIT_TIME
    
    logger.info(f"Started payment check for {payment_label}")
    
    while elapsed_time < max_wait_time:
        # Проверяем статус платежа
        if is_payment_successful(payment_label):
            try:
                # Отмечаем заказ как оплаченный
                mark_order_paid(payment_label)
                
                # Отправляем файл
                file = FSInputFile(path=file_data['path'])
                await bot.send_document(
                    chat_id=user_id,
                    document=file,
                    caption=f"""
{file_data['caption']}

🎉 <b>Спасибо за покупку!</b>

Если у вас есть вопросы, напишите нам.
                    """,
                    parse_mode="HTML"
                )
                
                # Записываем в БД
                order = get_order_by_label(payment_label)
                if order:
                    add_sent_file(order['order_id'], user_id, file_data['path'])
                
                await state.clear()
                logger.info(f"Payment {payment_label} confirmed, file sent to {user_id}")
                return
                
            except Exception as e:
                logger.error(f"Error sending file: {e}")
                await bot.send_message(
                    user_id,
                    "❌ Произошла ошибка при отправке файла. Обратитесь в поддержку."
                )
                return
        
        # Ждем перед следующей проверкой
        await asyncio.sleep(check_interval)
        elapsed_time += check_interval
        
        # Отправляем напоминание каждые 2 минуты
        if elapsed_time % 120 == 0 and elapsed_time < max_wait_time:
            remaining = (max_wait_time - elapsed_time) // 60
            await bot.send_message(
                user_id,
                f"⏳ Ожидаем подтверждения платежа...\n"
                f"Осталось времени: {remaining} мин.\n\n"
                f"Если вы уже оплатили, подождите немного."
            )
    
    # Время ожидания истекло
    await bot.send_message(
        user_id,
        "⏰ Время ожидания платежа истекло.\n\n"
        "Если вы совершили оплату, но не получили файл, "
        "обратитесь в поддержку с чеком об оплате."
    )
    await state.clear()
    logger.info(f"Payment {payment_label} timed out")


@dp.message(Command("help"))
async def cmd_help(message: types.Message):
    """Обработчик команды /help"""
    help_text = """
📖 <b>Справка по боту</b>

<b>Как купить товар:</b>
1. Нажмите "🛍 Открыть каталог"
2. Выберите категорию
3. Выберите товар
4. Нажмите "Купить"
5. Оплатите через YooMoney
6. Получите файл автоматически

<b>Команды:</b>
/start - Начать заново
/help - Показать эту справку
/status - Проверить статус заказа

<b>Поддержка:</b>
@support_username
    """
    await message.answer(help_text, parse_mode="HTML")


@dp.message(Command("status"))
async def cmd_status(message: types.Message):
    """Проверка статуса последнего заказа"""
    # Здесь можно добавить логику проверки статуса
    await message.answer(
        "🔍 Для проверки статуса заказа обратитесь в поддержку "
        "с указанием ID заказа или времени покупки."
    )


# Обработчик для старого функционала (для обратной совместимости)
@dp.message(F.text == "Скинь мне лабу")
async def legacy_handler(message: types.Message, state: FSMContext):
    """Обработчик для старой кнопки - перенаправляет в WebApp"""
    await message.answer(
        "🔄 Этот способ устарел. Пожалуйста, используйте новый каталог:",
        reply_markup=ReplyKeyboardBuilder()
        .button(text="🛍 Открыть каталог", web_app=WebAppInfo(url=WEBAPP_URL))
        .as_markup(resize_keyboard=True)
    )


@dp.errors()
async def error_handler(update: types.Update, exception: Exception):
    """Глобальный обработчик ошибок"""
    logger.error(f"Update {update} caused error {exception}")
    
    if update.message:
        await update.message.answer(
            "❌ Произошла ошибка. Пожалуйста, попробуйте снова или обратитесь в поддержку."
        )
    
    return True
