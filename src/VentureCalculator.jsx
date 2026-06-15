import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { Reveal, SectionLabel, SiteLayout } from "./components/SiteChrome.jsx";

const platformPresets = [
  { name: "None", fee: 0 },
  { name: "Gumroad", fee: 10 },
  { name: "Etsy", fee: 6.5 },
  { name: "Shopify", fee: 2.9 },
  { name: "Stripe", fee: 2.9 },
  { name: "Custom", fee: 0 },
];

function Field({ id, label, value, onChange, prefix, suffix }) {
  return (
    <label className="calc-field" htmlFor={id}>
      <span>{label}</span>
      <div className="calc-input-wrap">
        {prefix && <span className="calc-affix calc-prefix">{prefix}</span>}
        <input
          id={id}
          type="number"
          min="0"
          value={value === 0 ? "" : value}
          onChange={(event) => onChange(Number.parseFloat(event.target.value) || 0)}
          placeholder="0"
          className={prefix ? "has-prefix" : ""}
        />
        {suffix && <span className="calc-affix calc-suffix">{suffix}</span>}
      </div>
    </label>
  );
}

function StepHeading({ step, title, description }) {
  return (
    <div className="calc-step-heading">
      <span>Step {step}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Metric({ label, value, color }) {
  return (
    <div className="calc-metric" style={{ "--metric-color": color }}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function VentureCalculator() {
  useEffect(() => window.scrollTo(0, 0), []);

  const [price, setPrice] = useState(49);
  const [quantity, setQuantity] = useState(50);
  const [softwareCosts, setSoftwareCosts] = useState({ ai: 20, design: 12, hosting: 39, other: 0 });
  const [marketingItems, setMarketingItems] = useState([
    { id: "1", name: "Meta Ads", type: "fixed", value: 300 },
  ]);
  const [platformFee, setPlatformFee] = useState(2.9);
  const [platformName, setPlatformName] = useState("Stripe");

  const stats = useMemo(() => {
    const revenue = price * quantity;
    const software = Object.values(softwareCosts).reduce((sum, value) => sum + value, 0);
    const fixedMarketing = marketingItems
      .filter((item) => item.type === "fixed")
      .reduce((sum, item) => sum + item.value, 0);
    const commissionRate = marketingItems
      .filter((item) => item.type === "commission")
      .reduce((sum, item) => sum + item.value, 0);
    const commissions = revenue * (commissionRate / 100);
    const platformFees = revenue * (platformFee / 100);
    const totalCosts = software + fixedMarketing + commissions + platformFees;
    const profit = revenue - totalCosts;
    const margin = revenue ? (profit / revenue) * 100 : 0;
    const roi = totalCosts ? (profit / totalCosts) * 100 : 0;
    const contributionPerUnit = price * (1 - (platformFee + commissionRate) / 100);
    const breakEven = contributionPerUnit > 0
      ? Math.ceil((software + fixedMarketing) / contributionPerUnit)
      : 0;

    return {
      revenue,
      software,
      fixedMarketing,
      commissions,
      platformFees,
      totalCosts,
      profit,
      margin,
      roi,
      breakEven,
      netPerUnit: price * (1 - platformFee / 100),
    };
  }, [marketingItems, platformFee, price, quantity, softwareCosts]);

  const pieData = [
    { name: "Software", value: Math.round(stats.software), color: "#1264d8" },
    { name: "Marketing", value: Math.round(stats.fixedMarketing), color: "#715cff" },
    { name: "Fees", value: Math.round(stats.platformFees + stats.commissions), color: "#20c6e8" },
  ].filter((item) => item.value > 0);

  const addMarketing = () => {
    setMarketingItems((items) => [
      ...items,
      { id: crypto.randomUUID(), name: "New channel", type: "fixed", value: 0 },
    ]);
  };

  const updateMarketing = (id, key, value) => {
    setMarketingItems((items) => items.map((item) => (
      item.id === id ? { ...item, [key]: value } : item
    )));
  };

  return (
    <SiteLayout>
      <main className="inner-page calculator-page">
        <section className="section-shell page-hero calc-hero">
          <Reveal>
            <SectionLabel>Interactive project</SectionLabel>
            <h1>Digital Venture Profit Simulator.</h1>
            <p>Model monthly overhead, platform fees, sales volume and profitability in real time.</p>
          </Reveal>
        </section>

        <section className="section-shell calc-section">
          <StepHeading step="01" title="Monthly overhead" description="Start with every fixed cost before the first sale." />
          <div className="calc-grid-2">
            <Reveal className="calc-card">
              <h3>Software stack</h3>
              <Field id="ai" label="AI assistant" prefix="$" value={softwareCosts.ai} onChange={(value) => setSoftwareCosts((costs) => ({ ...costs, ai: value }))} />
              <Field id="design" label="Design tools" prefix="$" value={softwareCosts.design} onChange={(value) => setSoftwareCosts((costs) => ({ ...costs, design: value }))} />
              <Field id="hosting" label="Web and hosting" prefix="$" value={softwareCosts.hosting} onChange={(value) => setSoftwareCosts((costs) => ({ ...costs, hosting: value }))} />
              <Field id="other" label="Other software" prefix="$" value={softwareCosts.other} onChange={(value) => setSoftwareCosts((costs) => ({ ...costs, other: value }))} />
              <div className="calc-total"><span>Total software</span><strong>${Math.round(stats.software)}/mo</strong></div>
            </Reveal>

            <Reveal className="calc-card calc-card-dark" delay={0.05}>
              <div className="calc-card-title">
                <h3>Marketing and ads</h3>
                <button type="button" onClick={addMarketing}><FiPlus /> Add</button>
              </div>
              <div className="marketing-list">
                <AnimatePresence initial={false}>
                  {marketingItems.map((item) => (
                    <motion.div className="marketing-row" key={item.id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                      <input aria-label="Marketing channel name" value={item.name} onChange={(event) => updateMarketing(item.id, "name", event.target.value)} />
                      <select aria-label="Marketing cost type" value={item.type} onChange={(event) => updateMarketing(item.id, "type", event.target.value)}>
                        <option value="fixed">Fixed $</option>
                        <option value="commission">Commission %</option>
                      </select>
                      <input aria-label="Marketing cost" type="number" min="0" value={item.value || ""} placeholder="0" onChange={(event) => updateMarketing(item.id, "value", Number.parseFloat(event.target.value) || 0)} />
                      <button type="button" className="remove-button" aria-label={`Remove ${item.name}`} onClick={() => setMarketingItems((items) => items.filter((entry) => entry.id !== item.id))}><FiTrash2 /></button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {!marketingItems.length && <p className="empty-state">No marketing spend added.</p>}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-shell calc-section">
          <StepHeading step="02" title="Revenue structure" description="Set a price point and account for the platform cut." />
          <div className="calc-grid-2">
            <Reveal className="calc-card">
              <Field id="price" label="Product price" prefix="$" value={price} onChange={setPrice} />
              <span className="calc-field-label">Platform</span>
              <div className="platform-list">
                {platformPresets.map((platform) => (
                  <button
                    type="button"
                    key={platform.name}
                    className={platformName === platform.name ? "is-active" : ""}
                    onClick={() => {
                      setPlatformName(platform.name);
                      if (platform.name !== "Custom") setPlatformFee(platform.fee);
                    }}
                  >
                    {platform.name}
                  </button>
                ))}
              </div>
              {platformName === "Custom" ? (
                <div className="custom-fee"><Field id="custom-fee" label="Custom fee" suffix="%" value={platformFee} onChange={setPlatformFee} /></div>
              ) : (
                <p className="platform-note">{platformName} takes {platformFee}% from each transaction.</p>
              )}
            </Reveal>

            <Reveal className="net-card" delay={0.05}>
              <span>Net per sale</span>
              <strong>${stats.netPerUnit.toFixed(2)}</strong>
              <p>After the {platformName} fee is deducted from a ${price} sale.</p>
            </Reveal>
          </div>
        </section>

        <section className="section-shell calc-section">
          <StepHeading step="03" title="Profit simulator" description="Adjust sales volume to see the model respond." />

          <Reveal className="calc-card volume-card">
            <div><h3>Monthly sales volume</h3><p>Units sold per month</p></div>
            <output>{quantity.toLocaleString()} units</output>
            <input aria-label="Monthly sales volume" type="range" min="0" max="2500" value={quantity} onChange={(event) => setQuantity(Number.parseInt(event.target.value, 10))} />
            <div className="range-labels"><span>0</span><span>2,500</span></div>
          </Reveal>

          <div className="metric-grid">
            <Metric label="Gross revenue" value={`$${stats.revenue.toLocaleString()}`} color="#1264d8" />
            <Metric label="Net profit" value={`$${Math.round(stats.profit).toLocaleString()}`} color="#20a4f3" />
            <Metric label="Profit margin" value={`${stats.margin.toFixed(1)}%`} color="#715cff" />
            <Metric label="Return on investment" value={`${Math.round(stats.roi)}%`} color="#20c6e8" />
          </div>

          <div className="calc-grid-2 calc-results">
            <Reveal className="break-even-card">
              <span>Break-even point</span>
              <strong>{stats.breakEven}</strong>
              <h3>units</h3>
              <p>Sales after unit {stats.breakEven} contribute to profit after variable fees.</p>
            </Reveal>

            <Reveal className="calc-card" delay={0.05}>
              <h3>Cost breakdown</h3>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={56} outerRadius={86} paddingAngle={5} dataKey="value">
                      {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} stroke="none" />)}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-legend">
                {pieData.map((item) => (
                  <div key={item.name}><span><i style={{ background: item.color }} />{item.name}</span><strong>${item.value}</strong></div>
                ))}
                <div className="legend-total"><span>Total costs</span><strong>${Math.round(stats.totalCosts)}</strong></div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
