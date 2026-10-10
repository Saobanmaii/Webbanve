import React from 'react';
const TONES = {
  neutral: ['rgba(255,255,255,.1)', 'var(--text-secondary)', 'var(--ink-200)'],
  accent: ['var(--accent-soft)', 'var(--red-300)', 'var(--accent)'],
  gold: ['var(--gold-100)', 'var(--gold-400)', 'var(--gold-500)'],
  success: ['var(--success-soft)', 'var(--success)', 'var(--success)'],
  warning: ['var(--warning-soft)', 'var(--warning)', 'var(--warning)'],
  info: ['var(--info-soft)', 'var(--info)', 'var(--info)'],
};
export function Badge({ children, tone = 'neutral', variant = 'soft', style }) {
  const [bg, fg, solid] = TONES[tone] || TONES.neutral;
  const isSolid = variant === 'solid', isOutline = variant === 'outline';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 20, padding: '0 7px', borderRadius: 'var(--radius-xs)',
      background: isSolid ? solid : isOutline ? 'transparent' : bg, color: isSolid ? (tone === 'gold' ? '#1a1300' : '#fff') : fg,
      border: isOutline ? '1px solid ' + solid : '1px solid transparent', font: '700 10.5px/1 var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', ...style }}>
      {children}
    </span>
  );
}
