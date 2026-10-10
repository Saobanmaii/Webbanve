// Tonal key-art placeholder. Replace with real backdrop imagery (16:9, cool/desaturated, subject right-of-centre).
function Backdrop({ seed = '', height = 560, children, style }) {
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return (
    <div style={{ position: 'relative', height, overflow: 'hidden', background: 'radial-gradient(70% 90% at 72% 40%, oklch(0.34 0.06 ' + h + '), oklch(0.12 0.02 ' + h + ') 70%)', ...style }}>
      <div style={{ position: 'absolute', right: 24, top: 96, font: '500 11px var(--font-mono)', color: 'rgba(255,255,255,.28)', letterSpacing: '.1em' }}>KEY ART 16:9</div>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-hero)' }}></div>
      <div style={{ position: 'relative', height: '100%' }}>{children}</div>
    </div>
  );
}
window.Backdrop = Backdrop;
