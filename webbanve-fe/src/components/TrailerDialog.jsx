// Hộp xem trailer YouTube (nhúng iframe). Đóng hộp = gỡ iframe -> video dừng.
import { Dialog } from '../ds'
import { youtubeEmbed } from '../utils/format'

export default function TrailerDialog({ movie, onClose }) {
  const src = youtubeEmbed(movie?.trailerUrl)
  return (
    <Dialog open={!!movie} title={movie ? `Trailer · ${movie.title}` : ''} width={900} onClose={onClose}>
      {src ? (
        <div style={{ position: 'relative', aspectRatio: '16 / 9', marginTop: 8, borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#000' }}>
          <iframe src={src} title="Trailer" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
        </div>
      ) : (
        'Phim này chưa có trailer.'
      )}
    </Dialog>
  )
}
