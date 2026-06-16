// The entire site is data-driven: edit the values below and the page rebuilds
// itself. `satisfies` validates this object against the schema *without* widening
// the literal types, so the rest of the app gets precise autocomplete.

export interface NavLink {
  readonly id: string;
  readonly label: string;
}

export interface Service {
  readonly glyph: string;
  readonly title: string;
  readonly body: string;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export interface SiteContent {
  readonly brand: string;
  readonly established: number;
  readonly tagline: string;
  readonly nav: readonly NavLink[];
  readonly hero: {
    readonly heading: string;
    readonly marquee: string;
    readonly intro: string;
    readonly stats: readonly Stat[];
  };
  readonly about: {
    readonly heading: string;
    readonly paragraphs: readonly string[];
  };
  readonly services: {
    readonly heading: string;
    readonly items: readonly Service[];
  };
  readonly contact: {
    readonly heading: string;
    readonly blurb: string;
    readonly email: string;
  };
}

export const content = {
  brand: "Titan Applications",
  established: 2015,
  tagline: "Bespoke software & honest IT, built to last.",
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ],
  hero: {
    heading: "Welcome to Titan Applications",
    marquee:
      "★ Now rebuilt for the modern web! ★ Bespoke applications ★ Tech consultancy & IT services ★ Honest and smart engineering, no nonsense ★",
    intro:
      "We are a software studio and tech consultancy in one. We design and build dependable web, mobile and desktop applications, and we keep the systems behind your business running smoothly, without the jargon or the nonsense.",
    stats: [
      { value: "12+", label: "Years building" },
      { value: "100%", label: "Bespoke work" },
      { value: "∞", label: "Cups of coffee" },
    ],
  },
  about: {
    heading: "About the studio",
    paragraphs: [
      "Titan Applications is a small, focused software studio and tech consultancy. We take projects from a rough idea on the back of a napkin through to a polished product that people actually enjoy using, and we advise on the technology and infrastructure that sits behind it.",
      "We try to use modern, reliable technology and tidy code. That means fewer surprises, lower running costs and systems that are still maintainable years after launch with customisable Service Level Agreements.",
    ],
  },
  services: {
    heading: "What we do",
    items: [
      {
        glyph: "🖥️",
        title: "Web applications",
        body: "Fast, accessible web apps built with modern TypeScript and a sensible, long-lived stack.",
      },
      {
        glyph: "📱",
        title: "Mobile applications",
        body: "Smartphone and tablet mobile apps designed and built to your specifications, either natively or as a web app as well as the backend to support them.",
      },
      {
        glyph: "🧰",
        title: "Bespoke tools and DevSecOps automation",
        body: "Internal tools and automations that quietly remove the tedious parts of your working day, and DevSecOps automation to keep your systems secure and running smoothly.",
      },
      {
        glyph: "🛠️",
        title: "Rescue, maintenance and Upgrades",
        body: "Inherited a tangle of legacy code? We stabilise it, document it and make it run optimally again, we also offer long Service Level Agreements to keep it running smoothly.",
      },
      {
        glyph: "🧭",
        title: "IT consultancy",
        body: "Practical, vendor-neutral advice on architecture, infrastructure, code reviews and the right tools for the job.",
      },
      {
        glyph: "🧠",

        title: "Smart AI Usage",
        body: "We use AI smartly, we don't let it take over the job, we use it to help us make better decisions and to automate tasks.",
      },
    ],
  },
  contact: {
    heading: "Get in touch",
    blurb:
      "Tell us what you are trying to build. We reply to every genuine enquiry.",
    email: "hello@titan-applications.com",
  },
} satisfies SiteContent;
