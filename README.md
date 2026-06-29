# Arsalan Fareed Abid — Cyber Security Portfolio

Personal portfolio website for Arsalan Fareed Abid, final-year BSc Cyber Security student at Birmingham City University (Predicted First Class).

**Live site:** *(add your GitHub Pages URL here once deployed)*  
**LinkedIn:** [arsalan-fareed-abid-a9275a250](https://linkedin.com/in/arsalan-fareed-abid-a9275a250)

---

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom design system with CSS variables, responsive grid, glassmorphism cards
- **Vanilla JavaScript** — particle canvas, typing animation, scroll-reveal, counter animation
- **No build tools** — open `index.html` directly in any browser, or deploy as a static site

---

## How to Push to GitHub & Deploy with GitHub Pages

### Prerequisites

1. A [GitHub](https://github.com) account
2. Git installed — check by running `git --version` in Terminal. If not installed, download from [git-scm.com](https://git-scm.com)

---

### Step 1 — Create a new repository on GitHub

1. Go to **github.com** and sign in
2. Click the **+** icon (top right) → **New repository**
3. Set the repository name — use exactly: `portfolio` (or `arsalan-portfolio`)
4. Leave it **Public** (required for free GitHub Pages hosting)
5. **Do NOT** tick "Add a README" — you already have one
6. Click **Create repository**
7. Copy the repository URL shown — it looks like:
   ```
   https://github.com/YOUR-USERNAME/portfolio.git
   ```

---

### Step 2 — Initialise Git in your project folder

Open **Terminal** and run these commands one by one:

```bash
# Navigate to your portfolio folder
cd ~/Desktop/portfolio

# Initialise a new git repository
git init

# Set the default branch name to 'main'
git branch -M main

# Stage all files for the first commit
git add .

# Create your first commit
git commit -m "Initial commit — Cyber Security Portfolio"
```

---

### Step 3 — Connect to GitHub and push

```bash
# Replace YOUR-USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git

# Push your code to GitHub
git push -u origin main
```

GitHub will ask for your username and password. For the **password**, you must use a **Personal Access Token** (not your GitHub account password):

1. Go to GitHub → **Settings** → **Developer Settings** → **Personal Access Tokens** → **Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a name, set expiry, tick **repo** under scopes
4. Click **Generate token** and copy it immediately
5. Paste it as your password in the Terminal prompt

---

### Step 4 — Enable GitHub Pages (free hosting)

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **Deploy from a branch**
5. Set Branch to **main** and folder to **/ (root)**
6. Click **Save**
7. Wait 1–2 minutes, then your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/portfolio/
   ```

---

### Step 5 — Updating the site in future

Whenever you make changes to the files, run:

```bash
cd ~/Desktop/portfolio
git add .
git commit -m "Brief description of what you changed"
git push
```

GitHub Pages will automatically update within a minute or two.

---

## Remaining Content to Fill In

The following items still need updating in `index.html` — search for `<!-- EDIT` to find them:

| Item | Where |
|---|---|
| CCNA 1 issue date | Certifications section |
| CCNA 2 issue date | Certifications section |
| HS2 Security Officer dates & responsibilities | Experience section |
| JLR Warehouse Operative dates & responsibilities | Experience section |
| Delivery Driver dates & responsibilities | Experience section |
| Hospital Management System — more detail | Projects section |
