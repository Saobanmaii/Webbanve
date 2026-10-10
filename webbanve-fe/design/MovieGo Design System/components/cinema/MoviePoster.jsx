import React, { useState } from 'react';
import { Rating } from '../core/Rating.jsx';
const hue = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360; return h; };
export function MoviePoster({ title, src, year, rating, genre, badge, width = 160, showMeta = true, onClick, style }) {
  const [hover, setHover] = useState(false);
  const h = hue(title || '');
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width, flexShrink: 0, cursor: onClick ? 'pointer' : 'default', ...style }}>
      <div style={{ position: 'relative', aspectRatio: '2 / 3', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        background: src ? '#111' : 'linear-gradient(165deg, oklch(0.36 0.07 ' + h + '), oklch(0.14 0.02 ' + h + '))',
        boxShadow: hover ? 'var(--shadow-poster), 0 0 0 1px var(--border-strong)' : 'var(--shadow-poster)', transform: hover ? 'translateY(-4px) scale(1.02)' : 'none',
        transition: 'transform var(--dur-slow) var(--ease-out), box-shadow var(--dur-slow) var(--ease-out)' }}>
        {src ? <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 14, background: 'var(--scrim-poster)' }}>
              <span style={{ font: '800 ' + Math.round(width / 8.5) + 'px/0.95 var(--font-display)', textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'rgba(255,255,255,.92)', textWrap: 'balance' }}>{title}</span>
            </div>}
        {badge && <div style={{ position: 'absolute', top: 10, left: 10 }}>{badge}</div>}
      </div>
      {showMeta && (
        <div style={{ marginTop: 12 }}>
          <div style={{ font: '600 15px/1.25 var(--font-body)', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, font: '500 12px/1 var(--font-body)', color: 'var(--text-tertiary)' }}>
            {year && <span>{year}</span>}
            {genre && <span>{genre}</span>}
            {rating != null && <Rating value={rating} size="sm" style={{ marginLeft: 'auto' }} />}
          </div>
        </div>
      )}
    </div>
  );
}
