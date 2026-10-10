import React from 'react';
import { Button } from '../core/Button.jsx';
import { Icon } from '../core/Icon.jsx';
export function BookingSummary({ title, poster, cinema, datetime, format, seats = [], lines = [], total, ctaLabel = 'Continue', ctaDisabled, onCta, style }) {
  const Meta = ({ icon, children }) => (<div style={{ display: 'flex', alignItems: 'center', gap: 8, font: '400 13px/1.3 var(--font-body)', color: 'var(--text-secondary)' }}><Icon name={icon} size={15} color="var(--text-tertiary)" />{children}</div>);
  return (
    <aside style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 24, display: 'flex', flexDirection: 'column', gap: 20, ...style }}>
      <div style={{ display: 'flex', gap: 14 }}>
        {poster}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          <div style={{ font: '800 20px/1.1 var(--font-display)', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{title}</div>
          {format && <div>{format}</div>}
          {cinema && <Meta icon="map-pin">{cinema}</Meta>}
          {datetime && <Meta icon="calendar-days">{datetime}</Meta>}
        </div>
      </div>
      <div style={{ borderTop: '1px dashed var(--border-default)', paddingTop: 16 }}>
        <div style={{ font: '600 11px/1 var(--font-body)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 10 }}>Ghế</div>
        <div style={{ font: '600 18px/1.3 var(--font-mono)', color: seats.length ? '#fff' : 'var(--text-disabled)' }}>{seats.length ? seats.join(' · ') : 'Chưa chọn ghế'}</div>
      </div>
      {lines.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lines.map((l, i) => (<div key={i} style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1.3 var(--font-body)', color: 'var(--text-secondary)' }}><span>{l.label}</span><span style={{ fontFamily: 'var(--font-mono)' }}>{l.value}</span></div>))}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
        <span style={{ font: '600 14px var(--font-body)' }}>Tổng cộng</span>
        <span style={{ font: '800 26px/1 var(--font-display)' }}>{total}</span>
      </div>
      {onCta !== null && <Button fullWidth size="lg" disabled={ctaDisabled} onClick={onCta} iconRight="arrow-right">{ctaLabel}</Button>}
    </aside>
  );
}
