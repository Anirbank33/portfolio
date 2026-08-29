/**
 * ANIRBAN KAR - DEVELOPER PORTFOLIO ENGINE
 * Smooth Particle Animation · High-Performance 3D Tilt · Photo Hologram · Terminal CLI
 */

(function () {
  'use strict';

  const GITHUB_USERNAME = 'Anirbank33';
  let currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

  /* ==========================================================================
     1. THEME MANAGER & SYNC
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const metaScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaScheme) metaScheme.content = theme;

    const pictureSources = document.querySelectorAll('picture');
    pictureSources.forEach((pic) => {
      const darkSource = pic.querySelector('source[media*="dark"]');
      const lightSource = pic.querySelector('source[media*="light"]');
      const img = pic.querySelector('img');
      if (darkSource && lightSource && img) {
        img.src = theme === 'light' ? lightSource.srcset : darkSource.srcset;
      }
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* ==========================================================================
     2. HIGH-PERFORMANCE COSMIC SPACE CANVAS & WARP DRIVE ENGINE
     ========================================================================== */
  const canvas = document.getElementById('canvas-particles');
  let toggleWarpMode = null;
  let triggerMeteorShower = null;

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    }

    resizeCanvas();
    window.addEventListener('resize', () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      resizeCanvas();
    }, { passive: true });

    // Multi-spectral star palette
    const STAR_COLORS = [
      '#38bdf8', // Cyan
      '#818cf8', // Indigo
      '#a855f7', // Purple
      '#f43f5e', // Rose
      '#fbbf24', // Amber
      '#34d399', // Emerald
      '#ffffff', // Pure Starlight
      '#00f0ff'  // Electric Aqua
    ];

    const STAR_COUNT = Math.min(Math.floor(window.innerWidth / 12), 150);
    const stars = [];
    const meteors = [];
    const stardust = [];

    let isWarpMode = false;
    let currentWarpSpeed = 0;
    let targetWarpSpeed = 0;

    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Emit subtle cosmic stardust wake
      if (Math.random() < 0.35 && !isWarpMode) {
        stardust.push({
          x: e.clientX + (Math.random() - 0.5) * 14,
          y: e.clientY + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 2 + 1,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          alpha: 0.8,
          decay: Math.random() * 0.02 + 0.015
        });
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    }, { passive: true });

    class Star {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : 0;
        this.depth = Math.random() * 2.5 + 0.5; // z-layer: 0.5 to 3.0
        this.radius = (this.depth * 0.65) + Math.random() * 0.5;
        this.vx = (Math.random() - 0.5) * (0.25 * this.depth);
        this.vy = (Math.random() * 0.35 + 0.1) * this.depth;
        this.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
        this.baseAlpha = Math.random() * 0.45 + 0.35;
        this.twinkleAngle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.04 + 0.015;
      }

      update() {
        if (currentWarpSpeed > 0.5) {
          // Hyperspace warp motion: radial acceleration away from center
          const cx = width / 2;
          const cy = height / 2;
          const dx = this.x - cx;
          const dy = this.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const speedFactor = (currentWarpSpeed * 0.9) * (dist / 350 + 0.5);

          this.prevX = this.x;
          this.prevY = this.y;
          this.x += (dx / dist) * speedFactor;
          this.y += (dy / dist) * speedFactor;

          if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            // Respawn near center
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * 80 + 10;
            this.x = cx + Math.cos(angle) * r;
            this.y = cy + Math.sin(angle) * r;
            this.prevX = this.x;
            this.prevY = this.y;
          }
        } else {
          // Peaceful cruising drift
          this.prevX = this.x;
          this.prevY = this.y;
          this.x += this.vx;
          this.y += this.vy;
          this.twinkleAngle += this.twinkleSpeed;

          if (this.x < 0) this.x = width;
          if (this.x > width) this.x = 0;
          if (this.y < 0) this.y = height;
          if (this.y > height) this.y = 0;

          // Interactive subtle mouse gravity
          if (mouse.x !== null && mouse.y !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius && dist > 0) {
              const force = (mouse.radius - dist) / mouse.radius;
              this.x += (dx / dist) * force * 1.8;
              this.y += (dy / dist) * force * 1.8;
            }
          }
        }
      }

      draw() {
        if (currentWarpSpeed > 1) {
          // Draw warp streak beam
          const alpha = Math.min(0.9, (currentWarpSpeed / 20));
          ctx.beginPath();
          ctx.moveTo(this.prevX || this.x, this.prevY || this.y);
          ctx.lineTo(this.x, this.y);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = Math.max(1.2, this.radius * (currentWarpSpeed / 12));
          ctx.globalAlpha = alpha;
          ctx.stroke();
        } else {
          // Draw calm glowing star with sinusoidal twinkle
          const twinkle = Math.sin(this.twinkleAngle) * 0.25;
          const alpha = Math.max(0.15, Math.min(1, this.baseAlpha + twinkle));
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = alpha;
          ctx.fill();

          // Subtle corona on prominent foreground stars
          if (this.depth > 2.2 && alpha > 0.6) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = alpha * 0.18;
            ctx.fill();
          }
        }
      }
    }

    // Populate Starfield
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(new Star());
    }

    // Shooting Star / Meteor Engine
    class Meteor {
      constructor(customX, customY, customVx, customVy) {
        this.x = customX !== undefined ? customX : Math.random() * width * 0.8 + width * 0.1;
        this.y = customY !== undefined ? customY : Math.random() * (height * 0.35);
        this.length = Math.random() * 90 + 60;
        this.speed = Math.random() * 9 + 13;
        this.angle = customVx !== undefined ? Math.atan2(customVy, customVx) : Math.PI / 4 + (Math.random() - 0.5) * 0.35;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
        this.opacity = 1;
        this.decay = Math.random() * 0.014 + 0.012;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= this.decay;

        // Sparkle stardust along the meteor tail
        if (Math.random() < 0.4 && this.opacity > 0.2) {
          stardust.push({
            x: this.x - this.vx * 0.4 + (Math.random() - 0.5) * 6,
            y: this.y - this.vy * 0.4 + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 1.6 + 0.8,
            color: this.color,
            alpha: this.opacity * 0.8,
            decay: 0.025
          });
        }
      }

      draw() {
        if (this.opacity <= 0) return;
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.7, this.color);
        grad.addColorStop(1, '#ffffff');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.stroke();

        // Blazing head flare
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fill();
      }
    }

    // Periodic natural shooting stars (every 2.8 - 4.5s)
    let nextMeteorTime = Date.now() + 2500;
    function scheduleNextMeteor() {
      nextMeteorTime = Date.now() + Math.random() * 2000 + 2500;
    }

    triggerMeteorShower = function (count = 6) {
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          meteors.push(new Meteor(
            Math.random() * width * 0.7,
            Math.random() * (height * 0.4),
            Math.random() * 6 + 10,
            Math.random() * 6 + 8
          ));
        }, i * 220);
      }
    };

    window.triggerMeteorShower = triggerMeteorShower;

    // Toggle Hyperspace Warp Mode
    toggleWarpMode = function () {
      isWarpMode = !isWarpMode;
      targetWarpSpeed = isWarpMode ? 22 : 0;

      const warpBtn = document.getElementById('warp-toggle');
      if (warpBtn) {
        warpBtn.classList.toggle('warp-active', isWarpMode);
        const textSpan = warpBtn.querySelector('.warp-text');
        if (textSpan) {
          textSpan.textContent = isWarpMode ? 'WARP: ENGAGED' : 'WARP SPEED';
        }
      }

      document.body.classList.toggle('warp-engaged', isWarpMode);
      return isWarpMode;
    };

    window.toggleWarpMode = toggleWarpMode;

    const warpBtn = document.getElementById('warp-toggle');
    if (warpBtn) {
      warpBtn.addEventListener('click', toggleWarpMode);
    }

    // Keyboard shortcut 'W' (when not inside an input or textarea)
    window.addEventListener('keydown', (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag !== 'input' && activeTag !== 'textarea' && (e.key === 'w' || e.key === 'W')) {
        toggleWarpMode();
      }
    });

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    // Main Space Canvas Render Loop
    function renderCosmicSpace() {
      if (!isVisible) {
        requestAnimationFrame(renderCosmicSpace);
        return;
      }

      // Smooth warp acceleration / deceleration
      currentWarpSpeed += (targetWarpSpeed - currentWarpSpeed) * 0.08;

      // Clear or create radial speed blur
      if (currentWarpSpeed > 2) {
        ctx.fillStyle = currentTheme === 'light' ? 'rgba(248, 250, 252, 0.28)' : 'rgba(6, 9, 17, 0.28)';
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      // Constellation link lines between nearby stars (calm cruising mode)
      if (currentWarpSpeed < 1) {
        for (let a = 0; a < stars.length; a += 2) {
          for (let b = a + 1; b < Math.min(a + 6, stars.length); b++) {
            const dx = stars[a].x - stars[b].x;
            const dy = stars[a].y - stars[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(stars[a].x, stars[a].y);
              ctx.lineTo(stars[b].x, stars[b].y);
              ctx.strokeStyle = stars[a].color;
              ctx.globalAlpha = (1 - dist / 100) * 0.15;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // Update & Draw Stars
      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      // Spawn meteors periodically
      if (Date.now() > nextMeteorTime && !isWarpMode) {
        meteors.push(new Meteor());
        scheduleNextMeteor();
      }

      // Update & Draw Meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.update();
        m.draw();
        if (m.opacity <= 0 || m.x > width + 100 || m.y > height + 100) {
          meteors.splice(i, 1);
        }
      }

      // Update & Draw Stardust Sparks
      for (let i = stardust.length - 1; i >= 0; i--) {
        const s = stardust[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          stardust.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fill();
      }

      requestAnimationFrame(renderCosmicSpace);
    }

    renderCosmicSpace();
  }

  /* ==========================================================================
     3. SMOOTH JITTER-FREE 3D CARD TILT
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach((card) => {
    let ticking = false;

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.08s ease-out, box-shadow 0.25s ease, border-color 0.25s ease';
    });

    card.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
        ticking = false;
      });
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s ease-out, box-shadow 0.25s ease, border-color 0.25s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  /* ==========================================================================
     4. TOP-LEFT AVATAR PHOTO SWITCHER
     ========================================================================== */
  const heroProfilePhoto = document.getElementById('hero-profile-photo');
  const photos = [
    'assets/images/anirban-portrait.jpg',
    'assets/images/anirban-photo-2.jpg',
    'assets/images/anirban-photo-3.jpg'
  ];
  let photoIndex = 0;

  if (heroProfilePhoto) {
    heroProfilePhoto.parentElement.addEventListener('click', () => {
      photoIndex = (photoIndex + 1) % photos.length;
      heroProfilePhoto.style.opacity = '0.3';
      heroProfilePhoto.style.filter = 'brightness(1.8) hue-rotate(90deg)';

      setTimeout(() => {
        heroProfilePhoto.src = photos[photoIndex];
        heroProfilePhoto.style.opacity = '1';
        heroProfilePhoto.style.filter = '';
      }, 180);
    });
  }

  /* ==========================================================================
     5. GITHUB LIVE TELEMETRY FETCHER
     ========================================================================== */
  const apiPublicRepos = document.getElementById('api-public-repos');
  const apiFollowers = document.getElementById('api-followers');
  const apiFollowing = document.getElementById('api-following');
  const apiCreatedAt = document.getElementById('api-created-at');
  const heroRepoCount = document.getElementById('hero-repo-count');
  const refreshStatsBtn = document.getElementById('refresh-stats');

  async function fetchGitHubStats() {
    if (refreshStatsBtn) refreshStatsBtn.classList.add('rotating');

    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
      const data = await res.json();

      if (data.public_repos !== undefined && apiPublicRepos) {
        apiPublicRepos.textContent = data.public_repos;
        if (heroRepoCount) heroRepoCount.textContent = `${data.public_repos}+`;
      }
      if (data.followers !== undefined && apiFollowers) {
        apiFollowers.textContent = data.followers;
      }
      if (data.following !== undefined && apiFollowing) {
        apiFollowing.textContent = data.following;
      }
      if (data.created_at && apiCreatedAt) {
        const date = new Date(data.created_at);
        const month = date.toLocaleString('default', { month: 'short' });
        apiCreatedAt.textContent = `Since ${month} ${date.getFullYear()}`;
      }
    } catch (err) {
      console.warn('Using cached telemetry metrics:', err);
    } finally {
      if (refreshStatsBtn) {
        setTimeout(() => refreshStatsBtn.classList.remove('rotating'), 600);
      }
    }
  }

  if (refreshStatsBtn) refreshStatsBtn.addEventListener('click', fetchGitHubStats);
  fetchGitHubStats();

  /* ==========================================================================
     6. PROJECT FILTER TABS
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     7. INTERACTIVE TERMINAL EMULATOR (CLI)
     ========================================================================== */
  const cliInput = document.getElementById('cli-input');
  const cliOutput = document.getElementById('cli-output');
  const cliScreen = document.getElementById('cli-screen');
  const cliClearBtn = document.getElementById('cli-clear-btn');

  const cmdHistory = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: `Available commands:
  • skills       - View core technical proficiencies & stack
  • projects     - List key engineering repositories & live demos
  • architecture - Overview of the 4-node distributed systems pipeline
  • telemetry    - Current GitHub telemetry & metrics
  • about        - Read engineering philosophy & background
  • contact      - Socials, email, and location details
  • hire         - Summary of role preferences & key strengths
  • warp         - 🚀 Engage/disengage Hyperspace Warp Drive Mode!
  • space        - 🛰️ Real-time deep-space mission telemetry
  • meteor       - ✨ Launch a multi-spectral shooting star meteor shower!
  • universe     - 🌌 ASCII deep-space constellation diagram
  • matrix       - Trigger terminal matrix stream
  • clear        - Clear the terminal console
  • sudo         - Execute as root superuser`,

    skills: `Technical Competencies:
  [Core Languages]   Java (17/21), TypeScript, JavaScript (ES6+), SQL
  [Frameworks]       Spring Boot, Spring Cloud, Express.js, Node.js, React
  [Persistence]      PostgreSQL, MySQL, Redis, MongoDB, Hibernate/JPA
  [Distributed]      RESTful APIs, Microservices, JWT Auth, WebSockets
  [DevOps/Tools]     Docker, Git, GitHub Actions, Linux Shell, JVM Profiling`,

    projects: `Featured Projects:
  1. Wardline Medical Operations Tracker [React, TS, Express REST]
     -> https://github.com/Anirbank33/medical-department-tracker
  2. Modular Express REST API Engine [Node.js, Express, CRUD API]
     -> https://github.com/Anirbank33/backend-demo
  3. Multi-Year Activity Telemetry (2021-2026) [Data Viz, GitHub Pages]
     -> https://anirbank33.github.io/github-activity-2021-2026/
  4. Java Core & JVM Concurrency Troubleshooting [Java 21, Heap/Threads]
     -> https://github.com/Anirbank33/java-core-troubleshooting
  5. 90s Bollywood Audio Player & Streamer [TypeScript, Web Audio API]
     -> https://github.com/Anirbank33/Cool-tracks-form-90-s`,

    architecture: `Distributed System Pipeline:
  [01 / Ingress]      -> HTTP/2, Client Ingress, JWT Sanitization, Rate Limiting
  [02 / Gateway]      -> Spring Cloud / Express Gateway, Routing, Circuit Breaker
  [03 / Persistence]  -> PostgreSQL/MySQL ACID Transactions, Redis In-Memory Cache
  [04 / Telemetry]    -> JVM Metrics, Prometheus Healthchecks, Telemetry Logs`,

    telemetry: `GitHub Telemetry (@Anirbank33):
  • Public Repos: 23+
  • Active Commits: 52-Week Continuous Telemetry
  • Status: Open to Engineering Opportunities (Bengaluru / Remote)`,

    space: `[ORBITAL TELEMETRY & MISSION PROFILE]
  • Mission Node     : Deep Space Station Bengaluru (@Anirbank33)
  • Celestial Target : Distributed Systems & High-Throughput Cloud APIs
  • Planetary Coords : 12.9716° N, 77.5946° E (Bengaluru, India)
  • Primary Reactor  : OpenJDK 21 LTS + Spring Boot Reactive Engine
  • Warp Generator   : Active (Press 'W' or run 'warp' to test lightspeed)
  • Status           : 100% Nominal · Seeking Engineering Opportunities`,

    warp: `[HYPERSPACE WARP GENERATOR]
  Toggling radial hyperspace light-streak accelerator...
  Hint: You can also tap the 'WARP SPEED' button in navbar or press 'W' key anywhere!`,

    meteor: `[STELLAR PHENOMENON TRIGGERED]
  Multi-spectral shooting star meteor shower incoming across canvas! ✨`,

    stars: `[STELLAR PHENOMENON TRIGGERED]
  Multi-spectral shooting star meteor shower incoming across canvas! ✨`,

    universe: `
              .                 *         .            *         .
       *            .        ✨ COSMIC BACKEND UNIVERSE ✨         .
             .          [ Java 21 · Spring Boot · PostgreSQL ]       *
         .        *            .             *             .
               ☕ Java ────────► 🍃 Spring Gateway ────────► 🐘 Postgres
    `,

    about: `About Anirban Kar:
  Backend Software Engineer based in Bengaluru, Karnataka, India.
  Passionate about building scalable backend infrastructure, robust RESTful APIs,
  and profiling low-latency JVM concurrency patterns.`,

    contact: `Connect with Anirban:
  • Email: anirbankar23@gmail.com
  • LinkedIn: https://www.linkedin.com/in/anirban-kar-23645414a/
  • Twitter/X: https://x.com/3anir33
  • GitHub: https://github.com/Anirbank33`,

    hire: `Why Hire Anirban Kar?
  ✓ Strong grasp of Java 21, Spring Boot microservices, and modular APIs.
  ✓ Hands-on experience with database transactions, Redis caching, and Docker.
  ✓ Clean code advocate, performance-conscious, and fast learner.
  ✓ Actively seeking Backend Engineer / Software Engineer roles in Bengaluru or Remote.`,

    sudo: `Permission denied: visitor is not in the sudoers file. This incident will be reported to @Anirbank33.`
  };

  function appendCliOutput(lineHtml) {
    if (!cliOutput) return;
    const div = document.createElement('div');
    div.className = 'cli-line';
    div.innerHTML = lineHtml;
    cliOutput.appendChild(div);
    if (cliScreen) cliScreen.scrollTop = cliScreen.scrollHeight;
  }

  function runTerminalCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    appendCliOutput(`<span class="prompt-user">visitor@anirbankar</span>:<span class="prompt-dir">~</span>$ <span class="cli-cmd-echo">${escapeHtml(cmd)}</span>`);

    if (cmd === 'clear') {
      if (cliOutput) cliOutput.innerHTML = '';
      return;
    }

    if (cmd === 'matrix') {
      triggerMatrixEffect();
      return;
    }

    if (cmd === 'warp' || cmd === 'hyperdrive') {
      if (typeof window.toggleWarpMode === 'function') {
        const active = window.toggleWarpMode();
        appendCliOutput(`<span style="color:#00f0ff; font-weight:bold;">[HYPERSPACE WARP DRIVE ${active ? 'ENGAGED 🚀' : 'DISENGAGED 🛰️'}]</span>`);
      }
      return;
    }

    if (cmd === 'meteor' || cmd === 'meteors' || cmd === 'stars') {
      if (typeof window.triggerMeteorShower === 'function') {
        window.triggerMeteorShower(7);
        appendCliOutput(`<span style="color:#f43f5e; font-weight:bold;">[METEOR SHOWER LAUNCHED: 7 multi-spectral shooting stars streaming across the sky! ✨]</span>`);
      }
      return;
    }

    if (COMMANDS[cmd]) {
      appendCliOutput(`<pre class="cli-res-text">${COMMANDS[cmd]}</pre>`);
    } else {
      appendCliOutput(`<span class="cli-res-text" style="color:#ff7b72">zsh: command not found: ${escapeHtml(cmd)}. Type 'help' for a list of valid commands.</span>`);
    }
  }

  window.runTerminalCommand = function (cmd) {
    if (cliInput) cliInput.value = cmd;
    runTerminalCommand(cmd);
  };

  function triggerMatrixEffect() {
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテト';
    let count = 0;
    const interval = setInterval(() => {
      let line = '';
      for (let i = 0; i < 48; i++) {
        line += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      appendCliOutput(`<span style="color:#27c93f; font-size:0.75rem; letter-spacing:3px;">${line}</span>`);
      count++;
      if (count > 12) {
        clearInterval(interval);
        appendCliOutput(`<span style="color:#58a6ff;">[Matrix connection stabilized. Welcome back to terminal.]</span>`);
      }
    }, 70);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (cliInput) {
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = cliInput.value;
        if (val) {
          cmdHistory.push(val);
          historyIndex = cmdHistory.length;
          runTerminalCommand(val);
          cliInput.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          cliInput.value = cmdHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < cmdHistory.length - 1) {
          historyIndex++;
          cliInput.value = cmdHistory[historyIndex];
        } else {
          historyIndex = cmdHistory.length;
          cliInput.value = '';
        }
      }
    });

    if (cliScreen) {
      cliScreen.addEventListener('click', () => cliInput.focus());
    }
  }

  if (cliClearBtn) {
    cliClearBtn.addEventListener('click', () => {
      if (cliOutput) cliOutput.innerHTML = '';
    });
  }

  /* ==========================================================================
     8. CONTACT MESSAGE COMPOSER & CLIPBOARD COPY
     ========================================================================== */
  const contactName = document.getElementById('contact-name');
  const contactSubject = document.getElementById('contact-subject');
  const contactBody = document.getElementById('contact-body');
  const btnSendMail = document.getElementById('btn-send-mail');
  const btnCopyInfo = document.getElementById('btn-copy-info');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (btnSendMail) {
    btnSendMail.addEventListener('click', () => {
      const name = contactName ? contactName.value.trim() : '';
      const subject = contactSubject && contactSubject.value.trim() ? contactSubject.value.trim() : 'Software Engineering Inquiry';
      let body = contactBody ? contactBody.value.trim() : '';

      if (name) {
        body = `Hi Anirban,\n\n${body}\n\nBest regards,\n${name}`;
      }

      const mailtoUrl = `mailto:anirbankar23@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    });
  }

  if (btnCopyInfo && copyBtnText) {
    btnCopyInfo.addEventListener('click', () => {
      const email = 'anirbankar23@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const orig = copyBtnText.textContent;
        copyBtnText.textContent = 'Copied to Clipboard! ✓';
        btnCopyInfo.style.borderColor = 'var(--neon-emerald)';
        btnCopyInfo.style.boxShadow = '0 0 15px rgba(52, 211, 153, 0.4)';
        setTimeout(() => {
          copyBtnText.textContent = orig;
          btnCopyInfo.style.borderColor = '';
          btnCopyInfo.style.boxShadow = '';
        }, 2500);
      }).catch(() => {
        window.prompt('Copy email manually:', email);
      });
    });
  }

  /* ==========================================================================
     9. MOBILE MENU TOGGLE
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     10. SCROLL SPY
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link:not(.cta-link)');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    allNavLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  /* ==========================================================================
     11. COSMIC ORBITAL FLIGHT SCROLL PROGRESS TRACKER
     ========================================================================== */
  const cosmicScrollBar = document.getElementById('cosmic-scroll-bar');
  const cosmicRocketMarker = document.getElementById('cosmic-rocket-marker');

  function updateCosmicFlightProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const scrollFraction = Math.max(0, Math.min(1, window.scrollY / docHeight));
    const percent = (scrollFraction * 100).toFixed(2);

    if (cosmicScrollBar) {
      cosmicScrollBar.style.width = `${percent}%`;
    }
    if (cosmicRocketMarker) {
      const tilt = Math.min(65, Math.max(25, 45 + (scrollFraction - 0.5) * 20));
      cosmicRocketMarker.style.transform = `rotate(${tilt}deg) scale(${1 + scrollFraction * 0.25})`;
    }
  }

  window.addEventListener('scroll', updateCosmicFlightProgress, { passive: true });
  updateCosmicFlightProgress();

  /* ==========================================================================
     12. SCROLL-DRIVEN COSMIC REVEAL TRANSITIONS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.space-reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // Ensure elements in initial viewport are immediately visible
  requestAnimationFrame(() => {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add('revealed');
      }
    });
  });

})();
