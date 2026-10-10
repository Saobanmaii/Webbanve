function Header({ route, go }) {
  const { NavBar, IconButton, Button } = window.MovieGoDesignSystem_a2f949;
  const active = route.name === 'bookings' ? 'bookings' : route.name === 'showtimes' ? 'showtimes' : 'movies';
  return (
    <div style={{ position: route.name === 'home' || route.name === 'movie' ? 'absolute' : 'sticky', top: 0, left: 0, right: 0, zIndex: 20 }}>
      <NavBar transparent={route.name === 'home' || route.name === 'movie'} active={active} onNavigate={(id) => go({ name: id === 'movies' ? 'home' : id })}
        links={[{ id: 'movies', label: 'Movies' }, { id: 'showtimes', label: 'Showtimes' }, { id: 'bookings', label: 'My bookings' }]}
        right={<><IconButton icon="search" label="Search" /><IconButton icon="bell" label="Notifications" /><span style={{ width: 36, height: 36, borderRadius: 18, background: 'var(--ink-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 13px var(--font-body)' }}>SL</span></>} />
    </div>
  );
}
window.Header = Header;
