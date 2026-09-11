import { Megaphone, AlertCircle, BarChart, ArrowRight } from "lucide-react";

export default function CampaignStudio() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto p-4">
      <header className="flex justify-between items-end border-b border-[var(--hairline)] pb-6">
        <div>
          <h1 className="text-4xl font-bold text-[var(--text-vanilla-high)] tracking-tight">Campaign Studio</h1>
          <p className="text-[var(--text-vanilla-muted)] mt-2">Ad creative performance and conversion drop-off diagnosis.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-ghost">Connect Ad Account</button>
          <button className="btn-vanilla">Diagnose Active</button>
        </div>
      </header>

      {/* Funnel Diagnostics */}
      <section className="evidence-card">
        <div className="velvet-card-header">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-[var(--status-rose-text)]" size={20} />
            <h2 className="text-xl font-bold text-[var(--text-vanilla-high)]">Active Bottlenecks</h2>
          </div>
          <span className="badge badge-rose">1 Critical Issue</span>
        </div>
        
        <div className="velvet-card-body">
          <div className="metric-well flex flex-col md:flex-row gap-6 md:items-center justify-between border border-[var(--status-rose-border)] bg-[var(--status-rose-bg)]">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[var(--text-vanilla-high)]">Q3 Webinar: "Mastering Retention"</h3>
              <p className="text-sm text-[var(--text-vanilla-body)] mt-2">
                <strong>Diagnosis:</strong> The ad creative is highly effective (CTR 4.2%), but the landing page is failing to convert (Conversion Rate 1.1%). The drop-off is likely due to a mismatch between the ad's problem-focused hook and the landing page's feature-focused copy.
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-center">
                <span className="block text-2xl font-bold font-mono text-[var(--status-emerald-text)]">4.2%</span>
                <span className="text-[10px] uppercase font-mono text-[var(--text-vanilla-subtle)]">Ad CTR</span>
              </div>
              <ArrowRight className="text-[var(--text-vanilla-muted)]" size={24} />
              <div className="text-center">
                <span className="block text-2xl font-bold font-mono text-[var(--status-rose-text)]">1.1%</span>
                <span className="text-[10px] uppercase font-mono text-[var(--text-vanilla-subtle)]">LP Conv.</span>
              </div>
            </div>
            <div className="flex-none">
              <button className="btn-vanilla bg-[var(--status-rose-text)] text-white border-transparent hover:bg-red-500 hover:text-white">Fix Landing Page</button>
            </div>
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="velvet-card">
        <div className="velvet-card-header">
          <div className="flex items-center gap-3">
            <Megaphone className="text-[var(--text-vanilla-high)]" size={20} />
            <h2 className="text-lg font-bold text-[var(--text-vanilla-high)]">Active Campaigns</h2>
          </div>
        </div>
        
        <div className="velvet-card-body p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--hairline)]">
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Campaign Name</th>
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Status</th>
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Spend</th>
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">ROAS</th>
                <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--hairline)] hover:bg-[var(--bg-velvet-layer2)] transition-colors">
                <td className="p-4 text-[var(--text-vanilla-high)] font-medium">Evergreen: Brand Awareness</td>
                <td className="p-4"><span className="badge badge-emerald">Active</span></td>
                <td className="p-4 text-[var(--text-vanilla-body)] font-mono">$4,250</td>
                <td className="p-4 text-[var(--status-emerald-text)] font-mono">2.8x</td>
                <td className="p-4"><button className="btn-ghost text-xs py-1.5 px-3">View Details</button></td>
              </tr>
              <tr className="border-b border-[var(--hairline)] hover:bg-[var(--bg-velvet-layer2)] transition-colors bg-[var(--status-rose-bg)]">
                <td className="p-4 text-[var(--text-vanilla-high)] font-medium">Q3 Webinar: "Mastering Retention"</td>
                <td className="p-4"><span className="badge badge-rose">Bottleneck</span></td>
                <td className="p-4 text-[var(--text-vanilla-body)] font-mono">$1,800</td>
                <td className="p-4 text-[var(--status-rose-text)] font-mono">0.4x</td>
                <td className="p-4"><button className="btn-ghost text-xs py-1.5 px-3">Diagnose</button></td>
              </tr>
              <tr className="border-b border-[var(--hairline)] hover:bg-[var(--bg-velvet-layer2)] transition-colors">
                <td className="p-4 text-[var(--text-vanilla-high)] font-medium">Retargeting: Pricing Page Visitors</td>
                <td className="p-4"><span className="badge badge-emerald">Active</span></td>
                <td className="p-4 text-[var(--text-vanilla-body)] font-mono">$850</td>
                <td className="p-4 text-[var(--status-emerald-text)] font-mono">4.1x</td>
                <td className="p-4"><button className="btn-ghost text-xs py-1.5 px-3">View Details</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
