# MovieGo Design System

MovieGo is a web-based cinema ticket booking platform. Moviegoers browse films and showtimes, pick seats on an interactive seat map, book, and complete a simulated payment. Cinema staff use an admin console to manage movies, cinemas and showtimes and to read revenue by movie.

**Products / surfaces**
- **Customer web app** — discovery (hero, Now showing rows, genre filters), movie detail + showtimes by cinema/date, seat selection, payment, confirmation, booking history. → `ui_kits/web/`
- **Admin console** — dashboard KPIs, movies catalogue, showtimes scheduling, cinemas, revenue reports. → `ui_kits/admin/`

**Sources given**
- Product brief (name, problem, audience, features, design notes) pasted in chat.
- `uploads/23983e38ab41b6ef9c744ad0dfacb467.jpg` — a third-party streaming-site concept shot used as **mood reference only**: black canvas, full-bleed key-art hero with left scrim, heavy uppercase title, red pill buttons, red genre pills, rounded 2:3 posters with gold star ratings, red smoke haze at the page edges. It carries another company's branding, which is **not** used here.
- No codebase, Figma, logo, font files or imagery were provided. All components and screens are original designs built from the brief.

---

## Content fundamentals
- **Voice:** a helpful usher — brief, warm, confident. Speaks to the user as **you**; MovieGo never says "I"/"we" in UI except legal/help copy.
- **Casing:** Sentence case for headings, buttons and labels ("Book tickets", "Choose a showtime", "Continue to payment"). UPPERCASE only for film titles in display type, badges (IMAX, PG-13) and overline eyebrows ("NOW SHOWING").
- **Buttons are verbs + object:** "Book tickets", "Select seats", "Pay $31.50", "Release seats", "Add movie". Never "Submit" / "OK".
- **Be concrete with numbers:** times in 24h mono ("19:45"), money with two decimals ("$13.50"), seat ids as row+number ("F12"), refs as `MG-XXXX-0000`. Low availability reads "6 left", not "Hurry!".
- **Reassure at money moments:** "Seats are held for 10 minutes", "This is a simulated checkout. No real charge is made.", "Payments are encrypted end to end."
- **Celebrate briefly:** "You're booked." + one line of next step. No exclamation pile-ups.
- **Admin copy** is neutral and operational: "214 shows across 13 halls", "Publish, pause and schedule screenings".
- **No emoji.** No marketing superlatives. Synopses are one sentence, present tense.

## Visual foundations
- **Canvas:** pure black page (`--bg-page`), with ink surfaces layered by lightness (`--surface-1` → `--surface-raised`). Darkness is the brand: the UI should feel like the house lights just went down.
- **Colour:** one accent — **Marquee red** `#E3262E` — for the primary action, selected seats, selected showtime/date/genre and active-nav dots. **Usher gold** is strictly ratings and premium/VIP/IMAX. Teal = accessible seating/info, green = success/paid, amber = low availability/holds. Everything else is neutral ink. Never more than one red primary button per view.
- **Type:** Archivo (display, 700–800, tight −0.02em, uppercase for film titles), DM Sans (UI/body 400–600), JetBrains Mono (times, seat ids, prices in tables, booking refs). Hero titles 56–72px at 0.95 line-height.
- **Imagery:** key art is the hero. Full-bleed 16:9 backdrops with a left + bottom black scrim (`--scrim-hero`) so text sits on near-black; posters always 2:3. Preferred grade: cool, desaturated, high-contrast, with skin and practical lights carrying warmth. Without art, use the tonal typographic placeholder (hue derived from title) — never stock or drawn illustration.
- **Backgrounds:** no patterns or textures. Optional deep-red haze in a lower corner (`--haze-red`) recalls theatre smoke; use at most once per page.
- **Corner radii:** soft but not bubbly — 4 badges, 10 inputs/showtimes/dates, 14 posters/cards, 20 large panels/dialogs, pill for buttons and chips. Seats use a chair silhouette `7px 7px 4px 4px`.
- **Cards:** `--surface-1` fill, 1px `--border-subtle` (8% white), radius 14–20, no drop shadow on black (shadows are invisible); posters are the exception — `--shadow-poster` lifts them off the haze.
- **Borders:** hairlines in white alpha (8 / 14 / 26%). Dashed borders only for ticket-stub perforations and summary dividers.
- **Elevation:** popovers/dialogs use `--surface-raised` + `--shadow-overlay`. Selected items glow red (`--glow-accent`) rather than rise.
- **Transparency & blur:** glass (`--surface-glass` + `--blur-glass`) for the sticky nav and bottom "continue" bar; blurred black scrim behind dialogs. Nowhere else.
- **Hover:** surfaces lighten one ink step; borders go to strong; red goes to `--red-400` and gains glow; posters lift 4px + scale 1.02 with a hairline ring. Text links go lighter red.
- **Press:** buttons scale to .97. Selected seats spring to 1.08 (`--ease-spring`).
- **Motion:** quick and cinematic, never bouncy except seat pick. UI 120–200ms `--ease-out`; panels 320ms; hero crossfades 600ms. No parallax, no autoplay video.
- **Layout:** 48px gutters, 1280 max content, 72px top nav (transparent over hero, glass elsewhere). Booking flow drops the main nav for a stepper header and a sticky right summary (360px). Admin uses a 248px left sidebar with a red indicator bar on the active item.
- **Focus:** red border + soft red ring on inputs; `--ring-focus` (black gap + red ring) for buttons.

## Iconography
- **Lucide** (CDN, `lucide@0.468.0` UMD), outline, **1.75 stroke**, 20px default (14–18 in dense rows), `currentColor`. Rendered via the `Icon` component so React apps don't depend on `createIcons()`.
- Core set: film, clapperboard, ticket, armchair, calendar-days, clock, map-pin, star (filled gold for ratings), heart, play, plus, search, credit-card, wallet, lock, trending-up/down, bar-chart-3, banknote, layout-dashboard, building-2.
- No icon font, no PNG icons, **no emoji**, no unicode glyphs as icons (except "·" as a meta separator).
- **Substitution flag:** no icon set was supplied; Lucide was chosen as the closest fit for a clean outline UI.

## Brand mark
No logo was provided. The name is set in type: "MovieGo" in Archivo 800, −0.02em, with "Go" in Marquee red (see `guidelines/brand-wordmark.html`). Replace when a real mark exists.

## Fonts
Substitutes from Google Fonts, self-hosted in `assets/fonts/` (Latin, variable): **Archivo**, **DM Sans**, **JetBrains Mono**. Flagged — swap in brand fonts if they exist.

---

## Index
- `styles.css` — entry; imports `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css`.
- `guidelines/` — foundation specimen cards (colors, type, spacing, radii, shadows, scrims, motion, wordmark, icons).
- `components/` — React primitives (below), each with `.jsx`, `.d.ts`, `.prompt.md`, one card per folder.
- `ui_kits/web/` — customer booking app (index.html click-through).
- `ui_kits/admin/` — admin console (index.html click-through).
- `assets/fonts/` — webfonts.
- `thumbnail.html`, `SKILL.md`.

## Components
- **core/** — Button, IconButton, Badge, Chip, Rating, Icon
- **forms/** — Input, Select, Checkbox, Switch
- **navigation/** — NavBar, Tabs, Stepper
- **cinema/** — MoviePoster, ShowtimeChip, DateStrip, Seat, SeatMap, BookingSummary
- **feedback/** — Dialog, Toast
- **admin/** — StatCard, DataTable, BarList

Pages using components must load the Lucide UMD script before the bundle.

### Intentional additions
No source component inventory existed, so the full set above was authored from the brief. `Icon` wraps Lucide so components render icons without a DOM scan.
