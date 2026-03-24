from yoomoney import Quickpay
from yoomoney import Client
from config import YOOMONEY_TOKEN, YOOMONEY_WALLET
import logging

logger = logging.getLogger(__name__)


def create_quickpay(label: str, amount: float, description: str = "Оплата товара") -> str:
    """
    Создает ссылку на быстрый платеж YooMoney
    
    Args:
        label: Уникальный идентификатор платежа
        amount: Сумма платежа
        description: Описание платежа
        
    Returns:
        URL для перенаправления на оплату
    """
    try:
        quickpay = Quickpay(
            receiver=YOOMONEY_WALLET,
            quickpay_form="shop",
            targets=description,
            paymentType="SB",  # Банковская карта
            sum=amount,
            label=label
        )
        logger.info(f"Created payment with label: {label}, amount: {amount}")
        return quickpay.redirected_url
    except Exception as e:
        logger.error(f"Error creating payment: {e}")
        raise


def check_payment_status(label: str) -> dict:
    """
    Проверяет статус платежа по label
    
    Args:
        label: Уникальный идентификатор платежа
        
    Returns:
        dict с информацией о платеже или None
    """
    if not YOOMONEY_TOKEN:
        logger.error("YOOMONEY_TOKEN not set")
        return None
        
    try:
        client = Client(YOOMONEY_TOKEN)
        history = client.operation_history(label=label)
        
        for operation in history.operations:
            if operation.status == "success":
                logger.info(f"Payment {label} confirmed")
                return {
                    'paid': True,
                    'amount': float(operation.amount),
                    'currency': operation.currency,
                    'datetime': operation.datetime,
                    'operation_id': operation.operation_id
                }
        
        return {'paid': False}
        
    except Exception as e:
        logger.error(f"Error checking payment: {e}")
        return None


def is_payment_successful(label: str) -> bool:
    """
    Быстрая проверка успешности платежа
    
    Args:
        label: Уникальный идентификатор платежа
        
    Returns:
        True если платеж успешен, иначе False
    """
    result = check_payment_status(label)
    return result is not None and result.get('paid', False)


# Словарь для хранения активных платежей в памяти
# В продакшене лучше использовать Redis или БД
active_payments = {}


def register_payment(label: str, user_id: int, product_id: str, file_path: str):
    """Регистрирует новый платеж"""
    active_payments[label] = {
        'user_id': user_id,
        'product_id': product_id,
        'file_path': file_path,
        'status': 'pending'
    }


def get_payment_info(label: str) -> dict:
    """Получает информацию о платеже"""
    return active_payments.get(label)


def complete_payment(label: str):
    """Отмечает платеж как завершенный"""
    if label in active_payments:
        active_payments[label]['status'] = 'completed'
