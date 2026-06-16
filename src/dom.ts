// A tiny, fully-typed hyperscript helper.
//
// Why this instead of innerHTML string concatenation: building the DOM through a
// typed factory keeps everything type-checked (tag names, event names and event
// payloads are all inferred from the lib.dom types), avoids HTML-injection foot-guns
// and means the "components" below are just plain, testable functions.

export type Child = Node | string | number | boolean | null | undefined

type EventMap = {
  [E in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[E]) => void
}

export interface ElementOptions {
  class?: string
  text?: string
  href?: string
  attrs?: Readonly<Record<string, string>>
  style?: Partial<CSSStyleDeclaration>
  on?: EventMap
}

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: ElementOptions = {},
  ...children: readonly Child[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag)

  if (options.class !== undefined) node.className = options.class
  if (options.text !== undefined) node.textContent = options.text
  if (options.href !== undefined && 'href' in node) {
    ;(node as HTMLElement & { href: string }).href = options.href
  }

  if (options.attrs) {
    for (const [name, value] of Object.entries(options.attrs)) {
      node.setAttribute(name, value)
    }
  }

  if (options.style) Object.assign(node.style, options.style)

  if (options.on) {
    for (const [type, handler] of Object.entries(options.on)) {
      node.addEventListener(type, handler as EventListener)
    }
  }

  for (const child of children) {
    if (child === null || child === undefined || child === false || child === true) continue
    node.append(typeof child === 'string' || typeof child === 'number' ? String(child) : child)
  }

  return node
}

export function mount(root: HTMLElement, ...children: readonly Child[]): void {
  root.replaceChildren()
  for (const child of children) {
    if (child === null || child === undefined || typeof child === 'boolean') continue
    root.append(typeof child === 'string' || typeof child === 'number' ? String(child) : child)
  }
}
