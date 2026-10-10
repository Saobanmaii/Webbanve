The core browsing unit: 2:3 poster with 14px radius, deep shadow, and title/year/rating below. Lay out in horizontal rows.
```jsx
<MoviePoster title="Night Shift" year={2025} rating={8.4} badge={<Badge tone="gold" variant="solid">IMAX</Badge>} onClick={open} />
```
Hover lifts 4px and scales 1.02. Always pass `src` with real key art when available.
