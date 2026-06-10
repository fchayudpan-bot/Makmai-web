/* global React, ReactDOM, Header, Hero, ProductGrid, CategoryChips, BranchModal,
   CartDrawer, CheckoutSheet, Confirmation, AuthModal, Footer, UpsellStrip, MAKMAI_DATA */

const useState  = React.useState;
const useMemo   = React.useMemo;
const useEffect = React.useEffect;
const BRANCHES   = window.MAKMAI_DATA.BRANCHES;
const CATEGORIES = window.MAKMAI_DATA.CATEGORIES;
const PRODUCTS   = window.MAKMAI_DATA.PRODUCTS;

function App() {
  const [lang,     setLang]     = useState("th");
  const [branch,   setBranch]   = useState(BRANCHES[0]);
  const [category, setCategory] = useState("all");
  const [cart,     setCart]     = useState([]);
  const [favs,     setFavs]     = useState(new Set());
  const [user,     setUser]     = useState(null);
  const [toast,    setToast]    = useState(null);

  // ── view flags ──────────────────────────────────────────────────────
  // branch modal may be opened from header OR from within checkout.
  // We never close checkout when opening branch from within it —
  // both can be true simultaneously; BranchModal renders last so it sits on top.
  const [view, setView] = useState({
    branch:   false,
    cart:     false,
    checkout: false,
    success:  false,
    auth:     false,
    branchFromCheckout: false,   // flag: branch modal was triggered from checkout
  });

  // ── derived ─────────────────────────────────────────────────────────
  const filtered  = useMemo(() =>
    category === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === category),
    [category]);

  const featured = useMemo(() => PRODUCTS.filter(p => p.featured), []);

  // Upsell — salads / protein / shots when cart has juices/smoothies
  const upsell = useMemo(() => {
    const inCartIds = new Set(cart.map(c => c.id));
    const has = cats => cart.some(c => cats.includes(c.cat));
    let pool = [];
    if (has(["juice", "smoothie", "tea", "coffee"])) pool = PRODUCTS.filter(p => ["meal","hpns","fruit"].includes(p.cat));
    else if (cart.length > 0) pool = PRODUCTS.filter(p => ["juice","smoothie","tea"].includes(p.cat));
    return pool.filter(p => !inCartIds.has(p.id)).slice(0, 5);
  }, [cart]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // ── toast helper ─────────────────────────────────────────────────────
  function showToast(msg, kind = "success") {
    setToast({ msg, kind });
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(null), 2200);
  }

  // ── cart actions ─────────────────────────────────────────────────────
  function addToCart(p) {
    setCart(cur => {
      const existing = cur.find(i => i.id === p.id);
      if (existing) return cur.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...cur, { ...p, qty: 1 }];
    });
    showToast(lang === "th" ? "🌱 เพิ่มในตะกร้าแล้ว" : "🌱 Added to bag");
    setView(v => ({ ...v, cart: true }));
  }
  function removeOne(id) {
    setCart(cur => cur.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0));
  }
  function toggleFav(id) {
    setFavs(cur => {
      const next = new Set(cur);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // ── checkout flow ────────────────────────────────────────────────────
  const proceedToCheckout = () => setView(v => ({ ...v, cart: false, checkout: true }));
  const confirmOrder      = () => setView(v => ({ ...v, checkout: false, success: true }));
  const finishOrder       = () => {
    setCart([]);
    setView({ branch: false, cart: false, checkout: false, success: false, auth: false, branchFromCheckout: false });
  };

  // Change branch from within CheckoutSheet:
  // Keep checkout open, open BranchModal on top (BranchModal renders last in JSX → higher stack)
  const changeBranchFromCheckout = () =>
    setView(v => ({ ...v, branch: true, branchFromCheckout: true }));

  const handleBranchChange = (b) => {
    setBranch(b);
    setView(v => ({ ...v, branch: false, branchFromCheckout: false }));
    if (view.branchFromCheckout) {
      showToast(lang === "th" ? `เปลี่ยนเป็น ${b.name_th} แล้ว` : `Switched to ${b.name_en}`);
    }
  };
  const closeBranchModal = () =>
    setView(v => ({ ...v, branch: false, branchFromCheckout: false }));

  // ── auth ─────────────────────────────────────────────────────────────
  const handleAuthSuccess = (u) => {
    setUser(u);
    setView(v => ({ ...v, auth: false }));
    showToast(lang === "th" ? `ยินดีต้อนรับ ${u.name} 🌱` : `Welcome back, ${u.name} 🌱`);
  };
  const handleLogout = () => {
    setUser(null);
    showToast(lang === "th" ? "ออกจากระบบแล้ว" : "Signed out");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream-50)" }}>
      <Header
        branch={branch}
        cartCount={cartCount}
        onOpenBranch={() => setView(v => ({ ...v, branch: true }))}
        onOpenCart={() => setView(v => ({ ...v, cart: true }))}
        lang={lang}
        onToggleLang={() => setLang(l => l === "th" ? "en" : "th")}
        user={user}
        onOpenAuth={() => setView(v => ({ ...v, auth: true }))}
        onLogout={handleLogout}
      />

      <main className="mm-main" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <Hero lang={lang} onShopNow={() => {
          document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" });
        }} />

        {/* Featured row */}
        <section className="mm-featured-section" style={{ margin: "16px 0 8px" }}>
          <div className="mm-section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
            <div>
              <div style={{
                fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--forest-500)",
              }}>{lang === "th" ? "ซิกเนเจอร์ · เมนูแนะนำ" : "Signature · Bestsellers"}</div>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32,
                color: "var(--ink-900)", margin: "4px 0 0", letterSpacing: "-0.015em",
              }}>{lang === "th" ? "แก้วโปรดของลูกค้า" : "What our regulars love"}</h2>
            </div>
            <a href="#" style={{
              fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600,
              color: "var(--forest-500)", textDecoration: "none",
            }}>{lang === "th" ? "ดูทั้งหมด →" : "See all →"}</a>
          </div>
          <ProductGrid products={featured} lang={lang} onAdd={addToCart}
                       favs={favs} onFav={toggleFav} />
        </section>

        {/* Full menu */}
        <section id="menu-section" className="mm-menu-section" style={{ marginTop: 48 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--forest-500)",
            }}>{lang === "th" ? "เมนูทั้งหมด · ▲ · ▲" : "Full menu · ▲ · ▲"}</div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32,
              color: "var(--ink-900)", margin: "4px 0 0", letterSpacing: "-0.015em",
            }}>{lang === "th" ? "เลือกตามใจชอบ" : "Pick your daily order"}</h2>
          </div>
          <div style={{ marginBottom: 20 }}>
            <CategoryChips categories={CATEGORIES} active={category}
                           onChange={setCategory} lang={lang} />
          </div>
          <ProductGrid products={filtered} lang={lang} onAdd={addToCart}
                       favs={favs} onFav={toggleFav} />
        </section>

        {/* Why Makmai strip */}
        <section className="mm-why-strip" style={{
          margin: "64px 0 16px", padding: "40px 36px", borderRadius: 24,
          background: "var(--forest-500)", color: "#fff",
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 28,
        }}>
          {[
            { th: "สดใหม่ทุกวัน",  en: "Daily-fresh",       desc_th: "ผลิตวันต่อวัน",          desc_en: "Pressed daily, never bulked" },
            { th: "ไม่ใส่น้ำตาล", en: "Zero added sugar",  desc_th: "หวานจากผลไม้จริง",        desc_en: "Sweetness from fruit only" },
            { th: "ส่งภายในวัน",  en: "Same-day delivery", desc_th: "สั่งก่อน 14:00",          desc_en: "Order by 2pm" },
            { th: "Zero waste",   en: "Zero waste",         desc_th: "ไม่ต้องตุนผลไม้",         desc_en: "No bulk produce going bad" },
          ].map(f => (
            <div key={f.en}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20,
                color: "var(--cream-50)" }}>{lang === "th" ? f.th : f.en}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 13,
                color: "rgba(255,255,255,0.75)", marginTop: 6, lineHeight: 1.5 }}>
                {lang === "th" ? f.desc_th : f.desc_en}
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer lang={lang} />

      {/* ── Overlays (order matters: later = higher in stack at same z-index) ── */}

      {view.cart && (
        <CartDrawer items={cart} onAdd={addToCart} onRemove={removeOne}
                    onCheckout={proceedToCheckout}
                    onClose={() => setView(v => ({ ...v, cart: false }))}
                    lang={lang} upsell={upsell} onAddItem={addToCart} branch={branch} />
      )}

      {view.checkout && (
        <CheckoutSheet items={cart} branch={branch} onConfirm={confirmOrder}
                       onClose={() => setView(v => ({ ...v, checkout: false }))}
                       lang={lang} user={user} onChangeBranch={changeBranchFromCheckout} />
      )}

      {view.success && (
        <Confirmation items={cart} branch={branch} onClose={finishOrder} lang={lang} />
      )}

      {/* BranchModal rendered LAST → always on top of checkout when both are open */}
      {view.branch && (
        <BranchModal branch={branch} onChange={handleBranchChange}
                     onClose={closeBranchModal} lang={lang} />
      )}

      {/* AuthModal: also rendered after checkout so it sits on top */}
      {view.auth && (
        <AuthModal onClose={() => setView(v => ({ ...v, auth: false }))}
                   onSuccess={handleAuthSuccess} lang={lang} />
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          zIndex: 80,
          background: toast.kind === "error" ? "var(--berry-600)" : "var(--forest-700)",
          color: "var(--cream-50)", padding: "12px 18px", borderRadius: 14,
          fontFamily: "var(--font-body)", fontSize: 14,
          boxShadow: "0 12px 30px rgb(0 0 0 / 0.25)",
          animation: "slideUp 240ms cubic-bezier(0.22, 1, 0.36, 1)",
          whiteSpace: "nowrap",
        }}>{toast.msg}</div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
