import sqlite3
import json
from datetime import datetime
from typing import Optional, Dict, Any
import logging

logger = logging.getLogger(__name__)

# Инициализация БД
def init_db():
    """Создает таблицы в базе данных"""
    conn = sqlite3.connect('bot.db')
    cursor = conn.cursor()
    
    # Таблица пользователей
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY,
            username TEXT,
            first_name TEXT,
            last_name TEXT,
            language_code TEXT,
            agreed_to_license BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Таблица заказов
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            order_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            product_id TEXT,
            product_name TEXT,
            amount REAL,
            payment_label TEXT UNIQUE,
            status TEXT DEFAULT 'pending',
            file_path TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            paid_at TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (user_id)
        )
    ''')
    
    # Таблица отправленных файлов
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sent_files (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER,
            user_id INTEGER,
            file_path TEXT,
            sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (order_id) REFERENCES orders (order_id)
        )
    ''')
    
    conn.commit()
    conn.close()
    logger.info("Database initialized")


# Работа с пользователями
def add_user(user_id: int, username: str, first_name: str, last_name: str, language_code: str):
    """Добавляет нового пользователя или обновляет существующего"""
    conn = sqlite3.connect('bot.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT OR REPLACE INTO users (user_id, username, first_name, last_name, language_code, last_activity)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ''', (user_id, username, first_name, last_name, language_code))
    
    conn.commit()
    conn.close()


def get_user(user_id: int) -> Optional[Dict[str, Any]]:
    """Получает информацию о пользователе"""
    conn = sqlite3.connect('bot.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM users WHERE user_id = ?', (user_id,))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return {
            'user_id': row[0],
            'username': row[1],
            'first_name': row[2],
            'last_name': row[3],
            'language_code': row[4],
            'agreed_to_license': bool(row[5]),
            'created_at': row[6],
            'last_activity': row[7]
        }
    return None


def set_license_agreed(user_id: int):
    """Отмечает что пользователь принял лицензионное соглашение"""
    conn = sqlite3.connect('bot.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE users SET agreed_to_license = 1 WHERE user_id = ?
    ''', (user_id,))
    
    conn.commit()
    conn.close()


def has_agreed_to_license(user_id: int) -> bool:
    """Проверяет принял ли пользователь лицензионное соглашение"""
    user = get_user(user_id)
    return user is not None and user.get('agreed_to_license', False)


# Работа с заказами
def create_order(user_id: int, product_id: str, product_name: str, amount: float, 
                 payment_label: str, file_path: str) -> int:
    """Создает новый заказ"""
    conn = sqlite3.connect('bot.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO orders (user_id, product_id, product_name, amount, payment_label, file_path)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (user_id, product_id, product_name, amount, payment_label, file_path))
    
    order_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    logger.info(f"Created order {order_id} for user {user_id}, product {product_id}")
    return order_id


def get_order_by_label(payment_label: str) -> Optional[Dict[str, Any]]:
    """Получает заказ по payment_label"""
    conn = sqlite3.connect('bot.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM orders WHERE payment_label = ?', (payment_label,))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return {
            'order_id': row[0],
            'user_id': row[1],
            'product_id': row[2],
            'product_name': row[3],
            'amount': row[4],
            'payment_label': row[5],
            'status': row[6],
            'file_path': row[7],
            'created_at': row[8],
            'paid_at': row[9]
        }
    return None


def mark_order_paid(payment_label: str):
    """Отмечает заказ как оплаченный"""
    conn = sqlite3.connect('bot.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE orders 
        SET status = 'paid', paid_at = CURRENT_TIMESTAMP 
        WHERE payment_label = ?
    ''', (payment_label,))
    
    conn.commit()
    conn.close()
    logger.info(f"Order {payment_label} marked as paid")


def add_sent_file(order_id: int, user_id: int, file_path: str):
    """Записывает информацию об отправленном файле"""
    conn = sqlite3.connect('bot.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO sent_files (order_id, user_id, file_path)
        VALUES (?, ?, ?)
    ''', (order_id, user_id, file_path))
    
    conn.commit()
    conn.close()


# Статистика
def get_stats() -> Dict[str, Any]:
    """Получает статистику бота"""
    conn = sqlite3.connect('bot.db')
    cursor = conn.cursor()
    
    # Количество пользователей
    cursor.execute('SELECT COUNT(*) FROM users')
    total_users = cursor.fetchone()[0]
    
    # Количество заказов
    cursor.execute('SELECT COUNT(*) FROM orders')
    total_orders = cursor.fetchone()[0]
    
    # Оплаченные заказы
    cursor.execute('SELECT COUNT(*) FROM orders WHERE status = "paid"')
    paid_orders = cursor.fetchone()[0]
    
    # Общая выручка
    cursor.execute('SELECT SUM(amount) FROM orders WHERE status = "paid"')
    total_revenue = cursor.fetchone()[0] or 0
    
    conn.close()
    
    return {
        'total_users': total_users,
        'total_orders': total_orders,
        'paid_orders': paid_orders,
        'total_revenue': total_revenue
    }


# Инициализация при импорте
init_db()
