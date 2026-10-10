import React from 'react';
import { icons as lib } from 'lucide';
const toPascal = (s) => s.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
/** Renders a Lucide icon by kebab-case name. Icon data comes from the `lucide` npm package (thay cho script CDN). */
export function Icon({ name, size = 20, strokeWidth = 1.75, color = 'currentColor', style, ...rest }) {
  let node = lib[toPascal(name)] || lib[name];
  if (node && node[0] === 'svg') node = node[2];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ flexShrink: 0, display: 'block', ...style }} {...rest}>
      {(node || []).map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
