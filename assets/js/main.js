/* ============ CONFIG — edit these ============ */
const CONFIG = {
  leetcodeUsername: "astronishinngg",   // live-synced, verified: 232 solved
  leetcodeFallbackTotal: 232,
  leetcodeProfile: "https://leetcode.com/astronishinngg",
  githubUser: "astronishant",
};

const ROLES = [
  "Problem Solver | 230+ LeetCode Problems",
  "Building Projects, Not Just Repositories",
  "Exploring AI & Autonomous Agents",
  "Learning Systems One Layer at a Time",
  "IEEE Computer Society Treasurer",
];

/* ============ NAV / MENU ============ */
const menuBtn = document.getElementById("menu");
const navbar = document.querySelector(".navbar");
menuBtn.onclick = () => navbar.classList.toggle("open");
document.querySelectorAll(".navbar a").forEach(a =>
  a.addEventListener("click", () => navbar.classList.remove("open"))
);
window.addEventListener("scroll", () => {
  document.getElementById("scroll-top").classList.toggle("show", scrollY > 500);
  // active link
  const secs = [...document.querySelectorAll("section[id]")];
  const y = scrollY + 120;
  let cur = "home";
  secs.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
  document.querySelectorAll(".navbar a").forEach(a =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
});

/* ============ TYPING ============ */
(() => {
  const el = document.querySelector(".typing-text");
  let ri = 0, ci = 0, del = false;
  (function tick() {
    const word = ROLES[ri];
    el.textContent = word.slice(0, ci);
    if (!del && ci < word.length) { ci++; setTimeout(tick, 45); }
    else if (!del) { del = true; setTimeout(tick, 1600); }
    else if (ci > 0) { ci--; setTimeout(tick, 22); }
    else { del = false; ri = (ri + 1) % ROLES.length; setTimeout(tick, 300); }
  })();
})();

/* ============ REVEAL ============ */
(() => {
  const io = new IntersectionObserver(es =>
    es.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
    { threshold: 0.12 });
  document.querySelectorAll(".reveal, .skill-card, .work .box, .about-card").forEach(el => {
    el.classList.add("reveal"); io.observe(el);
  });
})();

/* ============ LEETCODE LIVE TRACKING ============
   Uses alfa-leetcode-api (free, no key). We try two hosts for reliability.
   Answer to "can we get live tracking?": YES — just set CONFIG.leetcodeUsername
   above (or type it in the card — it saves to localStorage). */
const lcStatus = document.getElementById("lc-status");
async function fetchLeetCode(user) {
  const hosts = [
    `https://alfa-leetcode-api.onrender.com/${user}/solved`,
    `https://leetcode-stats-api.herokuapp.com/${user}`,
  ];
  for (const url of hosts) {
    try {
      const r = await fetch(url);
      if (!r.ok) continue;
      const d = await r.json();
      // normalize both API shapes
      if (d.solvedProblem !== undefined) return {
        total: d.solvedProblem, easy: d.easySolved, med: d.mediumSolved, hard: d.hardSolved,
        rank: d.ranking, live: true,
      };
      if (d.totalSolved !== undefined) return {
        total: d.totalSolved, easy: d.easySolved, med: d.mediumSolved, hard: d.hardSolved,
        rank: d.ranking, live: true,
      };
    } catch { /* try next host */ }
  }
  return null;
}
async function syncLeetCode(user) {
  if (!user) {
    document.getElementById("lc-total").textContent = CONFIG.leetcodeFallbackTotal + "+";
    lcStatus.textContent = "connect your LeetCode username for live sync";
    return;
  }
  lcStatus.textContent = `syncing @${user}…`;
  const d = await fetchLeetCode(user);
  if (!d) {
    document.getElementById("lc-total").textContent = CONFIG.leetcodeFallbackTotal + "+";
    lcStatus.textContent = `couldn't reach LeetCode API for @${user} — showing ${CONFIG.leetcodeFallbackTotal}+ (API sleeps, retry in a min)`;
    return;
  }
  document.getElementById("lc-total").textContent = d.total;
  document.getElementById("lc-easy").textContent = d.easy ?? "—";
  document.getElementById("lc-medium").textContent = d.med ?? "—";
  document.getElementById("lc-hard").textContent = d.hard ?? "—";
  lcStatus.textContent = `live · @${user}` + (d.rank ? ` · rank #${d.rank}` : "") + " · auto-updates on load";
}
(() => {
  const input = document.getElementById("lc-input");
  const saved = localStorage.getItem("lc-user") || CONFIG.leetcodeUsername;
  if (saved) input.value = saved;
  syncLeetCode(saved);
  // refresh every 10 min while page open
  setInterval(() => syncLeetCode(input.value.trim() || localStorage.getItem("lc-user") || CONFIG.leetcodeUsername), 10 * 60 * 1000);
  document.getElementById("lc-btn").onclick = () => {
    const u = input.value.trim();
    if (u) localStorage.setItem("lc-user", u);
    syncLeetCode(u);
  };
  input.addEventListener("keydown", e => { if (e.key === "Enter") document.getElementById("lc-btn").click(); });
})();

/* ============ GITHUB LIVE REPOS ============ */
const FALLBACK_REPOS = [
  { name: "Qsnap", desc: "Python utility / experiment — quick snapshots & helpers.", lang: "Python", url: "https://github.com/astronishant/Qsnap" },
  { name: "trackurvaccine", desc: "Vaccine tracking helper built in Python.", lang: "Python", url: "https://github.com/astronishant/trackurvaccine" },
  { name: "VaxLivestock", desc: "Livestock vaccination tracker — web frontend.", lang: "HTML", url: "https://github.com/astronishant/VaxLivestock" },
  { name: "musictilesastrogame", desc: "Music-tiles browser game experiment.", lang: "JavaScript", url: "https://github.com/astronishant/musictilesastrogame" },
  { name: "trackyourvaccinefrontend", desc: "Frontend for the vaccine tracker.", lang: "HTML", url: "https://github.com/astronishant/trackyourvaccinefrontend" },
  { name: "rico", desc: "Small experiment repo — work in progress.", lang: null, url: "https://github.com/astronishant/rico" },
];
function repoCard(r) {
  const name = r.name, desc = r.description || r.desc || "No description yet — check the code.";
  const lang = r.language || r.lang || "—";
  const url = r.html_url || r.url;
  return `<div class="gh-card">
    <h3><a href="${url}" target="_blank"><i class="fa-solid fa-folder-open" style="color:var(--accent);margin-right:.4rem"></i>${name}</a></h3>
    <p>${desc}</p>
    <div class="gh-meta"><span><i class="fa-solid fa-circle" style="font-size:.55rem"></i> ${lang}</span>${r.stargazers_count !== undefined ? `<span>★ ${r.stargazers_count}</span><span>⑂ ${r.forks_count}</span>` : ""}</div>
  </div>`;
}
(async () => {
  const grid = document.getElementById("gh-grid");
  const status = document.getElementById("gh-status");
  try {
    const res = await fetch(`https://api.github.com/users/${CONFIG.githubUser}/repos?sort=updated&per_page=100`);
    if (!res.ok) throw new Error("gh api " + res.status);
    const all = await res.json();
    document.getElementById("gh-repos").textContent = all.length;
    // prefer your own (non-fork) repos, then recent forks, skip profile readme
    const own = all.filter(r => !r.fork && r.name.toLowerCase() !== CONFIG.githubUser.toLowerCase());
    const rest = all.filter(r => r.fork);
    const pick = [...own, ...rest].slice(0, 6);
    grid.innerHTML = pick.map(repoCard).join("");
    status.textContent = `live from GitHub · showing ${pick.length} of ${all.length} repos · updates automatically`;
  } catch {
    grid.innerHTML = FALLBACK_REPOS.map(repoCard).join("");
    status.textContent = "GitHub API rate-limited — showing cached picks (reload in a minute for live).";
  }
})();

/* ============ CONTACT (no backend — opens mail app) ============ */
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const n = document.getElementById("c-name").value.trim();
  const em = document.getElementById("c-email").value.trim();
  const m = document.getElementById("c-msg").value.trim();
  const subject = encodeURIComponent(`Portfolio contact from ${n}`);
  const body = encodeURIComponent(`${m}\n\n— ${n} (${em})`);
  window.location.href = `mailto:nishantyadawad007@gmail.com?subject=${subject}&body=${body}`;
});
