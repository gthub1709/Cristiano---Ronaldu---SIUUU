// Инициализация AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Прелоадер
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Переключение темы
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.querySelector('i').classList.toggle('fa-moon');
    themeToggle.querySelector('i').classList.toggle('fa-sun');
});

// Мобильное меню
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Закрываем мобильное меню при клике
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Активная навигация при прокрутке
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Модальное окно для проектов
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const projectButtons = document.querySelectorAll('.project-btn');

projectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectCard = button.closest('.project-card');
        const projectInfo = projectCard.querySelector('.project-info').cloneNode(true);
        modal.querySelector('.modal-body').innerHTML = '';
        modal.querySelector('.modal-body').appendChild(projectInfo);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Анимация прогресс-баров
const skillCards = document.querySelectorAll('.skill-card');

const animateProgressBars = () => {
    skillCards.forEach(card => {
        const progressBar = card.querySelector('.progress-bar');
        const width = progressBar.style.width;
        progressBar.style.width = '0';
        setTimeout(() => {
            progressBar.style.width = width;
        }, 200);
    });
};

// Анимация при появлении в поле зрения
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills-grid')) {
                animateProgressBars();
            }
        }
    });
}, observerOptions);

document.querySelector('.skills-grid')?.forEach(grid => observer.observe(grid));

// Параллакс эффект для hero секции
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Анимация формы
const form = document.querySelector('.contact-form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Обработка отправки формы
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Анимация кнопки
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitButton.disabled = true;

    // Имитация отправки данных
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
        form.reset();
        
        setTimeout(() => {
            submitButton.innerHTML = 'Отправить';
            submitButton.disabled = false;
        }, 2000);
    }, 1500);
});

// Анимация карточек проектов при наведении
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Центр карточки
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Отклонение от центра
        const deltaX = x - centerX;
        const deltaY = y - centerY;

        // Рассчитываем углы поворота (регулируйте множители для интенсивности эффекта)
        const rotateY = (deltaX / centerX) * 10; // Поворот вокруг оси Y
        const rotateX = (deltaY / centerY) * -10; // Поворот вокруг оси X

        // Применяем трансформацию
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        // Возвращаем карточку в исходное состояние
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Добавление эффекта печатающегося текста для подзаголовка
const subtitle = document.querySelector('.subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
};

// Запуск анимации печатающегося текста после загрузки страницы
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

