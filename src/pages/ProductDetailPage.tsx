import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileCode, FileArchive, FileText, Package, CheckCircle, Clock, Shield } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { getProductById } from '../data/catalog';
import { useTelegram } from '../context/TelegramContext';

const fileTypeIcons: Record<string, React.ElementType> = {
  cpp: FileCode,
  rar: FileArchive,
  zip: FileArchive,
  docx: FileText,
  pdf: FileText,
};

const fileTypeLabels: Record<string, string> = {
  cpp: 'Исходный код C++',
  rar: 'Архив RAR',
  zip: 'Архив ZIP',
  docx: 'Документ Microsoft Word',
  pdf: 'PDF документ',
};

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { showBackButton, hideBackButton, hapticFeedback, user } = useTelegram();
  
  const [showPayment, setShowPayment] = useState(false);
  const [paymentLabel, setPaymentLabel] = useState('');

  const product = productId ? getProductById(productId) : undefined;

  useEffect(() => {
    showBackButton(() => {
      if (showPayment) {
        setShowPayment(false);
      } else {
        navigate(-1);
      }
    });
    return () => hideBackButton();
  }, [showBackButton, hideBackButton, navigate, showPayment]);

  const handleBuyClick = () => {
    hapticFeedback('success');
    
    // Генерируем уникальный label для платежа
    const uniqueLabel = `order_${user?.id || 'guest'}_${Date.now()}_${productId}`;
    setPaymentLabel(uniqueLabel);
    
    // Создаем URL для оплаты через API бота
    // В продакшене здесь должен быть запрос к вашему API
    console.log('Payment created with label:', uniqueLabel);
    
    setShowPayment(true);
  };

  const copyPaymentLink = () => {
    // В реальном сценарии здесь будет ссылка на YooMoney
    const yoomoneyUrl = `https://yoomoney.ru/quickpay/confirm?receiver=410015910066269&quickpay-form=shop&paymentType=SB&sum=${product?.price}&label=${paymentLabel}`;
    navigator.clipboard.writeText(yoomoneyUrl);
    hapticFeedback('success');
    alert('Ссылка на оплату скопирована!');
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-bold text-gray-700">Товар не найден</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  const FileIcon = fileTypeIcons[product.fileType] || Package;

  // Экран оплаты
  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="p-4 flex items-center gap-3">
            <button 
              onClick={() => setShowPayment(false)} 
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Оплата</h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Order Summary */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3">Ваш заказ</h3>
            <div className="flex items-center gap-3 pb-3 border-b">
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-blue-600 font-bold">{product.price} ₽</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <h3 className="font-bold text-gray-800 mb-4">Отсканируйте QR-код для оплаты</h3>
            <div className="inline-block p-4 bg-white rounded-xl shadow-inner border-2 border-dashed border-gray-200">
              <QRCodeSVG
                value={`https://yoomoney.ru/quickpay/confirm?receiver=410015910066269&quickpay-form=shop&paymentType=SB&sum=${product.price}&label=${paymentLabel}`}
                size={200}
                level="M"
                includeMargin={true}
                imageSettings={{
                  src: "https://yoomoney.ru/i/yoomoney_logo_white.png",
                  x: undefined,
                  y: undefined,
                  height: 30,
                  width: 30,
                  excavate: true,
                }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Или используйте кнопку ниже для оплаты
            </p>
          </div>

          {/* Payment Buttons */}
          <div className="space-y-3">
            <a
              href={`https://yoomoney.ru/quickpay/confirm?receiver=410015910066269&quickpay-form=shop&paymentType=SB&sum=${product.price}&label=${paymentLabel}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl text-center hover:shadow-lg transition-shadow"
              onClick={() => hapticFeedback('success')}
            >
              💳 Оплатить {product.price} ₽ через YooMoney
            </a>
            
            <button
              onClick={copyPaymentLink}
              className="block w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl text-center hover:bg-gray-200 transition-colors"
            >
              📋 Копировать ссылку на оплату
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <Clock size={18} />
              Что дальше?
            </h4>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Отсканируйте QR-код или нажмите кнопку оплаты</li>
              <li>2. Совершите платеж через YooMoney</li>
              <li>3. Бот автоматически отправит файл после подтверждения</li>
              <li>4. Обычно это занимает 1-2 минуты</li>
            </ol>
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
            <Shield size={16} />
            <span>Безопасная оплата через YooMoney</span>
          </div>
        </div>
      </div>
    );
  }

  // Product Detail Screen
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header Image */}
      <div className="relative h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-2">
            {fileTypeLabels[product.fileType]}
          </span>
          <h1 className="text-2xl font-bold text-white">{product.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Price Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Цена</p>
            <p className="text-3xl font-bold text-blue-600">{product.price} ₽</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <FileIcon size={24} className="text-blue-600" />
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">Описание</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3">Что включено</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={18} className="text-green-500" />
              <span>Готовый к использованию файл</span>
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={18} className="text-green-500" />
              <span>Мгновенная доставка после оплаты</span>
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={18} className="text-green-500" />
              <span>Пожизненный доступ к файлу</span>
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={18} className="text-green-500" />
              <span>Техническая поддержка</span>
            </li>
          </ul>
        </div>

        {/* File Info */}
        <div className="bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <FileIcon size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{product.name}</p>
              <p className="text-sm text-gray-500">.{product.fileType} файл</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 safe-area-bottom">
        <button
          onClick={handleBuyClick}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Купить сейчас</span>
          <span className="bg-white/20 px-2 py-1 rounded-lg">{product.price} ₽</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
