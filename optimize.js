// optimize.js — полная адаптивная оптимизация TravelBudget
// Подключите этот файл на всех страницах перед закрывающим тегом </body>
// Добавьте: <script src="optimize.js"></script>

(function() {
    'use strict';

    // ========== 1. АДАПТИВНАЯ МОБИЛЬНАЯ НАВИГАЦИЯ (улучшенная) ==========
    function enhanceMobileMenu() {
        // Создаём улучшенное мобильное меню, если его нет или оно некорректно
        if (!document.querySelector('.mobile-nav-enhanced')) {
            const existingMobileNav = document.querySelector('.mobile-nav');
            const existingOverlay = document.querySelector('.mobile-nav-overlay');
            const burgerBtn = document.getElementById('burgerMenu');
            
            if (!burgerBtn) return;
            
            // Удаляем старые нерабочие элементы, если они есть
            if (existingMobileNav && !existingMobileNav.classList.contains('mobile-nav-enhanced')) {
                existingMobileNav.remove();
            }
            if (existingOverlay) existingOverlay.remove();
            
            // Создаём новое улучшенное меню
            const overlay = document.createElement('div');
            overlay.className = 'mobile-overlay-enhanced';
            overlay.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
                z-index: 998; opacity: 0; visibility: hidden;
                transition: all 0.3s ease; cursor: pointer;
            `;
            
            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu-enhanced';
            mobileMenu.style.cssText = `
                position: fixed; top: 0; left: -85%; max-width: 320px; width: 80%;
                height: 100%; background: white; z-index: 999;
                padding: 80px 24px 32px; box-shadow: 4px 0 24px rgba(0,0,0,0.15);
                transition: left 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1);
                overflow-y: auto; display: flex; flex-direction: column;
                gap: 8px; border-radius: 0 24px 24px 0;
            `;
            
            // Копируем навигационные ссылки из существующей навигации
            const desktopNav = document.querySelector('.desktop-nav');
            const currentLinks = [];
            
            if (desktopNav) {
                const links = desktopNav.querySelectorAll('.nav-link, .dropdown');
                links.forEach(link => {
                    if (link.classList && link.classList.contains('dropdown')) {
                        const btn = link.querySelector('.dropdown-btn');
                        const dropdownContent = link.querySelector('.dropdown-content');
                        if (btn && dropdownContent) {
                            const items = dropdownContent.querySelectorAll('a');
                            items.forEach(item => {
                                currentLinks.push({ href: item.href, text: item.textContent.trim(), icon: item.querySelector('i')?.className || 'fas fa-circle' });
                            });
                        }
                    } else if (link.tagName === 'A') {
                        currentLinks.push({ href: link.href, text: link.textContent.trim(), icon: 'fas fa-chevron-right' });
                    }
                });
            }
            
            // Добавляем ссылки в меню
            const uniqueLinks = new Map();
            currentLinks.forEach(link => {
                if (!uniqueLinks.has(link.href) && link.href && !link.href.includes('#')) {
                    uniqueLinks.set(link.href, link);
                }
            });
            
            // Базовые ссылки, если не найдены
            if (uniqueLinks.size === 0) {
                const pages = [
                    { href: 'туризм главная.html', text: 'Главная', icon: 'fas fa-home' },
                    { href: 'туризм направления.html', text: 'Направления', icon: 'fas fa-plane' },
                    { href: 'туризм учет.html', text: 'Мой учёт', icon: 'fas fa-wallet' },
                    { href: 'туризм бюджет.html', text: 'Бюджет', icon: 'fas fa-chart-line' },
                    { href: 'туризм фото.html', text: 'Фотоальбом', icon: 'fas fa-camera' },
                    { href: 'туризм аналитика.html', text: 'Аналитика', icon: 'fas fa-chart-pie' },
                    { href: 'туризм кабинет.html', text: 'Личный кабинет', icon: 'fas fa-user' }
                ];
                pages.forEach(p => uniqueLinks.set(p.href, p));
            }
            
            let menuHTML = `
                <div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #e2edf2;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="logo-icon" style="width: 44px; height: 44px;"><i class="fas fa-compass"></i></div>
                        <span style="font-size: 1.3rem; font-weight: 800; background: linear-gradient(135deg,#1a2c3e,#1F6E8C); -webkit-background-clip:text; background-clip:text; color:transparent;">TravelBudget</span>
                    </div>
                </div>
                <div class="mobile-nav-links" style="display: flex; flex-direction: column; gap: 6px;">
            `;
            
            for (const link of uniqueLinks.values()) {
                const isActive = window.location.href.includes(link.href.split('/').pop());
                menuHTML += `
                    <a href="${link.href}" style="display: flex; align-items: center; gap: 14px; padding: 14px 16px; 
                        border-radius: 18px; background: ${isActive ? 'linear-gradient(135deg, #1F6E8C10, #2E9A7E10)' : 'transparent'};
                        color: ${isActive ? '#1F6E8C' : '#5a6e7a'}; font-weight: 500; text-decoration: none;
                        transition: all 0.2s; border: 1px solid ${isActive ? 'rgba(31,110,140,0.3)' : 'transparent'};"
                        onmouseenter="this.style.background='#f0f4f9'" onmouseleave="this.style.background='${isActive ? 'linear-gradient(135deg, #1F6E8C10, #2E9A7E10)' : 'transparent'}'">
                        <i class="${link.icon}" style="width: 24px; font-size: 1.1rem;"></i>
                        <span>${link.text}</span>
                        ${isActive ? '<i class="fas fa-check-circle" style="margin-left: auto; font-size: 0.8rem; color:#2E9A7E;"></i>' : ''}
                    </a>
                `;
            }
            
            // Добавляем кнопку выхода для авторизованных
            menuHTML += `
                </div>
                <div style="margin-top: auto; padding-top: 24px; border-top: 1px solid #e2edf2;">
                    <div id="mobileAuthState" style="display: flex; flex-direction: column; gap: 12px;">
                        <button id="mobileLogoutBtn" style="display: none; background: transparent; border: 1px solid #fee2e2; padding: 12px; border-radius: 60px; color: #ef4444; font-weight: 600; cursor: pointer; width: 100%;">
                            <i class="fas fa-sign-out-alt"></i> Выйти
                        </button>
                        <div id="mobileAuthButtons" style="display: flex; gap: 12px;">
                            <button onclick="window.location.href='туризм вход.html'" style="flex:1; background: transparent; border:1px solid #cbdde6; padding:12px; border-radius:60px; font-weight:600;">Вход</button>
                            <button onclick="window.location.href='туризм вход.html'" style="flex:1; background: linear-gradient(135deg,#1F6E8C,#2E9A7E); border:none; padding:12px; border-radius:60px; color:white; font-weight:600;">Регистрация</button>
                        </div>
                        <div id="mobileUserInfo" style="display: none; background: #f8fafc; padding: 12px 16px; border-radius: 60px; text-align: center;">
                            <span id="mobileUserName" style="font-weight: 700; color:#1F6E8C;"></span>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 20px; text-align: center; font-size: 0.7rem; color: #8a9aa8;">
                    <i class="fas fa-shield-alt"></i> TravelBudget v2.0
                </div>
            `;
            
            mobileMenu.innerHTML = menuHTML;
            
            const closeBtn = document.createElement('div');
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.style.cssText = `
                position: absolute; top: 20px; right: 20px; width: 36px; height: 36px;
                background: #f0f4f9; border-radius: 50%; display: flex; align-items: center;
                justify-content: center; cursor: pointer; font-size: 1.2rem; color: #5a6e7a;
                transition: all 0.2s;
            `;
            closeBtn.onclick = closeMobileMenuEnhanced;
            mobileMenu.prepend(closeBtn);
            
            document.body.appendChild(overlay);
            document.body.appendChild(mobileMenu);
            
            window.openMobileMenuEnhanced = function() {
                mobileMenu.style.left = '0';
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
                document.body.style.overflow = 'hidden';
            };
            
            window.closeMobileMenuEnhanced = function() {
                mobileMenu.style.left = '-85%';
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                document.body.style.overflow = '';
            };
            
            overlay.onclick = closeMobileMenuEnhanced;
            
            // Обновляем состояние авторизации в мобильном меню
            function updateMobileAuthUI() {
                const session = localStorage.getItem('travelbudget_session');
                let isLoggedIn = false;
                let userName = '';
                if (session) {
                    try {
                        const data = JSON.parse(session);
                        if (data.expires > Date.now()) {
                            isLoggedIn = true;
                            userName = data.name || data.email?.split('@')[0] || 'Пользователь';
                        } else {
                            localStorage.removeItem('travelbudget_session');
                        }
                    } catch(e) {}
                }
                
                const authBtns = document.getElementById('mobileAuthButtons');
                const userInfoDiv = document.getElementById('mobileUserInfo');
                const logoutBtn = document.getElementById('mobileLogoutBtn');
                const userNameSpan = document.getElementById('mobileUserName');
                
                if (authBtns && userInfoDiv && logoutBtn) {
                    if (isLoggedIn) {
                        authBtns.style.display = 'none';
                        userInfoDiv.style.display = 'block';
                        logoutBtn.style.display = 'block';
                        if (userNameSpan) userNameSpan.textContent = userName;
                        logoutBtn.onclick = () => {
                            localStorage.removeItem('travelbudget_session');
                            updateMobileAuthUI();
                            closeMobileMenuEnhanced();
                            window.location.reload();
                        };
                    } else {
                        authBtns.style.display = 'flex';
                        userInfoDiv.style.display = 'none';
                        logoutBtn.style.display = 'none';
                    }
                }
            }
            
            // Если есть бургер-меню, привязываем событие
            const burger = document.getElementById('burgerMenu');
            if (burger) {
                burger.removeEventListener('click', window.openMobileMenuEnhanced);
                burger.addEventListener('click', window.openMobileMenuEnhanced);
            }
            
            updateMobileAuthUI();
            
            // Добавляем стили для ссылок при наведении
            const style = document.createElement('style');
            style.textContent = `
                .mobile-nav-links a:active { transform: scale(0.98); }
                @media (max-width: 640px) {
                    .app-container { padding: 0 16px; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ========== 2. УЛУЧШЕНИЕ ТАЧ-СОБЫТИЙ И АДАПТИВНЫХ ШРИФТОВ ==========
    function enhanceTouchAndTypography() {
        // Увеличиваем области клика на мобильных
        if ('ontouchstart' in window) {
            const style = document.createElement('style');
            style.textContent = `
                button, .btn-login, .btn-register, .nav-link, .dropdown-btn, 
                .feature-card, .tour-card, .dest-card, .expense-item, .delete-expense {
                    cursor: pointer;
                    -webkit-tap-highlight-color: transparent;
                }
                button:active, .btn-login:active, .btn-register:active {
                    transform: scale(0.97);
                    transition: transform 0.05s;
                }
                input, select, textarea {
                    font-size: 16px !important;
                }
                h1 { font-size: clamp(1.8rem, 6vw, 3rem); }
                h2 { font-size: clamp(1.4rem, 5vw, 2rem); }
                .tour-title { font-size: clamp(1.5rem, 5vw, 2.2rem); }
                .stat-number { font-size: clamp(1.5rem, 4vw, 2.2rem); }
            `;
            document.head.appendChild(style);
        }
        
        // Адаптация сеток
        const grids = document.querySelectorAll('.features-grid, .tours-grid, .destinations-grid, .testimonials-grid, .gallery-grid');
        grids.forEach(grid => {
            if (grid) {
                const updateGrid = () => {
                    if (window.innerWidth <= 640) {
                        grid.style.gridTemplateColumns = '1fr';
                    } else if (window.innerWidth <= 1000) {
                        grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                    } else {
                        grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                    }
                };
                updateGrid();
                window.addEventListener('resize', updateGrid);
            }
        });
    }
    
    // ========== 3. ОПТИМИЗАЦИЯ СЕЛЕКТОРА ВАЛЮТ (глобальная синхронизация) ==========
    function syncCurrencySelector() {
        const selectors = document.querySelectorAll('#globalCurrencySelect, #currencySelect, .currency-selector select');
        const savedCurrency = localStorage.getItem('travelbudget_currency') || 'EUR';
        
        selectors.forEach(sel => {
            if (sel) {
                sel.value = savedCurrency;
                sel.addEventListener('change', (e) => {
                    const newCurrency = e.target.value;
                    localStorage.setItem('travelbudget_currency', newCurrency);
                    // Обновляем все селекторы на странице
                    document.querySelectorAll('#globalCurrencySelect, #currencySelect, .currency-selector select').forEach(s => {
                        if (s !== sel) s.value = newCurrency;
                    });
                    // Триггерим событие для обновления цен
                    window.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency: newCurrency } }));
                });
            }
        });
        
        // Восстанавливаем текущую валюту на страницах с турами
        window.addEventListener('currencyChanged', (e) => {
            if (typeof window.updateCurrencyUI === 'function') {
                window.updateCurrencyUI();
            }
            // Перерисовываем страницу при необходимости
            const event = new Event('storage');
            window.dispatchEvent(event);
        });
    }
    
    // ========== 4. УЛУЧШЕННАЯ АДАПТАЦИЯ ТАБЛИЦ И КАРТОЧЕК ==========
    function optimizeTablesAndCards() {
        // Делаем все таблицы горизонтально прокручиваемыми
        const tables = document.querySelectorAll('table, .expense-list, .expense-item-custom');
        tables.forEach(table => {
            if (table && !table.parentElement?.classList?.contains('table-responsive')) {
                const wrapper = document.createElement('div');
                wrapper.style.cssText = 'overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 12px 0;';
                table.parentNode?.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
        
        // Улучшаем отображение статистики на мобильных
        const statsGrids = document.querySelectorAll('.stats-grid, .photo-stats');
        statsGrids.forEach(grid => {
            if (grid && window.innerWidth <= 640) {
                grid.style.gridTemplateColumns = '1fr';
                grid.style.gap = '12px';
            }
        });
    }
    
    // ========== 5. ФИКСАЦИЯ ФОРМ И ИНПУТОВ ДЛЯ МОБИЛЬНЫХ ==========
    function enhanceForms() {
        // Отключаем зум на инпутах (уже сделано через font-size)
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (!input.hasAttribute('data-optimized')) {
                input.setAttribute('data-optimized', 'true');
                input.addEventListener('touchstart', (e) => {
                    e.stopPropagation();
                }, { passive: false });
            }
        });
        
        // Автоматическое сохранение состояния форм в localStorage
        const forms = document.querySelectorAll('form, .add-form, .add-form-custom');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(inp => {
                if (inp.type !== 'password' && inp.type !== 'file') {
                    const key = `form_${window.location.pathname}_${inp.name || inp.id || inp.placeholder}`;
                    const saved = localStorage.getItem(key);
                    if (saved && !inp.value) inp.value = saved;
                    inp.addEventListener('input', () => {
                        if (inp.value) localStorage.setItem(key, inp.value);
                        else localStorage.removeItem(key);
                    });
                }
            });
        });
    }
    
    // ========== 6. АДАПТИВНОЕ МЕНЮ НАВИГАЦИИ ДЛЯ ДЕСКТОПА (дропдауны на тач) ==========
    function enhanceDropdownsForTouch() {
        if ('ontouchstart' in window) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                const btn = dropdown.querySelector('.dropdown-btn');
                if (btn && !dropdown.hasAttribute('data-touch-enhanced')) {
                    dropdown.setAttribute('data-touch-enhanced', 'true');
                    let timeout;
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Закрываем все другие дропдауны
                        document.querySelectorAll('.dropdown.open').forEach(d => {
                            if (d !== dropdown) d.classList.remove('open');
                        });
                        dropdown.classList.toggle('open');
                        if (timeout) clearTimeout(timeout);
                        timeout = setTimeout(() => {
                            dropdown.classList.remove('open');
                        }, 5000);
                    });
                    
                    // Добавляем стиль для открытого состояния
                    const style = document.createElement('style');
                    style.textContent = `
                        .dropdown.open .dropdown-content {
                            opacity: 1 !important;
                            visibility: visible !important;
                            transform: translateY(0) !important;
                        }
                        @media (max-width: 900px) {
                            .dropdown .dropdown-content {
                                position: fixed;
                                top: auto;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                width: 100%;
                                border-radius: 24px 24px 0 0;
                                max-height: 60vh;
                                overflow-y: auto;
                                transform: translateY(100%);
                            }
                            .dropdown.open .dropdown-content {
                                transform: translateY(0) !important;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                    
                    document.addEventListener('click', () => {
                        dropdown.classList.remove('open');
                    });
                }
            });
        }
    }
    
    // ========== 7. ОПТИМИЗАЦИЯ ЗАГРУЗКИ ИЗОБРАЖЕНИЙ (ленивая загрузка) ==========
    function lazyLoadImages() {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            if (img.src && !img.src.includes('data:image')) {
                img.setAttribute('loading', 'lazy');
                // Добавляем fallback для старых браузеров
                if (!img.getAttribute('decoding')) img.setAttribute('decoding', 'async');
            }
        });
    }
    
    // ========== 8. АДАПТИВНЫЙ РАЗМЕР ДЛЯ МОДАЛЬНЫХ ОКОН ==========
    function fixModals() {
        const modals = document.querySelectorAll('.modal, .viewer-modal');
        modals.forEach(modal => {
            if (modal && !modal.hasAttribute('data-adaptive-fixed')) {
                modal.setAttribute('data-adaptive-fixed', 'true');
                const updateModalSize = () => {
                    if (modal.classList.contains('active') || modal.style.display === 'flex') {
                        const content = modal.querySelector('.modal-content');
                        if (content && window.innerWidth <= 640) {
                            content.style.width = '92%';
                            content.style.maxWidth = '92%';
                            content.style.padding = '20px';
                        } else if (content) {
                            content.style.width = '';
                            content.style.maxWidth = '';
                        }
                    }
                };
                const observer = new MutationObserver(updateModalSize);
                observer.observe(modal, { attributes: true, attributeFilter: ['class', 'style'] });
                updateModalSize();
            }
        });
    }
    
    // ========== 9. ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ ==========
    function smoothAnchors() {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }
    
    // ========== 10. FIX ДЛЯ GOOGLE FONTS И ПРОИЗВОДИТЕЛЬНОСТИ ==========
    function optimizeFonts() {
        const links = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        links.forEach(link => {
            if (link.getAttribute('media') !== 'print') {
                link.setAttribute('media', 'print');
                link.setAttribute('onload', "this.media='all'");
            }
        });
    }
    
    // ========== 11. СОХРАНЕНИЕ СОСТОЯНИЯ ВКЛАДОК ==========
    function preserveTabState() {
        const tabs = document.querySelectorAll('.profile-tab, .tab-btn, [data-tab]');
        if (tabs.length) {
            const activeTab = localStorage.getItem('active_tab_' + window.location.pathname);
            if (activeTab) {
                const targetTab = document.querySelector(`[data-tab="${activeTab}"], .profile-tab:nth-child(${activeTab})`);
                if (targetTab && typeof targetTab.click === 'function') {
                    setTimeout(() => targetTab.click(), 100);
                }
            }
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabId = tab.getAttribute('data-tab') || tab.innerText.trim();
                    if (tabId) localStorage.setItem('active_tab_' + window.location.pathname, tabId);
                });
            });
        }
    }
    
    // ========== 12. ОБРАБОТЧИК ИЗМЕНЕНИЯ ОРИЕНТАЦИИ ==========
    function handleOrientationChange() {
        window.addEventListener('resize', () => {
            setTimeout(() => {
                // Обновляем отображение графиков если есть Chart.js
                if (window.dispatchEvent) {
                    window.dispatchEvent(new Event('resize'));
                }
                // Перерисовываем слайдеры
                const event = new Event('orientationChange');
                window.dispatchEvent(event);
            }, 100);
        });
    }
    
    // ========== 13. ФИКСАЦИЯ ШАПКИ ДЛЯ МОБИЛЬНЫХ ==========
    function fixStickyHeader() {
        const navbar = document.querySelector('.navbar');
        if (navbar && window.innerWidth <= 768) {
            navbar.style.position = 'sticky';
            navbar.style.top = '0';
            navbar.style.backgroundColor = 'rgba(245, 249, 252, 0.96)';
            navbar.style.backdropFilter = 'blur(12px)';
            navbar.style.zIndex = '100';
        }
    }
    
    // ========== 14. УЛУЧШЕНИЕ ВВОДА ЧИСЕЛ (фильтрация) ==========
    function enhanceNumberInputs() {
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('wheel', (e) => e.preventDefault());
            input.addEventListener('keydown', (e) => {
                if (e.key === 'e' || e.key === 'E') e.preventDefault();
            });
        });
    }
    
    // ========== 15. ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ==========
    function initOptimization() {
        // Ждём загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                enhanceMobileMenu();
                enhanceTouchAndTypography();
                syncCurrencySelector();
                optimizeTablesAndCards();
                enhanceForms();
                enhanceDropdownsForTouch();
                lazyLoadImages();
                fixModals();
                smoothAnchors();
                optimizeFonts();
                preserveTabState();
                handleOrientationChange();
                fixStickyHeader();
                enhanceNumberInputs();
            });
        } else {
            enhanceMobileMenu();
            enhanceTouchAndTypography();
            syncCurrencySelector();
            optimizeTablesAndCards();
            enhanceForms();
            enhanceDropdownsForTouch();
            lazyLoadImages();
            fixModals();
            smoothAnchors();
            optimizeFonts();
            preserveTabState();
            handleOrientationChange();
            fixStickyHeader();
            enhanceNumberInputs();
        }
        
        // Повторная оптимизация после динамических изменений (для SPA-подобных переходов)
        const observer = new MutationObserver(() => {
            optimizeTablesAndCards();
            fixModals();
            lazyLoadImages();
            enhanceNumberInputs();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    // Запускаем оптимизацию
    initOptimization();
    
    // Экспортируем некоторые функции глобально для использования из консоли
    window.TravelBudgetOptimizer = {
        refresh: () => {
            optimizeTablesAndCards();
            fixModals();
            lazyLoadImages();
        },
        forceMenuClose: () => {
            if (window.closeMobileMenuEnhanced) window.closeMobileMenuEnhanced();
        }
    };
})();