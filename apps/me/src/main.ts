import './style.css'
import {
  config,
  type Link,
  type Social,
  type Work,
  type WorkType,
} from './config'

// 雲のバリエーション
const cloudVariants = [
  `<svg class="cloud-bg" viewBox="0 0 120 50" preserveAspectRatio="none"><path d="M20,40 Q5,40 5,30 Q5,22 15,20 Q12,10 25,8 Q35,2 50,8 Q60,4 75,6 Q88,0 100,8 Q112,6 115,20 Q120,28 112,38 Q105,46 85,44 Q65,50 45,44 Q25,48 20,40 Z"/></svg>`,
  `<svg class="cloud-bg" viewBox="0 0 120 50" preserveAspectRatio="none"><path d="M18,40 Q4,40 4,30 Q4,20 14,18 Q12,8 26,6 Q40,0 55,6 Q68,2 82,6 Q95,1 105,10 Q115,10 116,24 Q120,34 110,40 Q100,48 78,44 Q55,50 35,44 Q18,48 18,40 Z"/></svg>`,
  `<svg class="cloud-bg" viewBox="0 0 120 50" preserveAspectRatio="none"><path d="M16,40 Q3,38 5,28 Q3,18 15,17 Q18,5 34,5 Q50,0 65,6 Q78,2 92,8 Q108,5 113,18 Q120,26 112,38 Q102,46 80,44 Q58,50 38,44 Q20,48 16,40 Z"/></svg>`,
]

let cloudIndex = 0
const getCloudSvg = () => {
  const svg = cloudVariants[cloudIndex % cloudVariants.length]
  cloudIndex++
  return svg
}

// 常に雨
const isRainy = true

// 固定の雲（CSSで色を制御）
const fixedClouds = `
  <svg class="float-cloud cloud-1" viewBox="0 0 120 50">
    <path d="M18,40 Q4,40 4,30 Q4,22 14,20 Q10,10 24,7 Q36,0 52,7 Q64,2 78,7 Q94,4 100,16 Q116,16 118,30 Q122,38 112,43 Q100,50 78,46 Q56,52 36,46 Q20,50 18,40 Z"/>
  </svg>
  <svg class="float-cloud cloud-2" viewBox="0 0 100 42">
    <path d="M15,34 Q3,34 3,25 Q3,18 12,17 Q9,8 20,6 Q30,1 44,6 Q54,2 66,6 Q80,3 85,14 Q98,14 100,25 Q104,32 95,36 Q84,42 66,38 Q48,44 30,38 Q16,42 15,34 Z"/>
  </svg>
  <svg class="float-cloud cloud-3" viewBox="0 0 80 35">
    <path d="M14,28 Q4,27 4,20 Q4,14 11,13 Q9,6 18,5 Q26,1 38,5 Q47,2 56,5 Q66,3 70,12 Q80,12 78,21 Q80,28 70,29 Q60,34 46,30 Q32,35 20,30 Q12,32 14,28 Z"/>
  </svg>
`

// 雨を生成
function generateRain(): string {
  let drops = ''
  for (let i = 0; i < 20; i++) {
    const left = 5 + i * 4.5
    const delay = (i * 0.12) % 2
    const durationBase = 0.8 + (i % 3) * 0.15
    drops += `<div class="rain-drop" style="left:${left}%; animation-delay:${delay}s; --duration-base:${durationBase};"></div>`
  }
  return `<div class="weather-rain">${drops}</div>`
}

const floatingClouds = `
<div class="floating-clouds ${isRainy ? 'is-rainy' : ''}">
  ${fixedClouds}
  ${isRainy ? generateRain() : ''}
</div>
`

const icons: Record<string, string> = {
  // Links
  blog: `<svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
  github: `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  mail: `<svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  // Socials
  x: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  bluesky: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/></svg>`,
  // Section icons
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  // Work types
  app: `<svg class="work-type-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  repo: `<svg class="work-type-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  product: `<svg class="work-type-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  service: `<svg class="work-type-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  site: `<svg class="work-type-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
}

const statusLabels: Record<string, string> = {
  live: '公開中',
  dev: '開発中',
  archived: 'アーカイブ',
}

const initialVisible = {
  works: config.initialVisible?.works ?? 3,
}

function applyTheme(): void {
  if (config.theme) {
    document.documentElement.style.setProperty('--accent', config.theme.accent)
    document.documentElement.style.setProperty(
      '--accent-light',
      config.theme.accentLight,
    )
  }
}

function renderAvatar(): string {
  if (config.avatar) {
    return `<img src="${config.avatar}" alt="${config.name}" />`
  }
  return ''
}

function renderBio(): string {
  if (!config.bio) return ''
  return `<p class="bio">${config.bio}</p>`
}

function renderInto(): string {
  if (!config.into || config.into.length === 0) return ''
  return `<p class="into">into: ${config.into.join(', ')}</p>`
}

function renderLinkItems(links: Link[]): string {
  return links
    .map((link) => {
      const icon = icons[link.label] || ''
      return `<a href="${link.url}" class="link-item" title="${link.label}">${getCloudSvg()}<span class="link-content">${icon}<span>${link.label}</span></span></a>`
    })
    .join('')
}

function renderLinks(links: Link[]): string {
  return `
    <section class="links-section">
      <div class="section-label"><span class="section-label-icon">${icons.link}</span>links</div>
      <nav class="links">${renderLinkItems(links)}</nav>
    </section>
  `
}

function getWorkIcon(type: WorkType): string {
  return icons[type] || icons.site
}

function renderWorkItem(work: Work, isPinned = false): string {
  const icon = getWorkIcon(work.type)
  const statusClass = work.status ? `status-${work.status}` : ''
  const statusLabel = work.status ? statusLabels[work.status] : ''
  const pinnedClass = isPinned ? 'is-pinned' : ''

  return `
    <a href="${work.url}" class="work-item ${statusClass} ${pinnedClass}">
      ${getCloudSvg()}
      <div class="work-info">
        <div class="work-header">
          <span class="work-type-icon">${icon}</span>
          <span class="work-name">${work.name}</span>
        </div>
        ${statusLabel ? `<span class="work-status">${statusLabel}</span>` : ''}
      </div>
    </a>
  `
}

function renderWorks(works: Work[]): string {
  if (works.length === 0) return ''

  const pinned = works.filter((w) => w.pinned)
  const others = works.filter((w) => !w.pinned)

  const limit = initialVisible.works
  const hasMore = others.length > limit
  const visible = others.slice(0, limit)
  const hidden = others.slice(limit)

  const pinnedSection = pinned.length
    ? `
      <div class="works-section">
        <div class="section-label"><span class="section-label-icon">${icons.pin}</span>pin</div>
        <div class="works-grid">${pinned.map((w) => renderWorkItem(w, true)).join('')}</div>
      </div>
    `
    : ''

  const othersSection = others.length
    ? `
      <div class="works-section">
        <div class="works-grid">
          ${visible.map((w) => renderWorkItem(w, false)).join('')}
          ${hasMore ? `<div class="hidden-items">${hidden.map((w) => renderWorkItem(w, false)).join('')}</div>` : ''}
        </div>
        ${hasMore ? `<button class="show-more" data-target="works">+${hidden.length} more</button>` : ''}
      </div>
    `
    : ''

  return `
    <section class="works" data-section="works">
      ${pinnedSection}
      ${othersSection}
    </section>
  `
}

function renderSocials(socials: Social[]): string {
  return socials
    .map((s) => {
      const icon = icons[s.platform] || ''
      return `<a href="${s.url}" class="social-icon" title="${s.platform}">${icon}</a>`
    })
    .join('')
}

function setupExpandButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('.show-more').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target
      if (!target) return

      const section = document.querySelector(`[data-section="${target}"]`)
      const hidden = section?.querySelector('.hidden-items')
      if (hidden) {
        hidden.classList.add('visible')
        btn.remove()
      }
    })
  })
}

function render(): void {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  app.innerHTML = `
    ${floatingClouds}
    <main>
      <header class="hello">
        <div class="avatar">${renderAvatar()}</div>
        <div class="name-block">
          <h1>${config.name}<span class="cursor"></span></h1>
          ${config.tagline ? `<p class="tagline">${config.tagline}</p>` : ''}
        </div>
      </header>

      ${renderBio()}

      <div class="divider">· · ·</div>

      ${renderInto()}

      ${renderLinks(config.links)}

      ${renderWorks(config.works)}
    </main>

    <footer>
      <div class="socials">${renderSocials(config.socials)}</div>
    </footer>

    <img src="/family.png" alt="" class="deco-family" />
  `

  setupExpandButtons()
}

applyTheme()
render()

// テーマ切り替え
function setupThemeToggle(): void {
  const decoFamily = document.querySelector<HTMLImageElement>('.deco-family')
  if (!decoFamily) return

  // 保存されたテーマを適用
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme)
  }

  decoFamily.style.cursor = 'pointer'
  decoFamily.style.pointerEvents = 'auto'
  decoFamily.setAttribute('role', 'button')
  decoFamily.setAttribute('aria-label', 'テーマ切り替え')
  decoFamily.setAttribute('tabindex', '0')

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme')
    const next =
      current === 'dark'
        ? 'light'
        : current === 'light'
          ? 'dark'
          : window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'light'
            : 'dark'

    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  decoFamily.addEventListener('click', toggleTheme)
  decoFamily.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleTheme()
    }
  })
}

setupThemeToggle()
