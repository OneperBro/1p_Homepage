// ============================================
// ONEPERCENT Website V2 - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initCanvasAnimations();
});

// ============================================
// 1. SCROLL FADE ANIMATIONS
// ============================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-scroll-fade]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// ============================================
// 2. CANVAS ANIMATIONS
// ============================================
const canvasAnimations = {};

function initCanvasAnimations() {
    // 각 캔버스 초기화
    initHeroCanvas();
    initPhilosophyCanvas();
    initServiceCanvas();
    initProcessCanvas();
    initPortfolioCanvas();
    initContactCanvas();
}

// ============================================
// Hero Canvas - Colorful Particles
// ============================================
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const particleCount = 80;
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2.5 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = (1 - distance / 150) * 0.15;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Philosophy Canvas - Flowing Waves
// ============================================
function initPhilosophyCanvas() {
    const canvas = document.getElementById('philosophy-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let time = 0;
    const colors = ['#6366f1', '#8b5cf6', '#ec4899'];
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.01;
        
        colors.forEach((color, index) => {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            
            for (let x = 0; x < canvas.width; x += 5) {
                const y = canvas.height / 2 + 
                         Math.sin(x * 0.01 + time + index) * 30 * (index + 1);
                ctx.lineTo(x, y);
            }
            
            ctx.strokeStyle = color;
            ctx.globalAlpha = 0.1;
            ctx.lineWidth = 2;
            ctx.stroke();
        });
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Service Canvas - Geometric Shapes
// ============================================
function initServiceCanvas() {
    const canvas = document.getElementById('service-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const shapes = [];
    const shapeCount = 15;
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'];
    
    class Shape {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 50 + 30;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.sides = Math.floor(Math.random() * 3) + 4;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            
            if (this.x < -this.size) this.x = canvas.width + this.size;
            if (this.x > canvas.width + this.size) this.x = -this.size;
            if (this.y < -this.size) this.y = canvas.height + this.size;
            if (this.y > canvas.height + this.size) this.y = -this.size;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            ctx.beginPath();
            for (let i = 0; i < this.sides; i++) {
                const angle = (Math.PI * 2 / this.sides) * i;
                const x = Math.cos(angle) * this.size;
                const y = Math.sin(angle) * this.size;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            
            ctx.strokeStyle = this.color;
            ctx.globalAlpha = 0.15;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.restore();
        }
    }
    
    for (let i = 0; i < shapeCount; i++) {
        shapes.push(new Shape());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        
        shapes.forEach(shape => {
            shape.update();
            shape.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Process Canvas - Progress Lines
// ============================================
function initProcessCanvas() {
    const canvas = document.getElementById('process-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const lines = [];
    const lineCount = 6;
    const colors = ['#6366f1', '#8b5cf6', '#ec4899'];
    
    class Line {
        constructor(index) {
            this.y = (canvas.height / (lineCount + 1)) * (index + 1);
            this.points = [];
            this.speed = Math.random() * 2 + 1;
            this.amplitude = Math.random() * 25 + 15;
            this.frequency = Math.random() * 0.02 + 0.01;
            this.offset = 0;
            this.color = colors[index % colors.length];
            
            for (let x = 0; x <= canvas.width; x += 10) {
                this.points.push({ x, y: this.y });
            }
        }
        
        update() {
            this.offset += this.speed;
            
            this.points.forEach((point, i) => {
                point.y = this.y + Math.sin((point.x + this.offset) * this.frequency) * this.amplitude;
            });
        }
        
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y);
            
            for (let i = 1; i < this.points.length; i++) {
                ctx.lineTo(this.points[i].x, this.points[i].y);
            }
            
            ctx.strokeStyle = this.color;
            ctx.globalAlpha = 0.2;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    
    for (let i = 0; i < lineCount; i++) {
        lines.push(new Line(i));
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        
        lines.forEach(line => {
            line.update();
            line.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Portfolio Canvas - Grid with Accent
// ============================================
function initPortfolioCanvas() {
    const canvas = document.getElementById('portfolio-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const gridSize = 60;
    let offset = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        offset += 0.3;
        if (offset > gridSize) offset = 0;
        
        // Grid lines
        ctx.strokeStyle = '#e0e7ff';
        ctx.lineWidth = 1;
        
        for (let x = -offset; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = -offset; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Accent dots at intersections
        ctx.fillStyle = '#6366f1';
        for (let x = -offset; x < canvas.width; x += gridSize) {
            for (let y = -offset; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Contact Canvas - Gradient Orbs
// ============================================
function initContactCanvas() {
    const canvas = document.getElementById('contact-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const orbs = [];
    const orbCount = 3;
    const colors = [
        { r: 99, g: 102, b: 241 },   // Indigo
        { r: 139, g: 92, b: 246 },   // Purple
        { r: 236, g: 72, b: 153 }    // Pink
    ];
    
    class Orb {
        constructor(index) {
            this.x = canvas.width / 2 + (Math.random() - 0.5) * 200;
            this.y = canvas.height / 2 + (Math.random() - 0.5) * 200;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 100 + 100;
            this.color = colors[index % colors.length];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius
            );
            
            gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.15)`);
            gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.08)`);
            gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    for (let i = 0; i < orbCount; i++) {
        orbs.push(new Orb(i));
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        orbs.forEach(orb => {
            orb.update();
            orb.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Window Resize Handler
// ============================================
window.addEventListener('resize', function() {
    const canvases = ['hero-canvas', 'philosophy-canvas', 'service-canvas', 
                     'process-canvas', 'portfolio-canvas', 'contact-canvas'];
    
    canvases.forEach(id => {
        const canvas = document.getElementById(id);
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    });
    
    // Reinitialize canvas animations
    initCanvasAnimations();
});
