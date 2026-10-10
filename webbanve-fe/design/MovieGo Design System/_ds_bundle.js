/* @ds-bundle: {"format":4,"namespace":"MovieGoDesignSystem_a2f949","components":[{"name":"BarList","sourcePath":"components/admin/BarList.jsx"},{"name":"DataTable","sourcePath":"components/admin/DataTable.jsx"},{"name":"StatCard","sourcePath":"components/admin/StatCard.jsx"},{"name":"BookingSummary","sourcePath":"components/cinema/BookingSummary.jsx"},{"name":"DateStrip","sourcePath":"components/cinema/DateStrip.jsx"},{"name":"MoviePoster","sourcePath":"components/cinema/MoviePoster.jsx"},{"name":"Seat","sourcePath":"components/cinema/Seat.jsx"},{"name":"SeatMap","sourcePath":"components/cinema/SeatMap.jsx"},{"name":"ShowtimeChip","sourcePath":"components/cinema/ShowtimeChip.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Rating","sourcePath":"components/core/Rating.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Stepper","sourcePath":"components/navigation/Stepper.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/admin/BarList.jsx":"2e96ecf33273","components/admin/DataTable.jsx":"0fa575851827","components/admin/StatCard.jsx":"b97e38b7ec6f","components/cinema/BookingSummary.jsx":"3e8ee880c0e1","components/cinema/DateStrip.jsx":"455ce8039cde","components/cinema/MoviePoster.jsx":"474e70b436da","components/cinema/Seat.jsx":"7858c2702b28","components/cinema/SeatMap.jsx":"84b288da6798","components/cinema/ShowtimeChip.jsx":"f3349fd578f2","components/core/Badge.jsx":"bb9948d0758e","components/core/Button.jsx":"cdc7f502a7b7","components/core/Chip.jsx":"30058b8527af","components/core/Icon.jsx":"2a59614586aa","components/core/IconButton.jsx":"d6b3175922ed","components/core/Rating.jsx":"15a215cb3fdd","components/feedback/Dialog.jsx":"3e987667e93c","components/feedback/Toast.jsx":"deba61062296","components/forms/Checkbox.jsx":"3d549dd00467","components/forms/Input.jsx":"02800563ffe3","components/forms/Select.jsx":"96fff3a7d963","components/forms/Switch.jsx":"4d4eb98e1ad5","components/navigation/NavBar.jsx":"285947515f1b","components/navigation/Stepper.jsx":"13f9a879b5a3","components/navigation/Tabs.jsx":"537a7354ccc6","ui_kits/admin/Dashboard.jsx":"dbffb8ac9709","ui_kits/admin/Movies.jsx":"5f55786448f4","ui_kits/admin/Showtimes.jsx":"5b1dd4584423","ui_kits/admin/Sidebar.jsx":"4f61c5c7f2a9","ui_kits/admin/data.js":"6b053c85d6bf","ui_kits/web/Backdrop.jsx":"3b93f7dc2ca4","ui_kits/web/Bookings.jsx":"f6d84e88e0b7","ui_kits/web/Confirmation.jsx":"00ffe9fe891c","ui_kits/web/Header.jsx":"326ece39213c","ui_kits/web/Home.jsx":"479be8d6f7f0","ui_kits/web/MovieDetail.jsx":"30d4324d65ea","ui_kits/web/Payment.jsx":"9dd05be44341","ui_kits/web/SeatSelect.jsx":"1ce487162e66","ui_kits/web/ShowtimesBrowse.jsx":"1dc8ef8a6c2d","ui_kits/web/data.js":"784cec4b6c13","ui_kits/web/doc-page.js":"f52ae9c02fca"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MovieGoDesignSystem_a2f949 = window.MovieGoDesignSystem_a2f949 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/admin/BarList.jsx
try { (() => {
function BarList({
  items = [],
  max,
  color = 'var(--accent)',
  style
}) {
  const m = max || Math.max(1, ...items.map(i => i.value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.label,
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,180px) minmax(0,1fr) 90px',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px/1.2 var(--font-body)',
      color: '#fff',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, it.label), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 8,
      borderRadius: 4,
      background: 'var(--ink-700)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      height: '100%',
      width: it.value / m * 100 + '%',
      borderRadius: 4,
      background: color,
      opacity: 1 - i * 0.08
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      font: '600 13px/1 var(--font-mono)',
      color: 'var(--text-secondary)'
    }
  }, it.display ?? it.value))));
}
Object.assign(__ds_scope, { BarList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/BarList.jsx", error: String((e && e.message) || e) }); }

// components/admin/DataTable.jsx
try { (() => {
const {
  useState
} = React;
function DataTable({
  columns = [],
  rows = [],
  rowKey = 'id',
  onRowClick,
  style
}) {
  const [hover, setHover] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      padding: '12px 16px',
      font: '600 11px/1 var(--font-body)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--surface-2)',
      width: c.width
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r[rowKey] ?? i,
    onClick: () => onRowClick && onRowClick(r),
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null),
    style: {
      background: hover === i ? 'var(--surface-3)' : 'transparent',
      cursor: onRowClick ? 'pointer' : 'default',
      transition: 'background var(--dur-fast)'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      padding: '12px 16px',
      font: c.mono ? '500 13px var(--font-mono)' : '400 14px/1.3 var(--font-body)',
      color: c.muted ? 'var(--text-secondary)' : '#fff',
      borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : 0,
      verticalAlign: 'middle'
    }
  }, c.render ? c.render(r) : r[c.key])))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/cinema/DateStrip.jsx
try { (() => {
function DateStrip({
  days = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      ...style
    }
  }, days.map(d => {
    const on = d.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: d.id,
      type: "button",
      onClick: () => onChange && onChange(d.id),
      style: {
        width: 60,
        height: 72,
        flexShrink: 0,
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        cursor: 'pointer',
        background: on ? 'var(--accent)' : 'var(--surface-2)',
        border: '1px solid ' + (on ? 'var(--accent)' : 'var(--border-subtle)'),
        color: '#fff',
        transition: 'all var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 10.5px/1 var(--font-body)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: on ? 'rgba(255,255,255,.85)' : 'var(--text-tertiary)'
      }
    }, d.weekday), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '800 22px/1 var(--font-display)'
      }
    }, d.day));
  }));
}
Object.assign(__ds_scope, { DateStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cinema/DateStrip.jsx", error: String((e && e.message) || e) }); }

// components/cinema/Seat.jsx
try { (() => {
const {
  useState
} = React;
const S = {
  available: {
    bg: 'var(--seat-available)',
    bd: 'var(--seat-available-border)',
    fg: 'transparent'
  },
  selected: {
    bg: 'var(--seat-selected)',
    bd: 'var(--seat-selected)',
    fg: '#fff'
  },
  taken: {
    bg: 'var(--seat-taken)',
    bd: 'var(--seat-taken-border)',
    fg: 'transparent'
  },
  vip: {
    bg: 'transparent',
    bd: 'var(--seat-vip)',
    fg: 'transparent'
  },
  accessible: {
    bg: 'transparent',
    bd: 'var(--seat-accessible)',
    fg: 'transparent'
  }
};
function Seat({
  state = 'available',
  label,
  size,
  onClick,
  style
}) {
  const [hover, setHover] = useState(false);
  const s = S[state] || S.available;
  const taken = state === 'taken';
  const sel = state === 'selected';
  const px = size || 'var(--seat-size)';
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label + ' ' + state,
    disabled: taken,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: px,
      height: px,
      padding: 0,
      borderRadius: 'var(--seat-radius)',
      background: hover && !taken && !sel ? 'var(--seat-hover)' : s.bg,
      border: (state === 'vip' || state === 'accessible' ? 1.5 : 1) + 'px solid ' + s.bd,
      boxShadow: sel ? 'var(--glow-accent)' : 'none',
      color: hover && !taken ? '#fff' : s.fg,
      font: '600 9.5px/1 var(--font-mono)',
      cursor: taken ? 'not-allowed' : 'pointer',
      transform: sel ? 'scale(1.08)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-spring), background var(--dur-fast), box-shadow var(--dur-base)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }
  }, taken ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: '40%',
      height: 1.5,
      background: 'var(--ink-600)',
      transform: 'rotate(-45deg)',
      display: 'block'
    }
  }) : label && String(label).replace(/^[A-Z]/, ''));
}
Object.assign(__ds_scope, { Seat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cinema/Seat.jsx", error: String((e && e.message) || e) }); }

// components/cinema/SeatMap.jsx
try { (() => {
function SeatMap({
  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  seatsPerRow = 14,
  aisles = [3, 10],
  taken = [],
  vipRows = [],
  accessible = [],
  selected = [],
  onToggle,
  showLegend = true,
  style
}) {
  const legend = [['available', 'Available'], ['selected', 'Selected'], ['taken', 'Taken'], ['vip', 'VIP'], ['accessible', 'Accessible']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 28,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '82%',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 34,
      borderTop: '3px solid var(--red-400)',
      borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
      background: 'radial-gradient(60% 100% at 50% 0%, var(--screen-glow), transparent 80%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 10.5px/1 var(--font-body)',
      letterSpacing: '0.4em',
      color: 'var(--text-tertiary)',
      marginTop: -16
    }
  }, "SCREEN")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--seat-gap)'
    }
  }, rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--seat-gap)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      font: '600 11px/1 var(--font-mono)',
      color: 'var(--text-tertiary)'
    }
  }, r), Array.from({
    length: seatsPerRow
  }, (_, i) => {
    const id = r + (i + 1);
    const st = selected.includes(id) ? 'selected' : taken.includes(id) ? 'taken' : accessible.includes(id) ? 'accessible' : vipRows.includes(r) ? 'vip' : 'available';
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: id
    }, /*#__PURE__*/React.createElement(__ds_scope.Seat, {
      label: id,
      state: st,
      onClick: () => onToggle && onToggle(id)
    }), aisles.includes(i + 1) && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14
      }
    }));
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      textAlign: 'right',
      font: '600 11px/1 var(--font-mono)',
      color: 'var(--text-tertiary)'
    }
  }, r)))), showLegend && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, legend.map(([s, l]) => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      font: '500 12px/1 var(--font-body)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Seat, {
    state: s,
    size: 16,
    style: {
      pointerEvents: 'none',
      transform: 'none'
    }
  }), l))));
}
Object.assign(__ds_scope, { SeatMap });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cinema/SeatMap.jsx", error: String((e && e.message) || e) }); }

// components/cinema/ShowtimeChip.jsx
try { (() => {
const {
  useState
} = React;
function ShowtimeChip({
  time,
  format,
  seatsLeft,
  selected,
  soldOut,
  onClick,
  style
}) {
  const [hover, setHover] = useState(false);
  const low = seatsLeft != null && seatsLeft <= 10 && !soldOut;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: soldOut,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 5,
      minWidth: 96,
      padding: '10px 14px',
      borderRadius: 'var(--radius-md)',
      textAlign: 'left',
      background: selected ? 'var(--accent)' : hover && !soldOut ? 'var(--surface-3)' : 'var(--surface-2)',
      border: '1px solid ' + (selected ? 'var(--accent)' : hover && !soldOut ? 'var(--border-strong)' : 'var(--border-default)'),
      boxShadow: selected ? 'var(--glow-accent)' : 'none',
      cursor: soldOut ? 'not-allowed' : 'pointer',
      opacity: soldOut ? 0.4 : 1,
      transition: 'all var(--dur-base) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 17px/1 var(--font-mono)',
      color: '#fff',
      textDecoration: soldOut ? 'line-through' : 'none'
    }
  }, time), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 10.5px/1 var(--font-body)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: selected ? 'rgba(255,255,255,.85)' : low ? 'var(--warning)' : 'var(--text-tertiary)'
    }
  }, soldOut ? 'Sold out' : low ? seatsLeft + ' left' : format));
}
Object.assign(__ds_scope, { ShowtimeChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cinema/ShowtimeChip.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const TONES = {
  neutral: ['rgba(255,255,255,.1)', 'var(--text-secondary)', 'var(--ink-200)'],
  accent: ['var(--accent-soft)', 'var(--red-300)', 'var(--accent)'],
  gold: ['var(--gold-100)', 'var(--gold-400)', 'var(--gold-500)'],
  success: ['var(--success-soft)', 'var(--success)', 'var(--success)'],
  warning: ['var(--warning-soft)', 'var(--warning)', 'var(--warning)'],
  info: ['var(--info-soft)', 'var(--info)', 'var(--info)']
};
function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  style
}) {
  const [bg, fg, solid] = TONES[tone] || TONES.neutral;
  const isSolid = variant === 'solid',
    isOutline = variant === 'outline';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: 20,
      padding: '0 7px',
      borderRadius: 'var(--radius-xs)',
      background: isSolid ? solid : isOutline ? 'transparent' : bg,
      color: isSolid ? tone === 'gold' ? '#1a1300' : '#fff' : fg,
      border: isOutline ? '1px solid ' + solid : '1px solid transparent',
      font: '700 10.5px/1 var(--font-body)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
const {
  useState
} = React;
function Chip({
  children,
  selected,
  onClick,
  size = 'md',
  style
}) {
  const [hover, setHover] = useState(false);
  const h = size === 'sm' ? 28 : 34;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-pressed": !!selected,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      height: h,
      padding: '0 ' + (size === 'sm' ? 12 : 16) + 'px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid ' + (selected ? 'var(--accent)' : hover ? 'var(--border-default)' : 'transparent'),
      background: selected ? 'var(--accent)' : hover ? 'rgba(255,255,255,.06)' : 'transparent',
      color: selected ? '#fff' : 'var(--text-primary)',
      font: '500 ' + (size === 'sm' ? 13 : 15) + 'px/1 var(--font-body)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all var(--dur-base) var(--ease-out)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const toPascal = s => s.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
/** Renders a Lucide icon by kebab-case name. Requires the Lucide UMD script on the page (window.lucide). */
function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  color = 'currentColor',
  style,
  ...rest
}) {
  const lib = typeof window !== 'undefined' && window.lucide && window.lucide.icons;
  let node = lib && (lib[toPascal(name)] || lib[name]);
  if (node && node[0] === 'svg') node = node[2];
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      flexShrink: 0,
      display: 'block',
      ...style
    }
  }, rest), (node || []).map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/admin/StatCard.jsx
try { (() => {
function StatCard({
  label,
  value,
  delta,
  icon,
  caption,
  style
}) {
  const up = delta != null && !String(delta).trim().startsWith('-');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      minWidth: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 11px/1 var(--font-body)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)'
    }
  }, label), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    color: "var(--text-tertiary)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 32px/1 var(--font-display)',
      letterSpacing: '-0.02em'
    }
  }, value), (delta != null || caption) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      font: '500 12px/1 var(--font-body)',
      color: 'var(--text-tertiary)'
    }
  }, delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      color: up ? 'var(--success)' : 'var(--danger)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: up ? 'trending-up' : 'trending-down',
    size: 14
  }), delta), caption));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const {
  useState
} = React;
const SIZES = {
  sm: {
    h: 32,
    px: 14,
    fs: 12,
    ic: 15
  },
  md: {
    h: 42,
    px: 20,
    fs: 14,
    ic: 17
  },
  lg: {
    h: 52,
    px: 28,
    fs: 15,
    ic: 19
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth,
  disabled,
  onClick,
  type = 'button',
  style
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = {
    primary: {
      bg: hover ? 'var(--accent-hover)' : 'var(--accent)',
      fg: 'var(--text-on-accent)',
      bd: 'transparent',
      sh: hover ? 'var(--glow-accent)' : 'none'
    },
    secondary: {
      bg: hover ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.1)',
      fg: 'var(--text-primary)',
      bd: 'transparent',
      sh: 'none'
    },
    outline: {
      bg: hover ? 'rgba(255,255,255,.06)' : 'transparent',
      fg: 'var(--text-primary)',
      bd: hover ? 'var(--border-strong)' : 'var(--border-default)',
      sh: 'none'
    },
    ghost: {
      bg: hover ? 'rgba(255,255,255,.06)' : 'transparent',
      fg: hover ? 'var(--text-primary)' : 'var(--text-secondary)',
      bd: 'transparent',
      sh: 'none'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: s.h,
      padding: '0 ' + s.px + 'px',
      width: fullWidth ? '100%' : undefined,
      borderRadius: 'var(--radius-pill)',
      border: '1px solid ' + v.bd,
      background: v.bg,
      color: v.fg,
      boxShadow: v.sh,
      font: '600 ' + s.fs + 'px/1 var(--font-body)',
      letterSpacing: '0.01em',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transform: press && !disabled ? 'scale(.97)' : 'none',
      whiteSpace: 'nowrap',
      transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), border-color var(--dur-base)',
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: s.ic
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.ic
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/cinema/BookingSummary.jsx
try { (() => {
function BookingSummary({
  title,
  poster,
  cinema,
  datetime,
  format,
  seats = [],
  lines = [],
  total,
  ctaLabel = 'Continue',
  ctaDisabled,
  onCta,
  style
}) {
  const Meta = ({
    icon,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      font: '400 13px/1.3 var(--font-body)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15,
    color: "var(--text-tertiary)"
  }), children);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, poster, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 20px/1.1 var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '-0.01em'
    }
  }, title), format && /*#__PURE__*/React.createElement("div", null, format), cinema && /*#__PURE__*/React.createElement(Meta, {
    icon: "map-pin"
  }, cinema), datetime && /*#__PURE__*/React.createElement(Meta, {
    icon: "calendar-days"
  }, datetime))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px dashed var(--border-default)',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 11px/1 var(--font-body)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
      marginBottom: 10
    }
  }, "Seats"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 18px/1.3 var(--font-mono)',
      color: seats.length ? '#fff' : 'var(--text-disabled)'
    }
  }, seats.length ? seats.join(' · ') : 'None selected')), lines.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: '400 13px/1.3 var(--font-body)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, l.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, l.value)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 14px var(--font-body)'
    }
  }, "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 26px/1 var(--font-display)'
    }
  }, total)), onCta !== null && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    fullWidth: true,
    size: "lg",
    disabled: ctaDisabled,
    onClick: onCta,
    iconRight: "arrow-right"
  }, ctaLabel));
}
Object.assign(__ds_scope, { BookingSummary });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cinema/BookingSummary.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const {
  useState
} = React;
function IconButton({
  icon,
  label,
  variant = 'glass',
  size = 40,
  active,
  disabled,
  onClick,
  style
}) {
  const [hover, setHover] = useState(false);
  const bg = {
    glass: hover ? 'rgba(255,255,255,.16)' : 'rgba(255,255,255,.08)',
    solid: hover ? 'var(--accent-hover)' : 'var(--accent)',
    ghost: hover ? 'rgba(255,255,255,.08)' : 'transparent'
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-pill)',
      border: '1px solid ' + (variant === 'glass' ? 'var(--border-subtle)' : 'transparent'),
      background: active ? 'var(--accent)' : bg,
      color: active || variant === 'solid' ? '#fff' : hover ? 'var(--text-primary)' : 'var(--text-secondary)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      backdropFilter: variant === 'glass' ? 'var(--blur-glass)' : undefined,
      transition: 'all var(--dur-base) var(--ease-out)',
      padding: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.45)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Rating.jsx
try { (() => {
function Rating({
  value,
  votes,
  size = 'md',
  style
}) {
  const fs = size === 'sm' ? 12 : size === 'lg' ? 16 : 13;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      font: '600 ' + fs + 'px/1 var(--font-body)',
      color: 'var(--text-primary)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "star",
    size: fs + 2,
    color: "var(--rating)",
    fill: "var(--rating)",
    strokeWidth: 1.5
  }), Number(value).toFixed(1), votes != null && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)',
      fontWeight: 500
    }
  }, "(", votes, ")"));
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Rating.jsx", error: String((e && e.message) || e) }); }

// components/cinema/MoviePoster.jsx
try { (() => {
const {
  useState
} = React;
const hue = s => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
};
function MoviePoster({
  title,
  src,
  year,
  rating,
  genre,
  badge,
  width = 160,
  showMeta = true,
  onClick,
  style
}) {
  const [hover, setHover] = useState(false);
  const h = hue(title || '');
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width,
      flexShrink: 0,
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '2 / 3',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: src ? '#111' : 'linear-gradient(165deg, oklch(0.36 0.07 ' + h + '), oklch(0.14 0.02 ' + h + '))',
      boxShadow: hover ? 'var(--shadow-poster), 0 0 0 1px var(--border-strong)' : 'var(--shadow-poster)',
      transform: hover ? 'translateY(-4px) scale(1.02)' : 'none',
      transition: 'transform var(--dur-slow) var(--ease-out), box-shadow var(--dur-slow) var(--ease-out)'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'flex-end',
      padding: 14,
      background: 'var(--scrim-poster)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 ' + Math.round(width / 8.5) + 'px/0.95 var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      color: 'rgba(255,255,255,.92)',
      textWrap: 'balance'
    }
  }, title)), badge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 10,
      left: 10
    }
  }, badge)), showMeta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 15px/1.25 var(--font-body)',
      color: '#fff',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 6,
      font: '500 12px/1 var(--font-body)',
      color: 'var(--text-tertiary)'
    }
  }, year && /*#__PURE__*/React.createElement("span", null, year), genre && /*#__PURE__*/React.createElement("span", null, genre), rating != null && /*#__PURE__*/React.createElement(__ds_scope.Rating, {
    value: rating,
    size: "sm",
    style: {
      marginLeft: 'auto'
    }
  }))));
}
Object.assign(__ds_scope, { MoviePoster });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cinema/MoviePoster.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open = true,
  title,
  children,
  actions,
  onClose,
  width = 440,
  inline,
  style
}) {
  if (!open) return null;
  const panel = /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      width,
      maxWidth: '100%',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-overlay)',
      padding: 24,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 20px/1.2 var(--font-display)',
      letterSpacing: '-0.01em'
    }
  }, title), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    variant: "ghost",
    size: 32,
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      font: '400 14px/1.55 var(--font-body)',
      color: 'var(--text-secondary)'
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      marginTop: 24
    }
  }, actions));
  if (inline) return panel;
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'var(--surface-overlay)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, panel);
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const T = {
  success: ['circle-check', 'var(--success)'],
  error: ['circle-alert', 'var(--danger)'],
  info: ['info', 'var(--info)'],
  warning: ['clock', 'var(--warning)']
};
function Toast({
  tone = 'info',
  title,
  message,
  onClose,
  style
}) {
  const [icon, c] = T[tone] || T.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      width: 360,
      maxWidth: '100%',
      padding: '14px 16px',
      boxSizing: 'border-box',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20,
    color: c,
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 14px/1.3 var(--font-body)',
      color: '#fff'
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 13px/1.45 var(--font-body)',
      color: 'var(--text-secondary)',
      marginTop: 3
    }
  }, message)), onClose && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Dismiss",
    onClick: onClose,
    style: {
      background: 'none',
      border: 0,
      padding: 2,
      color: 'var(--text-tertiary)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      font: '400 14px/1.3 var(--font-body)',
      color: 'var(--text-primary)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !!checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 5,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      background: checked ? 'var(--accent)' : 'var(--surface-2)',
      border: '1px solid ' + (checked ? 'var(--accent)' : 'var(--border-strong)'),
      transition: 'all var(--dur-fast) var(--ease-out)'
    }
  }, checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    strokeWidth: 3,
    color: "#fff"
  })), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
const {
  useState
} = React;
function Input({
  label,
  hint,
  error,
  iconLeft,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = 'text',
  disabled,
  mono,
  style
}) {
  const [focus, setFocus] = useState(false);
  const bd = error ? 'var(--danger)' : focus ? 'var(--border-focus)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 12px/1.2 var(--font-body)',
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 44,
      padding: '0 14px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-2)',
      border: '1px solid ' + bd,
      boxShadow: focus && !error ? '0 0 0 3px rgba(227,38,46,.18)' : 'none',
      opacity: disabled ? 0.5 : 1,
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: 17,
    color: "var(--text-tertiary)"
  }), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      background: 'transparent',
      border: 0,
      outline: 'none',
      color: 'var(--text-primary)',
      font: mono ? '500 14px var(--font-mono)' : '400 14px var(--font-body)',
      letterSpacing: mono ? '0.04em' : 0
    }
  })), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 12px/1.3 var(--font-body)',
      color: error ? 'var(--danger)' : 'var(--text-tertiary)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  size = 'md',
  style
}) {
  const pill = size === 'sm';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 12px/1.2 var(--font-body)',
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: pill ? 28 : 44,
      padding: pill ? '0 28px 0 12px' : '0 38px 0 14px',
      borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-md)',
      background: pill ? 'rgba(255,255,255,.1)' : 'var(--surface-2)',
      border: '1px solid ' + (pill ? 'transparent' : 'var(--border-default)'),
      color: 'var(--text-primary)',
      font: (pill ? '600 12px' : '400 14px') + ' var(--font-body)',
      cursor: 'pointer',
      outline: 'none'
    }
  }, options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v,
      style: {
        background: '#17171C'
      }
    }, l);
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: pill ? 13 : 16,
    color: "var(--text-secondary)",
    style: {
      position: 'absolute',
      right: pill ? 10 : 14,
      pointerEvents: 'none'
    }
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  onChange,
  disabled,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      font: '400 14px/1.3 var(--font-body)',
      color: 'var(--text-primary)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: !!checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 22,
      borderRadius: 11,
      padding: 2,
      boxSizing: 'border-box',
      background: checked ? 'var(--accent)' : 'var(--ink-600)',
      transition: 'background var(--dur-base) var(--ease-out)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 18,
      height: 18,
      borderRadius: 9,
      background: '#fff',
      transform: checked ? 'translateX(16px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-spring)',
      boxShadow: 'var(--shadow-sm)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function NavBar({
  links = [],
  active,
  onNavigate,
  right,
  transparent,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 'var(--nav-height)',
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      padding: '0 var(--gutter)',
      background: transparent ? 'linear-gradient(180deg,rgba(0,0,0,.75),rgba(0,0,0,0))' : 'var(--surface-glass)',
      backdropFilter: transparent ? undefined : 'var(--blur-glass)',
      borderBottom: transparent ? '1px solid transparent' : '1px solid var(--border-subtle)',
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNavigate && onNavigate('home'),
    style: {
      font: '800 24px/1 var(--font-display)',
      letterSpacing: '-0.02em',
      color: '#fff',
      cursor: 'pointer',
      flexShrink: 0
    }
  }, "Movie", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "Go")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      flex: 1
    }
  }, links.map(l => {
    const id = typeof l === 'string' ? l : l.id;
    const label = typeof l === 'string' ? l : l.label;
    const on = id === active;
    return /*#__PURE__*/React.createElement("a", {
      key: id,
      onClick: () => onNavigate && onNavigate(id),
      style: {
        position: 'relative',
        font: (on ? '600' : '500') + ' 15px/1 var(--font-body)',
        color: on ? '#fff' : 'var(--text-secondary)',
        cursor: 'pointer',
        padding: '8px 0'
      }
    }, label, on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: '50%',
        bottom: -4,
        width: 5,
        height: 5,
        marginLeft: -2.5,
        borderRadius: 3,
        background: 'var(--accent)'
      }
    }));
  })), right && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, right));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Stepper.jsx
try { (() => {
function Stepper({
  steps = [],
  current = 0,
  style
}) {
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      listStyle: 'none',
      margin: 0,
      padding: 0,
      ...style
    }
  }, steps.map((s, i) => {
    const done = i < current,
      on = i === current;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: s
    }, /*#__PURE__*/React.createElement("li", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 26,
        height: 26,
        borderRadius: 13,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        font: '700 12px/1 var(--font-body)',
        background: done ? 'var(--accent)' : on ? '#fff' : 'transparent',
        color: done ? '#fff' : on ? '#000' : 'var(--text-tertiary)',
        border: '1.5px solid ' + (done ? 'var(--accent)' : on ? '#fff' : 'var(--border-strong)')
      }
    }, done ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 14,
      strokeWidth: 3
    }) : i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        font: (on ? '600' : '500') + ' 13px/1 var(--font-body)',
        color: on ? '#fff' : done ? 'var(--text-secondary)' : 'var(--text-tertiary)',
        whiteSpace: 'nowrap'
      }
    }, s)), i < steps.length - 1 && /*#__PURE__*/React.createElement("li", {
      "aria-hidden": "true",
      style: {
        flex: 1,
        minWidth: 24,
        height: 1.5,
        background: done ? 'var(--accent)' : 'var(--border-default)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 36,
      borderBottom: '1px solid var(--border-default)',
      ...style
    }
  }, items.map(it => {
    const on = it.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(it.id),
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '0 0 16px',
        background: 'none',
        border: 0,
        cursor: 'pointer',
        color: on ? '#fff' : 'var(--text-tertiary)',
        font: (on ? '700 18px' : '500 14px') + '/1 ' + (on ? 'var(--font-display)' : 'var(--font-body)'),
        transition: 'color var(--dur-base)'
      }
    }, it.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: on ? 22 : 18
    }), it.label, on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: it.icon ? 'calc(50% + 16px)' : '50%',
        bottom: 4,
        width: 5,
        height: 5,
        marginLeft: -2.5,
        borderRadius: 3,
        background: 'var(--accent)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Dashboard.jsx
try { (() => {
function Dashboard({
  go
}) {
  const {
    StatCard,
    BarList,
    DataTable,
    Badge,
    Button,
    Select
  } = window.MovieGoDesignSystem_a2f949;
  const A = window.MG_ADMIN;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(PageHead, {
    title: "Dashboard",
    sub: "Week of 12\u201318 Oct \xB7 all cinemas",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      options: ['This week', 'Last week', 'This month']
    }), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      iconLeft: "download"
    }, "Export"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Revenue",
    value: "$77,150",
    delta: "+12.4%",
    caption: "vs last week",
    icon: "banknote"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Tickets sold",
    value: "5,912",
    delta: "+6.1%",
    caption: "vs last week",
    icon: "ticket"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Occupancy",
    value: "71%",
    delta: "-2.3%",
    caption: "avg. per show",
    icon: "armchair"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Shows",
    value: "214",
    caption: "across 13 halls",
    icon: "clock"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Revenue by movie",
    right: /*#__PURE__*/React.createElement("a", {
      onClick: () => go('reports'),
      style: {
        font: '600 13px var(--font-body)',
        cursor: 'pointer'
      }
    }, "Full report")
  }, /*#__PURE__*/React.createElement(BarList, {
    items: A.revenue.slice(0, 6)
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Cinemas"
  }, /*#__PURE__*/React.createElement(DataTable, {
    style: {
      border: 0,
      margin: '-4px -20px -20px'
    },
    columns: [{
      key: 'name',
      label: 'Cinema'
    }, {
      key: 'halls',
      label: 'Halls',
      align: 'right',
      mono: true
    }, {
      key: 'occ',
      label: 'Occ.',
      align: 'right',
      mono: true
    }],
    rows: A.cinemas
  }))), /*#__PURE__*/React.createElement(Panel, {
    title: "Tonight's showtimes",
    right: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      iconRight: "arrow-right",
      onClick: () => go('showtimes')
    }, "All showtimes")
  }, /*#__PURE__*/React.createElement(DataTable, {
    style: {
      border: 0,
      margin: '-4px -20px -20px'
    },
    columns: [{
      key: 'movie',
      label: 'Movie'
    }, {
      key: 'cinema',
      label: 'Cinema',
      muted: true,
      render: r => r.cinema + ' · ' + r.hall
    }, {
      key: 'time',
      label: 'Time',
      mono: true
    }, {
      key: 'fmt',
      label: 'Format',
      render: r => /*#__PURE__*/React.createElement(Badge, {
        tone: r.fmt === 'IMAX' ? 'gold' : 'neutral',
        variant: r.fmt === 'IMAX' ? 'solid' : 'soft'
      }, r.fmt)
    }, {
      key: 'sold',
      label: 'Sold',
      align: 'right',
      mono: true,
      render: r => r.sold + ' / ' + r.cap
    }],
    rows: A.showtimes.filter(s => s.live)
  })));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Movies.jsx
try { (() => {
function Movies() {
  const {
    DataTable,
    Badge,
    Button,
    Input,
    Select,
    Dialog,
    Toast,
    IconButton
  } = window.MovieGoDesignSystem_a2f949;
  const [rows, setRows] = React.useState(window.MG_ADMIN.movies);
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [toast, setToast] = React.useState(null);
  const tone = {
    'Now showing': 'success',
    'Coming soon': 'info',
    Ending: 'warning'
  };
  const add = () => {
    if (!title.trim()) return;
    setRows(r => [{
      id: Date.now(),
      title,
      genre: 'Drama',
      runtime: '—',
      age: 'PG',
      status: 'Coming soon',
      shows: 0
    }, ...r]);
    setOpen(false);
    setToast(title);
    setTitle('');
    setTimeout(() => setToast(null), 3000);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(PageHead, {
    title: "Movies",
    sub: rows.length + ' titles in the catalogue',
    actions: /*#__PURE__*/React.createElement(Button, {
      iconLeft: "plus",
      onClick: () => setOpen(true)
    }, "Add movie")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    iconLeft: "search",
    placeholder: "Search titles",
    value: q,
    onChange: e => setQ(e.target.value),
    style: {
      width: 320
    }
  }), /*#__PURE__*/React.createElement(Select, {
    options: ['All statuses', 'Now showing', 'Coming soon', 'Ending']
  })), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'title',
      label: 'Title',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600
        }
      }, r.title)
    }, {
      key: 'genre',
      label: 'Genre',
      muted: true
    }, {
      key: 'runtime',
      label: 'Runtime',
      mono: true,
      muted: true
    }, {
      key: 'age',
      label: 'Rating',
      render: r => /*#__PURE__*/React.createElement(Badge, {
        variant: "outline"
      }, r.age)
    }, {
      key: 'status',
      label: 'Status',
      render: r => /*#__PURE__*/React.createElement(Badge, {
        tone: tone[r.status]
      }, r.status)
    }, {
      key: 'shows',
      label: 'Shows',
      align: 'right',
      mono: true
    }, {
      key: 'x',
      label: '',
      align: 'right',
      width: 90,
      render: () => /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          gap: 4
        }
      }, /*#__PURE__*/React.createElement(IconButton, {
        icon: "pencil",
        label: "Edit",
        variant: "ghost",
        size: 32
      }), /*#__PURE__*/React.createElement(IconButton, {
        icon: "trash-2",
        label: "Delete",
        variant: "ghost",
        size: 32
      }))
    }],
    rows: rows.filter(r => r.title.toLowerCase().includes(q.toLowerCase()))
  }), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    title: "Add movie",
    width: 480,
    onClose: () => setOpen(false),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setOpen(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      onClick: add,
      disabled: !title.trim()
    }, "Add movie"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Title",
    placeholder: "e.g. The Velvet Hour",
    value: title,
    onChange: e => setTitle(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Genre",
    options: ['Drama', 'Action', 'Thriller', 'Sci-Fi', 'Romance']
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Age rating",
    options: ['G', 'PG', 'PG-13', 'R']
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Runtime (minutes)",
    placeholder: "118",
    mono: true
  }))), toast && /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: '“' + toast + '” added',
    message: "Schedule showtimes to put it on sale.",
    style: {
      position: 'fixed',
      right: 24,
      bottom: 24
    }
  }));
}
window.Movies = Movies;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Movies.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Showtimes.jsx
try { (() => {
function Showtimes() {
  const {
    DataTable,
    Badge,
    Button,
    Select,
    Switch,
    DateStrip
  } = window.MovieGoDesignSystem_a2f949;
  const [rows, setRows] = React.useState(window.MG_ADMIN.showtimes);
  const [day, setDay] = React.useState('d1');
  const flip = (id, v) => setRows(r => r.map(x => x.id === id ? {
    ...x,
    live: v
  } : x));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(PageHead, {
    title: "Showtimes",
    sub: "Publish, pause and schedule screenings",
    actions: /*#__PURE__*/React.createElement(Button, {
      iconLeft: "calendar-plus"
    }, "Schedule showtime")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(DateStrip, {
    value: day,
    onChange: setDay,
    days: [['d0', 'Wed', 14], ['d1', 'Thu', 15], ['d2', 'Fri', 16], ['d3', 'Sat', 17], ['d4', 'Sun', 18]].map(([id, weekday, d]) => ({
      id,
      weekday,
      day: d
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Select, {
    options: ['All cinemas', 'Central', 'Riverside', 'Harbour']
  }), /*#__PURE__*/React.createElement(Select, {
    options: ['All formats', '2D', 'IMAX', 'Dolby', '4DX']
  }))), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'movie',
      label: 'Movie',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600
        }
      }, r.movie)
    }, {
      key: 'cinema',
      label: 'Cinema · Hall',
      muted: true,
      render: r => r.cinema + ' · ' + r.hall
    }, {
      key: 'date',
      label: 'Date',
      mono: true,
      muted: true
    }, {
      key: 'time',
      label: 'Time',
      mono: true
    }, {
      key: 'fmt',
      label: 'Format',
      render: r => /*#__PURE__*/React.createElement(Badge, {
        tone: r.fmt === 'IMAX' ? 'gold' : 'neutral',
        variant: r.fmt === 'IMAX' ? 'solid' : 'soft'
      }, r.fmt)
    }, {
      key: 'sold',
      label: 'Occupancy',
      width: 200,
      render: r => {
        const p = Math.round(r.sold / r.cap * 100);
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            flex: 1,
            height: 6,
            borderRadius: 3,
            background: 'var(--ink-700)'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            display: 'block',
            height: '100%',
            width: p + '%',
            borderRadius: 3,
            background: p > 90 ? 'var(--warning)' : 'var(--accent)'
          }
        })), /*#__PURE__*/React.createElement("span", {
          style: {
            font: '500 12px var(--font-mono)',
            color: 'var(--text-secondary)',
            width: 34,
            textAlign: 'right'
          }
        }, p, "%"));
      }
    }, {
      key: 'live',
      label: 'On sale',
      render: r => /*#__PURE__*/React.createElement(Switch, {
        checked: r.live,
        onChange: v => flip(r.id, v)
      })
    }],
    rows: rows
  }));
}
function Cinemas() {
  const {
    DataTable,
    Button,
    IconButton
  } = window.MovieGoDesignSystem_a2f949;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(PageHead, {
    title: "Cinemas",
    sub: "Venues, halls and seating capacity",
    actions: /*#__PURE__*/React.createElement(Button, {
      iconLeft: "plus"
    }, "Add cinema")
  }), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'name',
      label: 'Cinema',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600
        }
      }, r.name)
    }, {
      key: 'city',
      label: 'Location',
      muted: true
    }, {
      key: 'halls',
      label: 'Halls',
      align: 'right',
      mono: true
    }, {
      key: 'seats',
      label: 'Seats',
      align: 'right',
      mono: true
    }, {
      key: 'occ',
      label: 'Avg. occupancy',
      align: 'right',
      mono: true
    }, {
      key: 'x',
      label: '',
      align: 'right',
      width: 60,
      render: () => /*#__PURE__*/React.createElement(IconButton, {
        icon: "pencil",
        label: "Edit",
        variant: "ghost",
        size: 32
      })
    }],
    rows: window.MG_ADMIN.cinemas
  }));
}
function Reports() {
  const {
    BarList,
    StatCard,
    Select,
    Button
  } = window.MovieGoDesignSystem_a2f949;
  const A = window.MG_ADMIN;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(PageHead, {
    title: "Revenue reports",
    sub: "Gross ticket revenue by movie",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      options: ['This week', 'This month', 'This quarter']
    }), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      iconLeft: "download"
    }, "CSV"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Gross revenue",
    value: "$77,150",
    delta: "+12.4%",
    icon: "banknote"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Avg. ticket",
    value: "$13.05",
    delta: "+0.8%",
    icon: "receipt"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Top title",
    value: "Night Shift",
    caption: "24% of revenue",
    icon: "trophy"
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "By movie"
  }, /*#__PURE__*/React.createElement(BarList, {
    items: A.revenue
  })));
}
Object.assign(window, {
  Showtimes,
  Cinemas,
  Reports
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Showtimes.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Sidebar.jsx
try { (() => {
function Sidebar({
  page,
  go
}) {
  const {
    Icon
  } = window.MovieGoDesignSystem_a2f949;
  const items = [['dashboard', 'layout-dashboard', 'Dashboard'], ['movies', 'film', 'Movies'], ['showtimes', 'clock', 'Showtimes'], ['cinemas', 'building-2', 'Cinemas'], ['reports', 'bar-chart-3', 'Revenue reports']];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 'var(--sidebar-width)',
      flexShrink: 0,
      background: 'var(--surface-1)',
      borderRight: '1px solid var(--border-subtle)',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      boxSizing: 'border-box',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 10px',
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 22px/1 var(--font-display)',
      letterSpacing: '-0.02em'
    }
  }, "Movie", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "Go")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 10px var(--font-body)',
      letterSpacing: '.14em',
      color: 'var(--text-tertiary)'
    }
  }, "ADMIN")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, items.map(([id, icon, label]) => {
    const on = page === id;
    return /*#__PURE__*/React.createElement("a", {
      key: id,
      onClick: () => go(id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 40,
        padding: '0 12px',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        font: (on ? '600' : '500') + ' 14px var(--font-body)',
        color: on ? '#fff' : 'var(--text-secondary)',
        background: on ? 'var(--surface-3)' : 'transparent',
        position: 'relative'
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: -16,
        top: 10,
        bottom: 10,
        width: 3,
        borderRadius: 2,
        background: 'var(--accent)'
      }
    }), /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 18,
      color: on ? 'var(--accent)' : 'currentColor'
    }), label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 10px',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 16,
      background: 'var(--ink-600)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '700 12px var(--font-body)'
    }
  }, "RK"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 13px var(--font-body)'
    }
  }, "Rina Kato"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 12px var(--font-body)',
      color: 'var(--text-tertiary)'
    }
  }, "Operations manager"))));
}
function PageHead({
  title,
  sub,
  actions
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: '700 30px/1.15 var(--font-display)',
      letterSpacing: '-0.01em'
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      color: 'var(--text-secondary)'
    }
  }, sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, actions));
}
function Panel({
  title,
  right,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 20,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '700 16px var(--font-display)'
    }
  }, title), right), children);
}
Object.assign(window, {
  Sidebar,
  PageHead,
  Panel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/data.js
try { (() => {
window.MG_ADMIN = {
  revenue: [['Night Shift', 18400], ['The Velvet Hour', 14250], ['Paper Moons', 12100], ['Static Bloom', 10980], ['The Quiet Coast', 9800], ['Low Tide', 6420], ['Ironwood', 5200]].map(([label, value]) => ({
    label,
    value,
    display: '$' + value.toLocaleString()
  })),
  movies: [{
    id: 1,
    title: 'Night Shift',
    genre: 'Thriller',
    runtime: '2h 14m',
    age: 'PG-13',
    status: 'Now showing',
    shows: 42
  }, {
    id: 2,
    title: 'The Velvet Hour',
    genre: 'Romance',
    runtime: '1h 52m',
    age: 'PG-13',
    status: 'Now showing',
    shows: 30
  }, {
    id: 3,
    title: 'Paper Moons',
    genre: 'Drama',
    runtime: '1h 58m',
    age: 'PG',
    status: 'Now showing',
    shows: 28
  }, {
    id: 4,
    title: 'Static Bloom',
    genre: 'Sci-Fi',
    runtime: '2h 09m',
    age: 'PG-13',
    status: 'Coming soon',
    shows: 0
  }, {
    id: 5,
    title: 'Ironwood',
    genre: 'Action',
    runtime: '2h 21m',
    age: 'R',
    status: 'Ending',
    shows: 6
  }],
  showtimes: [{
    id: 1,
    movie: 'Night Shift',
    cinema: 'Central',
    hall: 'Hall 4',
    date: '15 Oct',
    time: '19:45',
    fmt: 'IMAX',
    sold: 182,
    cap: 220,
    live: true
  }, {
    id: 2,
    movie: 'Paper Moons',
    cinema: 'Riverside',
    hall: 'Hall 2',
    date: '15 Oct',
    time: '18:40',
    fmt: 'Dolby',
    sold: 64,
    cap: 140,
    live: true
  }, {
    id: 3,
    movie: 'The Velvet Hour',
    cinema: 'Central',
    hall: 'Hall 1',
    date: '15 Oct',
    time: '20:10',
    fmt: '2D',
    sold: 131,
    cap: 140,
    live: true
  }, {
    id: 4,
    movie: 'Ironwood',
    cinema: 'Harbour',
    hall: 'Hall 3',
    date: '15 Oct',
    time: '22:00',
    fmt: '2D',
    sold: 12,
    cap: 120,
    live: true
  }, {
    id: 5,
    movie: 'Static Bloom',
    cinema: 'Central',
    hall: 'Hall 4',
    date: '24 Oct',
    time: '19:30',
    fmt: 'IMAX',
    sold: 0,
    cap: 220,
    live: false
  }],
  cinemas: [{
    id: 1,
    name: 'MovieGo Central',
    city: 'Downtown',
    halls: 6,
    seats: 1040,
    occ: '78%'
  }, {
    id: 2,
    name: 'MovieGo Riverside',
    city: 'Riverside Mall',
    halls: 4,
    seats: 610,
    occ: '64%'
  }, {
    id: 3,
    name: 'MovieGo Harbour',
    city: 'Harbour Point',
    halls: 3,
    seats: 420,
    occ: '51%'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/data.js", error: String((e && e.message) || e) }); }

// ui_kits/web/Backdrop.jsx
try { (() => {
// Tonal key-art placeholder. Replace with real backdrop imagery (16:9, cool/desaturated, subject right-of-centre).
function Backdrop({
  seed = '',
  height = 560,
  children,
  style
}) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height,
      overflow: 'hidden',
      background: 'radial-gradient(70% 90% at 72% 40%, oklch(0.34 0.06 ' + h + '), oklch(0.12 0.02 ' + h + ') 70%)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 24,
      top: 96,
      font: '500 11px var(--font-mono)',
      color: 'rgba(255,255,255,.28)',
      letterSpacing: '.1em'
    }
  }, "KEY ART 16:9"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-hero)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%'
    }
  }, children));
}
window.Backdrop = Backdrop;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Backdrop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/Bookings.jsx
try { (() => {
function Bookings({
  go
}) {
  const {
    Badge,
    Button,
    MoviePoster,
    Tabs,
    Icon
  } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA;
  const [tab, setTab] = React.useState('all');
  const list = D.bookings.filter(b => tab === 'all' || (tab === 'up' ? b.status === 'Upcoming' : b.status === 'Watched'));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px var(--gutter) 96px',
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      maxWidth: 960
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: '800 40px/1.1 var(--font-display)',
      letterSpacing: '-0.02em'
    }
  }, "My bookings"), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      id: 'all',
      label: 'All'
    }, {
      id: 'up',
      label: 'Upcoming'
    }, {
      id: 'past',
      label: 'Past'
    }]
  }), list.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.ref,
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: 16,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      opacity: b.status === 'Watched' ? 0.75 : 1
    }
  }, /*#__PURE__*/React.createElement(MoviePoster, {
    title: b.movie,
    width: 64,
    showMeta: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 18px var(--font-display)'
    }
  }, b.movie), /*#__PURE__*/React.createElement(Badge, {
    tone: b.status === 'Upcoming' ? 'success' : 'neutral'
  }, b.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      font: '400 13px var(--font-body)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14
  }), b.cinema), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-days",
    size: 14
  }), b.when)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 12px var(--font-mono)',
      color: 'var(--text-tertiary)'
    }
  }, b.ref, " \xB7 ", b.seats.join(' '))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 18px var(--font-display)'
    }
  }, b.total), b.status === 'Upcoming' ? /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    iconLeft: "qr-code"
  }, "Show ticket") : /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    onClick: () => go({
      name: 'home'
    })
  }, "Book again")))));
}
window.Bookings = Bookings;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Bookings.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/Confirmation.jsx
try { (() => {
function Confirmation({
  id,
  show,
  seats = ['F7', 'F8'],
  total = '$31.50',
  go
}) {
  const {
    Button,
    Badge,
    Icon,
    MoviePoster
  } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA;
  const m = D.movies.find(x => x.id === id) || D.movies[0];
  show = show || {
    cinema: 'MovieGo Central',
    time: '19:45',
    fmt: 'IMAX'
  };
  const Row = ({
    k,
    v,
    mono
  }) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 11px var(--font-body)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      font: mono ? '600 16px var(--font-mono)' : '600 15px var(--font-body)'
    }
  }, v));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FlowHeader, {
    step: 3,
    back: () => go({
      name: 'home'
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 28,
      padding: '56px var(--gutter) 96px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 28,
      background: 'var(--success-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 28,
    color: "var(--success)",
    strokeWidth: 2.5
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: '800 40px/1.1 var(--font-display)',
      letterSpacing: '-0.02em'
    }
  }, "You're booked."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      color: 'var(--text-secondary)'
    }
  }, "Tickets are on their way to sam.lee@mail.com.")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 640,
      maxWidth: '100%',
      display: 'flex',
      background: 'var(--surface-1)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 28,
      display: 'flex',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(MoviePoster, {
    title: m.title,
    width: 96,
    showMeta: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 22px/1 var(--font-display)',
      textTransform: 'uppercase'
    }
  }, m.title), /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    variant: "solid"
  }, show.fmt)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gap: '16px 32px'
    }
  }, /*#__PURE__*/React.createElement(Row, {
    k: "Cinema",
    v: show.cinema
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Hall",
    v: "4"
  }), /*#__PURE__*/React.createElement(Row, {
    k: "When",
    v: 'Thu 15 Oct · ' + show.time
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Seats",
    v: seats.join(' · '),
    mono: true
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 170,
      borderLeft: '2px dashed var(--border-default)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      background: 'var(--surface-2)'
    }
  }, /*#__PURE__*/React.createElement(Row, {
    k: "Booking ref",
    v: "MG-7Q4K-2291",
    mono: true
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Paid",
    v: total
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: "calendar-plus"
  }, "Add to calendar"), /*#__PURE__*/React.createElement(Button, {
    iconLeft: "ticket",
    onClick: () => go({
      name: 'bookings'
    })
  }, "View my bookings"))));
}
window.Confirmation = Confirmation;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Confirmation.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/Header.jsx
try { (() => {
function Header({
  route,
  go
}) {
  const {
    NavBar,
    IconButton,
    Button
  } = window.MovieGoDesignSystem_a2f949;
  const active = route.name === 'bookings' ? 'bookings' : route.name === 'showtimes' ? 'showtimes' : 'movies';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: route.name === 'home' || route.name === 'movie' ? 'absolute' : 'sticky',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    transparent: route.name === 'home' || route.name === 'movie',
    active: active,
    onNavigate: id => go({
      name: id === 'movies' ? 'home' : id
    }),
    links: [{
      id: 'movies',
      label: 'Movies'
    }, {
      id: 'showtimes',
      label: 'Showtimes'
    }, {
      id: 'bookings',
      label: 'My bookings'
    }],
    right: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
      icon: "search",
      label: "Search"
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "bell",
      label: "Notifications"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 18,
        background: 'var(--ink-600)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        font: '700 13px var(--font-body)'
      }
    }, "SL"))
  }));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/Home.jsx
try { (() => {
function PosterRow({
  movies,
  go
}) {
  const {
    MoviePoster,
    Badge
  } = window.MovieGoDesignSystem_a2f949;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      overflowX: 'auto',
      padding: '6px 0 12px'
    }
  }, movies.map(m => /*#__PURE__*/React.createElement(MoviePoster, {
    key: m.id,
    title: m.title,
    year: m.year,
    rating: m.rating,
    genre: m.genre,
    width: 168,
    badge: m.format && /*#__PURE__*/React.createElement(Badge, {
      tone: "gold",
      variant: "solid"
    }, m.format),
    onClick: () => go({
      name: 'movie',
      id: m.id
    })
  })));
}
function Home({
  go
}) {
  const {
    Button,
    Chip,
    Tabs,
    Rating,
    Badge,
    Select
  } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA;
  const hero = D.movies[0];
  const [tab, setTab] = React.useState('now');
  const [genres, setGenres] = React.useState(['Thriller', 'Drama']);
  const toggle = g => setGenres(s => s.includes(g) ? s.filter(x => x !== g) : [...s, g]);
  const list = D.movies.filter(m => !genres.length || genres.includes(m.genre));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Backdrop, {
    seed: hero.title,
    height: 600
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--gutter)',
      bottom: 96,
      maxWidth: 520,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    variant: "solid"
  }, "IMAX"), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, hero.age), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 11px var(--font-body)',
      letterSpacing: '.14em',
      color: 'var(--text-secondary)',
      textTransform: 'uppercase'
    }
  }, "Now showing")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: '800 var(--fs-display-xl)/0.95 var(--font-display)',
      letterSpacing: '-0.02em',
      textTransform: 'uppercase'
    }
  }, hero.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      font: '500 13px var(--font-body)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(Rating, {
    value: hero.rating,
    votes: "12k"
  }), /*#__PURE__*/React.createElement("span", null, hero.year), /*#__PURE__*/React.createElement("span", null, hero.runtime), /*#__PURE__*/React.createElement("span", null, hero.genre)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 16px/1.5 var(--font-body)',
      color: 'var(--text-secondary)',
      textWrap: 'pretty'
    }
  }, hero.synopsis), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconLeft: "ticket",
    onClick: () => go({
      name: 'movie',
      id: hero.id
    })
  }, "Book tickets"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    iconLeft: "play"
  }, "Trailer"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      bottom: 40,
      display: 'flex',
      gap: 8,
      transform: 'translateX(-50%)'
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 28,
      height: 3,
      borderRadius: 2,
      background: i === 0 ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px var(--gutter) 80px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      background: 'var(--haze-red)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      id: 'now',
      label: 'Now showing',
      icon: 'trending-up'
    }, {
      id: 'soon',
      label: 'Coming soon',
      icon: 'calendar-days'
    }, {
      id: 'imax',
      label: 'IMAX',
      icon: 'clapperboard'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      overflowX: 'auto'
    }
  }, D.genres.map(g => /*#__PURE__*/React.createElement(Chip, {
    key: g,
    selected: genres.includes(g),
    onClick: () => toggle(g)
  }, g))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      font: '500 12px var(--font-body)',
      color: 'var(--text-tertiary)'
    }
  }, "Sort by ", /*#__PURE__*/React.createElement(Select, {
    size: "sm",
    options: ['Popular', 'Rating', 'A–Z']
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, list.length, " films")), /*#__PURE__*/React.createElement(PosterRow, {
    movies: tab === 'imax' ? D.movies.filter(m => m.format) : tab === 'soon' ? [...list].reverse() : list,
    go: go
  })));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/MovieDetail.jsx
try { (() => {
function MovieDetail({
  id,
  go
}) {
  const {
    Button,
    Rating,
    Badge,
    DateStrip,
    ShowtimeChip,
    MoviePoster,
    Icon
  } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA;
  const m = D.movies.find(x => x.id === id) || D.movies[0];
  const [day, setDay] = React.useState('d1');
  const [pick, setPick] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Backdrop, {
    seed: m.title,
    height: 460
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--gutter)',
      right: 'var(--gutter)',
      bottom: 40,
      display: 'flex',
      gap: 32,
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(MoviePoster, {
    title: m.title,
    width: 180,
    showMeta: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      maxWidth: 620
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => go({
      name: 'home'
    }),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: '500 13px var(--font-body)',
      color: 'var(--text-secondary)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 15
  }), "All movies"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: '800 56px/0.95 var(--font-display)',
      letterSpacing: '-0.02em',
      textTransform: 'uppercase'
    }
  }, m.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      font: '500 13px var(--font-body)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(Rating, {
    value: m.rating
  }), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, m.age), /*#__PURE__*/React.createElement("span", null, m.runtime), /*#__PURE__*/React.createElement("span", null, m.genre)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 15px/1.5 var(--font-body)',
      color: 'var(--text-secondary)'
    }
  }, m.synopsis)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '32px var(--gutter) 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '700 22px/1.15 var(--font-display)'
    }
  }, "Choose a showtime"), /*#__PURE__*/React.createElement(DateStrip, {
    days: D.days,
    value: day,
    onChange: setDay
  })), D.cinemas.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '260px minmax(0,1fr)',
      gap: 24,
      padding: '20px 0',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 16px var(--font-body)'
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 6,
      font: '400 13px var(--font-body)',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14
  }), c.area)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, c.times.map(([t, fmt, left]) => {
    const k = c.id + t;
    return /*#__PURE__*/React.createElement(ShowtimeChip, {
      key: k,
      time: t,
      format: fmt,
      seatsLeft: left,
      soldOut: left === 0,
      selected: pick && pick.key === k,
      onClick: () => setPick({
        key: k,
        cinema: c.name,
        time: t,
        fmt
      })
    });
  }))))), pick && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 30,
      background: 'var(--surface-glass)',
      backdropFilter: 'var(--blur-glass)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '16px var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 15px var(--font-body)'
    }
  }, m.title, " \xB7 ", pick.fmt), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 13px var(--font-body)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, pick.cinema, " \xB7 Thu 15 Oct \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, pick.time))), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => go({
      name: 'seats',
      id: m.id,
      show: pick
    })
  }, "Select seats")));
}
window.MovieDetail = MovieDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/MovieDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/Payment.jsx
try { (() => {
function Payment({
  id,
  show,
  seats = [],
  go
}) {
  const {
    Input,
    Checkbox,
    Button,
    BookingSummary,
    MoviePoster,
    Badge,
    Icon,
    Dialog
  } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA;
  const m = D.movies.find(x => x.id === id) || D.movies[0];
  show = show || {
    cinema: 'MovieGo Central',
    time: '19:45',
    fmt: 'IMAX'
  };
  if (!seats.length) seats = ['F7', 'F8'];
  const [method, setMethod] = React.useState('card');
  const [agree, setAgree] = React.useState(true);
  const [busy, setBusy] = React.useState(false);
  const [leave, setLeave] = React.useState(false);
  const p = window.MG_PRICE(seats),
    money = window.MG_MONEY;
  const pay = () => {
    setBusy(true);
    setTimeout(() => go({
      name: 'done',
      id: m.id,
      show,
      seats,
      total: money(p.total)
    }), 1100);
  };
  const Method = ({
    id: mid,
    icon,
    label
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: () => setMethod(mid),
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 16px',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      color: '#fff',
      font: '600 14px var(--font-body)',
      background: method === mid ? 'var(--accent-soft)' : 'var(--surface-2)',
      border: '1px solid ' + (method === mid ? 'var(--accent)' : 'var(--border-default)')
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18
  }), label);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FlowHeader, {
    step: 2,
    back: () => setLeave(true)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) 360px',
      gap: 40,
      padding: '40px var(--gutter) 80px',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '700 30px/1.15 var(--font-display)',
      letterSpacing: '-0.01em'
    }
  }, "Payment"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      color: 'var(--text-secondary)'
    }
  }, "This is a simulated checkout. No real charge is made.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Method, {
    id: "card",
    icon: "credit-card",
    label: "Card"
  }), /*#__PURE__*/React.createElement(Method, {
    id: "wallet",
    icon: "wallet",
    label: "Wallet"
  }), /*#__PURE__*/React.createElement(Method, {
    id: "bank",
    icon: "landmark",
    label: "Bank transfer"
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Name on card",
    defaultValue: "Sam Lee"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Card number",
    iconLeft: "credit-card",
    defaultValue: "4242 4242 4242 4242",
    mono: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Expiry",
    defaultValue: "08 / 28",
    mono: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "CVC",
    defaultValue: "123",
    mono: true,
    hint: "3 digits on the back"
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Email for tickets",
    iconLeft: "mail",
    defaultValue: "sam.lee@mail.com"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "I agree to the booking and refund terms",
    checked: agree,
    onChange: setAgree
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      font: '400 12px var(--font-body)',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 14
  }), "Payments are encrypted end to end.")), /*#__PURE__*/React.createElement(BookingSummary, {
    style: {
      position: 'sticky',
      top: 24
    },
    title: m.title,
    poster: /*#__PURE__*/React.createElement(MoviePoster, {
      title: m.title,
      width: 72,
      showMeta: false
    }),
    format: /*#__PURE__*/React.createElement(Badge, {
      tone: "gold",
      variant: "solid"
    }, show.fmt),
    cinema: show.cinema + ' · Hall 4',
    datetime: 'Thu 15 Oct · ' + show.time,
    seats: seats,
    lines: [{
      label: seats.length + ' tickets',
      value: money(p.total - p.fee)
    }, {
      label: 'Booking fee',
      value: money(p.fee)
    }],
    total: money(p.total),
    ctaLabel: busy ? 'Processing…' : 'Pay ' + money(p.total),
    ctaDisabled: !agree || busy,
    onCta: pay
  })), /*#__PURE__*/React.createElement(Dialog, {
    open: leave,
    title: "Release your seats?",
    onClose: () => setLeave(false),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setLeave(false)
    }, "Keep seats"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => go({
        name: 'seats',
        id: m.id,
        show
      })
    }, "Release seats"))
  }, "Seats ", seats.join(' and '), " will become available to other moviegoers."));
}
window.Payment = Payment;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Payment.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/SeatSelect.jsx
try { (() => {
function FlowHeader({
  step,
  go,
  back
}) {
  const {
    Stepper,
    IconButton
  } = window.MovieGoDesignSystem_a2f949;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      padding: '24px var(--gutter)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "arrow-left",
    label: "Back",
    onClick: back
  }), /*#__PURE__*/React.createElement(Stepper, {
    steps: ['Showtime', 'Seats', 'Payment', 'Done'],
    current: step,
    style: {
      flex: 1,
      maxWidth: 640
    }
  }));
}
window.FlowHeader = FlowHeader;
const PRICE = 13.5,
  VIP = 18;
window.MG_PRICE = seats => {
  const vip = seats.filter(s => s[0] === 'H').length,
    std = seats.length - vip;
  const fee = seats.length ? 1.5 : 0;
  return {
    std,
    vip,
    fee,
    total: std * PRICE + vip * VIP + fee
  };
};
const money = n => '$' + n.toFixed(2);
window.MG_MONEY = money;
function SeatSelect({
  id,
  show,
  go
}) {
  const {
    SeatMap,
    BookingSummary,
    MoviePoster,
    Badge,
    Toast
  } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA;
  const m = D.movies.find(x => x.id === id) || D.movies[0];
  show = show || {
    cinema: 'MovieGo Central',
    time: '19:45',
    fmt: 'IMAX'
  };
  const [sel, setSel] = React.useState([]);
  const toggle = s => setSel(x => x.includes(s) ? x.filter(y => y !== s) : x.length >= 8 ? x : [...x, s]);
  const p = window.MG_PRICE(sel);
  const lines = [p.std && {
    label: p.std + ' × Standard',
    value: money(p.std * PRICE)
  }, p.vip && {
    label: p.vip + ' × VIP',
    value: money(p.vip * VIP)
  }, sel.length && {
    label: 'Booking fee',
    value: money(p.fee)
  }].filter(Boolean);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FlowHeader, {
    step: 1,
    back: () => go({
      name: 'movie',
      id: m.id
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) 360px',
      gap: 40,
      padding: '40px var(--gutter) 80px',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SeatMap, {
    rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    seatsPerRow: 14,
    taken: D.taken,
    vipRows: ['H'],
    accessible: ['A1', 'A14'],
    selected: sel,
    onToggle: toggle
  }), /*#__PURE__*/React.createElement(Toast, {
    tone: "warning",
    title: "Seats are held for 10 minutes",
    message: "Up to 8 seats per booking. Row H is VIP recliner seating."
  })), /*#__PURE__*/React.createElement(BookingSummary, {
    style: {
      position: 'sticky',
      top: 24
    },
    title: m.title,
    poster: /*#__PURE__*/React.createElement(MoviePoster, {
      title: m.title,
      width: 72,
      showMeta: false
    }),
    format: /*#__PURE__*/React.createElement(Badge, {
      tone: "gold",
      variant: "solid"
    }, show.fmt),
    cinema: show.cinema + ' · Hall 4',
    datetime: 'Thu 15 Oct · ' + show.time,
    seats: sel,
    lines: lines,
    total: money(p.total),
    ctaLabel: "Continue to payment",
    ctaDisabled: !sel.length,
    onCta: () => go({
      name: 'pay',
      id: m.id,
      show,
      seats: sel
    })
  })));
}
window.SeatSelect = SeatSelect;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/SeatSelect.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/ShowtimesBrowse.jsx
try { (() => {
const stHash = s => {
  let h = 7;
  for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
  return h;
};
const ST_SLOTS = ['10:30', '11:45', '13:10', '14:00', '15:20', '16:30', '17:15', '18:40', '19:45', '20:30', '21:30', '22:10', '23:50'];
function stSchedule(movie, cinema, day) {
  const h = stHash(movie.id + cinema.id + day);
  if (h % 5 === 0) return [];
  const n = 2 + h % 4,
    out = [];
  for (let i = 0; i < ST_SLOTS.length && out.length < n; i++) if (h >> i & 1) out.push(ST_SLOTS[i]);
  return out.map((t, i) => {
    const r = (h >> i + 3) % 9;
    const fmt = movie.format === 'IMAX' && cinema.id === 'central' && i % 2 ? 'IMAX' : cinema.id === 'riverside' && r === 2 ? 'Dolby' : cinema.id === 'harbour' && r === 3 ? '4DX' : '2D';
    return [t, fmt, r === 0 ? 0 : r === 1 ? 7 : undefined];
  });
}
function ShowtimesBrowse({
  go
}) {
  const {
    DateStrip,
    ShowtimeChip,
    MoviePoster,
    Rating,
    Badge,
    Button,
    Icon
  } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA;
  const [day, setDay] = React.useState('d0');
  const [cinemaId, setCinemaId] = React.useState(D.cinemas[0].id);
  const [pick, setPick] = React.useState(null);
  const dayObj = D.days.find(d => d.id === day);
  const dayLabel = (dayObj.weekday === 'Today' ? 'Today' : dayObj.weekday) + ' ' + dayObj.day + ' Oct';
  const cinema = D.cinemas.find(c => c.id === cinemaId);
  const chips = (m, c) => {
    const times = stSchedule(m, c, day);
    if (!times.length) return /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 13px var(--font-body)',
        color: 'var(--text-tertiary)'
      }
    }, "No showtimes on this day");
    return times.map(([t, fmt, left]) => {
      const k = m.id + c.id + day + t;
      return /*#__PURE__*/React.createElement(ShowtimeChip, {
        key: k,
        time: t,
        format: fmt,
        seatsLeft: left,
        soldOut: left === 0,
        selected: pick && pick.key === k,
        onClick: () => setPick({
          key: k,
          movie: m,
          cinema: c.name,
          time: t,
          fmt
        })
      });
    });
  };
  const listItem = (on, onClick, children) => /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      width: '100%',
      padding: 10,
      textAlign: 'left',
      border: 0,
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      color: 'var(--text-primary)',
      background: on ? 'var(--ink-700)' : 'transparent',
      boxShadow: on ? 'inset 0 0 0 1px var(--border-default)' : 'none',
      transition: 'background var(--dur-base)'
    }
  }, children);
  const rows = D.movies.map(m => ({
    key: m.id,
    head: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 14,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(MoviePoster, {
      title: m.title,
      width: 52,
      showMeta: false
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
      onClick: () => go({
        name: 'movie',
        id: m.id
      }),
      style: {
        font: '600 16px var(--font-body)',
        cursor: 'pointer',
        color: 'var(--text-primary)'
      }
    }, m.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 6,
        font: '400 13px var(--font-body)',
        color: 'var(--text-tertiary)'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "outline"
    }, m.age), m.runtime))),
    body: chips(m, cinema)
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '32px var(--gutter) 140px',
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: '800 44px/0.95 var(--font-display)',
      letterSpacing: '-0.02em',
      textTransform: 'uppercase'
    }
  }, "Showtimes"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 15px var(--font-body)',
      color: 'var(--text-secondary)'
    }
  }, "Choose a cinema to see what's playing.")), /*#__PURE__*/React.createElement(DateStrip, {
    days: D.days,
    value: day,
    onChange: d => {
      setDay(d);
      setPick(null);
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(220px,280px) minmax(0,1fr)',
      gap: 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      position: 'sticky',
      top: 'calc(var(--nav-height) + 16px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 11px var(--font-body)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
      padding: '0 10px 8px'
    }
  }, "Cinemas"), D.cinemas.map(c => /*#__PURE__*/React.createElement(React.Fragment, {
    key: c.id
  }, listItem(c.id === cinemaId, () => {
    setCinemaId(c.id);
    setPick(null);
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--ink-600)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--accent)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building-2",
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 14px var(--font-body)'
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      font: '400 12px var(--font-body)',
      color: 'var(--text-tertiary)'
    }
  }, c.area))))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      paddingBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '700 22px/1.15 var(--font-display)'
    }
  }, cinema.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 14px var(--font-body)',
      color: 'var(--text-secondary)'
    }
  }, dayLabel)), rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.key,
    style: {
      display: 'grid',
      gridTemplateColumns: '260px minmax(0,1fr)',
      gap: 24,
      alignItems: 'center',
      padding: '18px 0',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, r.head, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, r.body))))), pick && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 30,
      background: 'var(--surface-glass)',
      backdropFilter: 'var(--blur-glass)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '16px var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 15px var(--font-body)'
    }
  }, pick.movie.title, " \xB7 ", pick.fmt), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 13px var(--font-body)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, pick.cinema, " \xB7 ", dayLabel, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, pick.time))), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => go({
      name: 'seats',
      id: pick.movie.id,
      show: {
        key: pick.key,
        cinema: pick.cinema,
        time: pick.time,
        fmt: pick.fmt
      }
    })
  }, "Select seats")));
}
window.ShowtimesBrowse = ShowtimesBrowse;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/ShowtimesBrowse.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/data.js
try { (() => {
window.MG_DATA = {
  movies: [{
    id: 'night-shift',
    title: 'Night Shift',
    year: 2025,
    rating: 8.4,
    genre: 'Thriller',
    runtime: '2h 14m',
    age: 'PG-13',
    format: 'IMAX',
    synopsis: 'A hospital night nurse discovers that the patients on the ninth floor are checking in, but none of them are checking out.'
  }, {
    id: 'paper-moons',
    title: 'Paper Moons',
    year: 2025,
    rating: 8.1,
    genre: 'Drama',
    runtime: '1h 58m',
    age: 'PG',
    synopsis: 'Two estranged sisters reopen their late father\'s puppet theatre for one final season.'
  }, {
    id: 'quiet-coast',
    title: 'The Quiet Coast',
    year: 2024,
    rating: 7.6,
    genre: 'Mystery',
    runtime: '2h 02m',
    age: 'PG-13',
    synopsis: 'A lighthouse keeper receives radio messages from a ship that sank forty years ago.'
  }, {
    id: 'ironwood',
    title: 'Ironwood',
    year: 2023,
    rating: 6.9,
    genre: 'Action',
    runtime: '2h 21m',
    age: 'R',
    synopsis: 'A retired logger is pulled into one last job deep in the northern forest.'
  }, {
    id: 'static-bloom',
    title: 'Static Bloom',
    year: 2025,
    rating: 7.8,
    genre: 'Sci-Fi',
    runtime: '2h 09m',
    age: 'PG-13',
    format: 'IMAX',
    synopsis: 'Botanists on a dying orbital farm race to save the last living seed bank.'
  }, {
    id: 'low-tide',
    title: 'Low Tide',
    year: 2024,
    rating: 7.2,
    genre: 'Crime',
    runtime: '1h 49m',
    age: 'R',
    synopsis: 'A harbour detective follows a smuggling ring that only moves when the water is out.'
  }, {
    id: 'velvet-hour',
    title: 'The Velvet Hour',
    year: 2025,
    rating: 8.7,
    genre: 'Romance',
    runtime: '1h 52m',
    age: 'PG-13',
    synopsis: 'A jazz pianist and a radio host fall for each other entirely on air.'
  }],
  genres: ['Action', 'Adventure', 'Biography', 'Crime', 'Comedy', 'Documentary', 'Drama', 'Sci-Fi', 'Thriller'],
  days: [['d0', 'Today', 14], ['d1', 'Thu', 15], ['d2', 'Fri', 16], ['d3', 'Sat', 17], ['d4', 'Sun', 18], ['d5', 'Mon', 19], ['d6', 'Tue', 20]].map(([id, weekday, day]) => ({
    id,
    weekday,
    day
  })),
  cinemas: [{
    id: 'central',
    name: 'MovieGo Central',
    area: 'Downtown · 1.2 km',
    times: [['13:10', '2D'], ['16:30', 'IMAX'], ['19:45', 'IMAX'], ['21:30', '2D', 6], ['23:50', '2D', 0]]
  }, {
    id: 'riverside',
    name: 'MovieGo Riverside',
    area: 'Riverside Mall · 4.8 km',
    times: [['12:00', '2D'], ['15:20', '2D'], ['18:40', 'Dolby'], ['22:10', '2D', 9]]
  }, {
    id: 'harbour',
    name: 'MovieGo Harbour',
    area: 'Harbour Point · 7.5 km',
    times: [['14:00', '2D'], ['17:15', '4DX'], ['20:30', '2D']]
  }],
  taken: ['C5', 'C6', 'D7', 'D8', 'D9', 'E3', 'E4', 'F10', 'G10', 'G11', 'B12', 'B13', 'H6', 'H7'],
  bookings: [{
    ref: 'MG-7Q4K-2291',
    movie: 'Night Shift',
    cinema: 'MovieGo Central · Hall 4',
    when: 'Thu 15 Oct · 19:45',
    seats: ['F7', 'F8'],
    total: '$31.50',
    status: 'Upcoming'
  }, {
    ref: 'MG-3HPZ-1180',
    movie: 'Paper Moons',
    cinema: 'MovieGo Riverside · Hall 2',
    when: 'Sat 26 Sep · 18:40',
    seats: ['D5'],
    total: '$14.25',
    status: 'Watched'
  }, {
    ref: 'MG-9WLC-0754',
    movie: 'Ironwood',
    cinema: 'MovieGo Central · Hall 1',
    when: 'Fri 04 Sep · 21:30',
    seats: ['G3', 'G4', 'G5'],
    total: '$40.50',
    status: 'Watched'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/data.js", error: String((e && e.message) || e) }); }

// ui_kits/web/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    /* Monolithic at print: Blink slices a transform-scaled child at
     * fragmentainer boundaries mapped in UNSCALED layout coordinates
     * (transforms are paint-time), so the .fit box (authored size, e.g.
     * 1400x990) gets cut at the page's free block space and spills onto
     * a second sheet even though its SCALED footprint fits the page by
     * construction. overflow:hidden makes .fit-box a scroll container —
     * monolithic under fragmentation (css-break-3) — so the scaled
     * content prints atomically on one sheet. No clipping for content
     * within the authored box: .fit-box is calc-sized to exactly the
     * scaled footprint. (Content that bleeds past content-width/height
     * is clipped at the footprint — fit mode's contract; it previously
     * painted beyond it at print.) Print-only, so the screen rendering
     * keeps visible overflow for editor affordances.
     * The export path injects the same rule into frozen copies
     * (print-eval.ts om-print-fit-contain). The .fit-mode scope is
     * load-bearing: .fit-box wraps slotted content in EVERY mode, and an
     * unscoped overflow:hidden would make whole flowing documents
     * monolithic (one truncated sheet). overflow:hidden, never clip —
     * clip is not a scroll container, so not monolithic. */
    @media print {
      .fit-mode .fit-box { overflow: hidden; }
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/doc-page.js", error: String((e && e.message) || e) }); }

__ds_ns.BarList = __ds_scope.BarList;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.BookingSummary = __ds_scope.BookingSummary;

__ds_ns.DateStrip = __ds_scope.DateStrip;

__ds_ns.MoviePoster = __ds_scope.MoviePoster;

__ds_ns.Seat = __ds_scope.Seat;

__ds_ns.SeatMap = __ds_scope.SeatMap;

__ds_ns.ShowtimeChip = __ds_scope.ShowtimeChip;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
