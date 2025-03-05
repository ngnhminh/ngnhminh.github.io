document.addEventListener("DOMContentLoaded", function () {
    const typewriter = document.querySelector(".typewriter");
    const text = "Minh";
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            typewriter.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 100);
        }
    }

    typeEffect();
});

const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let comets = [];

function initStars() {
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            brightness: Math.random(),
            flickerSpeed: Math.random() * 0.02
        });
    }
}

function createComet() {
    comets.push({
        x: -50,
        y: Math.random() * canvas.height / 2,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 4 + 2
    });

    setTimeout(createComet, 2000);
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vẽ sao lấp lánh
    stars.forEach(s => {
        s.brightness += s.flickerSpeed;
        if (s.brightness > 1 || s.brightness < 0.3) {
            s.flickerSpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.brightness, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    });

    // Vẽ sao chổi
    for (let i = comets.length - 1; i >= 0; i--) {
        let c = comets[i];
        c.x += c.speed;
        c.y += c.speed / 2;

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.size * 10, c.y - c.size * 5);
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();

        if (c.x > canvas.width || c.y > canvas.height) {
            comets.splice(i, 1);
        }
    }

    requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initStars();
createComet();
draw();

document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId); 

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});

// Hiệu ứng khi cuộn đến từng section
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");

    function checkVisibility() {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
});

// Nút quay lại đầu trang
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
