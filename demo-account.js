// demo-account.js
// Демо-аккаунт для TravelBudget
// Автоматически заполняет данные для пользователя Александра Багаева

(function() {
    // Константы для ключей хранилища
    const STORAGE_SESSION = 'travelbudget_session';
    const STORAGE_USERS = 'travelbudget_users';
    
    // Данные демо-пользователя
    const DEMO_USER = {
        id: 'demo_alexandra_bagaeva',
        name: 'Александра Багаева',
        email: 'alexandra@travelbudget.demo',
        password: 'demo123'
    };
    
    // Сохранённые путешествия (туры)
    const DEMO_TOURS = [
        {
            name: "Итальянская Ривьера",
            country: "Италия",
            days: 8,
            expenses: [
                { name: "Авиабилеты Москва-Рим", amount: 320 },
                { name: "Проживание в отеле", amount: 680 },
                { name: "Питание (рестораны)", amount: 280 },
                { name: "Трансфер (такси)", amount: 65 },
                { name: "Экскурсия в Помпеи", amount: 55 },
                { name: "Поездка на Капри", amount: 45 },
                { name: "Сувениры", amount: 40 },
                { name: "Кофе и джелато", amount: 35 }
            ],
            totalPrice: 1520,
            savedAt: "2025-05-10T10:30:00.000Z",
            status: "saved"
        },
        {
            name: "Грузинское гостеприимство",
            country: "Грузия",
            days: 7,
            expenses: [
                { name: "Авиабилеты", amount: 250 },
                { name: "Проживание (гостевой дом)", amount: 180 },
                { name: "Питание (хачапури, хинкали)", amount: 110 },
                { name: "Трансфер из аэропорта", amount: 20 },
                { name: "Экскурсия в Казбек", amount: 45 },
                { name: "Дегустация вин", amount: 35 },
                { name: "Сувениры и вино", amount: 50 },
                { name: "Мастер-класс по хинкали", amount: 25 }
            ],
            totalPrice: 715,
            savedAt: "2025-06-15T14:20:00.000Z",
            status: "saved"
        },
        {
            name: "Мальдивский рай",
            country: "Мальдивы",
            days: 7,
            expenses: [
                { name: "Авиабилеты", amount: 800 },
                { name: "Вилла на воде", amount: 1150 },
                { name: "Питание All Inclusive", amount: 400 },
                { name: "Трансфер на катере", amount: 90 },
                { name: "Дайвинг", amount: 120 },
                { name: "Экскурсия на остров", amount: 70 }
            ],
            totalPrice: 2630,
            savedAt: "2025-03-01T09:15:00.000Z",
            status: "saved"
        },
        {
            name: "Таиланд: вкус экзотики",
            country: "Таиланд",
            days: 10,
            expenses: [
                { name: "Авиабилеты", amount: 380 },
                { name: "Проживание", amount: 320 },
                { name: "Питание (уличная еда)", amount: 120 },
                { name: "Трансфер", amount: 35 },
                { name: "Экскурсия на Пхи-Пхи", amount: 65 },
                { name: "Массаж (3 сеанса)", amount: 30 },
                { name: "Сувениры", amount: 25 }
            ],
            totalPrice: 975,
            savedAt: "2025-04-20T16:45:00.000Z",
            status: "saved"
        },
        {
            name: "Швейцарские Альпы",
            country: "Швейцария",
            days: 7,
            expenses: [
                { name: "Авиабилеты", amount: 420 },
                { name: "Проживание в шале", amount: 850 },
                { name: "Питание", amount: 310 },
                { name: "Ски-пасс", amount: 140 },
                { name: "Аренда снаряжения", amount: 85 },
                { name: "Экскурсия на Юнгфрау", amount: 120 }
            ],
            totalPrice: 1925,
            savedAt: "2025-01-25T11:00:00.000Z",
            status: "saved"
        },
        {
            name: "Япония: восходящее солнце",
            country: "Япония",
            days: 10,
            expenses: [
                { name: "Авиабилеты", amount: 850 },
                { name: "Проживание (Токио+Киото)", amount: 780 },
                { name: "Питание", amount: 320 },
                { name: "JR Pass", amount: 260 },
                { name: "Экскурсия в Фудзи", amount: 95 },
                { name: "Чайная церемония", amount: 40 },
                { name: "Сувениры", amount: 85 }
            ],
            totalPrice: 2430,
            savedAt: "2025-02-10T08:30:00.000Z",
            status: "saved"
        }
    ];
    
    // Настройки пользователя
    const DEMO_SETTINGS = {
        defaultCurrency: "EUR",
        defaultDays: 7
    };
    
    // Профиль с аватаром (символьный, без реального изображения)
    const DEMO_PROFILE = {
        name: "Александра Багаева",
        email: "alexandra@travelbudget.demo",
        avatar: null,
        bio: "Люблю путешествовать и открывать новые места ✈️🌍",
        preferences: {
            favoriteDestinations: ["Италия", "Грузия", "Япония"],
            travelStyle: "combined" // combined, adventure, relax
        }
    };
    
    // Чек-лист (частично заполнен, но не всё)
    const DEMO_CHECKLIST = {
        documents: [
            { name: "Загранпаспорт", checked: true },
            { name: "Внутренний паспорт", checked: true },
            { name: "Авиабилеты", checked: true },
            { name: "Страховка", checked: true },
            { name: "Отель/бронирование", checked: true },
            { name: "Виза", checked: true },
            { name: "Водительские права", checked: true }
        ],
        clothes: [
            { name: "Футболки", checked: true },
            { name: "Шорты/юбки", checked: true },
            { name: "Джинсы/брюки", checked: true },
            { name: "Куртка/ветровка", checked: false },
            { name: "Купальник/плавки", checked: true },
            { name: "Головной убор", checked: true },
            { name: "Обувь (2-3 пары)", checked: true },
            { name: "Носки", checked: true },
            { name: "Бельё", checked: true }
        ],
        electronics: [
            { name: "Телефон", checked: true },
            { name: "Зарядное устройство", checked: true },
            { name: "Power Bank", checked: true },
            { name: "Наушники", checked: true },
            { name: "Фотоаппарат", checked: false },
            { name: "Адаптер для розетки", checked: true },
            { name: "Ноутбук/планшет", checked: false }
        ],
        hygiene: [
            { name: "Зубная щётка", checked: true },
            { name: "Зубная паста", checked: true },
            { name: "Шампунь", checked: true },
            { name: "Гель для душа", checked: true },
            { name: "Дезодорант", checked: true },
            { name: "Расчёска", checked: true },
            { name: "Солнцезащитный крем", checked: true },
            { name: "Средство от насекомых", checked: false }
        ],
        medicine: [
            { name: "Обезболивающее", checked: true },
            { name: "Жаропонижающее", checked: true },
            { name: "Сорбенты", checked: true },
            { name: "Антигистаминные", checked: false },
            { name: "Пластыри", checked: true },
            { name: "Бинт", checked: true },
            { name: "Личные лекарства", checked: true }
        ],
        other: [
            { name: "Солнцезащитные очки", checked: true },
            { name: "Зонт", checked: false },
            { name: "Рюкзак/сумка", checked: true },
            { name: "Плед в самолёт", checked: false },
            { name: "Подушка для шеи", checked: true },
            { name: "Закуски в дорогу", checked: true },
            { name: "Бутылка для воды", checked: true }
        ]
    };
    
    // Бюджетные настройки
    const DEMO_BUDGET = 3000; // в EUR
    
    // Бюджеты по категориям (в EUR)
    const DEMO_CATEGORY_BUDGETS = {
        "🍕 Еда": 400,
        "🚗 Транспорт": 350,
        "🏨 Проживание": 800,
        "🎉 Развлечения": 300,
        "🛍️ Покупки": 200,
        "☕ Кафе": 100,
        "💊 Здоровье": 50,
        "📱 Другое": 100
    };
    
    // Текущий активный тур (последний добавленный)
    const DEMO_CURRENT_TOUR = {
        name: "Новое путешествие в Испанию",
        country: "Испания",
        days: 9,
        expenses: [
            { name: "Авиабилеты Москва-Барселона", amount: 280 },
            { name: "Проживание (апартаменты)", amount: 540 },
            { name: "Питание", amount: 220 },
            { name: "Метро и такси", amount: 45 },
            { name: "Экскурсия в Саграда Фамилия", amount: 30 },
            { name: "Фламенко шоу", amount: 40 },
            { name: "Сувениры", amount: 25 }
        ],
        totalPrice: 1180,
        savedAt: new Date().toISOString()
    };
    
    // Фотоальбом — ОСТАВЛЯЕМ ПУСТЫМ
    const DEMO_PHOTOS = [];
    
    // Посещённые места — ОСТАВЛЯЕМ ПУСТЫМИ
    const DEMO_PLACES = [];
    
    // История бюджетов
    const DEMO_BUDGET_HISTORY = [
        {
            amountEUR: 2500,
            amountConverted: 2500,
            date: "2025-05-01T10:00:00.000Z",
            spentEUR: 1520
        },
        {
            amountEUR: 1800,
            amountConverted: 1800,
            date: "2025-06-10T12:00:00.000Z",
            spentEUR: 715
        },
        {
            amountEUR: 3500,
            amountConverted: 3500,
            date: "2025-03-20T09:00:00.000Z",
            spentEUR: 2630
        }
    ];
    
    // Расходы на главной странице (демо-виджет)
    const DEMO_EXPENSES = [
        { name: "Обед в кафе", amount: 24.50 },
        { name: "Билет на поезд", amount: 12.30 },
        { name: "Отель (ночь)", amount: 89.00 },
        { name: "Такси до аэропорта", amount: 15.00 },
        { name: "Ужин в ресторане", amount: 45.00 }
    ];
    
    // Функция для сохранения данных пользователя
    function initDemoAccount() {
        // Проверяем, существует ли уже пользователь в системе
        let users = [];
        const storedUsers = localStorage.getItem(STORAGE_USERS);
        
        if (storedUsers) {
            users = JSON.parse(storedUsers);
        }
        
        const existingUser = users.find(u => u.email === DEMO_USER.email);
        
        if (!existingUser) {
            // Добавляем демо-пользователя в список пользователей
            users.push(DEMO_USER);
            localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
            console.log('✅ Демо-аккаунт Александры Багаевой создан');
        } else {
            console.log('🔄 Демо-аккаунт Александры Багаевой уже существует, обновляем данные...');
        }
        
        // Сохраняем или обновляем все данные пользователя
        const email = DEMO_USER.email;
        
        // Путешествия (туры)
        localStorage.setItem(`user_saved_tours_${email}`, JSON.stringify(DEMO_TOURS));
        
        // Настройки
        localStorage.setItem(`user_settings_${email}`, JSON.stringify(DEMO_SETTINGS));
        
        // Профиль
        localStorage.setItem(`user_profile_${email}`, JSON.stringify(DEMO_PROFILE));
        
        // Чек-лист
        localStorage.setItem(`travel_checklist_${email}`, JSON.stringify(DEMO_CHECKLIST));
        
        // Бюджет
        localStorage.setItem('travel_budget', DEMO_BUDGET.toString());
        
        // Бюджеты по категориям
        localStorage.setItem(`category_budgets`, JSON.stringify(DEMO_CATEGORY_BUDGETS));
        
        // Текущий тур
        localStorage.setItem(`current_user_tour_${email}`, JSON.stringify(DEMO_CURRENT_TOUR));
        
        // Фотоальбом — ПУСТОЙ
        localStorage.setItem(`user_photos_${email}`, JSON.stringify(DEMO_PHOTOS));
        
        // Мои места — ПУСТЫЕ
        localStorage.setItem(`user_visited_places_${email}`, JSON.stringify(DEMO_PLACES));
        
        // История бюджетов
        localStorage.setItem('budget_history', JSON.stringify(DEMO_BUDGET_HISTORY));
        
        // Расходы для виджета на главной
        localStorage.setItem(`expenses_demo_${email}`, JSON.stringify(DEMO_EXPENSES));
        
        console.log('📦 Все данные демо-аккаунта загружены (фотоальбом и места — пустые)');
    }
    
    // Функция для автоматического входа в демо-аккаунт при клике на кнопку
    window.demoLogin = function() {
        initDemoAccount();
        
        // Создаём сессию
        const sessionData = {
            email: DEMO_USER.email,
            name: DEMO_USER.name,
            expires: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 дней
        };
        localStorage.setItem(STORAGE_SESSION, JSON.stringify(sessionData));
        
        // Перенаправляем на главную страницу
        window.location.href = 'туризм главная.html';
    };
    
    // Функция для проверки и инициализации демо-данных без автовхода
    window.initDemoData = function() {
        initDemoAccount();
        console.log('Демо-данные Александры Багаевой готовы к использованию!');
    };
    
    // Автоматическая инициализация при загрузке страницы (если нет другого пользователя)
    if (!localStorage.getItem(STORAGE_SESSION)) {
        initDemoAccount();
    }
    
    // Для совместимости со страницей входа — обработчик кнопки демо-входа
    document.addEventListener('DOMContentLoaded', function() {
        const demoBtn = document.getElementById('demoLoginBtn');
        if (demoBtn) {
            // Убираем старые обработчики, чтобы не дублировать
            const newDemoBtn = demoBtn.cloneNode(true);
            demoBtn.parentNode.replaceChild(newDemoBtn, demoBtn);
            newDemoBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.demoLogin();
            });
        }
    });
})();