# ⚡ Anirban Kar — Software Engineer Portfolio Website

A fast, responsive, and interactive developer portfolio website engineered for **Anirban Kar (`@Anirbank33`)**, Backend Software Engineer specializing in Java, Spring Boot, Microservices, and Distributed Systems based in Bengaluru, India.

[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://anirbank33.github.io/portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Status: Open to Work](https://img.shields.io/badge/Status-Open%20to%20Work-059669?style=for-the-badge)](https://www.linkedin.com/in/anirban-kar-23645414a/)

---

## 🌐 Direct Live Link

- **Live URL**: [https://anirbank33.github.io/portfolio/](https://anirbank33.github.io/portfolio/)
- **Alternate Root URL** (if repo is named `Anirbank33.github.io`): [https://anirbank33.github.io/](https://anirbank33.github.io/)

---

## 🚀 Key Features

1. **🎨 Dual-Theme Architecture (Dark & Light Mode)**
   - Automatically detects and adapts to the visitor's system OS preference (`prefers-color-scheme`).
   - One-click manual toggle with seamless state persistence in `localStorage`.
   - Pre-render script prevents Flash of Unstyled Content (FOUC).
   - Dynamic SVG asset swapping between dark and light graphics.

2. **⚡ 4-Node Distributed Systems Architecture Pipeline**
   - Interactive visual flow demonstrating client ingress, Spring & Express API gateways, distributed PostgreSQL/Redis persistence, and live observability telemetry.
   - Animated SVG nodes and responsive interactive cards.

3. **💻 In-Browser Interactive Developer CLI (Terminal Emulator)**
   - Visitors can type real commands: `help`, `skills`, `projects`, `architecture`, `telemetry`, `about`, `contact`, `hire`, `matrix`, `clear`, and `sudo`.
   - Command history navigation with `↑` and `↓` arrow keys.
   - Clickable interactive quick-command tags for mobile users.

4. **📡 Real-Time GitHub Telemetry & REST API Integration**
   - Automatically synchronizes with GitHub REST API (`https://api.github.com/users/Anirbank33`) to display live public repo counts, followers, following, and account creation dates.
   - Built-in graceful fallback caching to protect against API rate limits.
   - Real-time refresh button with rotational feedback.

5. **📂 Filterable Engineering Projects Showcase**
   - Filter projects instantly across categories: **All**, **Backend & Java**, **Full Stack**, and **Telemetry & Tools**.
   - Includes links to live demos, GitHub repositories, tech stack tags, and star counts.

6. **📬 Interactive Contact Composer & Instant Clipboard Copy**
   - Dynamic email subject/body pre-filler that opens the visitor's default mail client.
   - One-click email copy button with visual success confirmation.

---

## 🛠️ Tech Stack & Tooling

- **Frontend**: Semantic HTML5, Modern CSS (Custom Properties, CSS Grid, Flexbox, Glassmorphism, `color-scheme`), Vanilla JavaScript (ES6+)
- **Typography**: Google Fonts (*JetBrains Mono*, *Plus Jakarta Sans*)
- **Icons & Graphics**: Custom animated SVGs, Vector Badges, GitHub Stats API
- **Deployment**: GitHub Pages, GitHub Actions CI/CD (`.github/workflows/deploy.yml`)

---

## 📂 Project Structure

```text
portfolio-site/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── assets/
│   ├── icons/                    # Framework and tool icons
│   │   ├── express-dark.svg
│   │   └── express-light.svg
│   └── svg/                      # High-res animated SVGs and project cards
│       ├── java-coffee.svg
│       ├── server-animation.svg
│       ├── database-animation.svg
│       ├── terminal-animation.svg
│       ├── project-card-medical-tracker.svg
│       ├── project-card-backend-demo.svg
│       ├── project-card-github-activity.svg
│       ├── project-card-java-troubleshooting.svg
│       ├── project-card-cool-tracks.svg
│       ├── skills-icons-moving.svg
│       └── ...
├── index.html                    # Main HTML5 entry point
├── styles.css                    # Production design system stylesheet
├── script.js                     # Terminal emulator, theme toggle, API sync
└── README.md                     # Documentation and setup guide
```

---

## 💻 Local Development & Testing

To preview the website locally without any build tools:

### Option 1: Python HTTP Server
```bash
cd /Users/anirbankar/portfolio-site
python3 -m http.server 8080
```
Then open [http://localhost:8080](http://localhost:8080) in your browser.

### Option 2: Node.js (npx)
```bash
npx serve .
```

---

## 🚢 How to Deploy to GitHub

### 1. Initialize Git and Commit
```bash
cd /Users/anirbankar/portfolio-site
git init
git add .
git commit -m "feat: complete modern portfolio website with live GitHub telemetry"
```

### 2. Create the Repository on GitHub
You can use the GitHub CLI (`gh`):

```bash
# To host at https://anirbank33.github.io/portfolio/
gh repo create portfolio --public --source=. --remote=origin --push
```

*Or* if you want it to be your root personal domain ([https://anirbank33.github.io/](https://anirbank33.github.io/)):

```bash
gh repo create Anirbank33.github.io --public --source=. --remote=origin --push
```

### 3. Enable GitHub Pages
1. On GitHub, navigate to your repository **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions** (or **Deploy from a branch** → `main` / root).
3. The site will deploy automatically within 60 seconds!

---

## 👤 Author

**Anirban Kar**
- GitHub: [@Anirbank33](https://github.com/Anirbank33)
- LinkedIn: [anirban-kar-23645414a](https://www.linkedin.com/in/anirban-kar-23645414a/)
- Twitter/X: [@3anir33](https://x.com/3anir33)
- Email: [anirbankar23@gmail.com](mailto:anirbankar23@gmail.com)
