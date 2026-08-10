document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal observer
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-seen');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach((el) => {
            observer.observe(el);
        });
    }

    // Numerical counter roll-up animation
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-target'), 10);
                    let startValue = 0;
                    const duration = 1500; // 1.5s duration
                    const stepTime = Math.abs(Math.floor(duration / endValue));
                    
                    const timer = setInterval(() => {
                        startValue += 1;
                        target.textContent = startValue + (target.getAttribute('data-suffix') || '');
                        if (startValue >= endValue) {
                            target.textContent = endValue + (target.getAttribute('data-suffix') || '');
                            clearInterval(timer);
                        }
                    }, Math.max(stepTime, 10));
                    
                    counterObserver.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(c => counterObserver.observe(c));
    }
});
