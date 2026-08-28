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
     2. HIGH-PERFORMANCE NEON PARTICLES CANVAS (NO LAG, NO JANK)
     ========================================================================== */
  const canvas = document.getElementById('canvas-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const particles = [];
    const PARTICLE_COUNT = Math.min(Math.floor(window.innerWidth / 35), 32);
    const COLORS = ['#38bdf8', '#818cf8', '#c084fc', '#f43f5e', '#34d399', '#fbbf24'];

    const mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    }, { passive: true });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1.2;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.baseAlpha = Math.random() * 0.35 + 0.25;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Subtle mouse repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 2;
            this.y += (dy / dist) * force * 2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.baseAlpha;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    function animateParticles() {
      if (!isVisible) {
        requestAnimationFrame(animateParticles);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Lightweight connecting lines
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = particles[a].color;
            ctx.globalAlpha = (1 - dist / 115) * 0.18;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
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
  • clear        - Clear the terminal console
  • matrix       - Trigger terminal matrix stream
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

})();
