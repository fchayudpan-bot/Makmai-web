/* global React, Icon, UpsellStrip, MAKMAI_DATA */
const cc_useState = React.useState;

/* ── Shared input style helper ─────────────────────────────────────── */
function mkInput(err, focused) {
  return {
    width: "100%", padding: "13px 16px",
    fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-900)",
    background: "#fff",
    border: `1.5px solid ${err ? "var(--berry-500)" : focused ? "var(--forest-500)" : "var(--cream-300)"}`,
    borderRadius: 12, outline: "none", boxSizing: "border-box",
    transition: "border-color 140ms, box-shadow 140ms",
    boxShadow: focused ? "0 0 0 3px rgb(0 96 48 / 0.12)"
             : err     ? "0 0 0 3px rgb(179 58 58 / 0.10)"
             : "none",
  };
}

/* ── Scrim ─────────────────────────────────────────────────────────── */
function Scrim({ onClick }) {
  return <div onClick={onClick} style={{
    position: "fixed", inset: 0, background: "rgb(26 24 21 / 0.40)",
    zIndex: 50, animation: "fadeIn 220ms cubic-bezier(0.22, 1, 0.36, 1)",
  }} />;
}

/* ── AuthModal ─────────────────────────────────────────────────────── */
function AuthModal({ onClose, onSuccess, lang }) {
  const [tab, setTab]     = cc_useState("login");
  const [name, setName]   = cc_useState("");
  const [phone, setPhone] = cc_useState("");
  const [email, setEmail] = cc_useState("");
  const [pass, setPass]   = cc_useState("");
  const [conf, setConf]   = cc_useState("");
  const [errors, setErrors]   = cc_useState({});
  const [focused, setFocused] = cc_useState("");

  const TH = lang === "th";

  function switchTab(t) { setTab(t); setErrors({}); }

  function validate() {
    const e = {};
    if (tab === "register" && !name.trim()) e.name = true;
    if (!phone.trim()) e.phone = true;
    if (!pass || pass.length < 6) e.pass = true;
    if (tab === "register" && pass !== conf) e.conf = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSuccess({ name: name || (TH ? "สมาชิก" : "Member"), phone, email });
  }

  const tabList = [
    { id: "login",    th: "เข้าสู่ระบบ",   en: "Sign in" },
    { id: "register", th: "สมัครสมาชิก", en: "Register" },
  ];

  return (
    <>
      <Scrim onClick={onClose} />
      <div className="mm-modal" style={{
        position: "fixed", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
        width: "min(480px,94vw)", background: "var(--cream-50)", borderRadius: 22,
        boxShadow: "0 24px 60px rgb(64 40 16 / 0.22)", zIndex: 60, overflow: "hidden",
        animation: "popIn 240ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        {/* Forest top stripe */}
        <div style={{ height: 4, background: "linear-gradient(90deg,var(--forest-400),var(--forest-600))" }} />

        {/* Header */}
        <div style={{ padding: "22px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--ink-900)", lineHeight: 1 }}>
              {tab === "login" ? (TH ? "เข้าสู่ระบบ" : "Sign in") : (TH ? "สมัครสมาชิก" : "Create account")}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-500)", marginTop: 5, letterSpacing: "0.06em" }}>
              หมากไม้ · Makmai
            </div>
          </div>
          <button onClick={onClose} style={iconCloseBtn}><Icon name="x" size={18} /></button>
        </div>

        {/* Tab switcher */}
        <div style={{ margin: "18px 24px 0", display: "flex",
          background: "var(--cream-100)", borderRadius: 12, padding: 4,
          border: "1px solid var(--cream-300)" }}>
          {tabList.map(t => (
            <button key={t.id} onClick={() => switchTab(t.id)} style={{
              flex: 1, padding: "9px 0",
              fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13,
              borderRadius: 9, border: "none", cursor: "pointer",
              background: tab === t.id ? "#fff" : "transparent",
              color: tab === t.id ? "var(--forest-600)" : "var(--ink-500)",
              boxShadow: tab === t.id ? "0 1px 4px rgb(64 40 16 / 0.10)" : "none",
              transition: "all 160ms",
            }}>
              {TH ? t.th : t.en}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Name — register only */}
          {tab === "register" && (
            <div>
              <label style={fldLbl}>{TH ? "ชื่อ-นามสกุล" : "Full name"}</label>
              <input placeholder={TH ? "ชื่อของคุณ" : "Your name"} value={name}
                onChange={e => { setName(e.target.value); setErrors(ev => ({...ev, name: false})); }}
                onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                style={mkInput(errors.name, focused === "name")} />
              {errors.name && <div style={errTxt}>⚠ {TH ? "กรุณากรอกชื่อ" : "Name is required"}</div>}
            </div>
          )}

          {/* Phone */}
          <div>
            <label style={fldLbl}>{TH ? "เบอร์โทรศัพท์" : "Phone number"}</label>
            <input placeholder="08X-XXX-XXXX" value={phone} type="tel"
              onChange={e => { setPhone(e.target.value); setErrors(ev => ({...ev, phone: false})); }}
              onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
              style={mkInput(errors.phone, focused === "phone")} />
            {errors.phone && <div style={errTxt}>⚠ {TH ? "กรุณากรอกเบอร์โทร" : "Phone is required"}</div>}
          </div>

          {/* Email — optional */}
          <div>
            <label style={fldLbl}>
              {TH ? "อีเมล" : "Email"}
              <span style={{ color: "var(--ink-400)", fontWeight: 400, marginLeft: 6 }}>
                {TH ? "(ไม่บังคับ)" : "(optional)"}
              </span>
            </label>
            <input placeholder="you@email.com" value={email} type="email"
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
              style={mkInput(false, focused === "email")} />
          </div>

          {/* Password */}
          <div>
            <label style={fldLbl}>{TH ? "รหัสผ่าน" : "Password"}</label>
            <input placeholder={TH ? "อย่างน้อย 6 ตัวอักษร" : "At least 6 characters"} value={pass} type="password"
              onChange={e => { setPass(e.target.value); setErrors(ev => ({...ev, pass: false})); }}
              onFocus={() => setFocused("pass")} onBlur={() => setFocused("")}
              style={mkInput(errors.pass, focused === "pass")} />
            {errors.pass && <div style={errTxt}>⚠ {TH ? "รหัสผ่านอย่างน้อย 6 ตัวอักษร" : "Min 6 characters"}</div>}
          </div>

          {/* Confirm password — register only */}
          {tab === "register" && (
            <div>
              <label style={fldLbl}>{TH ? "ยืนยันรหัสผ่าน" : "Confirm password"}</label>
              <input placeholder={TH ? "กรอกซ้ำอีกครั้ง" : "Repeat password"} value={conf} type="password"
                onChange={e => { setConf(e.target.value); setErrors(ev => ({...ev, conf: false})); }}
                onFocus={() => setFocused("conf")} onBlur={() => setFocused("")}
                style={mkInput(errors.conf, focused === "conf")} />
              {errors.conf && <div style={errTxt}>⚠ {TH ? "รหัสผ่านไม่ตรงกัน" : "Passwords don't match"}</div>}
            </div>
          )}

          {/* Submit */}
          <button onClick={handleSubmit} style={{
            width: "100%", padding: "14px 18px", marginTop: 2,
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
            background: "var(--forest-500)", color: "#fff", border: "none",
            borderRadius: 999, cursor: "pointer", boxShadow: "0 6px 14px rgb(0 36 16 / 0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            {tab === "login" ? (TH ? "เข้าสู่ระบบ" : "Sign in") : (TH ? "สมัครสมาชิก" : "Create account")}
            <Icon name="arrow-right" size={16} />
          </button>

          {/* Switch tab link */}
          <div style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--ink-600)" }}>
            {tab === "login"
              ? <>{TH ? "ยังไม่มีบัญชี? " : "No account? "}
                  <button onClick={() => switchTab("register")} style={switchTabBtn}>
                    {TH ? "สมัครสมาชิกเลย" : "Register here"}
                  </button></>
              : <>{TH ? "มีบัญชีแล้ว? " : "Already have one? "}
                  <button onClick={() => switchTab("login")} style={switchTabBtn}>
                    {TH ? "เข้าสู่ระบบ" : "Sign in"}
                  </button></>
            }
          </div>
        </div>
      </div>
    </>
  );
}

/* ── BranchModal ───────────────────────────────────────────────────── */
function BranchModal({ branch, onChange, onClose, lang }) {
  return (
    <>
      <Scrim onClick={onClose} />
      <div className="mm-modal" style={{
        position: "fixed", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
        width: "min(560px,92vw)", background: "var(--cream-50)", borderRadius: 22,
        boxShadow: "0 24px 60px rgb(64 40 16 / 0.20)", zIndex: 60, padding: 24,
        animation: "popIn 240ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--ink-900)", margin: 0 }}>
              {lang === "th" ? "เลือกสาขา" : "Choose your branch"}
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-600)", marginTop: 4, marginBottom: 0 }}>
              {lang === "th" ? "เลือกสาขาที่สะดวกในการรับสินค้า" : "Pick where you'd like to pick up or deliver from."}
            </p>
          </div>
          <button onClick={onClose} style={iconCloseBtn}><Icon name="x" size={18} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          {window.MAKMAI_DATA.BRANCHES.map(b => {
            const active = b.id === branch.id;
            return (
              <button key={b.id} onClick={() => { onChange(b); onClose(); }} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: 16, borderRadius: 14, cursor: "pointer",
                border: active ? "1.5px solid var(--forest-500)" : "1px solid var(--cream-300)",
                background: active ? "var(--forest-50)" : "#fff",
                textAlign: "left", width: "100%",
                transition: "all 140ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: active ? "var(--forest-500)" : "var(--forest-50)",
                  color: active ? "#fff" : "var(--forest-500)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}><Icon name="pin" size={22} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)" }}>
                    {lang === "th" ? b.name_th : b.name_en}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--ink-600)" }}>
                    {lang === "th" ? b.addr_th : b.addr_en} · {b.hours}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-700)" }}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--forest-500)" }}></span>
                  {b.open ? (lang === "th" ? "เปิดอยู่" : "Open now") : (lang === "th" ? "ปิด" : "Closed")}
                </div>
                {active && <div style={{ width: 24, height: 24, borderRadius: 999, background: "var(--forest-500)",
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="check" size={14} strokeWidth={2.5} />
                </div>}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ── CartDrawer ────────────────────────────────────────────────────── */
function CartDrawer({ items, onAdd, onRemove, onCheckout, onClose, lang, upsell, onAddItem, branch }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const empty = items.length === 0;
  return (
    <>
      <Scrim onClick={onClose} />
      <aside className="mm-cart-drawer" style={{
        position: "fixed", right: 0, top: 0, bottom: 0, width: "min(440px,100vw)",
        background: "var(--cream-50)", zIndex: 60,
        boxShadow: "-16px 0 40px rgb(64 40 16 / 0.14)",
        display: "flex", flexDirection: "column",
        animation: "slideRight 280ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        <div style={{ padding: "20px 22px 14px", borderBottom: "1px solid var(--cream-300)",
          display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--ink-900)", margin: 0 }}>
              {lang === "th" ? "ตะกร้า" : "Your bag"}
            </h3>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-600)", marginTop: 2 }}>
              <Icon name="pin" size={11} color="var(--forest-500)" style={{ verticalAlign: "-1px" }} />
              {" "}{lang === "th" ? branch.name_th : branch.name_en}
            </div>
          </div>
          <button onClick={onClose} style={iconCloseBtn}><Icon name="x" size={18} /></button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px 22px" }}>
          {empty ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--ink-600)" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🧺</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.5 }}>
                {lang === "th"
                  ? "ตะกร้ายังว่างอยู่ ลองเริ่มที่น้ำผลไม้สักแก้ว?"
                  : "Your bag is empty — start with a cold-pressed?"}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {items.map(p => {
                const [g1, g2] = window.MAKMAI_DATA.HUE_GRADIENTS[p.hue] || ["#ccc", "#888"];
                return (
                  <div key={p.id} style={{ display: "grid", gridTemplateColumns: "56px 1fr auto", gap: 14,
                    alignItems: "center", padding: "14px 0", borderBottom: "1px dashed var(--cream-300)" }}>
                    <div style={{ width: 56, height: 56, borderRadius: 12, overflow: "hidden", flexShrink: 0,
                      background: p.image ? "var(--cream-100)" : `linear-gradient(135deg,${g1},${g2})` }}>
                      {p.image && <img src={p.image} alt={p.en} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--ink-900)" }}>
                        {lang === "th" ? p.th : p.en}
                      </div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: 11.5, color: "var(--ink-600)", marginTop: 2 }}>
                        {lang === "th" ? p.desc_th : p.desc_en}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                      <div style={{ display: "inline-flex", alignItems: "center",
                        background: "var(--cream-100)", borderRadius: 999, border: "1px solid var(--cream-300)" }}>
                        <button onClick={() => onRemove(p.id)} style={stepBtn}><Icon name="minus" size={14} /></button>
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13,
                          minWidth: 22, textAlign: "center", color: "var(--ink-900)", fontVariantNumeric: "tabular-nums" }}>
                          {p.qty}
                        </span>
                        <button onClick={() => onAdd(p)} style={stepBtn}><Icon name="plus" size={14} /></button>
                      </div>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
                        color: "var(--forest-500)", fontVariantNumeric: "tabular-nums" }}>฿{p.price * p.qty}</span>
                    </div>
                  </div>
                );
              })}
              {!empty && upsell && upsell.length > 0 && (
                <div style={{ marginTop: 18 }}>
                  <UpsellStrip items={upsell} lang={lang} onAdd={onAddItem} />
                </div>
              )}
            </div>
          )}
        </div>

        {!empty && (
          <div style={{ borderTop: "1px solid var(--cream-300)", padding: "16px 22px", background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-700)" }}>
                {lang === "th" ? "รวม" : "Subtotal"}
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22,
                color: "var(--ink-900)", fontVariantNumeric: "tabular-nums" }}>฿{subtotal}</span>
            </div>
            <button onClick={onCheckout} style={{
              width: "100%", padding: "14px 18px",
              fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15,
              background: "var(--forest-500)", color: "#fff", border: "none",
              borderRadius: 999, cursor: "pointer", boxShadow: "0 6px 14px rgb(0 36 16 / 0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              {lang === "th" ? "ชำระเงิน · Checkout" : "Quick Checkout"}
              <Icon name="arrow-right" size={16} />
            </button>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--ink-600)", textAlign: "center", marginTop: 8 }}>
              {lang === "th" ? "ขั้นตอนเดียว · ยืนยันแล้วเสร็จ" : "One more step · confirm to finish"}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

/* ── CheckoutSheet ─────────────────────────────────────────────────── */
function CheckoutSheet({ items, branch, onConfirm, onClose, lang, user, onChangeBranch }) {
  const [pay, setPay]         = cc_useState("promptpay");
  const [pickup, setPickup]   = cc_useState("pickup");
  const [phone, setPhone]     = cc_useState(user?.phone || "");
  const [address, setAddress] = cc_useState("");
  const [errors, setErrors]   = cc_useState({});
  const [focused, setFocused] = cc_useState("");

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = pickup === "delivery" ? 30 : 0;
  const total    = subtotal + delivery;
  const TH = lang === "th";

  function handleConfirm() {
    if (pickup === "delivery") {
      const e = {};
      if (!phone.trim())   e.phone   = true;
      if (!address.trim()) e.address = true;
      if (Object.keys(e).length > 0) { setErrors(e); return; }
    }
    onConfirm();
  }

  return (
    <>
      <Scrim onClick={onClose} />
      <div className="mm-checkout-sheet" style={{
        position: "fixed", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
        width: "min(560px,94vw)", maxHeight: "92vh", overflowY: "auto",
        background: "var(--cream-50)", borderRadius: 22,
        boxShadow: "0 24px 60px rgb(64 40 16 / 0.22)", zIndex: 60,
        animation: "popIn 240ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px 14px", borderBottom: "1px solid var(--cream-300)",
          display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--ink-900)", margin: 0 }}>
            {TH ? "ยืนยันการสั่ง" : "Confirm your order"}
          </h3>
          <button onClick={onClose} style={iconCloseBtn}><Icon name="x" size={18} /></button>
        </div>

        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>

          {/* ① Pickup / Delivery */}
          <div>
            <div style={sectionLabel}>{TH ? "รับสินค้า" : "Fulfillment"}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { id: "pickup",   th: "รับที่สาขา", en: "Pickup",   desc_th: "ฟรี",    desc_en: "Free" },
                { id: "delivery", th: "ส่งถึงบ้าน", en: "Delivery", desc_th: "+ ฿30",  desc_en: "+ ฿30" },
              ].map(opt => {
                const active = opt.id === pickup;
                return (
                  <button key={opt.id} onClick={() => { setPickup(opt.id); setErrors({}); }} style={{
                    padding: 14, borderRadius: 14, textAlign: "left", cursor: "pointer",
                    background: active ? "var(--forest-50)" : "#fff",
                    border: active ? "1.5px solid var(--forest-500)" : "1px solid var(--cream-300)",
                    transition: "all 140ms",
                  }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--ink-900)" }}>
                      {TH ? opt.th : opt.en}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-600)", marginTop: 2 }}>
                      {TH ? opt.desc_th : opt.desc_en}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ② Branch card — Change button now works */}
          <div style={{ padding: 14, borderRadius: 14, border: "1px solid var(--cream-300)",
            background: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--forest-50)",
              color: "var(--forest-500)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="pin" size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--ink-900)" }}>
                {TH ? branch.name_th : branch.name_en}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 11.5, color: "var(--ink-600)" }}>
                {TH ? branch.addr_th : branch.addr_en} · {branch.hours}
              </div>
            </div>
            <button onClick={onChangeBranch} style={{
              display: "flex", alignItems: "center", gap: 5,
              background: "var(--forest-50)", border: "1px solid var(--forest-100)",
              borderRadius: 999, cursor: "pointer", padding: "6px 14px",
              fontFamily: "var(--font-body)", fontSize: 12, color: "var(--forest-600)", fontWeight: 600,
              transition: "all 140ms",
            }}>
              <Icon name="swap" size={12} />
              {TH ? "เปลี่ยนสาขา" : "Change"}
            </button>
          </div>

          {/* ③ Delivery form fields — shown only when delivery selected */}
          {pickup === "delivery" && (
            <div style={{ background: "var(--cream-100)", borderRadius: 14,
              border: "1px solid var(--cream-300)", padding: 16,
              display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--forest-500)" }}>
                {TH ? "ข้อมูลการจัดส่ง" : "Delivery details"}
              </div>

              {/* Phone */}
              <div>
                <label style={fldLbl}>{TH ? "เบอร์โทรศัพท์" : "Phone number"}</label>
                <input placeholder="08X-XXX-XXXX" value={phone} type="tel"
                  onChange={e => { setPhone(e.target.value); setErrors(ev => ({...ev, phone: false})); }}
                  onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                  style={mkInput(errors.phone, focused === "phone")} />
                {errors.phone
                  ? <div style={errTxt}>⚠ {TH ? "กรุณากรอกเบอร์โทร" : "Phone is required"}</div>
                  : <div style={hintTxt}>{TH ? "เราจะส่ง OTP เพื่อยืนยันการสั่ง" : "We'll send an OTP to confirm"}</div>
                }
              </div>

              {/* Address */}
              <div>
                <label style={fldLbl}>{TH ? "ที่อยู่จัดส่ง" : "Delivery address"}</label>
                <input placeholder={TH ? "บ้านเลขที่ ถนน ตำบล อำเภอ" : "Street, district, city"} value={address}
                  onChange={e => { setAddress(e.target.value); setErrors(ev => ({...ev, address: false})); }}
                  onFocus={() => setFocused("address")} onBlur={() => setFocused("")}
                  style={mkInput(errors.address, focused === "address")} />
                {errors.address && <div style={errTxt}>⚠ {TH ? "ต้องระบุที่อยู่สำหรับจัดส่ง" : "Delivery address is required"}</div>}
              </div>
            </div>
          )}

          {/* ④ Payment */}
          <div>
            <div style={sectionLabel}>{TH ? "วิธีชำระเงิน" : "Payment"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { id: "promptpay", ic: "qr",     th: "PromptPay (QR)",          en: "PromptPay (QR)" },
                { id: "card",      ic: "credit",  th: "บัตรเครดิต / เดบิต",     en: "Credit / Debit card" },
                { id: "cash",      ic: "bag",     th: "เงินสด",    en: "Cash" },
              ].map(opt => {
                const active = pay === opt.id;
                return (
                  <button key={opt.id} onClick={() => setPay(opt.id)} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: 12, borderRadius: 12, cursor: "pointer", textAlign: "left",
                    border: active ? "1.5px solid var(--forest-500)" : "1px solid var(--cream-300)",
                    background: active ? "var(--forest-50)" : "#fff",
                    transition: "all 140ms",
                  }}>
                    <div style={{ width: 30, height: 30, color: "var(--forest-500)",
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name={opt.ic} size={18} />
                    </div>
                    <span style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: 14,
                      color: "var(--ink-900)", fontWeight: 500 }}>
                      {TH ? opt.th : opt.en}
                    </span>
                    {active && <Icon name="check" size={16} color="var(--forest-500)" strokeWidth={2.5} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ⑤ Totals */}
          <div style={{ padding: 14, borderRadius: 14, background: "var(--cream-100)",
            border: "1px solid var(--cream-300)",
            fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--ink-700)" }}>
            <div style={tRow}>
              <span>{TH ? "ราคารวม" : "Subtotal"}</span><span>฿{subtotal}</span>
            </div>
            <div style={tRow}>
              <span>{TH ? "ค่าจัดส่ง" : "Delivery"}</span>
              <span>{delivery ? `฿${delivery}` : (TH ? "ฟรี" : "Free")}</span>
            </div>
            <div style={{ ...tRow, marginTop: 10, paddingTop: 10,
              borderTop: "1px dashed var(--cream-300)",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--ink-900)" }}>
              <span>{TH ? "ยอดชำระ" : "Total"}</span><span>฿{total}</span>
            </div>
          </div>

          {/* ⑥ Confirm button */}
          <button onClick={handleConfirm} style={{
            width: "100%", padding: "16px 18px",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16,
            background: "var(--forest-500)", color: "#fff", border: "none",
            borderRadius: 999, cursor: "pointer", boxShadow: "0 8px 18px rgb(0 36 16 / 0.30)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            {TH ? `ยืนยันการสั่ง · ฿${total}` : `Confirm · Pay ฿${total}`}
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

/* ── Confirmation ──────────────────────────────────────────────────── */
function Confirmation({ onClose, lang, items, branch }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const TH = lang === "th";
  return (
    <>
      <Scrim onClick={onClose} />
      <div className="mm-confirm-modal" style={{
        position: "fixed", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
        width: "min(440px,92vw)", background: "var(--cream-50)", borderRadius: 22,
        boxShadow: "0 24px 60px rgb(64 40 16 / 0.22)", zIndex: 60,
        padding: 32, textAlign: "center",
        animation: "popIn 280ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        <div style={{ width: 80, height: 80, borderRadius: 999, background: "var(--forest-500)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
          <Icon name="check" size={40} strokeWidth={3} />
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--ink-900)", margin: 0 }}>
          {TH ? "สั่งเรียบร้อย 🌱" : "Order placed 🌱"}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-700)", marginTop: 8, lineHeight: 1.55 }}>
          {TH
            ? <>{`ขอบคุณที่สั่งจากเรา! เจอกันที่`}<br/><strong>{branch.name_th}</strong>{` เร็วๆ นี้`}</>
            : <>{`Thanks for ordering! See you at`}<br/><strong>{branch.name_en}</strong>{` shortly.`}</>}
        </p>
        <div style={{ margin: "20px 0 22px", padding: 14, borderRadius: 14,
          background: "var(--cream-100)", border: "1px solid var(--cream-300)",
          fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-700)",
          display: "flex", justifyContent: "space-between" }}>
          <span>{TH ? "เลขออร์เดอร์" : "Order #"} <code style={{ color: "var(--ink-900)" }}>MM-2026-0218</code></span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--forest-500)" }}>฿{total}</span>
        </div>
        <button onClick={onClose} style={{
          fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14,
          background: "var(--forest-500)", color: "#fff", border: "none",
          padding: "12px 28px", borderRadius: 999, cursor: "pointer",
        }}>{TH ? "กลับสู่หน้าหลัก" : "Back to menu"}</button>
      </div>
    </>
  );
}

/* ── Shared style consts ───────────────────────────────────────────── */
const iconCloseBtn = {
  width: 36, height: 36, borderRadius: 999, border: "none",
  background: "var(--cream-100)", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-800)",
};
const stepBtn = {
  width: 28, height: 28, borderRadius: 999, border: "none", background: "transparent",
  cursor: "pointer", color: "var(--forest-500)",
  display: "flex", alignItems: "center", justifyContent: "center",
};
const sectionLabel = {
  fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600,
  letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-600)", marginBottom: 10,
};
const tRow = {
  display: "flex", justifyContent: "space-between", padding: "4px 0", fontVariantNumeric: "tabular-nums",
};
const fldLbl = {
  fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
  color: "var(--ink-700)", marginBottom: 6, display: "block",
};
const errTxt  = { fontFamily: "var(--font-body)", fontSize: 11.5, color: "var(--berry-500)", marginTop: 5 };
const hintTxt = { fontFamily: "var(--font-body)", fontSize: 11.5, color: "var(--ink-500)", marginTop: 5 };
const switchTabBtn = {
  background: "none", border: "none", cursor: "pointer",
  color: "var(--forest-500)", fontWeight: 600, fontSize: 12.5,
  fontFamily: "var(--font-body)", padding: 0,
};

/* ── Exports ───────────────────────────────────────────────────────── */
window.AuthModal    = AuthModal;
window.BranchModal  = BranchModal;
window.CartDrawer   = CartDrawer;
window.CheckoutSheet = CheckoutSheet;
window.Confirmation = Confirmation;
