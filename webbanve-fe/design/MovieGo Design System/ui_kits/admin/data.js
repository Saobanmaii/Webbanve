window.MG_ADMIN = {
  revenue: [['Night Shift',18400],['The Velvet Hour',14250],['Paper Moons',12100],['Static Bloom',10980],['The Quiet Coast',9800],['Low Tide',6420],['Ironwood',5200]].map(([label, value]) => ({ label, value, display: '$' + value.toLocaleString() })),
  movies: [
    { id: 1, title: 'Night Shift', genre: 'Thriller', runtime: '2h 14m', age: 'PG-13', status: 'Now showing', shows: 42 },
    { id: 2, title: 'The Velvet Hour', genre: 'Romance', runtime: '1h 52m', age: 'PG-13', status: 'Now showing', shows: 30 },
    { id: 3, title: 'Paper Moons', genre: 'Drama', runtime: '1h 58m', age: 'PG', status: 'Now showing', shows: 28 },
    { id: 4, title: 'Static Bloom', genre: 'Sci-Fi', runtime: '2h 09m', age: 'PG-13', status: 'Coming soon', shows: 0 },
    { id: 5, title: 'Ironwood', genre: 'Action', runtime: '2h 21m', age: 'R', status: 'Ending', shows: 6 },
  ],
  showtimes: [
    { id: 1, movie: 'Night Shift', cinema: 'Central', hall: 'Hall 4', date: '15 Oct', time: '19:45', fmt: 'IMAX', sold: 182, cap: 220, live: true },
    { id: 2, movie: 'Paper Moons', cinema: 'Riverside', hall: 'Hall 2', date: '15 Oct', time: '18:40', fmt: 'Dolby', sold: 64, cap: 140, live: true },
    { id: 3, movie: 'The Velvet Hour', cinema: 'Central', hall: 'Hall 1', date: '15 Oct', time: '20:10', fmt: '2D', sold: 131, cap: 140, live: true },
    { id: 4, movie: 'Ironwood', cinema: 'Harbour', hall: 'Hall 3', date: '15 Oct', time: '22:00', fmt: '2D', sold: 12, cap: 120, live: true },
    { id: 5, movie: 'Static Bloom', cinema: 'Central', hall: 'Hall 4', date: '24 Oct', time: '19:30', fmt: 'IMAX', sold: 0, cap: 220, live: false },
  ],
  cinemas: [
    { id: 1, name: 'MovieGo Central', city: 'Downtown', halls: 6, seats: 1040, occ: '78%' },
    { id: 2, name: 'MovieGo Riverside', city: 'Riverside Mall', halls: 4, seats: 610, occ: '64%' },
    { id: 3, name: 'MovieGo Harbour', city: 'Harbour Point', halls: 3, seats: 420, occ: '51%' },
  ],
};
