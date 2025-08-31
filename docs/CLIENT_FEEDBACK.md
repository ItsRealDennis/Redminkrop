### Client Feedback

#### Hero Section
- Keep the initial hero text load-in animation on first page load. It feels premium and should remain part of the experience.

### Technical Specification — Hero Intro Animation

- Libraries: GSAP 3, SplitType 0.3
- Trigger: On `Hero` mount (first page load); no scroll pinning; scroll parallax is disabled.
- Typography: `Clash Display` for headings, `Satoshi` for body, `Space Grotesk` for accents (loaded via `src/app/fonts.css` and applied through CSS variables).

Sequence and rates
1) Decorative lines
   - Property: `scaleX` from 0 → 1
   - Duration: 1.5s
   - Ease: `power4.inOut`
   - Stagger: ~0.1s between lines

2) Heading reveal (SplitType — words)
   - From: `y: 120px`, `rotationX: -80deg`, `autoAlpha: 0`
   - Duration: 1.3s
   - Ease: `power4.out`
   - Stagger: `amount: 0.9`, `from: 'start'` (word-level)

3) Subheading
   - From: `y: 40px`, `autoAlpha: 0`
   - Duration: 0.9s
   - Ease: `power3.out`

4) Paragraph
   - From: `y: 30px`, `autoAlpha: 0`
   - Duration: 0.9s
   - Ease: `power3.out`

5) CTA button (intro)
   - From: `scale: 0`, `autoAlpha: 0`
   - Duration: 0.7s
   - Ease: `back.out(1.7)`

6) CTA magnetic interaction (pointer-only)
   - Active radius: 200px from button center
   - Strength: 0.3 multiplier of pointer delta (x/y)
   - Move ease: `power2.out`, duration: 0.3s
   - Reset on leave: `elastic.out(1, 0.3)`, duration: 0.5s

Behavioral notes
- Scroll-based parallax and pinning: disabled by request; hero remains static after intro.
- Fallback visibility: Intro uses `autoAlpha` so text remains visible even if GSAP fails.
- Performance: Transform-only animations, `will-change` usage; background rendered via lightweight WebGL shader with subtle postprocessing.


