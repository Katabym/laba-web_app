

// ============================================================
// ДАННЫЕ ЛАБОРАТОРНЫХ РАБОТ С ПРИВЯЗКОЙ К ПРЕДМЕТАМ (subjectId)
// ============================================================
const labsData = [
    // Предмет "Программирование" (id=1)
    { id: 1, name: 'Лабораторная работа №1', description: 'Изучение основ работы с переменными и типами данных', variant: 1, price: 299, taskText: 'Задание: Написать программу, которая запрашивает имя пользователя и выводит приветствие. Дополнительно: реализовать ввод возраста и вывод года рождения.', subjectId: 1 },
    { id: 2, name: 'Лабораторная работа №2', description: 'Условные операторы и циклы', variant: 1, price: 349, taskText: 'Задание: Создать калькулятор с выбором операции (+, -, *, /). Программа должна запрашивать два числа и выводить результат.', subjectId: 1 },
    { id: 3, name: 'Лабораторная работа №3', description: 'Работа с массивами', variant: 1, price: 399, taskText: 'Задание: Создать массив из 10 случайных чисел. Найти минимальное, максимальное и среднее значение.', subjectId: 1 },
    { id: 4, name: 'Лабораторная работа №4', description: 'Объектно-ориентированное программирование', variant: 2, price: 449, taskText: 'Задание: Создать класс "Студент" с полями: имя, возраст, группа. Реализовать методы для вывода информации.', subjectId: 1 },
    
    // Предмет "Базы данных" (id=4)
    { id: 5, name: 'Лабораторная работа №1', description: 'Основы SQL запросов', variant: 1, price: 299, taskText: 'Задание: Создать базу данных "Библиотека". Таблицы: книги, авторы, читатели. Написать SELECT запросы.', subjectId: 4 },
    { id: 6, name: 'Лабораторная работа №2', description: 'Проектирование БД', variant: 1, price: 349, taskText: 'Задание: Разработать ER-диаграмму для интернет-магазина. Привести к 3-й нормальной форме.', subjectId: 4 },
    
    // Предмет "Строительные материалы" (id=8)
    { id: 7, name: 'Лабораторная работа №1', description: 'Испытание бетона на прочность', variant: 1, price: 399, taskText: 'Задание: Провести расчет прочности бетонного образца. Определить класс бетона по результатам испытаний.', subjectId: 8 },
    { id: 8, name: 'Лабораторная работа №2', description: 'Свойства строительных материалов', variant: 1, price: 349, taskText: 'Задание: Изучить теплопроводность и водопоглощение различных материалов. Составить сравнительную таблицу.', subjectId: 8 },
    
    // Предмет "Электротехника" (id=15)
    { id: 9, name: 'Лабораторная работа №1', description: 'Расчет цепей постоянного тока', variant: 1, price: 299, taskText: 'Задание: Рассчитать токи в цепи методом контурных токов. Построить потенциальную диаграмму.', subjectId: 15 },
    { id: 10, name: 'Лабораторная работа №2', description: 'Переходные процессы', variant: 2, price: 399, taskText: 'Задание: Исследовать переходные процессы в RC-цепи. Построить графики напряжения и тока.', subjectId: 15 },
    
    // Предмет "Экономика" (id=25)
    { id: 11, name: 'Лабораторная работа №1', description: 'Микроэкономический анализ', variant: 1, price: 299, taskText: 'Задание: Рассчитать эластичность спроса. Построить кривые спроса и предложения.', subjectId: 25 },
    { id: 12, name: 'Лабораторная работа №2', description: 'Макроэкономические показатели', variant: 1, price: 349, taskText: 'Задание: Рассчитать ВВП, инфляцию и безработицу по предоставленным данным.', subjectId: 25 },
    
    // Предмет "История" (id=29)
    { id: 13, name: 'Лабораторная работа №1', description: 'Анализ исторических источников', variant: 1, price: 249, taskText: 'Задание: Провести анализ предложенного исторического документа. Определить его достоверность и значение.', subjectId: 29 },
];

let cart = [];
let expandedLab = null;
let currentSubjectId = null;
let currentSubjectName = '';
let currentCategoryId = '';
let currentCategoryName = '';

let tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
}
console.log("window.Telegram =", window.Telegram);
console.log("tg =", tg);
console.log("initData =", tg?.initData);
console.log("initDataUnsafe =", tg?.initDataUnsafe);
console.log("platform =", tg?.platform);
console.log("version =", tg?.version);

// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
currentSubjectId = urlParams.get('subject');
currentSubjectName = urlParams.get('name') || 'Предмет';
currentCategoryId = urlParams.get('cat') || '';
currentCategoryName = urlParams.get('catName') || '';

document.getElementById('subjectName').textContent = currentSubjectName;
document.getElementById('pageTitle').innerHTML = `📘 ${currentSubjectName}`;
document.getElementById('subjectBadge').textContent = currentSubjectName;

// Функция для получения текущих отфильтрованных лабораторных (с учетом варианта и поиска)
function getCurrentFilteredLabs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedVariant = document.getElementById('variantSelect').value;
    
    let filtered = labsData.filter(lab => lab.subjectId == currentSubjectId);
    
    // Фильтр по варианту
    if (selectedVariant !== 'all') {
        filtered = filtered.filter(lab => lab.variant === parseInt(selectedVariant));
    }
    
    // Фильтр по поиску
    if (searchTerm) {
        filtered = filtered.filter(lab => 
            lab.name.toLowerCase().includes(searchTerm) || 
            lab.description.toLowerCase().includes(searchTerm) ||
            lab.taskText.toLowerCase().includes(searchTerm)
        );
    }
    
    return filtered;
}

// Фильтрация лабораторных
function filterLabs() {
    const filtered = getCurrentFilteredLabs();
    renderLabs(filtered);
    
    // После фильтрации обновляем состояние чекбокса "купить всё"
    updateBuyAllCheckboxState();
}

function updateBuyAllCheckboxState() {
    const buyAllCheckbox = document.getElementById('buyAllCheckbox');
    const currentFilteredLabs = getCurrentFilteredLabs();
    const discountText = document.getElementById('discountText');
    
    // Проверяем, все ли видимые лабы добавлены в корзину
    const allVisibleInCart = currentFilteredLabs.length > 0 && 
        currentFilteredLabs.every(lab => cart.some(item => item.id === lab.id));
    
    buyAllCheckbox.checked = allVisibleInCart;
    
    // Обновляем текст скидки для "купить всё"
    const totalCount = currentFilteredLabs.length;
    
    if (totalCount > 0) {
        discountText.textContent = `(скидка 15% при покупке всех ${totalCount} лаб)`;
    } else {
        discountText.textContent = '(нет доступных лаб)';
    }
}

// Функция для обновления состояния чекбокса "купить всё"
/* function updateBuyAllCheckboxState() {
    const buyAllCheckbox = document.getElementById('buyAllCheckbox');
    const currentFilteredLabs = getCurrentFilteredLabs();
    
    // Проверяем, все ли видимые лабы добавлены в корзину
    const allVisibleInCart = currentFilteredLabs.length > 0 && 
        currentFilteredLabs.every(lab => cart.some(item => item.id === lab.id));
    
    buyAllCheckbox.checked = allVisibleInCart;
} */

// Рендер лабораторных
function renderLabs(labs) {
    const container = document.getElementById('labsList');
    
    if (labs.length === 0) {
        container.innerHTML = '<div class="empty-state">🔋 Нет лабораторных работ для этого предмета</div>';
        return;
    }

    container.innerHTML = labs.map(lab => `
        <div class="lab-card" data-id="${lab.id}">
            <div class="lab-header" onclick="toggleDetails(${lab.id})">
                <div class="lab-left">
                    <div class="price-tag">${lab.price} ₽</div>
                    <div class="lab-info">
                        <h4>${escapeHtml(lab.name)}</h4>
                        <p>${escapeHtml(lab.description)}</p>
                        <small style="color:#8b5cf6;">📌 Вариант ${lab.variant}</small>
                    </div>
                </div>
                <div class="lab-actions">
                    <button class="details-btn" onclick="event.stopPropagation(); toggleDetails(${lab.id})">Детали</button>
                    <input type="checkbox" class="lab-checkbox" data-id="${lab.id}" data-price="${lab.price}" data-name="${escapeHtml(lab.name)}" data-variant="${lab.variant}" ${cart.some(i => i.id === lab.id) ? 'checked' : ''} onchange="toggleCartItem(${lab.id}, ${lab.price}, '${escapeHtml(lab.name).replace(/'/g, "\\'")}', this.checked)">
                    <div class="chevron" id="chevron-${lab.id}">▼</div>
                </div>
            </div>
            <div class="lab-details" id="details-${lab.id}">
                <div class="lab-details-content">
                    <strong>📝 Текст задания:</strong><br>
                    ${escapeHtml(lab.taskText)}
                </div>
            </div>
        </div>
    `).join('');
    
    // После рендера проверяем состояние чекбокса "купить всё"
    updateBuyAllCheckboxState();
}

function toggleDetails(labId) {
    const detailsDiv = document.getElementById(`details-${labId}`);
    const chevron = document.getElementById(`chevron-${labId}`);
    
    if (expandedLab === labId) {
        detailsDiv.classList.remove('open');
        if (chevron) chevron.classList.remove('rotated');
        expandedLab = null;
    } else {
        if (expandedLab !== null) {
            const prevDetails = document.getElementById(`details-${expandedLab}`);
            const prevChevron = document.getElementById(`chevron-${expandedLab}`);
            if (prevDetails) prevDetails.classList.remove('open');
            if (prevChevron) prevChevron.classList.remove('rotated');
        }
        detailsDiv.classList.add('open');
        if (chevron) chevron.classList.add('rotated');
        expandedLab = labId;
    }
}

function toggleCartItem(id, price, name, isChecked) {
    if (isChecked) {
        if (!cart.some(item => item.id === id)) {
            cart.push({ id, name, price });
        }
    } else {
        cart = cart.filter(item => item.id !== id);
    }
    updateCartUI();
    
    // Обновляем состояние чекбокса "купить всё"
    updateBuyAllCheckboxState();
}

/*function toggleCartItem(id, price, name, isChecked) {
    if (isChecked) {
        if (!cart.some(item => item.id === id)) {
            cart.push({ id, name, price });
        }
    } else {
        cart = cart.filter(item => item.id !== id);
    }
    updateCartUI();
    
    // Обновляем состояние чекбокса "купить всё"
    updateBuyAllCheckboxState();
} */

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-state">Корзина пуста</div>';
        cartTotalSpan.textContent = '0 ₽';
        updateCartFloat();
        updateBuyAllCheckboxState();
        return;
    }
    
    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>${item.price} ₽</span>
        </div>
    `).join('');
    
    // Получаем выбранный вариант
    const selectedVariant = document.getElementById('variantSelect').value;
    
    // Получаем все лабораторные для текущего предмета и выбранного варианта
    let totalLabsForVariant = [];
    if (selectedVariant !== 'all') {
        totalLabsForVariant = labsData.filter(lab => 
            lab.subjectId == currentSubjectId && lab.variant === parseInt(selectedVariant)
        );
    } else {
        totalLabsForVariant = labsData.filter(lab => lab.subjectId == currentSubjectId);
    }
    
    const totalAvailableCount = totalLabsForVariant.length;
    
    // Получаем выбранные лабораторные из текущего варианта
    const selectedFromCurrentVariant = cart.filter(cartItem => 
        totalLabsForVariant.some(lab => lab.id === cartItem.id)
    );
    
    const selectedCount = selectedFromCurrentVariant.length;
    
    // Рассчитываем процент выбранных лабораторных
    let discountPercent = 0;
    
    if (totalAvailableCount > 0) {
        const percentage = (selectedCount / totalAvailableCount) * 100;
        
        if (selectedCount === totalAvailableCount) {
            // 100% - скидка 15%
            discountPercent = 15;
        } else if (percentage >= 70) {
            // 70% и более - скидка 10%
            discountPercent = 10;
        } else if (percentage >= 30) {
            // 30% и более - скидка 5%
            discountPercent = 5;
        }
    }
    
    // Рассчитываем сумму выбранных лабораторных текущего варианта
    let variantTotal = selectedFromCurrentVariant.reduce((sum, item) => sum + item.price, 0);
    
    // Рассчитываем сумму остальных лабораторных (других вариантов)
    const otherItems = cart.filter(cartItem => 
        !totalLabsForVariant.some(lab => lab.id === cartItem.id)
    );
    const otherTotal = otherItems.reduce((sum, item) => sum + item.price, 0);
    
    // Применяем скидку только к выбранным лабораторным текущего варианта
    let discountAmount = 0;
    if (discountPercent > 0 && selectedCount > 0) {
        discountAmount = variantTotal * (discountPercent / 100);
    }
    
    const total = variantTotal + otherTotal - discountAmount;
    
    // Отображаем итоговую сумму с информацией о скидке
    if (discountPercent > 0 && selectedCount > 0) {
        let discountText = '';
        if (selectedCount === totalAvailableCount) {
            discountText = `скидка ${discountPercent}% (покупка всех ${selectedCount} лаб)`;
        } else {
            discountText = `скидка ${discountPercent}% (${selectedCount} из ${totalAvailableCount} лаб)`;
        }
        cartTotalSpan.innerHTML = `${Math.round(total)} ₽ <span style="font-size:0.7rem; color:#10b981;">(${discountText})</span>`;
    } else {
        cartTotalSpan.textContent = total + ' ₽';
    }
    
    updateCartFloat();
    updateBuyAllCheckboxState();
}

/* function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-state">Корзина пуста</div>';
        cartTotalSpan.textContent = '0 ₽';
        updateCartFloat();
        updateBuyAllCheckboxState();
        return;
    }
    
    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>${item.price} ₽</span>
        </div>
    `).join('');
    
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    const buyAllChecked = document.getElementById('buyAllCheckbox').checked;
    const currentFilteredLabs = getCurrentFilteredLabs();
    const allFilteredCount = currentFilteredLabs.length;
    const checkedFilteredCount = cart.filter(item => 
        currentFilteredLabs.some(lab => lab.id === item.id)
    ).length;
    
    if (buyAllChecked && allFilteredCount === checkedFilteredCount && allFilteredCount > 0) {
        const discount = total * 0.15;
        total = total - discount;
        cartTotalSpan.innerHTML = `${Math.round(total)} ₽ <span style="font-size:0.7rem; color:#10b981;">(скидка 15%)</span>`;
    } else {
        cartTotalSpan.textContent = total + ' ₽';
    }
    updateCartFloat();
    updateBuyAllCheckboxState();
} */

// Обработка "купить всё" - добавляет только те лабы, которые соответствуют выбранному варианту и поиску
document.getElementById('buyAllCheckbox').addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const currentFilteredLabs = getCurrentFilteredLabs();
    
    if (isChecked) {
        // Добавляем в корзину только те лабораторные, которые сейчас отображаются (с учетом варианта и поиска)
        currentFilteredLabs.forEach(lab => {
            if (!cart.some(item => item.id === lab.id)) {
                cart.push({ id: lab.id, name: lab.name, price: lab.price });
            }
        });
        // Отмечаем только видимые чекбоксы
        const visibleCheckboxes = document.querySelectorAll('.lab-checkbox');
        visibleCheckboxes.forEach(cb => cb.checked = true);
    } else {
        // Удаляем из корзины только те, которые были добавлены из текущего фильтра
        const filteredIds = currentFilteredLabs.map(l => l.id);
        cart = cart.filter(item => !filteredIds.includes(item.id));
        // Снимаем отметки только с видимых чекбоксов
        const visibleCheckboxes = document.querySelectorAll('.lab-checkbox');
        visibleCheckboxes.forEach(cb => cb.checked = false);
    }
    updateCartUI();
});


function calculateCartTotalNumber() {
    const selectedVariant = document.getElementById('variantSelect').value;

    let totalLabsForVariant = [];
    if (selectedVariant !== 'all') {
        totalLabsForVariant = labsData.filter(lab =>
            lab.subjectId == currentSubjectId && lab.variant === parseInt(selectedVariant)
        );
    } else {
        totalLabsForVariant = labsData.filter(lab => lab.subjectId == currentSubjectId);
    }

    const totalAvailableCount = totalLabsForVariant.length;

    const selectedFromCurrentVariant = cart.filter(cartItem =>
        totalLabsForVariant.some(lab => lab.id === cartItem.id)
    );

    const selectedCount = selectedFromCurrentVariant.length;

    let discountPercent = 0;

    if (totalAvailableCount > 0) {
        const percentage = (selectedCount / totalAvailableCount) * 100;

        if (selectedCount === totalAvailableCount) {
            discountPercent = 15;
        } else if (percentage >= 70) {
            discountPercent = 10;
        } else if (percentage >= 30) {
            discountPercent = 5;
        }
    }

    let variantTotal = selectedFromCurrentVariant.reduce((sum, item) => sum + item.price, 0);

    const otherItems = cart.filter(cartItem =>
        !totalLabsForVariant.some(lab => lab.id === cartItem.id)
    );
    const otherTotal = otherItems.reduce((sum, item) => sum + item.price, 0);

    let discountAmount = 0;
    if (discountPercent > 0 && selectedCount > 0) {
        discountAmount = variantTotal * (discountPercent / 100);
    }

    return Math.round(variantTotal + otherTotal - discountAmount);
}


// Корзина выдвижение
const cartDrawer = document.getElementById('cartDrawer');

function openCart() {
    cartDrawer.classList.add('open');
}

function closeCart() {
    cartDrawer.classList.remove('open');
}

document.getElementById('closeCartBtn').addEventListener('click', closeCart);

// Плавающая кнопка корзины
const cartFloatBtn = document.createElement('button');
cartFloatBtn.innerHTML = '🛒 0';
cartFloatBtn.style.cssText = `
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #4f46e5);
    color: white;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    cursor: pointer;
    z-index: 900;
    transition: transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
`;
cartFloatBtn.onclick = openCart;
document.body.appendChild(cartFloatBtn);

function updateCartFloat() {
    cartFloatBtn.innerHTML = `🛒 ${cart.length}`;
}

// Модальное окно с QR
function showPaymentModal() {
    const total = document.getElementById('cartTotal').innerText;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>💳 Оплата</h3>
            <div class="qr-code" id="qrCodeContainer"></div>
            <p>Сумма: ${total}</p>
            <button class="pay-link-btn" id="payLinkBtn">🔗 Оплатить по ссылке</button>
            <button class="pay-link-btn close-modal" id="closeModalBtn">Закрыть</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    const paymentUrl = `https://payment.example.com/order/${Date.now()}`;
    new QRCode(document.getElementById('qrCodeContainer'), {
        text: paymentUrl,
        width: 200,
        height: 200
    });
    
    document.getElementById('payLinkBtn').addEventListener('click', () => {
        window.open(paymentUrl, '_blank');
        showToast('🔗 Ссылка для оплаты открыта');
    });
    
    document.getElementById('closeModalBtn').addEventListener('click', () => {
        modal.remove();
    });
}
const tg = window.Telegram?.WebApp;

if (tg) {
	tg.ready();
	tg.expand();

    
document.getElementById('orderBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Корзина пуста. Добавьте лабораторные работы');
        return;
    }

    const tg = window.Telegram?.WebApp;

    if (!tg || typeof tg.sendData !== 'function') {
        showToast('Telegram WebApp недоступен');
        return;
    }

    const orderData = {
        data_type: 'cart_order',
        category_id: currentCategoryId,
        category_name: currentCategoryName,
        subject_id: currentSubjectId,
        subject_name: currentSubjectName,
        total_amount: calculateCartTotalNumber(),
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price
        }))
    };

    try {
        tg.sendData(JSON.stringify(orderData));
        showToast('Заказ отправлен');

        setTimeout(() => {
            tg.close();
        }, 200);
    } catch (e) {
        showToast('Ошибка отправки заказа');
    }
});

/* document.getElementById('orderBtn').addEventListener('click', () => {
    console.log("click orderBtn");

    if (!tg) {
        alert("tg not found");
        return;
    }

    console.log("tg.sendData exists:", typeof tg.sendData);
    console.log("initData:", tg.initData);
    console.log("initDataUnsafe:", tg.initDataUnsafe);

    try {
        tg.sendData(JSON.stringify({
            total_amount: 123,
            items: [{ name: "Тест", price: 123 }]
        }));
        alert("sendData called");
    } catch (e) {
        console.error("sendData error:", e);
        alert("sendData error: " + e.message);
    }
}); */

// Оформление заказа
/* document.getElementById('orderBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Корзина пуста. Добавьте лабораторные работы');
        return;
    }
    //showPaymentModal();
    //closeCart();
	const totalAmount = calculateCartTotalNumber();

    const orderData = {
        data_type: 'cart_order',
        subject_id: currentSubjectId,
        subject_name: currentSubjectName,
        total_amount: totalAmount,
        items: cart
    };

    tg.sendData(JSON.stringify(orderData));
    //tg.close();
}); */

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m] || m));
}

// Скачивание файла с заданиями
document.getElementById('downloadTasksBtn').addEventListener('click', () => {
    const subjectLabs = labsData.filter(lab => lab.subjectId == currentSubjectId);
    const content = `Методические указания по предмету "${currentSubjectName}"\n\n${subjectLabs.map(lab => `${lab.name} (Вариант ${lab.variant})\n${lab.taskText}\n${'='.repeat(50)}\n`).join('\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentSubjectName}_задания.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📄 Файл с заданиями скачан');
});

document.getElementById('supportLink').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('📧 Напишите на support@edu.ru или @support_bot');
});

// Кнопка "Назад к предметам" - сохраняем информацию о факультете
document.getElementById('backButton').addEventListener('click', () => {
    if (currentCategoryId && currentCategoryName) {
        window.location.href = `items.html?cat=${currentCategoryId}&name=${encodeURIComponent(currentCategoryName)}`;
    } else {
        const savedCat = localStorage.getItem('lastCategoryId');
        const savedCatName = localStorage.getItem('lastCategoryName');
        if (savedCat && savedCatName) {
            window.location.href = `items.html?cat=${savedCat}&name=${encodeURIComponent(savedCatName)}`;
        } else {
            window.location.href = 'items.html';
        }
    }
});

// Сохраняем информацию о факультете в localStorage
if (currentCategoryId && currentCategoryName) {
    localStorage.setItem('lastCategoryId', currentCategoryId);
    localStorage.setItem('lastCategoryName', currentCategoryName);
}

document.getElementById('searchInput').addEventListener('input', filterLabs);
document.getElementById('variantSelect').addEventListener('change', filterLabs);

// Инициализация
filterLabs();
updateCartUI();

window.toggleDetails = toggleDetails;
window.toggleCartItem = toggleCartItem;