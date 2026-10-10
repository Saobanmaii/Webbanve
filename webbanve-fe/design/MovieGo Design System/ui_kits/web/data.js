window.MG_DATA = {
  movies: [
    { id: 'night-shift', title: 'Night Shift', year: 2025, rating: 8.4, genre: 'Thriller', runtime: '2h 14m', age: 'PG-13', format: 'IMAX', synopsis: 'A hospital night nurse discovers that the patients on the ninth floor are checking in, but none of them are checking out.' },
    { id: 'paper-moons', title: 'Paper Moons', year: 2025, rating: 8.1, genre: 'Drama', runtime: '1h 58m', age: 'PG', synopsis: 'Two estranged sisters reopen their late father\'s puppet theatre for one final season.' },
    { id: 'quiet-coast', title: 'The Quiet Coast', year: 2024, rating: 7.6, genre: 'Mystery', runtime: '2h 02m', age: 'PG-13', synopsis: 'A lighthouse keeper receives radio messages from a ship that sank forty years ago.' },
    { id: 'ironwood', title: 'Ironwood', year: 2023, rating: 6.9, genre: 'Action', runtime: '2h 21m', age: 'R', synopsis: 'A retired logger is pulled into one last job deep in the northern forest.' },
    { id: 'static-bloom', title: 'Static Bloom', year: 2025, rating: 7.8, genre: 'Sci-Fi', runtime: '2h 09m', age: 'PG-13', format: 'IMAX', synopsis: 'Botanists on a dying orbital farm race to save the last living seed bank.' },
    { id: 'low-tide', title: 'Low Tide', year: 2024, rating: 7.2, genre: 'Crime', runtime: '1h 49m', age: 'R', synopsis: 'A harbour detective follows a smuggling ring that only moves when the water is out.' },
    { id: 'velvet-hour', title: 'The Velvet Hour', year: 2025, rating: 8.7, genre: 'Romance', runtime: '1h 52m', age: 'PG-13', synopsis: 'A jazz pianist and a radio host fall for each other entirely on air.' },
  ],
  genres: ['Action', 'Adventure', 'Biography', 'Crime', 'Comedy', 'Documentary', 'Drama', 'Sci-Fi', 'Thriller'],
  days: [['d0','Today',14],['d1','Thu',15],['d2','Fri',16],['d3','Sat',17],['d4','Sun',18],['d5','Mon',19],['d6','Tue',20]].map(([id, weekday, day]) => ({ id, weekday, day })),
  cinemas: [
    { id: 'central', name: 'MovieGo Central', area: 'Downtown · 1.2 km', times: [['13:10','2D'],['16:30','IMAX'],['19:45','IMAX'],['21:30','2D',6],['23:50','2D',0]] },
    { id: 'riverside', name: 'MovieGo Riverside', area: 'Riverside Mall · 4.8 km', times: [['12:00','2D'],['15:20','2D'],['18:40','Dolby'],['22:10','2D',9]] },
    { id: 'harbour', name: 'MovieGo Harbour', area: 'Harbour Point · 7.5 km', times: [['14:00','2D'],['17:15','4DX'],['20:30','2D']] },
  ],
  taken: ['C5','C6','D7','D8','D9','E3','E4','F10','G10','G11','B12','B13','H6','H7'],
  bookings: [
    { ref: 'MG-7Q4K-2291', movie: 'Night Shift', cinema: 'MovieGo Central · Hall 4', when: 'Thu 15 Oct · 19:45', seats: ['F7','F8'], total: '$31.50', status: 'Upcoming' },
    { ref: 'MG-3HPZ-1180', movie: 'Paper Moons', cinema: 'MovieGo Riverside · Hall 2', when: 'Sat 26 Sep · 18:40', seats: ['D5'], total: '$14.25', status: 'Watched' },
    { ref: 'MG-9WLC-0754', movie: 'Ironwood', cinema: 'MovieGo Central · Hall 1', when: 'Fri 04 Sep · 21:30', seats: ['G3','G4','G5'], total: '$40.50', status: 'Watched' },
  ],
};
