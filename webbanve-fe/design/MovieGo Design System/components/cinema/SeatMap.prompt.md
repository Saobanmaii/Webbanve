Full seat-selection map: curved glowing screen, lettered rows, aisle gaps, legend. Owns layout only — keep selection state in the parent.
```jsx
<SeatMap selected={sel} taken={['E7','E8']} vipRows={['H']} onToggle={id => setSel(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id])} />
```
At default 28px seats, 14 seats/row needs ~560px width.
