// Trang chủ — theo design ui_kits/web/Home.jsx
// Luồng: mở trang -> useEffect gọi GET /movies -> lưu vào state `movies` -> vẽ hero + lưới poster.
// Hero: 5 phim đang chiếu điểm cao nhất, tự chuyển mỗi 7 giây (setInterval), bấm chấm để chuyển tay.
// Lọc (tab trạng thái, thể loại, ô tìm kiếm) + sắp xếp làm ở FE trên danh sách đã tải về.
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import movieApi from '../api/movieApi'
import { getErrorMessage } from '../api/axiosClient'
import Backdrop from '../components/Backdrop'
import TrailerDialog from '../components/TrailerDialog'
import { Badge, Button, Chip, Input, MoviePoster, Rating, Select, Tabs } from '../ds'
import { AGE_RATING, MOVIE_STATUS, formatDuration, genresOf } from '../utils/format'

const TABS = [
  { id: 'NOW_SHOWING', label: 'Đang chiếu', icon: 'trending-up' },
  { id: 'COMING_SOON', label: 'Sắp chiếu', icon: 'calendar-days' },
]
const SORTS = [
  { value: 'rating', label: 'Điểm cao' },
  { value: 'newest', label: 'Mới nhất' },
  { value: 'az', label: 'A–Z' },
]
const SORT_FN = {
  rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
  newest: (a, b) => (b.releaseDate ?? '').localeCompare(a.releaseDate ?? ''),
  az: (a, b) => a.title.localeCompare(b.title, 'vi'),
}

export default function HomePage() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('NOW_SHOWING')
  const [genre, setGenre] = useState(null) // null = tất cả thể loại
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState('rating')
  const [heroIndex, setHeroIndex] = useState(0)
  const [trailer, setTrailer] = useState(null) // phim đang xem trailer

  // [] = chỉ chạy 1 lần khi trang mở
  useEffect(() => {
    movieApi
      .getAll(0, 200)
      .then((page) => setMovies(page.content))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false))
  }, [])

  // Phim cho hero: đang chiếu, ưu tiên có ảnh ngang, điểm cao nhất
  const heroes = useMemo(() => {
    const now = movies.filter((m) => m.status === 'NOW_SHOWING')
    const withArt = now.filter((m) => m.backdropUrl)
    return [...(withArt.length ? withArt : now)].sort(SORT_FN.rating).slice(0, 5)
  }, [movies])

  // Tự chuyển hero mỗi 7 giây. Hàm return = dọn interval khi rời trang (tránh chạy ngầm)
  useEffect(() => {
    if (heroes.length < 2) return
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % heroes.length), 7000)
    return () => clearInterval(timer)
  }, [heroes.length, heroIndex])

  // Danh sách thể loại (tách chuỗi "A, B") của các phim trong tab đang xem
  const genres = useMemo(
    () => [...new Set(movies.filter((m) => m.status === tab).flatMap(genresOf))].sort((a, b) => a.localeCompare(b, 'vi')),
    [movies, tab]
  )

  const list = movies
    .filter(
      (m) =>
        m.status === tab &&
        (!genre || genresOf(m).includes(genre)) &&
        m.title.toLowerCase().includes(keyword.trim().toLowerCase())
    )
    .sort(SORT_FN[sort])

  const hero = heroes[heroIndex] || movies[0]
  const openMovie = (id) => navigate(`/movies/${id}`)

  if (loading) return <div className="container">Đang tải phim...</div>
  if (error) return <div className="container"><p className="alert-error">{error}</p></div>

  return (
    <div>
      {hero && (
        // key={hero.id}: đổi phim -> React vẽ khối mới -> chạy lại hiệu ứng mờ dần (CSS .hero-fade)
        <Backdrop key={hero.id} seed={hero.title} src={hero.backdropUrl} height={560} style={{ animation: 'hero-fade 600ms var(--ease-out)' }}>
          <div className="hero-content">
            <div className="hero-meta-top">
              <Badge variant="outline">{AGE_RATING[hero.ageRating]}</Badge>
              <span className="overline">{MOVIE_STATUS[hero.status]}</span>
            </div>
            <h1 className="hero-title">{hero.title}</h1>
            <div className="hero-meta" style={{ alignItems: 'center' }}>
              {hero.rating != null && <Rating value={hero.rating} />}
              <span>{hero.releaseDate?.slice(0, 4)}</span>
              <span>{formatDuration(hero.durationMinutes)}</span>
              <span>{genresOf(hero).slice(0, 2).join(' · ')}</span>
            </div>
            {hero.description && <p className="hero-desc clamp-3">{hero.description}</p>}
            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <Button size="lg" iconLeft="ticket" onClick={() => openMovie(hero.id)}>Đặt vé</Button>
              {hero.trailerUrl && (
                <Button size="lg" variant="secondary" iconLeft="play" onClick={() => setTrailer(hero)}>Xem trailer</Button>
              )}
            </div>
          </div>
          {heroes.length > 1 && (
            <div className="hero-dots">
              {heroes.map((h, i) => (
                <button key={h.id} aria-label={h.title} onClick={() => setHeroIndex(i)} className={i === heroIndex ? 'on' : ''} />
              ))}
            </div>
          )}
        </Backdrop>
      )}

      <section className="home-list">
        <Tabs value={tab} onChange={(t) => { setTab(t); setGenre(null) }} items={TABS} />

        <div className="home-filters">
          <div className="chip-row">
            <Chip selected={!genre} onClick={() => setGenre(null)}>Tất cả</Chip>
            {genres.map((g) => (
              <Chip key={g} selected={genre === g} onClick={() => setGenre(genre === g ? null : g)}>{g}</Chip>
            ))}
          </div>
          <Input iconLeft="search" placeholder="Tìm tên phim..." value={keyword}
            onChange={(e) => setKeyword(e.target.value)} style={{ width: 260 }} />
        </div>

        <div className="count" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          Sắp xếp <Select size="sm" value={sort} onChange={(e) => setSort(e.target.value)} options={SORTS} />
          <span style={{ marginLeft: 'auto' }}>{list.length} phim</span>
        </div>

        {list.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)' }}>Không có phim nào phù hợp.</p>
        ) : (
          <div className="poster-grid">
            {list.map((m) => (
              <MoviePoster key={m.id} title={m.title} src={m.posterUrl} width={180}
                year={m.releaseDate?.slice(0, 4)} genre={genresOf(m)[0]} rating={m.rating ?? undefined}
                badge={<Badge tone="gold" variant="solid">{AGE_RATING[m.ageRating]}</Badge>}
                onClick={() => openMovie(m.id)} />
            ))}
          </div>
        )}
      </section>

      <TrailerDialog movie={trailer} onClose={() => setTrailer(null)} />
    </div>
  )
}
