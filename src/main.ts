import './style.css'
import { h, mount } from './dom'
import { titleBar, navBar, contentArea } from './sections'
import { statusBar } from './extras'

function App(): HTMLElement {
  return h(
    'div',
    { class: 'window', attrs: { role: 'application' } },
    titleBar(),
    navBar(),
    contentArea(),
    statusBar()
  )
}

// Highlights the nav link for whichever section is at the top of the scroll area.
//
// We drive this from scroll position rather than IntersectionObserver's "centre of
// viewport" rule, because the shorter sections (About, Contact) can never reach the
// centre line — the taller Services section sits under it — so the highlight would
// wrongly stick to Services. Here we pick the last section whose top has passed the
// reading line, and force the final section once we hit the bottom (a short last
// section can never scroll its top up to the line).
function wireScrollSpy(root: HTMLElement): void {
  const links = new Map<string, HTMLAnchorElement>()
  for (const link of root.querySelectorAll<HTMLAnchorElement>('[data-nav]')) {
    const id = link.dataset['nav']
    if (id) links.set(id, link)
  }

  const scrollRoot = root.querySelector<HTMLElement>('#content')
  const sections = [...root.querySelectorAll<HTMLElement>('.section')]
  if (!scrollRoot || sections.length === 0) return

  const setActive = (id: string): void => {
    for (const [linkId, link] of links) link.classList.toggle('is-active', linkId === id)
  }

  const update = (): void => {
    const readingLine = scrollRoot.getBoundingClientRect().top + 24
    const atBottom =
      scrollRoot.scrollTop + scrollRoot.clientHeight >= scrollRoot.scrollHeight - 2

    let activeId = sections[0]?.id ?? ''
    if (atBottom) {
      activeId = sections.at(-1)?.id ?? activeId
    } else {
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) activeId = section.id
      }
    }

    if (activeId) setActive(activeId)
  }

  scrollRoot.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update, { passive: true })
  update()
}

const root = document.querySelector<HTMLDivElement>('#app')
if (!root) throw new Error('Mount point #app not found')

const app = App()
mount(root, app)
wireScrollSpy(app)
