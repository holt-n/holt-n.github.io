import { h } from './dom'

// Reads, increments and persists a tongue-in-cheek "hit counter" in localStorage.
// It starts from a fixed offset so the very first visit doesn't read "1".
const COUNTER_KEY = 'titan:hits'
const COUNTER_SEED = 13_372

function nextHitCount(): number {
  const stored = Number.parseInt(window.localStorage.getItem(COUNTER_KEY) ?? '', 10)
  const current = Number.isFinite(stored) ? stored : COUNTER_SEED
  const next = current + 1
  window.localStorage.setItem(COUNTER_KEY, String(next))
  return next
}

function odometer(value: number): HTMLElement {
  const digits = value.toString().padStart(6, '0').split('')
  const wrap = h('span', { class: 'counter', attrs: { 'aria-label': `${value} visitors` } })
  for (const digit of digits) {
    wrap.append(h('span', { class: 'counter__digit', attrs: { 'aria-hidden': 'true' }, text: digit }))
  }
  return wrap
}

const timeFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

export function statusBar(): HTMLElement {
  const clock = h('span', { class: 'status__clock', text: timeFormat.format(new Date()) })

  const tick = (): void => {
    clock.textContent = timeFormat.format(new Date())
  }
  window.setInterval(tick, 1000)

  return h(
    'footer',
    { class: 'window__status', attrs: { role: 'contentinfo' } },
    h('span', { class: 'status__cell' }, 'Visitors: ', odometer(nextHitCount())),
    h('span', { class: 'status__cell status__cell--grow', text: 'Best viewed at 1024×768' }),
    h('span', { class: 'status__cell' }, clock)
  )
}
