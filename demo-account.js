// demo-account.js
// Демо-аккаунт для TravelBudget - Александра Багаева
// ПОЛНАЯ ВЕРСИЯ - без фотографий

(function() {
    'use strict';

    // ========== ДАННЫЕ ДЕМО-АККАУНТА ==========
    const DEMO_USER = {
        id: 'demo_alexandra',
        name: 'Александра Багаева',
        email: 'alexandra@travelbudget.demo',
        password: 'demo123',
        avatar: null
    };

    // ========== ПОСЕЩЁННЫЕ МЕСТА (без фото) ==========
    const DEMO_PLACES = [
        { id: 2001, name: 'Вилла на воде, Мальдивы', date: '2025-02-15', description: 'Незабываемые 7 дней в раю! Жили в вилле с прозрачным полом, видели акул и скатов. Обязательно вернёмся!', image: null, createdAt: '2025-02-22T00:00:00Z' },
        { id: 2002, name: 'Юнгфрауйох, Швейцария', date: '2025-01-10', description: 'Верх Европы! Поднялись на 3454 метра, гуляли по леднику. Впечатляет!', image: null, createdAt: '2025-01-15T00:00:00Z' },
        { id: 2003, name: 'Пхи-Пхи, Таиланд', date: '2025-03-06', description: 'Бухта Майя Бэй оправдала все ожидания. Изумрудная вода, белый песок, тропические рыбы!', image: null, createdAt: '2025-03-10T00:00:00Z' },
        { id: 2004, name: 'Позитано, Италия', date: '2024-10-21', description: 'Город-открытка! Разноцветные домики, спускающиеся к морю. Магия!', image: null, createdAt: '2024-10-25T00:00:00Z' },
        { id: 2005, name: 'Фусими Инари, Киото', date: '2024-11-16', description: 'Тысячи красных ворот — одно из самых фотогеничных мест в Японии.', image: null, createdAt: '2024-11-20T00:00:00Z' }
    ];

    // ========== СОХРАНЁННЫЕ ТУРЫ (5 шт) ==========
    const DEMO_TOURS = [
        { id: 1, name: 'Мальдивский рай', country: 'Мальдивы', days: 7, totalPrice: 2500, savedAt: '2025-02-01T10:00:00Z', status: 'saved', expenses: [{ name: 'Авиабилеты', amount: 800 }, { name: 'Проживание', amount: 1200 }, { name: 'Питание', amount: 350 }, { name: 'Трансфер', amount: 80 }, { name: 'Экскурсии', amount: 70 }] },
        { id: 2, name: 'Швейцарские Альпы', country: 'Швейцария', days: 7, totalPrice: 1800, savedAt: '2025-01-05T14:30:00Z', status: 'saved', expenses: [{ name: 'Авиабилеты', amount: 420 }, { name: 'Проживание', amount: 700 }, { name: 'Питание', amount: 320 }, { name: 'Ж/д проезд', amount: 280 }, { name: 'Активности', amount: 80 }] },
        { id: 3, name: 'Таиланд: вкус экзотики', country: 'Таиланд', days: 10, totalPrice: 800, savedAt: '2025-03-01T09:00:00Z', status: 'saved', expenses: [{ name: 'Авиабилеты', amount: 350 }, { name: 'Проживание', amount: 300 }, { name: 'Питание', amount: 100 }, { name: 'Трансферы', amount: 50 }, { name: 'Экскурсии', amount: 120 }] },
        { id: 4, name: 'Итальянская Ривьера', country: 'Италия', days: 8, totalPrice: 1200, savedAt: '2024-10-15T11:00:00Z', status: 'saved', expenses: [{ name: 'Авиабилеты', amount: 300 }, { name: 'Проживание', amount: 650 }, { name: 'Питание', amount: 150 }, { name: 'Трансферы', amount: 50 }, { name: 'Экскурсии', amount: 50 }] },
        { id: 6, name: 'Япония: страна восходящего солнца', country: 'Япония', days: 10, totalPrice: 2200, savedAt: '2024-11-10T13:00:00Z', status: 'saved', expenses: [{ name: 'Авиабилеты', amount: 800 }, { name: 'JR Pass', amount: 400 }, { name: 'Проживание', amount: 700 }, { name: 'Питание', amount: 200 }, { name: 'Экскурсии', amount: 100 }] }
    ];

    // ========== ТЕКУЩИЙ АКТИВНЫЙ ТУР ==========
    const DEMO_CURRENT_TOUR = {
        name: 'Моё большое европейское турне',
        country: 'Европа',
        days: 14,
        totalPrice: 833,
        savedAt: new Date().toISOString(),
        expenses: [
            { name: 'Обед в кафе Париж', amount: 45 },
            { name: 'Билет на Эйфелеву башню', amount: 25 },
            { name: 'Отель IBIS Париж', amount: 120 },
            { name: 'Поезд Париж-Амстердам', amount: 65 },
            { name: 'Музей Ван Гога', amount: 20 },
            { name: 'Отель Амстердам', amount: 95 },
            { name: 'Ужин в ресторане', amount: 78 },
            { name: 'Экскурсия по каналам', amount: 35 },
            { name: 'Авиабилеты Москва-Париж', amount: 350 }
        ]
    };

    // ========== НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ ==========
    const DEMO_SETTINGS = { defaultCurrency: 'EUR', defaultDays: 7 };

    // ========== ЧЕК-ЛИСТ ==========
    const DEMO_CHECKLIST = {
        documents: [{ name: 'Загранпаспорт', checked: true }, { name: 'Внутренний паспорт', checked: true }, { name: 'Авиабилеты', checked: true }, { name: 'Страховка', checked: true }, { name: 'Отель/бронирование', checked: true }, { name: 'Виза', checked: true }, { name: 'Водительские права', checked: true }, { name: 'Международные права', checked: true }],
        clothes: [{ name: 'Футболки (5 шт)', checked: true }, { name: 'Шорты/юбки', checked: true }, { name: 'Джинсы/брюки', checked: true }, { name: 'Куртка/ветровка', checked: true }, { name: 'Купальник/плавки', checked: true }, { name: 'Головной убор', checked: true }, { name: 'Обувь (2-3 пары)', checked: true }, { name: 'Носки', checked: true }, { name: 'Бельё', checked: true }, { name: 'Вечернее платье', checked: true }],
        electronics: [{ name: 'Телефон', checked: true }, { name: 'Зарядное устройство', checked: true }, { name: 'Power Bank', checked: true }, { name: 'Наушники', checked: true }, { name: 'Фотоаппарат', checked: true }, { name: 'Адаптер для розетки', checked: true }, { name: 'Ноутбук/планшет', checked: false }, { name: 'GoPro', checked: true }],
        hygiene: [{ name: 'Зубная щётка', checked: true }, { name: 'Зубная паста', checked: true }, { name: 'Шампунь', checked: true }, { name: 'Гель для душа', checked: true }, { name: 'Дезодорант', checked: true }, { name: 'Расчёска', checked: true }, { name: 'Солнцезащитный крем', checked: true }, { name: 'Средство от насекомых', checked: true }, { name: 'Макияж', checked: true }],
        medicine: [{ name: 'Обезболивающее', checked: true }, { name: 'Жаропонижающее', checked: true }, { name: 'Сорбенты', checked: true }, { name: 'Антигистаминные', checked: true }, { name: 'Пластыри', checked: true }, { name: 'Бинт', checked: true }, { name: 'Личные лекарства', checked: true }],
        other: [{ name: 'Солнцезащитные очки', checked: true }, { name: 'Зонт', checked: true }, { name: 'Рюкзак/сумка', checked: true }, { name: 'Плед в самолёт', checked: true }, { name: 'Подушка для шеи', checked: true }, { name: 'Закуски в дорогу', checked: true }, { name: 'Бутылка для воды', checked: true }, { name: 'Пляжное полотенце', checked: true }]
    };

    // ========== ПРОФИЛЬ ==========
    const DEMO_PROFILE = { name: 'Александра Багаева', email: 'alexandra@travelbudget.demo', avatar: null };

    // ========== БЮДЖЕТ ==========
    const DEMO_BUDGET = 2500;

    // ========== ГЛАВНАЯ ФУНКЦИЯ ЗАГРУЗКИ ==========
    function loadAllDemoData() {
        const session = localStorage.getItem('travelbudget_session');
        if (!session) return false;
        
        let sessionData;
        try {
            sessionData = JSON.parse(session);
        } catch(e) { return false; }
        
        if (sessionData.email !== DEMO_USER.email) return false;
        
        const email = DEMO_USER.email;
        
        const users = JSON.parse(localStorage.getItem('travelbudget_users') || '[]');
        if (!users.find(u => u.email === email)) {
            users.push(DEMO_USER);
            localStorage.setItem('travelbudget_users', JSON.stringify(users));
        }
        
        // Фото больше не загружаем — массив DEMO_PHOTOS удалён
        
        if (!localStorage.getItem(`user_visited_places_${email}`)) {
            localStorage.setItem(`user_visited_places_${email}`, JSON.stringify(DEMO_PLACES));
        }
        
        if (!localStorage.getItem(`user_saved_tours_${email}`)) {
            localStorage.setItem(`user_saved_tours_${email}`, JSON.stringify(DEMO_TOURS));
        }
        
        if (!localStorage.getItem(`current_user_tour_${email}`)) {
            localStorage.setItem(`current_user_tour_${email}`, JSON.stringify(DEMO_CURRENT_TOUR));
        }
        
        if (!localStorage.getItem(`user_settings_${email}`)) {
            localStorage.setItem(`user_settings_${email}`, JSON.stringify(DEMO_SETTINGS));
        }
        
        if (!localStorage.getItem(`travel_checklist_${email}`)) {
            localStorage.setItem(`travel_checklist_${email}`, JSON.stringify(DEMO_CHECKLIST));
        }
        
        if (!localStorage.getItem(`user_profile_${email}`)) {
            localStorage.setItem(`user_profile_${email}`, JSON.stringify(DEMO_PROFILE));
        }
        
        if (!localStorage.getItem('travel_budget')) {
            localStorage.setItem('travel_budget', DEMO_BUDGET.toString());
        }
        
        if (!localStorage.getItem('travelbudget_currency')) {
            localStorage.setItem('travelbudget_currency', 'EUR');
        }
        
        console.log('✅ Все демо-данные загружены для:', email);
        return true;
    }
    
    function forceLoadDemoData() {
        const session = localStorage.getItem('travelbudget_session');
        if (session) {
            try {
                const sessionData = JSON.parse(session);
                if (sessionData.email === DEMO_USER.email) {
                    loadAllDemoData();
                }
            } catch(e) {}
        }
    }
    
    function resetDemoAccount() {
        if (confirm('Сбросить все демо-данные?')) {
            const email = DEMO_USER.email;
            localStorage.removeItem(`user_photos_${email}`);
            localStorage.removeItem(`user_visited_places_${email}`);
            localStorage.removeItem(`user_saved_tours_${email}`);
            localStorage.removeItem(`current_user_tour_${email}`);
            localStorage.removeItem(`user_settings_${email}`);
            localStorage.removeItem(`travel_checklist_${email}`);
            localStorage.removeItem(`user_profile_${email}`);
            localStorage.removeItem('travel_budget');
            
            loadAllDemoData();
            window.location.reload();
        }
    }
    
    function disableDemoMode() {
        if (confirm('Отключить демо-режим?')) {
            localStorage.setItem('demo_mode_disabled', 'true');
            localStorage.removeItem('travelbudget_session');
            window.location.reload();
        }
    }
    
    function enableDemoMode() {
        localStorage.removeItem('demo_mode_disabled');
        window.location.reload();
    }
    
    function isDemoModeEnabled() {
        const demoDisabled = localStorage.getItem('demo_mode_disabled');
        if (demoDisabled === 'true') return false;
        const session = localStorage.getItem('travelbudget_session');
        if (session) {
            try {
                const data = JSON.parse(session);
                return data.email === DEMO_USER.email;
            } catch(e) {}
        }
        return false;
    }
    
    function init() {
        forceLoadDemoData();
        
        window.addEventListener('storage', function(e) {
            if (e.key === 'travelbudget_session') {
                setTimeout(forceLoadDemoData, 100);
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    window.DemoAccount = {
        reset: resetDemoAccount,
        disable: disableDemoMode,
        enable: enableDemoMode,
        isActive: isDemoModeEnabled,
        user: DEMO_USER,
        reload: forceLoadDemoData
    };
    
    console.log('💡 Демо-аккаунт "Александра Багаева" готов! (без фото)');
})();