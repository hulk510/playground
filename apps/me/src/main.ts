import "./main.css";
import { siteConfig } from "./config";

// ============================================
// Mouse Glow Effect
// ============================================
function initMouseGlow(): void {
  const glow = document.createElement("div");
  glow.className = "mouse-glow";
  document.body.appendChild(glow);

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(animate);
  }
  animate();
}

// ============================================
// Particle Background
// ============================================
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

function initParticles(): void {
  const canvas = document.createElement("canvas");
  canvas.className = "particle-canvas";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d")!;

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const particles: Particle[] = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    });
  }

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 77, 42, ${p.opacity})`;
      ctx.fill();
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 77, 42, ${0.1 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
}

// ============================================
// Typing Animation
// ============================================
function initTypingAnimation(): void {
  const el = document.getElementById("site-title");
  if (!el) return;
  const titleEl = el;

  const text = siteConfig.name;
  titleEl.textContent = "";
  titleEl.setAttribute("data-text", "");

  let index = 0;
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.textContent = "█";
  titleEl.appendChild(cursor);

  function type() {
    if (index < text.length) {
      titleEl.setAttribute("data-text", text.slice(0, index + 1));
      cursor.before(text[index]);
      index++;
      setTimeout(type, 100 + Math.random() * 50);
    } else {
      cursor.classList.add("blink");
      setTimeout(() => cursor.remove(), 2000);
    }
  }

  setTimeout(type, 500);
}

function renderProjects(): void {
  const container = document.getElementById("projects");
  if (!container) return;

  container.innerHTML = siteConfig.projects
    .map((project, index) => {
      const href = project.url || "#";
      return `
      <a href="${href}" class="node p-6 relative overflow-visible group">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-[10px] tracking-wider text-white/30 mb-2">PRODUCT_${String(index + 1).padStart(2, "0")}</p>
            <h3 class="text-xl tracking-wider mb-2">${project.name}</h3>
            <p class="text-xs text-white/40">${project.desc}</p>
            <p class="text-[10px] mt-3" style="color: var(--accent);">STATUS: ${project.status}</p>
          </div>
          <span class="node-arrow text-lg">→</span>
        </div>
        <span class="hover-note">${project.note}</span>
      </a>
    `;
    })
    .join("");
}

function renderLinks(): void {
  const container = document.getElementById("links");
  if (!container) return;

  const links = Object.values(siteConfig.links);
  container.innerHTML = links
    .map((link, index) => {
      return `
      <a href="${link.url}" class="node p-4 text-center relative overflow-visible group">
        <p class="tracking-wider">${link.label}</p>
        <p class="text-[9px] text-white/30 mt-1">PORT:${String(index + 1).padStart(2, "0")}</p>
        <span class="hover-note">${link.note}</span>
      </a>
    `;
    })
    .join("");
}

function renderModules(): void {
  const container = document.getElementById("modules");
  if (!container) return;

  container.innerHTML = siteConfig.modules
    .map((mod) => `<span class="hud-bracket text-xs text-white/60">${mod}</span>`)
    .join("");
}

function renderContact(): void {
  const container = document.getElementById("contact");
  if (!container) return;

  container.innerHTML = `
    <a href="${siteConfig.contact.url}" class="node inline-flex items-center gap-4 px-8 py-5 relative overflow-visible group">
      <span class="inline-block w-2 h-2 rounded-full animate-pulse" style="background: var(--accent);"></span>
      <span class="orbitron text-sm tracking-widest">ESTABLISH_CONNECTION</span>
      <span class="node-arrow">→</span>
      <span class="hover-note">${siteConfig.contact.note}</span>
    </a>
    <p class="mt-4 text-[10px] text-white/30 tracking-wider">RESPONSE_TIME: ${siteConfig.contact.responseTime}</p>
  `;
}

function init(): void {
  // Effects
  initMouseGlow();
  initParticles();
  initTypingAnimation();

  // Content
  renderProjects();
  renderLinks();
  renderModules();
  renderContact();

  // Site info (except title which is handled by typing animation)
  const taglineEl = document.getElementById("site-tagline");
  if (taglineEl) {
    taglineEl.textContent = siteConfig.tagline;
  }

  const locationEl = document.getElementById("site-location");
  if (locationEl) {
    locationEl.textContent = `NODE: ${siteConfig.location}`;
  }

  const buildEl = document.getElementById("site-build");
  if (buildEl) {
    buildEl.textContent = `BUILD ${siteConfig.build}`;
  }
}

document.addEventListener("DOMContentLoaded", init);
