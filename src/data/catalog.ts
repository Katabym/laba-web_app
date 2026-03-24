import { Category, Product } from '../types';

export const categories: Category[] = [
  {
    id: 'labs',
    name: 'Лабораторные работы',
    icon: 'FlaskConical',
    description: 'Готовые лабораторные работы по программированию'
  },
  {
    id: 'courseworks',
    name: 'Курсовые работы',
    icon: 'FileText',
    description: 'Курсовые проекты и работы'
  },
  {
    id: 'projects',
    name: 'Проекты',
    icon: 'Code',
    description: 'Готовые проекты на разных языках'
  },
  {
    id: 'docs',
    name: 'Документация',
    icon: 'BookOpen',
    description: 'Инструкции, отчеты и документация'
  }
];

export const products: Product[] = [
  // Лабораторные работы
  {
    id: 'lab-cpp-1',
    categoryId: 'labs',
    name: 'Лаба C++ #9',
    description: 'Полностью готовая лабораторная работа на C++ с исходным кодом и отчетом',
    price: 5,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop',
    filePath: 'D:\\Projects\\Labo_mar\\materia\\Sourse.cpp',
    fileType: 'cpp'
  },
  {
    id: 'lab-py-1',
    categoryId: 'labs',
    name: 'Лаба Python #5',
    description: 'Лабораторная работа по Python с подробными комментариями',
    price: 120,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
    filePath: 'D:\\Projects\\Labo_mar\\materia\\lab_python.zip',
    fileType: 'zip'
  },
  {
    id: 'lab-java-1',
    categoryId: 'labs',
    name: 'Лаба Java #3',
    description: 'ООП на Java - полный проект с классами и интерфейсами',
    price: 180,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    filePath: 'D:\\\\Projects\\\\Labo_mar\\\\materia\\\\lab_java.rar',
    fileType: 'rar'
  },
  
  // Курсовые работы
  {
    id: 'course-db-1',
    categoryId: 'courseworks',
    name: 'Курсовая Базы Данных',
    description: 'Полный проект БД с SQL-запросами, ER-диаграммами и отчетом',
    price: 450,
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop',
    filePath: 'D:\\\\Projects\\\\Labo_mar\\\\materia\\\\course_db.rar',
    fileType: 'rar'
  },
  {
    id: 'course-web-1',
    categoryId: 'courseworks',
    name: 'Курсовая Веб-разработка',
    description: 'Сайт на React + Node.js с полной документацией',
    price: 550,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
    filePath: 'D:\\\\Projects\\\\Labo_mar\\\\materia\\\\course_web.zip',
    fileType: 'zip'
  },
  
  // Проекты
  {
    id: 'proj-bot-1',
    categoryId: 'projects',
    name: 'Telegram Bot',
    description: 'Готовый шаблон Telegram бота на aiogram с оплатой',
    price: 350,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    filePath: 'D:\\\\Projects\\\\Labo_mar\\\\materia\\\\telegram_bot.zip',
    fileType: 'zip'
  },
  {
    id: 'proj-parser-1',
    categoryId: 'projects',
    name: 'Парсер данных',
    description: 'Парсер на Python с BeautifulSoup и сохранением в Excel',
    price: 280,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    filePath: 'D:\\\\Projects\\\\Labo_mar\\\\materia\\\\parser.zip',
    fileType: 'zip'
  },
  
  // Документация
  {
    id: 'doc-manual-1',
    categoryId: 'docs',
    name: 'Инструкция по запуску',
    description: 'Подробная инструкция по настройке окружения и запуску проектов',
    price: 50,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop',
    filePath: 'D:\\Projects\\Labo_mar\\materia\\Инструкция запуска.docx',
    fileType: 'docx'
  },
  {
    id: 'doc-report-1',
    categoryId: 'docs',
    name: 'Шаблон отчета',
    description: 'Готовый шаблон отчета по лабораторной работе в Word',
    price: 80,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    filePath: 'D:\\\\Projects\\\\Labo_mar\\\\materia\\\\report_template.docx',
    fileType: 'docx'
  }
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getProductById = (productId: string): Product | undefined => {
  return products.find(product => product.id === productId);
};

export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find(category => category.id === categoryId);
};
