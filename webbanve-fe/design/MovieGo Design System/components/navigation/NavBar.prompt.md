Top app bar: MovieGo wordmark, primary links (active = white + red dot), right slot.
```jsx
<NavBar links={[{id:'movies',label:'Movies'},{id:'cinemas',label:'Cinemas'}]} active="movies" right={<IconButton icon="search" label="Search" />} />
```
Use `transparent` over a full-bleed hero; glass (blurred) otherwise. Keep to ≤5 links.
