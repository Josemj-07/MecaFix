// The red cuts of the hero (Siesa structure), drawn as facets of the logo
// M: a wedge falling from the top-left corner and a wide one rising from
// the bottom-left to the right edge. Purely decorative.
export const HeroWedges = () => (
  <>
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1000 400"
      preserveAspectRatio="none"
      className="pointer-events-none absolute top-0 left-0 -z-10 h-[26%] w-full origin-top-left motion-safe:animate-wedge-top sm:h-[38%] lg:h-[46%]"
    >
      <polygon points="0,0 420,0 0,200" className="fill-primary" />
      <polygon points="0,0 270,0 0,120" className="fill-primary-hover" />
      <polygon
        points="270,0 420,0 0,200 0,120"
        className="fill-primary-soft opacity-50"
      />
      <polygon
        points="420,0 462,0 0,222 0,200"
        className="fill-primary-soft opacity-40"
      />
    </svg>
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1000 220"
      preserveAspectRatio="none"
      className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[12%] w-full motion-safe:animate-wedge-bottom sm:h-[18%]"
      style={{ animationDelay: '120ms' }}
    >
      <polygon points="0,220 1000,30 1000,220" className="fill-primary" />
      <polygon
        points="430,220 1000,30 1000,220"
        className="fill-primary-hover"
      />
      <polygon
        points="780,220 1000,30 1000,130"
        className="fill-primary-soft opacity-60"
      />
      <polygon
        points="0,220 1000,14 1000,30"
        className="fill-primary-soft opacity-60"
      />
    </svg>
  </>
);
