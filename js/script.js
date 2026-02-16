// 润创汇 - 交互脚本
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // 响应式调整
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.style.display = 'flex';
            } else {
                navMenu.style.display = 'none';
            }
        });
    }
    
    // 导航链接激活状态
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // 服务标签切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容面板
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `${tabId}-tab`) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // 表单提交处理
    const projectForm = document.getElementById('projectForm');
    const investorForm = document.getElementById('investorForm');
    
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // 这里可以添加实际的提交逻辑
                alert('项目方注册申请已提交！我们的顾问将在24小时内联系您。');
                this.reset();
            } else {
                alert('请填写所有必填字段！');
            }
        });
    }
    
    if (investorForm) {
        investorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            // 检查多选字段
            const industrySelect = document.getElementById('investor-industry');
            const stageSelect = document.getElementById('investor-stage');
            
            if (industrySelect && industrySelect.selectedOptions.length === 0) {
                isValid = false;
                industrySelect.style.borderColor = '#ef4444';
            } else if (industrySelect) {
                industrySelect.style.borderColor = '';
            }
            
            if (stageSelect && stageSelect.selectedOptions.length === 0) {
                isValid = false;
                stageSelect.style.borderColor = '#ef4444';
            } else if (stageSelect) {
                stageSelect.style.borderColor = '';
            }
            
            if (isValid) {
                // 这里可以添加实际的提交逻辑
                alert('投资方注册申请已提交！我们的团队将在24小时内联系您。');
                this.reset();
            } else {
                alert('请填写所有必填字段！');
            }
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 浮动元素动画
    const floatingElements = document.querySelectorAll('.element');
    floatingElements.forEach((element, index) => {
        // 初始位置偏移
        const offset = index * 0.5;
        element.style.animation = `float 3s ease-in-out ${offset}s infinite alternate`;
    });
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-20px); }
        }
        
        .element {
            animation: float 3s ease-in-out infinite alternate;
        }
    `;
    document.head.appendChild(style);
    
    // 统计数据动画
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }, 30);
    });
    
    console.log('润创汇网站已加载完成！');
});
