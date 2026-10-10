Admin list table for movies, cinemas, showtimes and bookings. Uppercase header on surface-2, hairline rows, hover highlight.
```jsx
<DataTable columns={[{key:'title',label:'Movie'},{key:'time',label:'Time',mono:true},{key:'sold',label:'Sold',align:'right',mono:true}]} rows={rows} />
```
Use `render` for badges, switches and row actions.
