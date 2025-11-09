// DevSahara Enhanced Navigation System
class NavigationSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupStickyNav();
        this.setupMobileMenu();
        this.setupUserDropdown();
        this.setupActiveLinks();
        this.setupGitHubFeatures();
    }

    setupStickyNav() {
        const nav = document.querySelector('nav');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    setupMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                navLinks.classList.toggle('show');
            });

            // إغلاق القائمة عند النقر خارجها
            document.addEventListener('click', (e) => {
                if (!e.target.closest('nav') && navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                }
            });
        }
    }

    setupUserDropdown() {
        const userDropdown = document.querySelector('.user-dropdown');
        const userMenu = document.querySelector('.user-menu');
        
        if (userDropdown && userMenu) {
            userDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
                userMenu.classList.toggle('show');
            });

            // إغلاق القائمة عند النقر خارجها
            document.addEventListener('click', () => {
                userMenu.classList.remove('show');
            });
        }
    }

    setupActiveLinks() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a, .sidebar-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage.includes(href.replace('.html', '')))) {
                link.classList.add('active');
            }
        });
    }

    setupGitHubFeatures() {
        this.setupCodeCopy();
        this.setupFileViewer();
        this.setupTabSystem();
    }

    setupCodeCopy() {
        // إضافة أزرار نسخ الكود
        document.querySelectorAll('.code-content').forEach(codeBlock => {
            const copyButton = document.createElement('button');
            copyButton.className = 'btn btn-secondary';
            copyButton.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.3rem 0.6rem; font-size: 0.8rem;';
            copyButton.innerHTML = '📋 Copy';
            
            copyButton.addEventListener('click', () => {
                const code = codeBlock.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    copyButton.innerHTML = '✅ Copied!';
                    setTimeout(() => {
                        copyButton.innerHTML = '📋 Copy';
                    }, 2000);
                });
            });

            const toolbar = codeBlock.previousElementSibling;
            if (toolbar && toolbar.classList.contains('code-toolbar')) {
                toolbar.appendChild(copyButton);
            }
        });
    }

    setupFileViewer() {
        // محاكاة عرض الملفات مثل GitHub
        document.querySelectorAll('.file-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const fileName = item.dataset.file;
                this.showFileContent(fileName);
            });
        });
    }

    setupTabSystem() {
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                this.switchTab(tabId, button);
            });
        });
    }

    switchTab(tabId, clickedButton) {
        // إخفاء جميع المحتويات
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // إلغاء تنشيط جميع الأزرار
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        
        // إظهار المحتوى المحدد وتنشيط الزر
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.style.display = 'block';
            clickedButton.classList.add('active');
        }
    }

    showFileContent(fileName) {
        // محاكاة تحميل محتوى الملف
        console.log(`Loading file: ${fileName}`);
        // في التطبيق الحقيقي، قد تقوم بجلب المحتوى من الخادم
    }

    // دالة البحث GitHub-like
    setupSearch() {
        const searchInput = document.querySelector('.nav-search input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }
    }

    performSearch(query) {
        if (query.length > 2) {
            // محاكاة البحث
            console.log(`Searching for: ${query}`);
            // في التطبيق الحقيقي، قد تقوم بجلب النتائج من الخادم
        }
    }
}

// تهيئة نظام التنقل
const navigation = new NavigationSystem();
