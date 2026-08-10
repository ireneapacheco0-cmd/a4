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

    // Circular SVG Progress Chart animation
    const progressCircles = document.querySelectorAll('.chart-progress-circle');
    if (progressCircles.length > 0) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const percentage = parseInt(circle.getAttribute('data-percentage'), 10);
                    const circumference = 440; // 2 * pi * r (r=70)
                    const offset = circumference - (circumference * percentage / 100);
                    
                    circle.style.strokeDashoffset = offset;
                    
                    // Also rollup numbers inside the chart
                    const label = circle.closest('.chart-box').querySelector('.chart-label');
                    if (label) {
                        let val = 0;
                        const duration = 1500;
                        const step = Math.abs(Math.floor(duration / percentage));
                        const timer = setInterval(() => {
                            val += 1;
                            label.textContent = val + '%';
                            if (val >= percentage) {
                                label.textContent = percentage + '%';
                                clearInterval(timer);
                            }
                        }, Math.max(step, 10));
                    }
                    
                    chartObserver.unobserve(circle);
                }
            });
        }, {
            threshold: 0.5
        });

        progressCircles.forEach(c => chartObserver.observe(c));
    }
});
