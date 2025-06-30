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
    
    // 自动更新最新动态功能
    async function updateLatestNews() {
        // 只在首页执行
        if (!document.querySelector('.news')) return;
        
        try {
            // 获取最新的学术成果
            const publicationsResponse = await fetch('publications.html');
            const publicationsHtml = await publicationsResponse.text();
            const publicationsTemp = document.createElement('div');
            publicationsTemp.innerHTML = publicationsHtml;
            const publications = [];
            
            publicationsTemp.querySelectorAll('.publication-item').forEach(item => {
                const year = item.querySelector('.publication-year').textContent;
                const title = item.querySelector('h3').textContent;
                const description = item.querySelector('.journal').textContent;
                
                publications.push({
                    date: year,
                    title: `论文：${title}`,
                    description: description,
                    type: 'publication'
                });
            });
            
            // 获取最新的项目
            const projectsResponse = await fetch('projects.html');
            const projectsHtml = await projectsResponse.text();
            const projectsTemp = document.createElement('div');
            projectsTemp.innerHTML = projectsHtml;
            const projects = [];
            
            projectsTemp.querySelectorAll('.project-card').forEach(item => {
                const title = item.querySelector('h3').textContent;
                const description = item.querySelector('.project-description').textContent.trim();
                
                projects.push({
                    date: '2023年', // 假设所有项目都是2023年的
                    title: `项目：${title}`,
                    description: description,
                    type: 'project'
                });
            });
            
            // 获取最新的博客
            const blogResponse = await fetch('blog.html');
            const blogHtml = await blogResponse.text();
            const blogTemp = document.createElement('div');
            blogTemp.innerHTML = blogHtml;
            const blogs = [];
            
            blogTemp.querySelectorAll('.blog-card').forEach(item => {
                const date = item.querySelector('.blog-date').textContent;
                const title = item.querySelector('h3').textContent;
                const description = item.querySelector('.blog-excerpt').textContent.trim();
                
                blogs.push({
                    date: date,
                    title: `博客：${title}`,
                    description: description,
                    type: 'blog'
                });
            });
            
            // 合并所有内容并按日期排序
            const allItems = [...publications, ...projects, ...blogs];
            
            // 将日期转换为可比较的格式进行排序
            function convertDateForSorting(dateStr) {
                // 处理"2023年11月15日"格式
                if (dateStr.includes('月') && dateStr.includes('日')) {
                    const year = parseInt(dateStr.match(/\d+(?=年)/)[0]);
                    const month = parseInt(dateStr.match(/\d+(?=月)/)[0]) - 1; // 月份从0开始
                    const day = parseInt(dateStr.match(/\d+(?=日)/)[0]);
                    return new Date(year, month, day).getTime();
                }
                // 处理仅有年份"2023年"格式
                else if (dateStr.includes('年')) {
                    const year = parseInt(dateStr.match(/\d+(?=年)/)[0]);
                    return new Date(year, 0, 1).getTime();
                }
                // 处理其他可能的格式
                return new Date(dateStr).getTime();
            }
            
            allItems.sort((a, b) => {
                return convertDateForSorting(b.date) - convertDateForSorting(a.date);
            });
            
            // 获取最新的三个项目
            const latestItems = allItems.slice(0, 3);
            
            // 更新DOM
            const newsContainer = document.querySelector('.news-items');
            if (newsContainer) {
                newsContainer.innerHTML = '';
                
                latestItems.forEach(item => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item';
                    newsItem.innerHTML = `
                        <div class="news-date">${item.date}</div>
                        <div class="news-content">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    `;
                    newsContainer.appendChild(newsItem);
                });
            }
        } catch (error) {
            console.error('更新最新动态时出错：', error);
        }
    }
    
    // 执行最新动态更新
    updateLatestNews();
}); 