import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, FileCode, FileArchive, FileText } from 'lucide-react';
import { getProductsByCategory, getCategoryById } from '../data/catalog';
import { useTelegram } from '../context/TelegramContext';
import { Product } from '../types';

const fileTypeIcons: Record<string, React.ElementType> = {
  cpp: FileCode,
  rar: FileArchive,
  zip: FileArchive,
  docx: FileText,
  pdf: FileText,
};

const fileTypeLabels: Record<string, string> = {
  cpp: 'Исходный код',
  rar: 'Архив RAR',
  zip: 'Архив ZIP',
  docx: 'Документ Word',
  pdf: 'PDF документ',
};

const ProductsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { showBackButton, hideBackButton, hapticFeedback } = useTelegram();

  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const products = categoryId ? getProductsByCategory(categoryId) : [];

  useEffect(() => {
    showBackButton(() => {
      navigate('/');
    });
    return () => hideBackButton();
  }, [showBackButton, hideBackButton, navigate]);

  const handleProductClick = (product: Product) => {
    hapticFeedback('success');
    navigate(`/product/${product.id}`);
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-bold text-gray-700">Категория не найдена</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white p-4 shadow-sm flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">{category.name}</h1>
        </div>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">В этой категории пока нет товаров</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="p-4 flex items-center gap-3">
          <button 
            onClick={() => navigate('/')} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{category.name}</h1>
            <p className="text-sm text-gray-500">{products.length} товаров</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => {
            const FileIcon = fileTypeIcons[product.fileType] || Package;
            
            return (
              <button
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 text-left group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-blue-600 shadow-sm">
                    {product.price} ₽
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium bg-blue-600/80 px-2 py-1 rounded">
                      {fileTypeLabels[product.fileType]}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <FileIcon size={16} />
                      <span>{product.fileType.toUpperCase()}</span>
                    </div>
                    <span className="text-blue-600 font-semibold text-sm group-hover:underline">
                      Подробнее →
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
