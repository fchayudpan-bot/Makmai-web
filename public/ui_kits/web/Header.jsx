/* global React, Icon */

function Header({ branch, onOpenBranch, cartCount, onOpenCart, lang, onToggleLang, user, onOpenAuth, onLogout }) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const TH = lang === "th";

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 30,
      background: "rgba(253, 250, 242, 0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--cream-300)",
    }}>
      <div className="mm-header-inner" style={{
        maxWidth: 1280, margin: "0 auto", padding: "12px 24px",
        display: "flex", alignItems: "center", gap: 18,
      }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="../../assets/logo-makmai-full.png" alt="Makmai"
               className="mm-logo"
               style={{ width: 125, height: 125, objectFit: "contain" }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          </div>
        </a>

        {/* Branch pill */}
        <button onClick={onOpenBranch} className="mm-branch-pill" style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "var(--forest-50)", color: "var(--forest-700)",
          border: "1px solid var(--forest-100)", borderRadius: 999,
          padding: "8px 14px", fontFamily: "var(--font-body)", fontSize: 13,
          fontWeight: 600, cursor: "pointer", marginLeft: 6,
        }}>
          <Icon name="pin" size={16} color="var(--forest-500)" />
          <span className="mm-branch-name">{TH ? branch.name_th : branch.name_en}</span>
          <Icon name="chevron-down" size={14} />
        </button>

        {/* Nav */}
        <nav className="mm-nav" style={{ display: "flex", gap: 22, marginLeft: 16 }}>
          {[
            { th: "เมนู", en: "Menu", href: "#menu-section" },
            { th: "ออร์เดอร์", en: "Orders", href: "#" },
            { th: "เกี่ยวกับ", en: "About", href: "#" },
          ].map(it => (
            <a key={it.en} href={it.href} style={{
              fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-800)",
              textDecoration: "none", fontWeight: 500,
            }}>
              {TH ? it.th : it.en}
            </a>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        {/* Search */}
        <button title="Search" className="mm-search-btn" style={iconBtn} onClick={() => setSearchOpen(s => !s)}>
          <Icon name="search" size={18} />
        </button>

        {/* Language toggle */}
        <button title="Language" className="mm-lang-btn" style={iconBtn} onClick={onToggleLang}>
          <Icon name="globe" size={18} />
          <span style={{ fontSize: 11, fontWeight: 600, marginLeft: 4 }}>{TH ? "TH" : "EN"}</span>
        </button>

        {/* User — login or avatar+logout */}
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="mm-user-pill" style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "var(--forest-50)", border: "1px solid var(--forest-100)",
              borderRadius: 999, padding: "6px 12px 6px 8px",
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: 999,
                background: "var(--forest-500)", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12,
                flexShrink: 0,
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="mm-user-name" style={{
                fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
                color: "var(--forest-700)", maxWidth: 90,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {user.name}
              </span>
            </div>
            <button title={TH ? "ออกจากระบบ" : "Sign out"} onClick={onLogout}
              style={{ ...iconBtn, color: "var(--ink-500)" }}>
              <Icon name="log-out" size={17} />
            </button>
          </div>
        ) : (
          <button onClick={onOpenAuth} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "var(--forest-500)", color: "#fff",
            border: "none", borderRadius: 999, cursor: "pointer",
            padding: "8px 16px", fontFamily: "var(--font-display)",
            fontWeight: 600, fontSize: 13,
          }}>
            <Icon name="log-in" size={15} />
            {TH ? "เข้าสู่ระบบ" : "Sign in"}
          </button>
        )}

        {/* Cart */}
        <button title="Cart" onClick={onOpenCart}
          style={{ ...iconBtn, position: "relative", background: "var(--forest-500)", color: "#fff" }}>
          <Icon name="bag" size={18} />
          {cartCount > 0 && (
            <span style={{
              position: "absolute", top: -4, right: -4,
              background: "var(--citrus-400)", color: "#fff",
              borderRadius: 999, minWidth: 18, height: 18, padding: "0 5px",
              fontSize: 10, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "2px solid var(--cream-50)",
            }}>{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

const iconBtn = {
  display: "flex", alignItems: "center", justifyContent: "center",
  width: 38, height: 38, borderRadius: 12, background: "transparent",
  border: "none", color: "var(--ink-800)", cursor: "pointer",
};

window.Header = Header;
