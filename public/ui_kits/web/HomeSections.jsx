/* global React, Icon */

/* -------------------------------------------------------------------- Hero */
function Hero({ lang, onShopNow }) {
  return (
    <section className="mm-hero" style={{
      position: "relative",
      background: "radial-gradient(circle at 80% 20%, var(--cream-200) 0%, var(--cream-50) 60%)",
      borderRadius: 28, overflow: "hidden",
      padding: "64px 56px", margin: "32px 0",
      display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "center",
      border: "1px solid var(--cream-300)",
    }}>
      <div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 12px", borderRadius: 999,
          background: "var(--forest-50)", color: "var(--forest-700)",
          fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase",
          border: "1px solid var(--forest-100)", marginBottom: 18,
        }}>
          <span style={{ color: "var(--forest-500)" }}>▲ · ▲</span>
          {lang === "th" ? "สดจากสวน ทุกวัน" : "Fresh from the grove · Daily"}
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.02,
          color: "var(--ink-900)", letterSpacing: "-0.02em",
          margin: 0, textWrap: "balance",
        }}>
          {lang === "th"
            ? <>กินดี<br/><span style={{ color: "var(--forest-500)" }}>ใช้ชีวิตเบาๆ</span></>
            : <>Eat well,<br/><span style={{ color: "var(--forest-500)" }}>live light.</span></>}
        </h1>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55,
          color: "var(--ink-700)", maxWidth: 440, marginTop: 18,
        }}>
          {lang === "th"
            ? "น้ำผลไม้สกัดเย็น สมูทตี้ และเมนูสุขภาพจากผลไม้สดของอีสาน ส่งตรงถึงคุณวันต่อวัน"
            : "Cold-pressed juices, smoothies, and clean meals from Isan-fresh fruit — delivered daily, never bulk-stocked, never wasted."}
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <button onClick={onShopNow} style={{
            fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15,
            background: "var(--forest-500)", color: "#fff", border: "none",
            padding: "14px 24px", borderRadius: 999, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 10px rgb(0 36 16 / 0.25)",
          }}>
            {lang === "th" ? "สั่งเลย" : "Order now"}
            <Icon name="arrow-right" size={16} />
          </button>
          <button style={{
            fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15,
            background: "transparent", color: "var(--ink-800)",
            border: "1px solid var(--cream-300)", padding: "14px 24px",
            borderRadius: 999, cursor: "pointer",
          }}>
            {lang === "th" ? "ดูเมนูทั้งหมด →" : "Browse menu →"}
          </button>
        </div>
        <div className="mm-hero-badges" style={{
          display: "flex", gap: 24, marginTop: 36,
          fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-700)",
        }}>
          {[
            { ic: "snowflake", th: "สกัดเย็น 100%", en: "100% cold-pressed" },
            { ic: "leaf", th: "ไม่ใส่น้ำตาล", en: "No added sugar" },
            { ic: "clock", th: "ส่งภายใน 24 ชม.", en: "Delivered in 24h" },
          ].map(f => (
            <div key={f.en} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name={f.ic} size={14} color="var(--forest-500)" />
              <span>{lang === "th" ? f.th : f.en}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right visual — hero product photo */}
      <div className="mm-hero-img" style={{ position: "relative", height: 360, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgb(64 40 16 / 0.18)",
        }}>
          <img
            src="../../assets/hero-juice.jpg"
            alt="Makmai cold-pressed juices"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ UpsellStrip */
function UpsellStrip({ items, lang, onAdd }) {
  // Track locally-added IDs so the card vanishes immediately on click
  // (App's upsell pool will also drop it on next render, but this makes it instant)
  const [added, setAdded] = React.useState(() => new Set());

  // Show at most 2 items; exclude ones already added this session
  const visible = items.filter(p => !added.has(p.id)).slice(0, 2);

  if (visible.length === 0) return null;

  function handleAdd(p) {
    setAdded(prev => new Set([...prev, p.id]));
    onAdd(p);
  }

  return (
    <div style={{
      background: "linear-gradient(135deg, var(--citrus-50) 0%, var(--cream-100) 100%)",
      border: "1px solid var(--citrus-100)", borderRadius: 18,
      padding: "14px",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13.5, color: "var(--ink-900)",
        }}>
          <span style={{ color: "var(--citrus-500)" }}>✦ </span>
          {lang === "th" ? "จับคู่กับเมนูนี้" : "Pair with this"}
        </div>
        <div style={{
          fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600,
          color: "var(--citrus-600)", background: "rgba(255,255,255,0.7)",
          border: "1px solid var(--citrus-100)", borderRadius: 999, padding: "2px 8px",
        }}>
          {lang === "th" ? "ประหยัด 5%" : "save 5%"}
        </div>
      </div>

      {/* 2-column card grid — key by id so new card triggers popIn animation */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
        {visible.map(p => {
          const [g1, g2] = window.MAKMAI_DATA.HUE_GRADIENTS[p.hue] || ["#ccc","#888"];
          return (
            <div key={p.id} style={{
              background: "#fff", borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.05)",
              overflow: "hidden",
              display: "flex", flexDirection: "column",
              animation: "popIn 240ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}>
              {/* Product image — 4:3 ratio */}
              <div style={{
                width: "100%", aspectRatio: "4/3", flexShrink: 0,
                background: p.image ? "var(--cream-100)" : `linear-gradient(135deg, ${g1}, ${g2})`,
                overflow: "hidden",
              }}>
                {p.image && (
                  <img src={p.image} alt={p.en}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                )}
              </div>

              {/* Info + add button */}
              <div style={{ padding: "9px 10px 10px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                <div style={{
                  fontFamily: "var(--font-display)", fontWeight: 600,
                  fontSize: 12.5, color: "var(--ink-900)", lineHeight: 1.3,
                  display: "-webkit-box", WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {lang === "th" ? p.th : p.en}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <div style={{
                    fontFamily: "var(--font-display)", fontWeight: 700,
                    fontSize: 13.5, color: "var(--forest-500)", fontVariantNumeric: "tabular-nums",
                  }}>฿{p.price}</div>
                  <button onClick={() => handleAdd(p)} style={{
                    width: 28, height: 28, borderRadius: 999, flexShrink: 0,
                    background: "var(--citrus-400)", color: "#fff", border: "none",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon name="plus" size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Footer */
function Footer({ lang }) {
  return (
    <footer style={{
      background: "var(--bark-500)", color: "var(--cream-100)",
      padding: "48px 0 32px", marginTop: 64, borderRadius: "28px 28px 0 0",
    }}>
      <div className="mm-footer-grid" style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 32px",
        display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 32,
      }}>
        <div className="mm-footer-brand">
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32,
            color: "var(--cream-50)", lineHeight: 1,
          }}>หมากไม้</div>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 12,
            color: "var(--cream-200)", letterSpacing: "0.18em", marginTop: 4,
          }}>MAK-MAI · FRUIT IN ISAN</div>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 13, color: "var(--cream-200)",
            lineHeight: 1.55, marginTop: 18, maxWidth: 280, opacity: 0.85,
          }}>
            {lang === "th"
              ? "น้ำสกัดเย็นและอาหารสุขภาพ จากใจอีสาน ส่งตรงถึงคุณ"
              : "Cold-pressed juices and healthy meals — from the heart of Isan to your day."}
          </p>
        </div>
        {[
          { title: lang === "th" ? "สาขา" : "Branches",
            items: [
              "สาขาขอนแก่น · Khon Kaen",
              { label: "สาขากาฬสินธุ์ · Kalasin", href: "https://maps.app.goo.gl/tsjqyUhKdA6J5gig8" },
            ] },
          { title: lang === "th" ? "เมนู" : "Menu",
            items: [
              { label: lang === "th" ? "น้ำสกัดเย็น" : "Cold-pressed", href: "#menu-section" },
              { label: lang === "th" ? "สมูทตี้"     : "Smoothies",    href: "#menu-section" },
              { label: lang === "th" ? "ชา"           : "Tea",          href: "#menu-section" },
              { label: lang === "th" ? "กาแฟ"         : "Coffee",       href: "#menu-section" },
              { label: lang === "th" ? "ผลไม้"        : "Fruit",        href: "#menu-section" },
              { label: "Meal",                                           href: "#menu-section" },
              { label: "High Protein",                                   href: "#menu-section" },
            ] },
          { title: lang === "th" ? "ติดต่อ" : "Contact",
            items: [
              "makmai.ksn@gmail.com",
              "063-7711370",
              "LINE @makmai",
              { label: "FB · หมากไม้ Makmai cafe", href: "https://www.facebook.com/profile.php?id=61563756485192&mibextid=wwXIfr" },
              { label: "IG · @makmai_cafe", href: "https://www.instagram.com/makmai_cafe?igsh=MjZuaHF3dmNhbzU5&utm_source=qr" },
            ] },
        ].map(col => (
          <div key={col.title}>
            <div style={{
              fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 11,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--cream-200)", marginBottom: 14, opacity: 0.7,
            }}>{col.title}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {col.items.map((it, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--cream-100)", opacity: 0.9 }}>
                  {it && it.href
                    ? <a
                        href={it.href}
                        onClick={it.href.startsWith("#") ? (e) => {
                          e.preventDefault();
                          document.querySelector(it.href)?.scrollIntoView({ behavior: "smooth" });
                        } : undefined}
                        target={it.href.startsWith("http") ? "_blank" : undefined}
                        rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        style={{ color: "var(--cream-100)", textDecoration: "none" }}>
                        {it.label}
                      </a>
                    : (it.label || it)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mm-footer-bottom" style={{
        maxWidth: 1280, margin: "32px auto 0", padding: "20px 32px 0",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        display: "flex", justifyContent: "space-between",
        fontFamily: "var(--font-body)", fontSize: 11, color: "var(--cream-200)", opacity: 0.7,
      }}>
        <span>© 2024 หมากไม้ Makmai. {lang === "th" ? "สงวนลิขสิทธิ์" : "All rights reserved."}</span>
        <span>{lang === "th" ? "นโยบายความเป็นส่วนตัว · เงื่อนไขการใช้งาน" : "Privacy · Terms"}</span>
      </div>
    </footer>
  );
}

window.Hero = Hero;
window.UpsellStrip = UpsellStrip;
window.Footer = Footer;
