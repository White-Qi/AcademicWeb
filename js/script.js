document.addEventListener('DOMContentLoaded', () => {
    // 导航栏响应式菜单
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // 切换导航菜单
            nav.classList.toggle('nav-active');
            
            // 导航链接动画
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // 汉堡按钮动画
            burger.classList.toggle('toggle');
        });
    }
    
    // 过滤功能（用于项目、出版物和博客页面）
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 给当前按钮添加active类
            button.classList.add('active');
            
            // 获取过滤类别
            const filterValue = button.getAttribute('data-filter');
            
            // 根据页面不同选择不同的项目集合
            let items;
            if (document.querySelector('.publication-list')) {
                items = document.querySelectorAll('.publication-item');
            } else if (document.querySelector('.project-grid')) {
                items = document.querySelectorAll('.project-card');
            } else if (document.querySelector('.blog-grid')) {
                items = document.querySelectorAll('.blog-card');
            }
            
            if (items) {
                // 过滤项目
                if (filterValue === 'all') {
                    items.forEach(item => {
                        item.style.display = 'flex';
                    });
                } else {
                    items.forEach(item => {
                        if (item.classList.contains(filterValue)) {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            }
        });
    });
    
    // 博客搜索功能
    const blogSearch = document.getElementById('blog-search');
    const searchBtn = document.getElementById('search-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (searchBtn && blogSearch) {
        searchBtn.addEventListener('click', () => {
            performSearch();
        });
        
        blogSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        function performSearch() {
            const searchTerm = blogSearch.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || tags.some(tag => tag.includes(searchTerm))) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    }
    
    // 滚动到顶部按钮
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.classList.add('scroll-top-btn');
    document.body.appendChild(scrollButton);
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    // 为滚动到顶部按钮添加样式
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            font-size: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .scroll-top-btn:hover {
            background-color: var(--secondary-color);
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
}); 