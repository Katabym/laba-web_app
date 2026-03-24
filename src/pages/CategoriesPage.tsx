import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, FileText, Code, BookOpen, ChevronRight } from 'lucide-react';
import { categories } from '../data/catalog';
import { useTelegram } from '../context/TelegramContext';

const iconMap: Record<string, React.ElementType> = {
  FlaskConical,
  FileText,
  Code,
  BookOpen,
};

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, hideBackButton, hapticFeedback } = useTelegram();

  useEffect(() => {
    hideBackButton();
  }, [hideBackButton]);

  const handleCategoryClick = (categoryId: string) => {
    hapticFeedback('success');
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2">📚 Каталог товаров</h1>
        <p className="text-blue-100">
          {user?.first_name ? `Привет, ${user.first_name}! 👋` : 'Добро пожаловать!'}
        </p>
        <p className="text-sm text-blue-200 mt-1">
          Выберите категорию интересующих вас материалов
        </p>
      </div>

      {/* Categories Grid */}
      <div className="p-4 pb-24">
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || FlaskConical;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" size={24} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-2xl p-5 shadow-md">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Как это работает?
          </h3>
          <ol className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <span>Выберите категорию и товар</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <span>Нажмите "Купить" и оплатите</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
              <span>Получите файл автоматически после оплаты</span>
            </li>
          </ol>
        </div>

        {/* Support */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Нужна помощь? Напишите в поддержку
          </p>
          <p className="text-xs text-gray-400 mt-1">
            @support_username
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
