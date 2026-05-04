
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports: IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({ dark = false, time = '9:41' }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      display: 'flex', gap: 154, alignItems: 'center', justifyContent: 'center',
      padding: '21px 24px 19px', boxSizing: 'border-box',
      position: 'relative', zIndex: 20, width: '100%',
    }}>
      <div style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 1.5 }}>
        <span style={{
          fontFamily: '-apple-system, "SF Pro", system-ui', fontWeight: 590,
          fontSize: 17, lineHeight: '22px', color: c,
        }}>{time}</span>
      </div>
      <div style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, paddingTop: 1, paddingRight: 1 }}>
        <svg width="19" height="12" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c}/>
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c}/>
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c}/>
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c}/>
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12">
          <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={c}/>
          <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill={c}/>
          <circle cx="8.5" cy="10.5" r="1.5" fill={c}/>
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none"/>
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c}/>
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({ children, dark = false, style = {} }) {
  return (
    <div style={{
      height: 44, minWidth: 44, borderRadius: 9999,
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: dark
        ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)'
        : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style,
    }}>
      {/* blur + tint */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 9999,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)',
      }} />
      {/* shine */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 9999,
        boxShadow: dark
          ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)'
          : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
        border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', padding: '0 4px' }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({ title = 'Title', dark = false, trailingIcon = true }) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = (content) => (
    <IOSGlassPill dark={dark}>
      <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {content}
      </div>
    </IOSGlassPill>
  );
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 10,
      paddingTop: 62, paddingBottom: 10, position: 'relative', zIndex: 5,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
      }}>
        {/* back chevron */}
        {pillIcon(
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" style={{ marginLeft: -1 }}>
            <path d="M10 2L2 10l8 8" stroke={muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {/* trailing ellipsis */}
        {trailingIcon && pillIcon(
          <svg width="22" height="6" viewBox="0 0 22 6">
            <circle cx="3" cy="3" r="2.5" fill={muted}/>
            <circle cx="11" cy="3" r="2.5" fill={muted}/>
            <circle cx="19" cy="3" r="2.5" fill={muted}/>
          </svg>
        )}
      </div>
      {/* large title */}
      <div style={{
        padding: '0 16px',
        fontFamily: '-apple-system, system-ui',
        fontSize: 34, fontWeight: 700, lineHeight: '41px',
        color: text, letterSpacing: 0.4,
      }}>{title}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({ title, detail, icon, chevron = true, isLast = false, dark = false }) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', minHeight: 52,
      padding: '0 16px', position: 'relative',
      fontFamily: '-apple-system, system-ui', fontSize: 17,
      letterSpacing: -0.43,
    }}>
      {icon && (
        <div style={{
          width: 30, height: 30, borderRadius: 7, background: icon,
          marginRight: 12, flexShrink: 0,
        }} />
      )}
      <div style={{ flex: 1, color: text }}>{title}</div>
      {detail && <span style={{ color: sec, marginRight: 6 }}>{detail}</span>}
      {chevron && (
        <svg width="8" height="14" viewBox="0 0 8 14" style={{ flexShrink: 0 }}>
          <path d="M1 1l6 6-6 6" stroke={ter} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {!isLast && (
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          left: icon ? 58 : 16, height: 0.5, background: sep,
        }} />
      )}
    </div>
  );
}

function IOSList({ header, children, dark = false }) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return (
    <div>
      {header && (
        <div style={{
          fontFamily: '-apple-system, system-ui', fontSize: 13,
          color: hc, textTransform: 'uppercase',
          padding: '8px 36px 6px', letterSpacing: -0.08,
        }}>{header}</div>
      )}
      <div style={{
        background: bg, borderRadius: 26,
        margin: '0 16px', overflow: 'hidden',
      }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children, width = 402, height = 874, dark = false,
  title, keyboard = false,
}) {
  return (
    <div style={{
      width, height, borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50,
      }} />
      {/* status bar (absolute) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <IOSStatusBar dark={dark} />
      </div>
      {/* nav + content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {title !== undefined && <IOSNavBar title={title} dark={dark} />}
        <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
        {keyboard && <IOSKeyboard dark={dark} />}
      </div>
      {/* home indicator — always on top */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
        height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        paddingBottom: 8, pointerEvents: 'none',
      }}>
        <div style={{
          width: 139, height: 5, borderRadius: 100,
          background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)',
        }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({ dark = false }) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: <svg width="19" height="17" viewBox="0 0 19 17"><path d="M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z" fill={glyph}/></svg>,
    del: <svg width="23" height="17" viewBox="0 0 23 17"><path d="M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z" fill="none" stroke={glyph} strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 5l7 7M17 5l-7 7" stroke={glyph} strokeWidth="1.6" strokeLinecap="round"/></svg>,
    ret: <svg width="20" height="14" viewBox="0 0 20 14"><path d="M18 1v6H4m0 0l4-4M4 7l4 4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  };

  const key = (content, { w, flex, ret, fs = 25, k } = {}) => (
    <div key={k} style={{
      height: 42, borderRadius: 8.5,
      flex: flex ? 1 : undefined, width: w, minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs, fontWeight: 458, color: ret ? '#fff' : glyph,
    }}>{content}</div>
  );

  const row = (keys, pad = 0) => (
    <div style={{ display: 'flex', gap: 6.5, justifyContent: 'center', padding: `0 ${pad}px` }}>
      {keys.map(l => key(l, { flex: true, k: l }))}
    </div>
  );

  return (
    <div style={{
      position: 'relative', zIndex: 15, borderRadius: 27, overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      boxShadow: dark
        ? '0 -2px 20px rgba(0,0,0,0.09)'
        : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)',
    }}>
      {/* liquid glass bg — same recipe as nav pills */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 27,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 27,
        boxShadow: dark
          ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)'
          : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
        border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
        pointerEvents: 'none',
      }} />

      {/* autocorrect bar */}
      <div style={{
        display: 'flex', gap: 20, alignItems: 'center',
        padding: '8px 22px 13px', width: '100%', boxSizing: 'border-box',
        position: 'relative',
      }}>
        {['"The"', 'the', 'to'].map((w, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ width: 1, height: 25, background: '#ccc', opacity: 0.3 }} />}
            <div style={{
              flex: 1, textAlign: 'center',
              fontFamily: '-apple-system, system-ui', fontSize: 17,
              color: sugg, letterSpacing: -0.43, lineHeight: '22px',
            }}>{w}</div>
          </React.Fragment>
        ))}
      </div>

      {/* key layout */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 13,
        padding: '0 6.5px', width: '100%', boxSizing: 'border-box',
        position: 'relative',
      }}>
        {row(['q','w','e','r','t','y','u','i','o','p'])}
        {row(['a','s','d','f','g','h','j','k','l'], 20)}
        <div style={{ display: 'flex', gap: 14.25, alignItems: 'center' }}>
          {key(icons.shift, { w: 45, k: 'shift' })}
          <div style={{ display: 'flex', gap: 6.5, flex: 1 }}>
            {['z','x','c','v','b','n','m'].map(l => key(l, { flex: true, k: l }))}
          </div>
          {key(icons.del, { w: 45, k: 'del' })}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {key('ABC', { w: 92.25, fs: 18, k: 'abc' })}
          {key('', { flex: true, k: 'space' })}
          {key(icons.ret, { w: 92.25, ret: true, k: 'ret' })}
        </div>
      </div>

      {/* bottom spacer (emoji+mic area, icons omitted) */}
      <div style={{ height: 56, width: '100%', position: 'relative' }} />
    </div>
  );
}

Object.assign(window, {
  IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard,
});



// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), labels/titles are inline-editable,
// and any artboard can be opened in a fullscreen focus overlay (←/→/Esc).
// State persists to a .design-canvas.state.json sidecar via the host
// bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = [
    '.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}',
    '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}',
    '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}',
    '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}',
    '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
    '.dc-card{transition:box-shadow .15s,transform .15s}',
    '.dc-card *{scrollbar-width:none}',
    '.dc-card *::-webkit-scrollbar{display:none}',
    '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px}',
    '.dc-grip{cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s}',
    '.dc-grip:hover{background:rgba(0,0,0,.08)}',
    '.dc-grip:active{cursor:grabbing}',
    '.dc-labeltext{cursor:pointer;border-radius:4px;padding:3px 6px;display:flex;align-items:center;transition:background .12s}',
    '.dc-labeltext:hover{background:rgba(0,0,0,.05)}',
    '.dc-expand{position:absolute;bottom:100%;right:0;margin-bottom:5px;z-index:2;opacity:0;transition:opacity .12s,background .12s;',
    '  width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;',
    '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center}',
    '.dc-expand:hover{background:rgba(0,0,0,.06);color:#2a251f}',
    '[data-dc-slot]:hover .dc-expand{opacity:1}',
  ].join('\n');
  document.head.appendChild(s);
}

const DCCtx = React.createContext(null);

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, focused
// artboard). Order/titles/labels persist to a .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';

function DesignCanvas({ children, minScale, maxScale, style }) {
  const [state, setState] = React.useState({ sections: {}, focus: null });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);

  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE)
      .then((r) => (r.ok ? r.json() : null))
      .then((saved) => {
        if (off || !saved || !saved.sections) return;
        skipNextWrite.current = true;
        setState((s) => ({ ...s, sections: saved.sections }));
      })
      .catch(() => {})
      .finally(() => { didRead.current = true; if (!off) setReady(true); });
    const t = setTimeout(() => { if (!off) setReady(true); }, 150);
    return () => { off = true; clearTimeout(t); };
  }, []);

  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) { skipNextWrite.current = false; return; }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({ sections: state.sections })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Only direct DCSection > DCArtboard children are
  // walked — wrapping them in other elements opts out of focus/reorder.
  const registry = {};     // slotId -> { sectionId, artboard }
  const sectionMeta = {};  // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  React.Children.forEach(children, (sec) => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const srcIds = [];
    React.Children.forEach(sec.props.children, (ab) => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (!aid) return;
      registry[`${sid}/${aid}`] = { sectionId: sid, artboard: ab };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter((k) => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter((k) => !kept.includes(k))],
    };
  });

  const api = React.useMemo(() => ({
    state,
    section: (id) => state.sections[id] || {},
    patchSection: (id, p) => setState((s) => ({
      ...s,
      sections: { ...s.sections, [id]: { ...s.sections[id], ...(typeof p === 'function' ? p(s.sections[id] || {}) : p) } },
    })),
    setFocus: (slotId) => setState((s) => ({ ...s, focus: slotId })),
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') api.setFocus(null); };
    const onPd = (e) => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);

  return (
    <DCCtx.Provider value={api}>
      <DCViewport minScale={minScale} maxScale={maxScale} style={style}>{ready && children}</DCViewport>
      {state.focus && registry[state.focus] && (
        <DCFocusOverlay entry={registry[state.focus]} sectionMeta={sectionMeta} sectionOrder={sectionOrder} />
      )}
    </DCCtx.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({ children, minScale = 0.1, maxScale = 8, style = {} }) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({ x: 0, y: 0, scale: 1 });

  const apply = React.useCallback(() => {
    const { x, y, scale } = tf.current;
    const el = worldRef.current;
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }, []);

  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;

    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left, py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = (e) =>
      e.deltaMode !== 0 ||
      (e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40);

    const onWheel = (e) => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if (e.ctrlKey) {
        // trackpad pinch (or explicit ctrl+wheel)
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = (e) => { e.preventDefault(); isGesturing = true; gsBase = tf.current.scale; };
    const onGestureChange = (e) => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, (gsBase * e.scale) / tf.current.scale);
    };
    const onGestureEnd = (e) => { e.preventDefault(); isGesturing = false; };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = (e) => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || (e.button === 0 && onBg))) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = { id: e.pointerId, lx: e.clientX, ly: e.clientY };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX; drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    vp.addEventListener('wheel', onWheel, { passive: false });
    vp.addEventListener('gesturestart', onGestureStart, { passive: false });
    vp.addEventListener('gesturechange', onGestureChange, { passive: false });
    vp.addEventListener('gestureend', onGestureEnd, { passive: false });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);

  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return (
    <div
      ref={vpRef}
      className="design-canvas"
      style={{
        height: '100vh', width: '100vw',
        background: DC.bg,
        overflow: 'hidden',
        overscrollBehavior: 'none',
        touchAction: 'none',
        position: 'relative',
        fontFamily: DC.font,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div
        ref={worldRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          transformOrigin: '0 0',
          willChange: 'transform',
          width: 'max-content', minWidth: '100%',
          minHeight: '100%',
          padding: '60px 0 80px',
        }}
      >
        <div style={{ position: 'absolute', inset: -6000, backgroundImage: gridSvg, backgroundSize: '120px 120px', pointerEvents: 'none', zIndex: -1 }} />
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({ id, title, subtitle, children, gap = 48 }) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(children);
  const artboards = all.filter((c) => c && c.type === DCArtboard);
  const rest = all.filter((c) => !(c && c.type === DCArtboard));
  const srcOrder = artboards.map((a) => a.props.id ?? a.props.label);
  const sec = (ctx && sid && ctx.section(sid)) || {};

  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter((k) => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter((k) => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);

  const byId = Object.fromEntries(artboards.map((a) => [a.props.id ?? a.props.label, a]));

  return (
    <div data-dc-section={sid} style={{ marginBottom: 80, position: 'relative' }}>
      <div style={{ padding: '0 60px 56px' }}>
        <DCEditable tag="div" value={sec.title ?? title}
          onChange={(v) => ctx && sid && ctx.patchSection(sid, { title: v })}
          style={{ fontSize: 28, fontWeight: 600, color: DC.title, letterSpacing: -0.4, marginBottom: 6, display: 'inline-block' }} />
        {subtitle && <div style={{ fontSize: 16, color: DC.subtitle }}>{subtitle}</div>}
      </div>
      <div style={{ display: 'flex', gap, padding: '0 60px', alignItems: 'flex-start', width: 'max-content' }}>
        {order.map((k) => (
          <DCArtboardFrame key={k} sectionId={sid} artboard={byId[k]} order={order}
            label={(sec.labels || {})[k] ?? byId[k].props.label}
            onRename={(v) => ctx && ctx.patchSection(sid, (x) => ({ labels: { ...x.labels, [k]: v } }))}
            onReorder={(next) => ctx && ctx.patchSection(sid, { order: next })}
            onFocus={() => ctx && ctx.setFocus(`${sid}/${k}`)} />
        ))}
      </div>
      {rest}
    </div>
  );
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() { return null; }

function DCArtboardFrame({ sectionId, artboard, label, order, onRename, onReorder, onFocus }) {
  const { id: rawId, label: rawLabel, width = 260, height = 480, children, style = {} } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = (e) => {
    e.preventDefault(); e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map((el) => ({ el, id: el.dataset.dcSlot, x: el.getBoundingClientRect().left }));
    const slotXs = homes.map((h) => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');

    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };

    const move = (ev) => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0, best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) { best = d; nearest = i; }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter((k) => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };

    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) { h.el.style.transition = 'none'; h.el.style.transform = ''; }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };

  return (
    <div ref={ref} data-dc-slot={id} style={{ position: 'relative', flexShrink: 0 }}>
      <div className="dc-labelrow" style={{ position: 'absolute', bottom: '100%', left: -4, marginBottom: 4, color: DC.label }}>
        <div className="dc-grip" onPointerDown={onGripDown} title="Drag to reorder">
          <svg width="9" height="13" viewBox="0 0 9 13" fill="currentColor"><circle cx="2" cy="2" r="1.1"/><circle cx="7" cy="2" r="1.1"/><circle cx="2" cy="6.5" r="1.1"/><circle cx="7" cy="6.5" r="1.1"/><circle cx="2" cy="11" r="1.1"/><circle cx="7" cy="11" r="1.1"/></svg>
        </div>
        <div className="dc-labeltext" onClick={onFocus} title="Click to focus">
          <DCEditable value={label} onChange={onRename} onClick={(e) => e.stopPropagation()}
            style={{ fontSize: 15, fontWeight: 500, color: DC.label, lineHeight: 1 }} />
        </div>
      </div>
      <button className="dc-expand" onClick={onFocus} onPointerDown={(e) => e.stopPropagation()} title="Focus">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"/></svg>
      </button>
      <div className="dc-card"
        style={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)', overflow: 'hidden', width, height, background: '#fff', ...style }}>
        {children || <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 13, fontFamily: DC.font }}>{id}</div>}
      </div>
    </div>
  );
}

// Inline rename — commits on blur or Enter.
function DCEditable({ value, onChange, style, tag = 'span', onClick }) {
  const T = tag;
  return (
    <T className="dc-editable" contentEditable suppressContentEditableWarning
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      onBlur={(e) => onChange && onChange(e.currentTarget.textContent)}
      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur(); } }}
      style={style}>{value}</T>
  );
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({ entry, sectionMeta, sectionOrder }) {
  const ctx = React.useContext(DCCtx);
  const { sectionId, artboard } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);

  const go = (d) => { const n = peers[(idx + d + peers.length) % peers.length]; if (n) ctx.setFocus(`${sectionId}/${n}`); };
  const goSection = (d) => {
    const ns = sectionOrder[(secIdx + d + sectionOrder.length) % sectionOrder.length];
    const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
    if (first) ctx.setFocus(`${ns}/${first}`);
  };

  React.useEffect(() => {
    const k = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); goSection(-1); }
      if (e.key === 'ArrowDown') { e.preventDefault(); goSection(1); }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });

  const { width = 260, height = 480, children } = artboard.props;
  const [vp, setVp] = React.useState({ w: window.innerWidth, h: window.innerHeight });
  React.useEffect(() => { const r = () => setVp({ w: window.innerWidth, h: window.innerHeight }); window.addEventListener('resize', r); return () => window.removeEventListener('resize', r); }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));

  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({ dir, onClick }) => (
    <button onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{ position: 'absolute', top: '50%', [dir]: 28, transform: 'translateY(-50%)',
        border: 'none', background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.9)',
        width: 44, height: 44, borderRadius: 22, fontSize: 18, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .15s' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.18)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.08)')}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d={dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'} /></svg>
    </button>
  );

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(
    <div onClick={() => ctx.setFocus(null)}
      onWheel={(e) => e.preventDefault()}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(24,20,16,.6)', backdropFilter: 'blur(14px)',
        fontFamily: DC.font, color: '#fff' }}>

      {/* top bar: section dropdown (left) · close (right) */}
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 72, display: 'flex', alignItems: 'flex-start', padding: '16px 20px 0', gap: 16 }}>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setDd((o) => !o)}
            style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', padding: '6px 8px',
              borderRadius: 6, textAlign: 'left', fontFamily: 'inherit' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.3 }}>{meta.title}</span>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ opacity: .7 }}><path d="M2 4l3.5 3.5L9 4"/></svg>
            </span>
            {meta.subtitle && <span style={{ display: 'block', fontSize: 13, opacity: .6, fontWeight: 400, marginTop: 2 }}>{meta.subtitle}</span>}
          </button>
          {ddOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#2a251f', borderRadius: 8,
              boxShadow: '0 8px 32px rgba(0,0,0,.4)', padding: 4, minWidth: 200, zIndex: 10 }}>
              {sectionOrder.map((sid) => (
                <button key={sid} onClick={() => { setDd(false); const f = sectionMeta[sid].slotIds[0]; if (f) ctx.setFocus(`${sid}/${f}`); }}
                  style={{ display: 'block', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
                    background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent', color: '#fff',
                    padding: '8px 12px', borderRadius: 5, fontSize: 14, fontWeight: sid === sectionId ? 600 : 400, fontFamily: 'inherit' }}>
                  {sectionMeta[sid].title}
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        <button onClick={() => ctx.setFocus(null)}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.12)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          style={{ border: 'none', background: 'transparent', color: 'rgba(255,255,255,.7)', width: 32, height: 32,
            borderRadius: 16, fontSize: 20, cursor: 'pointer', lineHeight: 1, transition: 'background .12s' }}>×</button>
      </div>

      {/* card centered, label + index below — only the card itself stops
          propagation so any backdrop click (including the margins around
          the card) exits focus */}
      <div
        style={{ position: 'absolute', top: 64, bottom: 56, left: 100, right: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div onClick={(e) => e.stopPropagation()} style={{ width: width * scale, height: height * scale, position: 'relative' }}>
          <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left', background: '#fff', borderRadius: 2, overflow: 'hidden',
            boxShadow: '0 20px 80px rgba(0,0,0,.4)' }}>
            {children || <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>{aid}</div>}
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()} style={{ fontSize: 14, fontWeight: 500, opacity: .85, textAlign: 'center' }}>
          {(sec.labels || {})[aid] ?? artboard.props.label}
          <span style={{ opacity: .5, marginLeft: 10, fontVariantNumeric: 'tabular-nums' }}>{idx + 1} / {peers.length}</span>
        </div>
      </div>

      <Arrow dir="left" onClick={() => go(-1)} />
      <Arrow dir="right" onClick={() => go(1)} />

      {/* dots */}
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
        {peers.map((p, i) => (
          <button key={p} onClick={() => ctx.setFocus(`${sectionId}/${p}`)}
            style={{ border: 'none', padding: 0, cursor: 'pointer', width: 6, height: 6, borderRadius: 3,
              background: i === idx ? '#fff' : 'rgba(255,255,255,.3)' }} />
        ))}
      </div>
    </div>,
    document.body,
  );
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({ children, top, left, right, bottom, rotate = -2, width = 180 }) {
  return (
    <div style={{
      position: 'absolute', top, left, right, bottom, width,
      background: DC.postitBg, padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14, lineHeight: 1.4, color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5,
    }}>{children}</div>
  );
}

Object.assign(window, { DesignCanvas, DCSection, DCArtboard, DCPostIt });



// LazeeLog — interactive timer app prototype
// Renders inside an IOSDevice frame. Single-file but composed of small components.

const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────
const TOKENS = {
  bg: '#000000',
  bgElev: '#0d0d0f',
  surface: 'rgba(255,255,255,0.04)',
  surfaceHi: 'rgba(255,255,255,0.08)',
  border: 'rgba(255,255,255,0.06)',
  borderHi: 'rgba(255,255,255,0.12)',
  text: '#ffffff',
  textDim: 'rgba(235,235,245,0.6)',
  textFaint: 'rgba(235,235,245,0.3)',
  font: '-apple-system, "SF Pro Display", "SF Pro", system-ui, sans-serif',
  mono: '"SF Mono", "SFMono-Regular", ui-monospace, Menlo, monospace',
};

// Category palette — distinct colors for tasks vs. distractions
const CATS = {
  // productive (warm, saturated)
  design:  { name: 'Design',   color: '#FF9F0A', kind: 'work' },
  code:    { name: 'Code',     color: '#30D158', kind: 'work' },
  writing: { name: 'Writing',  color: '#5E5CE6', kind: 'work' },
  meeting: { name: 'Meeting',  color: '#64D2FF', kind: 'work' },
  reading: { name: 'Reading',  color: '#BF5AF2', kind: 'work' },
  // distractions (muted reds/grays)
  social:  { name: 'Social',   color: '#FF453A', kind: 'distract' },
  video:   { name: 'Video',    color: '#FF6482', kind: 'distract' },
  shopping:{ name: 'Shopping', color: '#FF9500', kind: 'distract' },
};

// ─────────────────────────────────────────────────────────────
// Sample data — today's sessions + 7-week history
// ─────────────────────────────────────────────────────────────
function makeHistory() {
  // 91 days (13 weeks × 7) of pseudo-random sessions per category
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const seed = (n) => {
    let x = Math.sin(n) * 10000;
    return x - Math.floor(x);
  };
  for (let i = 90; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const sessions = {};
    Object.keys(CATS).forEach((k, idx) => {
      const r = seed(i * 13 + idx * 7);
      // sparser on weekends, more activity in recent weeks
      const weekend = d.getDay() === 0 || d.getDay() === 6;
      const recency = 1 - i / 120;
      let p = (CATS[k].kind === 'work' ? 0.55 : 0.35) * recency;
      if (weekend && CATS[k].kind === 'work') p *= 0.4;
      if (r < p) {
        // minutes 5–120
        sessions[k] = Math.round(5 + seed(i * 31 + idx) * 115);
      }
    });
    days.push({ date: d, sessions });
  }
  return days;
}

const HISTORY = makeHistory();

const TODAY_SESSIONS = [
  { id: 1, cat: 'meeting', label: 'Standup',           start: '09:00', mins: 22 },
  { id: 2, cat: 'code',    label: 'API refactor',      start: '09:35', mins: 78 },
  { id: 3, cat: 'social',  label: 'Twitter',           start: '11:02', mins: 14 },
  { id: 4, cat: 'design',  label: 'Onboarding mocks',  start: '11:30', mins: 52 },
  { id: 5, cat: 'video',   label: 'YouTube',           start: '13:10', mins: 23 },
  { id: 6, cat: 'writing', label: 'Spec doc',          start: '14:00', mins: 41 },
  { id: 7, cat: 'code',    label: 'Bug fixes',         start: '15:15', mins: 64 },
  { id: 8, cat: 'reading', label: 'API docs',          start: '16:30', mins: 18 },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
const fmtClock = (sec) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
};
const fmtDur = (mins) => {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
};

// Tiny SF-ish icons
const Icon = {
  play: (c = '#fff', s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M8 5.5v13l11-6.5L8 5.5z" fill={c}/>
    </svg>
  ),
  pause: (c = '#fff', s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="7" y="5" width="3.6" height="14" rx="1.2" fill={c}/>
      <rect x="13.4" y="5" width="3.6" height="14" rx="1.2" fill={c}/>
    </svg>
  ),
  stop: (c = '#fff', s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="6" y="6" width="12" height="12" rx="2" fill={c}/>
    </svg>
  ),
  check: (c = '#fff', s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke={c} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  clock: (c = '#fff', s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8"/>
      <path d="M12 7v5.5l3.5 2" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  chevDown: (c = '#fff', s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  grid: (c = '#fff', s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill={c}/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill={c}/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill={c}/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill={c} opacity="0.4"/>
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────
// Category picker (small horizontal pill list)
// ─────────────────────────────────────────────────────────────
function CategoryPills({ value, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: 8, overflowX: 'auto', padding: '0 24px',
      scrollbarWidth: 'none',
    }}>
      {Object.entries(CATS).map(([key, c]) => {
        const active = value === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              flex: '0 0 auto',
              border: 'none',
              padding: '8px 14px',
              borderRadius: 999,
              fontFamily: TOKENS.font,
              fontSize: 13,
              fontWeight: 590,
              letterSpacing: '-0.08px',
              cursor: 'pointer',
              transition: 'all .2s',
              background: active ? c.color : 'rgba(255,255,255,0.06)',
              color: active ? '#000' : TOKENS.textDim,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
            <span style={{
              width: 6, height: 6, borderRadius: 3,
              background: active ? '#000' : c.color,
            }}/>
            {c.name}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Timer screen
// ─────────────────────────────────────────────────────────────
function TimerScreen({ running, elapsed, onStart, onPause, onStop, category, setCategory, onOpenOverview }) {
  const cat = CATS[category];

  // total today + sessions
  const totalMins = TODAY_SESSIONS.filter(s => CATS[s.cat].kind === 'work').reduce((a, s) => a + s.mins, 0)
                  + Math.floor(elapsed / 60);
  const distractMins = TODAY_SESSIONS.filter(s => CATS[s.cat].kind === 'distract').reduce((a, s) => a + s.mins, 0);
  const sessionCount = TODAY_SESSIONS.length + (running || elapsed > 0 ? 1 : 0);

  // ring progress (assume 4-hour goal)
  const goalSec = 4 * 3600;
  const todayWorkSec = totalMins * 60;
  const ringPct = Math.min(1, todayWorkSec / goalSec);

  const R = 110;
  const C = 2 * Math.PI * R;

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      paddingTop: 60, color: TOKENS.text, fontFamily: TOKENS.font,
    }}>
      {/* Top bar: brand + overview button */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 24px 0',
      }}>
        <div style={{
          fontFamily: TOKENS.mono, fontSize: 11, letterSpacing: '0.18em',
          color: TOKENS.textDim, fontWeight: 500,
        }}>LAZEELOG</div>
        <button
          onClick={onOpenOverview}
          style={{
            border: 'none', background: 'rgba(255,255,255,0.06)',
            width: 34, height: 34, borderRadius: 17,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
          {Icon.grid(TOKENS.text, 16)}
        </button>
      </div>

      {/* Timer ring */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <svg width={260} height={260} style={{ position: 'absolute' }}>
          {/* track */}
          <circle cx={130} cy={130} r={R} fill="none"
            stroke="rgba(255,255,255,0.06)" strokeWidth="2"/>
          {/* progress (today's total) */}
          <circle cx={130} cy={130} r={R} fill="none"
            stroke={cat.color} strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${C * ringPct} ${C}`}
            transform={`rotate(-90 130 130)`}
            style={{ transition: 'stroke-dasharray .6s ease' }}/>
          {/* running pulse marker */}
          {running && (
            <circle cx={130} cy={130 - R} r={4} fill={cat.color}>
              <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite"/>
            </circle>
          )}
        </svg>

        <div style={{
          textAlign: 'center', position: 'relative',
        }}>
          <div style={{
            fontFamily: TOKENS.mono, fontWeight: 200,
            fontSize: 52, letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
          }}>
            {fmtClock(elapsed)}
          </div>
          <div style={{
            marginTop: 14, fontSize: 13, color: TOKENS.textDim,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 3, background: cat.color,
              animation: running ? 'pulse 1.6s ease-in-out infinite' : 'none',
            }}/>
            {running ? `Tracking · ${cat.name}` : 'Ready'}
          </div>
        </div>
      </div>

      {/* Category pills (only when not running) */}
      <div style={{ marginBottom: 24, opacity: running ? 0.5 : 1, transition: 'opacity .3s' }}>
        <CategoryPills value={category} onChange={running ? () => {} : setCategory}/>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 16,
        padding: '0 24px 28px',
      }}>
        {running ? (
          <>
            <button onClick={onStop} style={ctrlBtnStyle('secondary')}>
              {Icon.stop(TOKENS.text, 18)}
            </button>
            <button onClick={onPause} style={ctrlBtnStyle('primary', cat.color)}>
              {Icon.pause('#000', 26)}
            </button>
          </>
        ) : (
          <button onClick={onStart} style={ctrlBtnStyle('primary', cat.color)}>
            {Icon.play('#000', 28)}
          </button>
        )}
      </div>

      {/* Today summary strip */}
      <div style={{
        display: 'flex', gap: 10, padding: '0 24px 16px',
      }}>
        <Stat label="Focused"      value={fmtDur(totalMins)}    color={TOKENS.text}/>
        <Stat label="Distracted"   value={fmtDur(distractMins)} color={CATS.social.color}/>
        <Stat label="Sessions"     value={String(sessionCount)} color={TOKENS.text}/>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.45; transform: scale(0.6); }
        }
      `}</style>
    </div>
  );
}

function ctrlBtnStyle(variant, color) {
  if (variant === 'primary') {
    return {
      width: 72, height: 72, borderRadius: 36, border: 'none',
      background: color || '#fff', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 12px 30px ${color}55, 0 0 0 1px ${color}33`,
      transition: 'transform .15s',
    };
  }
  return {
    width: 56, height: 56, borderRadius: 28, border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(255,255,255,0.04)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: TOKENS.text,
  };
}

function Stat({ label, value, color }) {
  return (
    <div style={{
      flex: 1, padding: '12px 14px',
      background: 'rgba(255,255,255,0.04)',
      borderRadius: 14,
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        fontSize: 11, color: TOKENS.textDim, fontWeight: 500,
        letterSpacing: '-0.05px', marginBottom: 4,
      }}>{label}</div>
      <div style={{
        fontSize: 20, fontWeight: 600, color, letterSpacing: '-0.4px',
        fontVariantNumeric: 'tabular-nums',
      }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// History bottom sheet (drag from bottom)
// ─────────────────────────────────────────────────────────────
function HistorySheet({ open, height, onHeightChange, onClose }) {
  const sheetRef = useRef(null);
  const dragRef = useRef({ startY: 0, startH: 0, dragging: false });

  // device height (we know IOSDevice is 844)
  const DEV_H = 844;
  const PEEK = 120;
  const HALF = 480;
  const FULL = DEV_H - 60;

  const onPointerDown = (e) => {
    dragRef.current = {
      startY: e.clientY ?? e.touches?.[0]?.clientY,
      startH: height,
      dragging: true,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragRef.current.dragging) return;
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    const dy = dragRef.current.startY - y;
    const next = Math.max(PEEK, Math.min(FULL, dragRef.current.startH + dy));
    onHeightChange(next);
  };
  const onPointerUp = () => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    // snap
    const h = height;
    const closer = [PEEK, HALF, FULL].reduce((a, b) =>
      Math.abs(b - h) < Math.abs(a - h) ? b : a
    );
    onHeightChange(closer);
  };

  // group sessions by hour for timeline view
  const sessions = TODAY_SESSIONS;
  const totalToday = sessions.reduce((a, s) => a + s.mins, 0);

  return (
    <div
      ref={sheetRef}
      style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        height,
        background: 'rgba(20,20,22,0.92)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 -20px 60px rgba(0,0,0,0.5)',
        transition: dragRef.current.dragging ? 'none' : 'height .35s cubic-bezier(.32,.72,.16,1)',
        zIndex: 30,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
      {/* Drag handle area */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          padding: '10px 0 6px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          touchAction: 'none', cursor: 'grab',
          flexShrink: 0,
        }}>
        <div style={{
          width: 36, height: 5, borderRadius: 3,
          background: 'rgba(255,255,255,0.3)',
        }}/>
      </div>

      {/* Header */}
      <div style={{
        padding: '6px 24px 14px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        flexShrink: 0,
      }}>
        <div>
          <div style={{
            fontSize: 22, fontWeight: 700, color: TOKENS.text,
            letterSpacing: '-0.5px',
          }}>Today</div>
          <div style={{
            fontSize: 13, color: TOKENS.textDim, marginTop: 2,
          }}>{sessions.length} sessions · {fmtDur(totalToday)}</div>
        </div>
        <div style={{
          fontFamily: TOKENS.mono, fontSize: 11, color: TOKENS.textFaint,
          letterSpacing: '0.1em',
        }}>APR 27</div>
      </div>

      {/* Stacked bar */}
      <div style={{ padding: '0 24px 16px', flexShrink: 0 }}>
        <StackedBar sessions={sessions}/>
      </div>

      {/* Session list */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '0 16px 80px',
        WebkitOverflowScrolling: 'touch',
      }}>
        {sessions.slice().reverse().map((s) => (
          <SessionRow key={s.id} session={s}/>
        ))}
      </div>
    </div>
  );
}

function StackedBar({ sessions }) {
  const total = sessions.reduce((a, s) => a + s.mins, 0);
  return (
    <div style={{
      height: 8, borderRadius: 4, overflow: 'hidden',
      background: 'rgba(255,255,255,0.05)',
      display: 'flex', gap: 1,
    }}>
      {sessions.map((s) => (
        <div key={s.id} style={{
          width: `${(s.mins / total) * 100}%`,
          background: CATS[s.cat].color,
        }}/>
      ))}
    </div>
  );
}

function SessionRow({ session }) {
  const c = CATS[session.cat];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 12px',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: `${c.color}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: 4, background: c.color,
        }}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 15, fontWeight: 590, color: TOKENS.text,
          letterSpacing: '-0.2px',
        }}>{session.label}</div>
        <div style={{
          fontSize: 12, color: TOKENS.textDim, marginTop: 1,
        }}>{c.name} · {session.start}</div>
      </div>
      <div style={{
        fontFamily: TOKENS.mono, fontSize: 14, fontWeight: 500,
        color: TOKENS.text, fontVariantNumeric: 'tabular-nums',
      }}>{fmtDur(session.mins)}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Overview screen (Habit / GitHub-grass style with category colors)
// ─────────────────────────────────────────────────────────────
function OverviewScreen({ onBack }) {
  const [selectedCat, setSelectedCat] = useState('all');

  // Compute totals per day for the selected category (or all work cats)
  const dayTotals = HISTORY.map((d) => {
    if (selectedCat === 'all') {
      // sum of work categories only
      let total = 0;
      const breakdown = {};
      Object.entries(d.sessions).forEach(([k, m]) => {
        if (CATS[k].kind === 'work') total += m;
        breakdown[k] = m;
      });
      return { ...d, total, breakdown };
    }
    const m = d.sessions[selectedCat] || 0;
    return { ...d, total: m, breakdown: { [selectedCat]: m } };
  });

  // Stats
  const total7  = dayTotals.slice(-7).reduce((a, d) => a + d.total, 0);
  const total30 = dayTotals.slice(-30).reduce((a, d) => a + d.total, 0);
  const streak = (() => {
    let s = 0;
    for (let i = dayTotals.length - 1; i >= 0; i--) {
      if (dayTotals[i].total > 0) s++;
      else break;
    }
    return s;
  })();

  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      background: TOKENS.bg, color: TOKENS.text, fontFamily: TOKENS.font,
      paddingTop: 60,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 24px 16px',
      }}>
        <div>
          <div style={{
            fontFamily: TOKENS.mono, fontSize: 11, letterSpacing: '0.18em',
            color: TOKENS.textDim, fontWeight: 500,
          }}>OVERVIEW</div>
          <div style={{
            fontSize: 28, fontWeight: 700, letterSpacing: '-0.7px',
            marginTop: 2,
          }}>Last 13 weeks</div>
        </div>
        <button
          onClick={onBack}
          style={{
            border: 'none', background: 'rgba(255,255,255,0.06)',
            width: 34, height: 34, borderRadius: 17, cursor: 'pointer',
            color: TOKENS.text,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          {Icon.chevDown(TOKENS.text, 16)}
        </button>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex', gap: 10, padding: '0 24px 20px',
      }}>
        <Stat label="7-day"   value={fmtDur(total7)} color={TOKENS.text}/>
        <Stat label="30-day"  value={fmtDur(total30)} color={TOKENS.text}/>
        <Stat label="Streak"  value={`${streak}d`} color="#30D158"/>
      </div>

      {/* Filter pills */}
      <div style={{ marginBottom: 18 }}>
        <div style={{
          display: 'flex', gap: 8, overflowX: 'auto', padding: '0 24px',
          scrollbarWidth: 'none',
        }}>
          <FilterPill active={selectedCat === 'all'} onClick={() => setSelectedCat('all')}>
            All work
          </FilterPill>
          {Object.entries(CATS).filter(([, c]) => c.kind === 'work').map(([k, c]) => (
            <FilterPill key={k} active={selectedCat === k} color={c.color} onClick={() => setSelectedCat(k)}>
              {c.name}
            </FilterPill>
          ))}
        </div>
      </div>

      {/* Grass grid */}
      <div style={{ padding: '0 24px 24px' }}>
        <GrassGrid days={dayTotals} selectedCat={selectedCat}/>
      </div>

      {/* Category breakdown bars */}
      <div style={{ padding: '0 24px 40px' }}>
        <div style={{
          fontSize: 13, fontWeight: 590, color: TOKENS.textDim,
          marginBottom: 14, letterSpacing: '-0.1px',
        }}>This week</div>
        <CategoryBreakdown days={HISTORY.slice(-7)}/>
      </div>
    </div>
  );
}

function FilterPill({ active, color = TOKENS.text, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: '0 0 auto', border: 'none',
        padding: '7px 13px', borderRadius: 999,
        fontFamily: TOKENS.font, fontSize: 13, fontWeight: 590,
        cursor: 'pointer', transition: 'all .2s',
        background: active ? color : 'rgba(255,255,255,0.06)',
        color: active ? '#000' : TOKENS.textDim,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
      {children}
    </button>
  );
}

function GrassGrid({ days, selectedCat }) {
  // 13 weeks × 7 days. Days array is 91 long, oldest first.
  // We render columns = weeks, rows = day-of-week.
  // For colored cells in 'all' mode, blend the dominant category's color.
  const weeks = [];
  for (let w = 0; w < 13; w++) {
    weeks.push(days.slice(w * 7, w * 7 + 7));
  }

  const maxMins = Math.max(...days.map((d) => d.total), 60);

  const cellFor = (d) => {
    if (!d) return null;
    if (d.total === 0) {
      return { bg: 'rgba(255,255,255,0.04)', label: '0m' };
    }
    // Pick dominant cat
    let domCat = selectedCat === 'all'
      ? Object.entries(d.breakdown).filter(([k]) => CATS[k]?.kind === 'work')
          .sort((a, b) => b[1] - a[1])[0]?.[0]
      : selectedCat;
    if (!domCat) return { bg: 'rgba(255,255,255,0.04)', label: '0m' };
    const intensity = Math.min(1, d.total / maxMins);
    // 4-step intensity like GitHub
    const opacity = intensity < 0.25 ? 0.25
                  : intensity < 0.5  ? 0.45
                  : intensity < 0.75 ? 0.7
                  : 1;
    return {
      bg: hexA(CATS[domCat].color, opacity),
      label: `${fmtDur(d.total)}`,
    };
  };

  const dayLabels = ['', 'M', '', 'W', '', 'F', ''];

  return (
    <div>
      <div style={{ display: 'flex', gap: 6 }}>
        {/* day-of-week labels */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 5,
          paddingTop: 18,
        }}>
          {dayLabels.map((l, i) => (
            <div key={i} style={{
              height: 22, fontSize: 9, color: TOKENS.textFaint,
              fontFamily: TOKENS.mono, lineHeight: '22px',
              fontWeight: 500,
            }}>{l}</div>
          ))}
        </div>
        {/* weeks */}
        <div style={{ flex: 1, overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div style={{ display: 'flex', gap: 5, minWidth: 'fit-content' }}>
            {weeks.map((wk, wi) => {
              const isMonthStart = wk[0] && wk[0].date.getDate() <= 7;
              return (
                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <div style={{
                    height: 14, fontSize: 9, color: TOKENS.textFaint,
                    fontFamily: TOKENS.mono, fontWeight: 500,
                  }}>
                    {isMonthStart && wk[0]
                      ? wk[0].date.toLocaleDateString('en', { month: 'short' }).toUpperCase()
                      : ''}
                  </div>
                  {wk.map((d, di) => {
                    const c = cellFor(d);
                    if (!c) return <div key={di} style={{ width: 22, height: 22 }}/>;
                    return (
                      <div
                        key={di}
                        title={`${d.date.toLocaleDateString()}: ${c.label}`}
                        style={{
                          width: 22, height: 22, borderRadius: 5,
                          background: c.bg,
                          border: '0.5px solid rgba(255,255,255,0.04)',
                        }}/>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end',
        marginTop: 12, fontSize: 10, color: TOKENS.textFaint,
        fontFamily: TOKENS.mono, fontWeight: 500,
      }}>
        Less
        <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(255,255,255,0.04)' }}/>
        <div style={{ width: 12, height: 12, borderRadius: 3, background: hexA(selectedCat === 'all' ? '#30D158' : CATS[selectedCat]?.color || '#30D158', 0.25) }}/>
        <div style={{ width: 12, height: 12, borderRadius: 3, background: hexA(selectedCat === 'all' ? '#30D158' : CATS[selectedCat]?.color || '#30D158', 0.5) }}/>
        <div style={{ width: 12, height: 12, borderRadius: 3, background: hexA(selectedCat === 'all' ? '#30D158' : CATS[selectedCat]?.color || '#30D158', 0.75) }}/>
        <div style={{ width: 12, height: 12, borderRadius: 3, background: hexA(selectedCat === 'all' ? '#30D158' : CATS[selectedCat]?.color || '#30D158', 1) }}/>
        More
      </div>
    </div>
  );
}

function CategoryBreakdown({ days }) {
  // Aggregate minutes per category over the given days
  const totals = {};
  Object.keys(CATS).forEach((k) => totals[k] = 0);
  days.forEach((d) => {
    Object.entries(d.sessions).forEach(([k, m]) => totals[k] += m);
  });
  const grandTotal = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
  const entries = Object.entries(totals)
    .filter(([, m]) => m > 0)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {entries.map(([k, m]) => {
        const c = CATS[k];
        const pct = (m / grandTotal) * 100;
        return (
          <div key={k}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 13, marginBottom: 6,
            }}>
              <span style={{
                color: TOKENS.text, fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: 4, background: c.color,
                }}/>
                {c.name}
                {c.kind === 'distract' && (
                  <span style={{
                    fontSize: 10, padding: '2px 6px', borderRadius: 4,
                    background: 'rgba(255,69,58,0.15)', color: '#FF6961',
                    fontWeight: 590,
                  }}>distract</span>
                )}
              </span>
              <span style={{
                fontFamily: TOKENS.mono, color: TOKENS.textDim,
                fontVariantNumeric: 'tabular-nums',
              }}>{fmtDur(m)}</span>
            </div>
            <div style={{
              height: 6, borderRadius: 3,
              background: 'rgba(255,255,255,0.05)',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${pct}%`, height: '100%',
                background: c.color,
                borderRadius: 3,
                transition: 'width .6s',
              }}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// hex + alpha helper
function hexA(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ─────────────────────────────────────────────────────────────
// Root app
// ─────────────────────────────────────────────────────────────
function LazeeLogApp({ initialView = 'timer', initialRunning = false, initialElapsed = 0, sheetHeight: initSheet = 0 }) {
  const [view, setView] = useState(initialView); // 'timer' | 'overview'
  const [running, setRunning] = useState(initialRunning);
  const [elapsed, setElapsed] = useState(initialElapsed);
  const [category, setCategory] = useState('code');
  const [sheetHeight, setSheetHeight] = useState(initSheet); // 0 closed, 120 peek, 480 half, 800ish full

  // tick
  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(i);
  }, [running]);

  const onStart = () => setRunning(true);
  const onPause = () => setRunning(false);
  const onStop = () => { setRunning(false); setElapsed(0); };

  // Allow swipe-up gesture from timer screen bottom edge to open history
  const startTouch = useRef(null);
  const onTouchStart = (e) => {
    const t = e.touches[0];
    if (t.clientY > 700) startTouch.current = { y: t.clientY };
  };
  const onTouchMove = (e) => {
    if (!startTouch.current) return;
    const t = e.touches[0];
    const dy = startTouch.current.y - t.clientY;
    if (dy > 0) setSheetHeight(Math.min(800, dy + 60));
  };
  const onTouchEnd = () => {
    if (!startTouch.current) return;
    startTouch.current = null;
    if (sheetHeight > 240) setSheetHeight(480);
    else if (sheetHeight > 60) setSheetHeight(120);
    else setSheetHeight(0);
  };

  return (
    <div
      style={{ position: 'relative', height: '100%', overflow: 'hidden', background: TOKENS.bg }}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {view === 'timer' ? (
        <TimerScreen
          running={running} elapsed={elapsed}
          onStart={onStart} onPause={onPause} onStop={onStop}
          category={category} setCategory={setCategory}
          onOpenOverview={() => setView('overview')}
        />
      ) : (
        <OverviewScreen onBack={() => setView('timer')}/>
      )}

      {/* Edge hint when sheet is closed */}
      {sheetHeight === 0 && view === 'timer' && (
        <button
          onClick={() => setSheetHeight(480)}
          style={{
            position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
            border: 'none', background: 'transparent', cursor: 'pointer',
            color: TOKENS.textFaint, fontSize: 11, fontFamily: TOKENS.mono,
            letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 6,
            zIndex: 5,
          }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          HISTORY
        </button>
      )}

      {sheetHeight > 0 && view === 'timer' && (
        <HistorySheet
          open={true}
          height={sheetHeight}
          onHeightChange={(h) => {
            if (h < 60) setSheetHeight(0);
            else setSheetHeight(h);
          }}
          onClose={() => setSheetHeight(0)}
        />
      )}

      {/* Backdrop tap to dismiss when expanded */}
      {sheetHeight > 200 && (
        <div
          onClick={() => setSheetHeight(0)}
          style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
            zIndex: 25, transition: 'opacity .3s',
          }}/>
      )}
    </div>
  );
}

window.LazeeLogApp = LazeeLogApp;
window.LAZEELOG_TOKENS = TOKENS;
window.LAZEELOG_CATS = CATS;

// ─────────────────────────────────────────────────────────────
// Bootstrap canvas (runs after all other scripts have defined their globals)
// ─────────────────────────────────────────────────────────────
function Phone({ initialView = 'timer', initialRunning = false, initialElapsed = 0, sheetHeight = 0 }) {
  return (
    <IOSDevice width={390} height={844} dark={true}>
      <LazeeLogApp
        initialView={initialView}
        initialRunning={initialRunning}
        initialElapsed={initialElapsed}
        sheetHeight={sheetHeight}/>
    </IOSDevice>
  );
}

function CanvasRoot() {
  return (
    <DesignCanvas title="LazeeLog · Apple-flavored time tracking" subtitle="Dark · SF Pro · category-coded · GitHub-grass overview">
      <DCSection id="flow" title="Core flow" subtitle="Idle → tracking → history sheet">
        <DCArtboard id="idle" label="01 · Idle (ready)" width={390} height={844}>
          <Phone initialView="timer" initialRunning={false} initialElapsed={0} sheetHeight={0}/>
        </DCArtboard>
        <DCArtboard id="running" label="02 · Tracking" width={390} height={844}>
          <Phone initialView="timer" initialRunning={true} initialElapsed={1842} sheetHeight={0}/>
        </DCArtboard>
        <DCArtboard id="peek" label="03 · History · peek" width={390} height={844}>
          <Phone initialView="timer" initialRunning={false} initialElapsed={0} sheetHeight={140}/>
        </DCArtboard>
        <DCArtboard id="half" label="04 · History · half" width={390} height={844}>
          <Phone initialView="timer" initialRunning={false} initialElapsed={0} sheetHeight={480}/>
        </DCArtboard>
        <DCArtboard id="full" label="05 · History · full" width={390} height={844}>
          <Phone initialView="timer" initialRunning={false} initialElapsed={0} sheetHeight={780}/>
        </DCArtboard>
      </DCSection>

      <DCSection id="overview" title="Overview · Habit-style dashboard" subtitle="GitHub-grass with per-category color coding">
        <DCArtboard id="overview-all" label="06 · All work" width={390} height={844}>
          <Phone initialView="overview"/>
        </DCArtboard>
      </DCSection>

      <DCSection id="live" title="Live prototype" subtitle="Tap play. Drag handle up. Try the grid icon. Pick a category.">
        <DCArtboard id="live-app" label="Try it" width={390} height={844}>
          <Phone initialView="timer"/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CanvasRoot/>);
