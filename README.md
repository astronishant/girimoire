# Nishant Yadawad — Portfolio (minimal dark)

Recreation of anishvernekar.netlify.app structure, rebuilt minimal + dark (Batman-inspired),
with YOUR content. No build step — plain HTML/CSS/JS. Deploy free on Netlify/Vercel/GitHub Pages.

## Run locally
- Just open `index.html`, or better: `py -m http.server` inside this folder → http://localhost:8000

## LeetCode live tracking — YES, it works
- The hero card fetches live solved count (total + Easy/Medium/Hard + rank).
- Uses free `alfa-leetcode-api` (no key needed).
- Setup: open `assets/js/main.js` → set `CONFIG.leetcodeUsername = "YOUR_LEETCODE_USERNAME"`.
  Or just type your username in the card on the site — it saves to localStorage and auto-syncs every 10 min.
- Fallback shows `130+` if API is asleep/rate-limited.

## Photo
- Drop your photo at `assets/images/profile.jpg` and tell me — I'll wire it into the hero circle
  (currently a placeholder). Recommended: square, < 500KB.

## Deploy (Netlify, free)
1. Push this folder to GitHub (e.g. `astro-portfolio`)
2. netlify.com → Add new site → Import from Git → select repo → Publish directory = `.` → Deploy
3. Done. No build command.

## Edit cheat-sheet
- Roles typing effect → `ROLES` in `assets/js/main.js`
- Bio → `#about` in `index.html`
- Skills → `#skills` in `index.html`
- Education/Experience → `#education` / `#experience`
- Featured project → `#work` (JanaManthan card); other projects auto-pull from GitHub live
