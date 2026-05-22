/* global React, Icon, MAKMAI_DATA */

/* ------------------------------------------------------------- ProductCard */
function ProductCard({ p, lang, onAdd, onFav, faved }) {
  const [hovered, setHovered] = React.useState(false);
  const [g1, g2] = window.MAKMAI_DATA.HUE_GRADIENTS[p.hue] || ["#ccc", "#888"];
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 18, overflow: "hidden",
        boxShadow: hovered
          ? "0 16px 36px rgb(64 40 16 / 0.10), 0 4px 10px rgb(64 40 16 / 0.05)"
          : "0 2px 6px rgb(64 40 16 / 0.06), 0 1px 2px rgb(64 40 16 / 0.04)",
        border: "1px solid rgba(0,0,0,0.02)",
        display: "flex", flexDirection: "column",
        transform: hovered ? "translateY(-2px)" : "none",
        transition: "all 220ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
      <div style={{
        aspectRatio: "4/3", position: "relative",
        background: p.image ? "var(--cream-100)" : `linear-gradient(135deg, ${g1} 0%, ${g2} 70%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)",
        fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
        overflow: "hidden",
      }}>
        {p.image
          ? <img src={p.image} alt={p.en}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                       objectFit: "cover", display: "block" }} />
          : `photo · ${p.en.toLowerCase()}`
        }
        {p.badge && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            padding: "4px 10px", borderRadius: 999,
            background: p.badge.startsWith("-") ? "var(--berry-500)" :
                        p.badge === "NEW" ? "var(--forest-500)" : "var(--bark-500)",
            color: "#fff", fontFamily: "var(--font-display)",
            fontWeight: 700, fontSize: 10, letterSpacing: "0.04em",
          }}>{p.badge}</span>
        )}
        <button onClick={() => onFav(p.id)}
          style={{
            position: "absolute", top: 10, right: 10,
            width: 30, height: 30, borderRadius: 999,
            background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: faved ? "var(--berry-500)" : "var(--ink-700)",
          }}>
          <Icon name="heart" size={16} strokeWidth={faved ? 0 : 1.6}
                style={{ fill: faved ? "currentColor" : "none" }} />
        </button>
      </div>
      <div style={{ padding: "14px 14px 16px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--forest-500)",
        }}>{p.cat === "juice" ? "COLD-PRESSED" : p.cat === "smoothie" ? "SMOOTHIE" :
            p.cat === "salad" ? "SALAD" : p.cat === "protein" ? "PROTEIN" : "SHOT"}</span>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16,
          color: "var(--ink-900)", lineHeight: 1.2,
        }}>{lang === "th" ? p.th : p.en}</span>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-600)", lineHeight: 1.45,
        }}>{lang === "th" ? p.desc_th : p.desc_en}</span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
          <div>
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20,
              color: "var(--forest-500)", fontVariantNumeric: "tabular-nums",
            }}>฿{p.price}</span>
            {p.originalPrice && (
              <span style={{
                fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 13,
                color: "var(--ink-600)", textDecoration: "line-through", marginLeft: 6,
              }}>฿{p.originalPrice}</span>
            )}
          </div>
          <button onClick={() => onAdd(p)}
            style={{
              width: 36, height: 36, borderRadius: 999,
              background: "var(--forest-500)", color: "#fff", border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 6px rgb(0 36 16 / 0.25)",
              transition: "all 140ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}>
            <Icon name="plus" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- ProductGrid */
function ProductGrid({ products, lang, onAdd, favs, onFav }) {
  return (
    <div style={{
      display: "grid", gap: 18,
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    }}>
      {products.map(p => (
        <ProductCard key={p.id} p={p} lang={lang} onAdd={onAdd}
                     faved={favs.has(p.id)} onFav={onFav} />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------- CategoryChips */
function CategoryChips({ categories, active, onChange, lang }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {categories.map(c => {
        const isActive = c.id === active;
        return (
          <button key={c.id} onClick={() => onChange(c.id)}
            style={{
              padding: "9px 16px", borderRadius: 999,
              fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
              cursor: "pointer",
              background: isActive ? "var(--forest-500)" : "var(--cream-100)",
              color: isActive ? "#fff" : "var(--ink-800)",
              border: isActive ? "1px solid var(--forest-500)" : "1px solid var(--cream-300)",
              transition: "all 140ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}>
            {lang === "th" ? c.th : c.en}
          </button>
        );
      })}
    </div>
  );
}

window.ProductCard = ProductCard;
window.ProductGrid = ProductGrid;
window.CategoryChips = CategoryChips;
