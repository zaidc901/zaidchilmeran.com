import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLinkedin, FiYoutube } from "react-icons/fi";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

// ─── Constants ────────────────────────────────────────────────────────────────

const PLATFORM_PRESETS = [
  { name: "None",     fee: 0   },
  { name: "Gumroad",  fee: 10  },
  { name: "Etsy",     fee: 6.5 },
  { name: "Shopify",  fee: 2.9 },
  { name: "Stripe",   fee: 2.9 },
  { name: "Custom",   fee: 0   },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.6 } },
};

// ─── Shared Styles ─────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: Inter, sans-serif;
    background: #f6faff;
    color: #08172b;
    overflow-x: hidden;
  }
  body::before {
    content: "";
    position: fixed; inset: 0; z-index: -3;
    background:
      radial-gradient(circle at 12% 8%,  rgba(37,99,235,0.13),  transparent 28%),
      radial-gradient(circle at 88% 14%, rgba(14,165,233,0.10),  transparent 28%),
      radial-gradient(circle at 72% 90%, rgba(250,204,21,0.09),  transparent 30%),
      #f6faff;
  }
  body::after {
    content: "";
    position: fixed; inset: 0; z-index: -2;
    background-image:
      linear-gradient(rgba(37,99,235,0.032) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.032) 1px, transparent 1px);
    background-size: 70px 70px;
    mask-image: radial-gradient(circle at center, black 18%, transparent 78%);
  }
.title-wrap {
  position: relative;
  display: inline-block;
}

.fun-badge {
  position: absolute;
  top: 38px;
  right: -155px;
  transform: rotate(7deg);

  background: rgba(255,255,255,0.86);
  color: #2563eb;

  padding: 12px 18px;
  border-radius: 18px;

  font-size: 15px;
  font-weight: 900;
  letter-spacing: -0.03em;

  border: 1px solid rgba(37,99,235,0.16);
  box-shadow: 0 18px 40px rgba(37,99,235,0.12);
  backdrop-filter: blur(16px);

  z-index: 3;
}

.fun-badge::before {
  content: "";
  position: absolute;
  inset: -8px;
  border-radius: 24px;
  border: 2px solid rgba(250,204,21,0.7);
  transform: rotate(-3deg);
  z-index: -1;
}

.fun-badge::after {
  content: "✦";
  position: absolute;
  top: -18px;
  right: -12px;
  color: #facc15;
  font-size: 22px;
}

  a { text-decoration: none; color: inherit; }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  input[type="number"] { -moz-appearance: textfield; }
  input[type="range"] {
    -webkit-appearance: none; appearance: none;
    width: 100%; height: 6px;
    background: rgba(37,99,235,0.15); border-radius: 999px; outline: none;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 22px; height: 22px; border-radius: 50%;
    background: #2563eb; cursor: pointer;
    box-shadow: 0 2px 8px rgba(37,99,235,0.3);
  }

  /* nav */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; height: 62px; z-index: 100;
    padding: 0 5vw;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(255,255,255,0.72); backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(8,23,43,0.08);
  }
  .brand { font-size: 17px; font-weight: 800; letter-spacing: -0.05em; }
  .nav-right { display: flex; align-items: center; gap: 28px; }
  .nav-links { display: flex; align-items: center; gap: 28px; }
  .nav-links a { font-size: 13px; font-weight: 700; }
  .projects-link { display: inline-flex; align-items: center; gap: 5px; line-height: 1; transform: translateY(-1.5px); }
  .nav-dropdown { position: relative; padding-bottom: 22px; margin-bottom: -22px; }
  .nav-dropdown > a { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 700; }
  .dropdown-menu {
    position: absolute; top: 100%; left: -12px; min-width: 190px;
    padding: 10px; border-radius: 14px;
    background: rgba(255,255,255,0.96); backdrop-filter: blur(18px);
    border: 1px solid rgba(8,23,43,0.08);
    box-shadow: 0 14px 34px rgba(37,99,235,0.12);
    display: flex; flex-direction: column; gap: 4px;
    opacity: 0; visibility: hidden; transform: translateY(4px);
    transition: 0.18s ease; pointer-events: none;
  }
  .dropdown-menu a { padding: 10px 12px; border-radius: 10px; font-size: 13px; }
  .dropdown-menu a:hover { background: rgba(37,99,235,0.08); color: #2563eb; }
  .nav-dropdown:hover .dropdown-menu { opacity: 1; visibility: visible; transform: translateY(0); pointer-events: auto; }
  .nav-icons { display: flex; align-items: center; gap: 14px; }
  .nav-icons a { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 999px; }
  .small-label { font-size: 12px; font-weight: 800; color: #2563eb; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 16px; }

  /* page */
  .calc-page { padding-top: 118px; min-height: 100vh; }
  .page-title h1 { font-size: clamp(64px, 8vw, 120px); line-height: 0.9; letter-spacing: -0.08em; font-weight: 800; margin-bottom: 24px; }
  .page-title p  { font-size: 20px; color: #5b6f88; line-height: 1.5; max-width: 720px; margin-left: 0; display: block; padding-left: 2px; }

.venture-note {
  margin-top: 28px;

  display: inline-flex;
  flex-direction: column;
  gap: 10px;

  padding: 18px 22px;

  background: rgba(255,255,255,0.58);
  backdrop-filter: blur(16px);

  border: 1px solid rgba(37,99,235,0.10);
  border-radius: 22px;

  box-shadow: 0 14px 34px rgba(37,99,235,0.07);

  max-width: 620px;
}

.venture-note-label {
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  color: #2563eb;
}

.venture-note p {
  margin: 0;

  font-size: 15px;
  line-height: 1.7;
  color: #4b5f7a;
  font-weight: 600;
  letter-spacing: -0.02em;
}

  section { position: relative; padding: 42px 5vw; border-bottom: 1px solid rgba(8,23,43,0.07); overflow: hidden; }

  /* cards */
  .card {
    background: rgba(255,255,255,0.84);
    border: 1px solid rgba(8,23,43,0.08);
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 10px 32px rgba(37,99,235,0.06);
  }
  .card-dark {
    background: #08172b;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 10px 32px rgba(37,99,235,0.15);
    color: #fff;
  }

  /* inputs */
  .field-label { font-size: 11px; font-weight: 800; color: #5b6f88; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 8px; display: block; }
  .field-input {
    width: 100%; background: rgba(37,99,235,0.04);
    border: 1px solid rgba(37,99,235,0.15); border-radius: 12px;
    padding: 12px 16px; font-size: 15px; font-weight: 700; color: #08172b;
    outline: none; transition: border-color 0.18s;
  }
  .field-input:focus { border-color: rgba(37,99,235,0.45); background: rgba(37,99,235,0.07); }
  .field-input.has-prefix { padding-left: 32px; }
  .field-wrap { position: relative; }
  .field-prefix { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; font-weight: 700; color: #5b6f88; pointer-events: none; }
  .field-suffix { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; font-weight: 700; color: #5b6f88; pointer-events: none; }

  /* grid utils */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

  /* metric */
  .metric { background: rgba(255,255,255,0.84); border: 1px solid rgba(8,23,43,0.08); border-radius: 20px; padding: 22px 24px; }
  .metric-label { font-size: 11px; font-weight: 800; color: #5b6f88; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 6px; }
  .metric-val   { font-size: 28px; font-weight: 800; color: #08172b; letter-spacing: -0.05em; line-height: 1; }

  /* platform buttons */
  .plat-btn {
    padding: 10px 16px; border-radius: 10px; font-size: 11px; font-weight: 800;
    letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
    border: 1px solid rgba(8,23,43,0.1); background: rgba(255,255,255,0.7);
    color: #5b6f88; transition: all 0.18s;
  }
  .plat-btn:hover  { border-color: rgba(37,99,235,0.3); color: #2563eb; background: rgba(37,99,235,0.05); }
  .plat-btn.active { background: #2563eb; color: #fff; border-color: #2563eb; box-shadow: 0 4px 14px rgba(37,99,235,0.25); }

  /* marketing rows */
  .mkt-row { display: flex; gap: 12px; align-items: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 14px 18px; }
  .mkt-name { flex: 1; background: transparent; border: none; outline: none; font-size: 14px; font-weight: 700; color: #fff; }
  .mkt-name::placeholder { color: rgba(255,255,255,0.25); }
  .mkt-select { background: rgba(255,255,255,0.07); border: none; color: rgba(255,255,255,0.6); font-size: 11px; font-weight: 800; text-transform: uppercase; border-radius: 8px; padding: 7px 10px; outline: none; cursor: pointer; }
  .mkt-val { width: 90px; background: rgba(255,255,255,0.07); border: none; border-radius: 8px; padding: 7px 10px; font-size: 14px; font-weight: 700; color: #fff; text-align: right; outline: none; }
  .mkt-remove { background: transparent; border: none; cursor: pointer; color: rgba(239,68,68,0.5); font-size: 18px; padding: 0 4px; transition: color 0.15s; }
  .mkt-remove:hover { color: #ef4444; }

  /* section header */
  .sec-header { margin-bottom: 28px; padding-left: 20px; border-left: 3px solid #2563eb; }
  .sec-step { font-size: 10px; font-weight: 800; color: #2563eb; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 4px; }
  .sec-title { font-size: clamp(26px, 3vw, 38px); font-weight: 800; letter-spacing: -0.06em; color: #08172b; }
  .sec-sub   { font-size: 14px; color: #5b6f88; font-weight: 500; margin-top: 4px; }

  /* add btn */
  .add-btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 16px; background: rgba(37,99,235,0.8); color: #fff; font-size: 10px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; border: none; border-radius: 10px; cursor: pointer; transition: background 0.18s; }
  .add-btn:hover { background: #2563eb; }

  /* break-even highlight */
  .breakeven-box { background: #08172b; border-radius: 20px; padding: 28px 32px; color: #fff; }
  .breakeven-num { font-size: 56px; font-weight: 800; color: #2563eb; letter-spacing: -0.06em; line-height: 1; }

  /* pie legend */
  .legend-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .legend-dot { width: 9px; height: 9px; border-radius: 50%; margin-right: 8px; flex-shrink: 0; }

  /* name input */
  .name-input { background: transparent; border: none; outline: none; font-size: clamp(36px, 5vw, 60px); font-weight: 800; letter-spacing: -0.07em; color: #08172b; width: 100%; caret-color: #2563eb; }
  .name-input::placeholder { color: rgba(8,23,43,0.1); }

  /* range output badge */
  .range-badge { display: inline-block; background: #2563eb; color: #fff; font-size: 20px; font-weight: 800; letter-spacing: -0.05em; padding: 8px 22px; border-radius: 999px; }

  /* highlight card */
  .highlight-card { background: #2563eb; border-radius: 24px; padding: 32px; color: #fff; position: relative; overflow: hidden; }
  .highlight-card .big-num { font-size: 52px; font-weight: 800; letter-spacing: -0.06em; line-height: 1; }

  @media (max-width: 900px) {
  .nav-links { display: none; }
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  .breakeven-num { font-size: 40px; }

  .mkt-row {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 16px;
  }

  .mkt-name,
  .mkt-select,
  .mkt-val {
    width: 100%;
  }

  .mkt-val {
    text-align: left;
  }

  .mkt-remove {
    align-self: flex-end;
  }

  .card,
  .card-dark {
    padding: 22px;
  }

  section {
    padding: 34px 5vw;
  }
}
`;

// ─── Sub-components ────────────────────────────────────────────────────────────

function SmallLabel({ children }) {
  return <div className="small-label">{children}</div>;
}

function SectionHeader({ step, title, subtitle }) {
  return (
    <div className="sec-header">
      <div className="sec-step">Step {step}</div>
      <h2 className="sec-title">{title}</h2>
      <p className="sec-sub">{subtitle}</p>
    </div>
  );
}

function Field({ label, value, onChange, prefix, suffix, id }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label className="field-label" htmlFor={id}>{label}</label>
      <div className="field-wrap">
        {prefix && <span className="field-prefix">{prefix}</span>}
        <input
          id={id}
          type="number"
          className={`field-input ${prefix ? "has-prefix" : ""}`}
          value={value === 0 ? "" : value}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          placeholder="0"
          style={suffix ? { paddingRight: 36 } : {}}
        />
        {suffix && <span className="field-suffix">{suffix}</span>}
      </div>
    </div>
  );
}

function Metric({ label, value, accent }) {
  return (
    <div className="metric" style={accent ? { borderTop: `3px solid ${accent}` } : {}}>
      <div className="metric-label">{label}</div>
      <div className="metric-val">{value}</div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function VentureCalculator() {
    useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const [price, setPrice] = useState(49);
  const [quantity, setQuantity] = useState(50);
  const [softwareCosts, setSoftwareCosts] = useState({ chatgpt: 20, canva: 12, shopify: 39, other: 0 });
  const [marketingItems, setMarketingItems] = useState([
    { id: "1", name: "Meta Ads", type: "fixed", value: 300 },
  ]);
  const [platformFeePct, setPlatformFeePct] = useState(2.9);
  const [platformName, setPlatformName] = useState("Stripe");
  const [affiliatePct] = useState(0);

  const stats = useMemo(() => {
    const revenue = price * quantity;
    const softwareTotal = Object.values(softwareCosts).reduce((a, b) => a + b, 0);

    let marketingFixed = 0;
    let marketingComm = 0;
    marketingItems.forEach(item => {
      if (item.type === "fixed") marketingFixed += item.value || 0;
      else marketingComm += revenue * ((item.value || 0) / 100);
    });

    const fees = revenue * ((platformFeePct + affiliatePct) / 100);
    const totalCosts = softwareTotal + marketingFixed + marketingComm + fees;
    const profit = revenue - totalCosts;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const roi = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;

    const fixed = softwareTotal + marketingFixed;
    const varPerc = (platformFeePct + affiliatePct + marketingItems.filter(i => i.type === "commission").reduce((s, i) => s + (i.value || 0), 0)) / 100;
    const variableProfitPerUnit = price * (1 - varPerc);
    const breakEven = variableProfitPerUnit > 0 ? Math.ceil(fixed / variableProfitPerUnit) : 0;

    const netPerUnit = price * (1 - platformFeePct / 100);

    return { revenue, softwareTotal, marketingFixed, marketingComm, fees, totalCosts, profit, margin, roi, breakEven, netPerUnit };
  }, [price, quantity, softwareCosts, marketingItems, platformFeePct, affiliatePct]);

  const addMarketing = () => {
    setMarketingItems(prev => [...prev, { id: Date.now().toString(), name: "New Channel", type: "fixed", value: 0 }]);
  };

  const removeMarketing = id => {
    setMarketingItems(prev => prev.filter(i => i.id !== id));
  };

  const updateMarketing = (idx, key, val) => {
    setMarketingItems(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [key]: val };
      return next;
    });
  };

  const pieData = [
    { name: "Software", value: Math.round(stats.softwareTotal), color: "#2563eb" },
    { name: "Marketing", value: Math.round(stats.marketingFixed), color: "#0ea5e9" },
    { name: "Fees", value: Math.round(stats.fees + stats.marketingComm), color: "#facc15" },
  ].filter(d => d.value > 0);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="brand">Zaid Chilmeran</a>
        <div className="nav-right">
          <div className="nav-links">
            <a href="/#/?section=home">Home</a>
            <a href="/#/?section=about">About</a>
            <a href="/#/?section=certificates">Certificates</a>
            <div className="nav-dropdown">
              <a href="/#/?section=projects" className="projects-link">
                Projects <span style={{ fontSize: 10 }}>▾</span>
              </a>
              <div className="dropdown-menu">
                <a href="/#/research">Research</a>
                <a href="/#/resources">Resource Library</a>
              </div>
            </div>
            <a href="/#/?section=contact">Contact</a>
          </div>
          <div className="nav-icons">
            <a href="mailto:zaid@zaidchilmeran.com"><FiMail size={16} /></a>
            <a href="https://www.linkedin.com/in/zaidchilmeran/" target="_blank" rel="noreferrer"><FiLinkedin size={16} /></a>
            <a href="https://www.youtube.com/@ZaidTVYoutube" target="_blank" rel="noreferrer"><FiYoutube size={16} /></a>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="calc-page">

        {/* Hero */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible">
          <div className="page-title">
            <SmallLabel>05 — Venture Calculator</SmallLabel>
            <div className="title-wrap">
  <h1>Digital Venture<br />Profit Simulator</h1>
  <div className="fun-badge">Made simple</div>
</div>
            <p>Model your digital business. Enter your costs, price, and volume to see exactly where you stand.</p>
            <div className="venture-note">
  <span className="venture-note-label">PROJECT NOTE</span>
  <p>
    A personal project exploring UI design, analytical modelling, and interactive web development.
  </p>
</div>
          </div>

        </motion.section>

        {/* ── STEP 1: COSTS ─────────────────────────────────────────────── */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible">
          <SectionHeader step="01" title="Monthly Overhead" subtitle="Every fixed cost before you make a single sale." />

          <div className="grid-2" style={{ gap: 24 }}>
            {/* SaaS Stack */}
            <div className="card">
              <div style={{ fontSize: 11, fontWeight: 800, color: "#2563eb", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 24 }}>SaaS Stack</div>
              <Field id="ai"  label="AI Assistant"   prefix="$" value={softwareCosts.chatgpt} onChange={v => setSoftwareCosts(s => ({ ...s, chatgpt: v }))} />
              <Field id="ca"  label="Design Tools"   prefix="$" value={softwareCosts.canva}   onChange={v => setSoftwareCosts(s => ({ ...s, canva: v }))}   />
              <Field id="sh"  label="Web / Hosting"  prefix="$" value={softwareCosts.shopify} onChange={v => setSoftwareCosts(s => ({ ...s, shopify: v }))} />
              <Field id="oth" label="Other Software" prefix="$" value={softwareCosts.other}   onChange={v => setSoftwareCosts(s => ({ ...s, other: v }))}   />
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(8,23,43,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#5b6f88" }}>Total Software</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#08172b" }}>${Math.round(stats.softwareTotal)}/mo</span>
                </div>
              </div>
            </div>

            {/* Marketing */}
            <div className="card-dark">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(37,99,235,0.8)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Marketing & Ads</span>
                <button className="add-btn" onClick={addMarketing}>+ Add</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 320, overflowY: "auto" }}>
                <AnimatePresence>
                  {marketingItems.map((item, idx) => (
                    <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="mkt-row">
                      <input className="mkt-name" value={item.name} onChange={e => updateMarketing(idx, "name", e.target.value)} placeholder="Channel name" />
                      <select className="mkt-select" value={item.type} onChange={e => updateMarketing(idx, "type", e.target.value)}>
                        <option value="fixed">Fixed $</option>
                        <option value="commission">Commission %</option>
                      </select>
                      <input className="mkt-val" type="number" value={item.value === 0 ? "" : item.value} onChange={e => updateMarketing(idx, "value", parseFloat(e.target.value) || 0)} placeholder="0" />
                      <button className="mkt-remove" onClick={() => removeMarketing(item.id)}>×</button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {marketingItems.length === 0 && (
                  <div style={{ padding: "40px 0", textAlign: "center", border: "2px dashed rgba(255,255,255,0.06)", borderRadius: 14 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.18em" }}>No marketing spend</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── STEP 2: PRICING ───────────────────────────────────────────── */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible">
          <SectionHeader step="02" title="Revenue Structure" subtitle="Your price point and the platform cut." />

          <div className="grid-2" style={{ gap: 24 }}>
            <div className="card">
              <Field id="price" label="Product Price" prefix="$" value={price} onChange={setPrice} />

              <div style={{ marginTop: 24, marginBottom: 12 }}>
                <span className="field-label">Platform</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                  {PLATFORM_PRESETS.map(p => (
                    <button
                      key={p.name}
                      className={`plat-btn ${platformName === p.name ? "active" : ""}`}
                      onClick={() => { setPlatformName(p.name); if (p.name !== "Custom") setPlatformFeePct(p.fee); }}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {platformName === "Custom" && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 16 }}>
                  <Field id="customfee" label="Custom Fee %" suffix="%" value={platformFeePct} onChange={setPlatformFeePct} />
                </motion.div>
              )}

              {platformName !== "Custom" && (
                <p style={{ fontSize: 13, color: "#5b6f88", marginTop: 8 }}>
                  {platformName} charges <strong>{platformFeePct}%</strong> per transaction.
                </p>
              )}
            </div>

            <div className="highlight-card">
              <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.6)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Net per sale</div>
              <div className="big-num">${stats.netPerUnit.toFixed(2)}</div>
              <p style={{ marginTop: 16, fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                After <span style={{ color: "#fff", fontWeight: 700 }}>{platformName}</span> takes its {platformFeePct}% cut from a ${price} sale.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── STEP 3: SIMULATOR ─────────────────────────────────────────── */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible">
          <SectionHeader step="03" title="Profit Simulator" subtitle="Drag to model different sales volumes." />

          {/* Slider */}
          <div className="card" style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800 }}>Monthly Sales Volume</div>
                <div style={{ fontSize: 13, color: "#5b6f88" }}>Units sold per month</div>
              </div>
              <span className="range-badge">{quantity} units</span>
            </div>
            <input
              type="range" min="0" max="2500" step="1"
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value))}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 11, color: "#5b6f88" }}>0</span>
              <span style={{ fontSize: 11, color: "#5b6f88" }}>2,500</span>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid-4" style={{ marginBottom: 24 }}>
            <Metric label="Gross Revenue"  value={`$${stats.revenue.toLocaleString()}`}    accent="#2563eb" />
            <Metric label="Net Profit"     value={`$${Math.round(stats.profit).toLocaleString()}`} accent="#22c55e" />
            <Metric label="Profit Margin"  value={`${stats.margin.toFixed(1)}%`}            accent="#facc15" />
            <Metric label="ROI"            value={`${Math.round(stats.roi)}%`}              accent="#a855f7" />
          </div>

          {/* Break-even + Pie */}
          <div className="grid-2" style={{ gap: 24 }}>
            <div className="breakeven-box">
              <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(37,99,235,0.7)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>Break-even point</div>
              <div className="breakeven-num">{stats.breakEven}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>units</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                Every sale past unit #{stats.breakEven} is pure profit minus variable fees.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: 11, fontWeight: 800, color: "#2563eb", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>Cost breakdown</div>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={6} dataKey="value">
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "#fff", border: "none", borderRadius: 12, boxShadow: "0 10px 30px rgba(37,99,235,0.1)", fontSize: 12 }}
                      formatter={(val) => [`$${val}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginTop: 12 }}>
                {[
                  { label: "Software", val: stats.softwareTotal,                                   color: "#2563eb" },
                  { label: "Marketing (fixed)",  val: stats.marketingFixed,                        color: "#0ea5e9" },
                  { label: "Fees & Commissions", val: stats.fees + stats.marketingComm,            color: "#facc15" },
                ].map(item => (
                  <div key={item.label} className="legend-row">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className="legend-dot" style={{ background: item.color }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#5b6f88" }}>{item.label}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#08172b" }}>${Math.round(item.val)}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(8,23,43,0.07)", paddingTop: 10, marginTop: 6, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#5b6f88" }}>Total overhead</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#2563eb" }}>${Math.round(stats.totalCosts)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </main>

      {/* FOOTER */}
      <footer style={{ padding: "48px 5vw", borderTop: "1px solid rgba(8,23,43,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", opacity: 0.5 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#5b6f88", textTransform: "uppercase", letterSpacing: "0.14em" }}>Zaid Chilmeran Portfolio</span>
        <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5b6f88" }}>© 2026 Zaid Chilmeran</p>
      </footer>
    </>
  );
}