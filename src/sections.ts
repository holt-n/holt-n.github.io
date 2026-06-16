import { h } from './dom'
import type { Service, Stat } from './content'
import { content } from './content'

function statBlock(stat: Stat): HTMLElement {
  return h(
    'div',
    { class: 'stat' },
    h('span', { class: 'stat__value', text: stat.value }),
    h('span', { class: 'stat__label', text: stat.label })
  )
}

function serviceCard(service: Service): HTMLElement {
  return h(
    'article',
    { class: 'card' },
    h('div', { class: 'card__glyph', attrs: { 'aria-hidden': 'true' }, text: service.glyph }),
    h('h3', { class: 'card__title', text: service.title }),
    h('p', { class: 'card__body', text: service.body })
  )
}

export function titleBar(): HTMLElement {
  const controls = (['—', '▢', '✕'] as const).map((symbol) =>
    h('span', { class: 'window__control', attrs: { 'aria-hidden': 'true' }, text: symbol })
  )

  return h(
    'header',
    { class: 'window__bar' },
    h(
      'span',
      { class: 'window__title' },
      h('span', { class: 'window__icon', attrs: { 'aria-hidden': 'true' }, text: '◆' }),
      `${content.brand} — Microsoft Internet Explorer`
    ),
    h('span', { class: 'window__controls' }, ...controls)
  )
}

export function navBar(): HTMLElement {
  const links = content.nav.map((link) =>
    h('a', {
      class: 'nav__link',
      text: link.label,
      href: `#${link.id}`,
      attrs: { 'data-nav': link.id }
    })
  )
  return h('nav', { class: 'nav', attrs: { 'aria-label': 'Primary' } }, ...links)
}

function heroSection(): HTMLElement {
  return h(
    'section',
    { class: 'section section--hero', attrs: { id: 'home' } },
    h('div', { class: 'marquee', attrs: { role: 'presentation' } },
      h('span', { class: 'marquee__text', text: content.hero.marquee })
    ),
    h('h1', { class: 'hero__heading', text: content.hero.heading }),
    h('p', { class: 'hero__tagline', text: content.tagline }),
    h('p', { class: 'hero__intro', text: content.hero.intro }),
    h('div', { class: 'stats' }, ...content.hero.stats.map(statBlock)),
    h('a', { class: 'btn btn--primary', text: 'Start a project ▸', href: '#contact' })
  )
}

function aboutSection(): HTMLElement {
  return h(
    'section',
    { class: 'section', attrs: { id: 'about' } },
    h('h2', { class: 'section__heading', text: content.about.heading }),
    ...content.about.paragraphs.map((paragraph) => h('p', { class: 'prose', text: paragraph }))
  )
}

function servicesSection(): HTMLElement {
  return h(
    'section',
    { class: 'section', attrs: { id: 'services' } },
    h('h2', { class: 'section__heading', text: content.services.heading }),
    h('div', { class: 'cards' }, ...content.services.items.map(serviceCard))
  )
}

function contactSection(): HTMLElement {
  return h(
    'section',
    { class: 'section', attrs: { id: 'contact' } },
    h('h2', { class: 'section__heading', text: content.contact.heading }),
    h('p', { class: 'prose', text: content.contact.blurb }),
    h('a', {
      class: 'btn btn--mail',
      text: `✉ ${content.contact.email}`,
      href: `mailto:${content.contact.email}`
    })
  )
}

export function contentArea(): HTMLElement {
  return h(
    'main',
    { class: 'window__content', attrs: { id: 'content' } },
    heroSection(),
    aboutSection(),
    servicesSection(),
    contactSection()
  )
}
