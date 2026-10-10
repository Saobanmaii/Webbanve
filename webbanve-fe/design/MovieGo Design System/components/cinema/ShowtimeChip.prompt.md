Tappable showtime tile: mono time + format line. Group by cinema in a wrapping flex row.
```jsx
<ShowtimeChip time="19:45" format="IMAX" selected />
<ShowtimeChip time="21:30" format="2D" seatsLeft={6} />
```
States: default · hover · selected (red + glow) · low availability (amber) · sold out (struck, 40%).
