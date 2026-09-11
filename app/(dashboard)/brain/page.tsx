import { BrainCircuit, Book, ShieldAlert, PlusCircle } from "lucide-react";

export default function BrandBrain() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto p-4">
      <header className="flex justify-between items-end border-b border-[var(--hairline)] pb-6">
        <div>
          <h1 className="text-4xl font-bold text-[var(--text-vanilla-high)] tracking-tight">Brand Brain</h1>
          <p className="text-[var(--text-vanilla-muted)] mt-2">Interactive manager for brand rules, audience personas, and human directives.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-ghost">Export Ruleset</button>
          <button className="btn-vanilla"><PlusCircle size={16} className="mr-1"/> Add Rule</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Brand Voice & Personas */}
          <section className="velvet-card">
            <div className="velvet-card-header">
              <div className="flex items-center gap-3">
                <BrainCircuit className="text-[var(--text-vanilla-high)]" size={20} />
                <h2 className="text-lg font-bold text-[var(--text-vanilla-high)]">Voice & Personas</h2>
              </div>
            </div>
            
            <div className="velvet-card-body flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-vanilla-high)] mb-2">Core Brand Voice</h3>
                <p className="text-sm text-[var(--text-vanilla-body)] bg-[var(--bg-velvet-inset)] p-4 border border-[var(--hairline)] rounded-md">
                  Authoritative but accessible. We use data to back up our claims, avoid marketing fluff, and speak directly to the founder/executive's pain points. Tone is similar to a high-end business consultancy.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--text-vanilla-high)] mb-2">Primary Persona: The Scaling Founder</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[var(--bg-velvet-inset)] p-4 border border-[var(--hairline)] rounded-md">
                    <h4 className="text-xs font-mono text-[var(--text-vanilla-muted)] uppercase mb-2">Pain Points</h4>
                    <ul className="text-sm text-[var(--text-vanilla-body)] list-disc pl-4 space-y-1">
                      <li>Customer acquisition costs (CAC) are rising</li>
                      <li>Content feels like a black box</li>
                      <li>Lack of time for marketing execution</li>
                    </ul>
                  </div>
                  <div className="bg-[var(--bg-velvet-inset)] p-4 border border-[var(--hairline)] rounded-md">
                    <h4 className="text-xs font-mono text-[var(--text-vanilla-muted)] uppercase mb-2">Goals</h4>
                    <ul className="text-sm text-[var(--text-vanilla-body)] list-disc pl-4 space-y-1">
                      <li>Predictable revenue growth</li>
                      <li>Establishing thought leadership</li>
                      <li>Building a sustainable acquisition engine</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Strict Directives */}
          <section className="evidence-card border-[var(--status-rose-border)]">
            <div className="velvet-card-header border-[var(--status-rose-border)] bg-[rgba(248,113,113,0.03)]">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-[var(--status-rose-text)]" size={20} />
                <h2 className="text-lg font-bold text-[var(--text-vanilla-high)]">Strict Directives (Guardrails)</h2>
              </div>
              <span className="badge badge-rose">Enforced in all AI generation</span>
            </div>
            
            <div className="velvet-card-body p-0">
               <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--hairline)]">
                    <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Rule Type</th>
                    <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase">Directive</th>
                    <th className="p-4 text-xs font-mono text-[var(--text-vanilla-muted)] uppercase w-24">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--hairline)]">
                    <td className="p-4"><span className="badge badge-velvet">Vocabulary</span></td>
                    <td className="p-4 text-[var(--text-vanilla-body)] text-sm">NEVER use the words "revolutionary", "game-changer", or "synergy".</td>
                    <td className="p-4"><span className="text-[var(--status-emerald-text)] flex items-center gap-1 text-xs font-mono"><CheckCircle2 size={12}/> Active</span></td>
                  </tr>
                  <tr className="border-b border-[var(--hairline)]">
                    <td className="p-4"><span className="badge badge-velvet">Formatting</span></td>
                    <td className="p-4 text-[var(--text-vanilla-body)] text-sm">Always include a verifiable statistic or data point in the first paragraph of blog posts.</td>
                    <td className="p-4"><span className="text-[var(--status-emerald-text)] flex items-center gap-1 text-xs font-mono"><CheckCircle2 size={12}/> Active</span></td>
                  </tr>
                  <tr className="border-b border-[var(--hairline)]">
                    <td className="p-4"><span className="badge badge-velvet">Compliance</span></td>
                    <td className="p-4 text-[var(--text-vanilla-body)] text-sm">Do not make guarantees about specific ROI percentages or revenue timelines.</td>
                    <td className="p-4"><span className="text-[var(--status-emerald-text)] flex items-center gap-1 text-xs font-mono"><CheckCircle2 size={12}/> Active</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="velvet-card">
            <div className="velvet-card-header">
              <div className="flex items-center gap-3">
                <Book className="text-[var(--text-vanilla-high)]" size={18} />
                <h3 className="text-md font-bold text-[var(--text-vanilla-high)]">Knowledge Base</h3>
              </div>
            </div>
            <div className="velvet-card-body flex flex-col gap-3">
              <p className="text-xs text-[var(--text-vanilla-muted)] mb-2">Documents currently indexed and used for RAG context.</p>
              
              <div className="flex items-center justify-between p-3 border border-[var(--hairline)] rounded bg-[var(--bg-velvet-inset)]">
                <span className="text-sm text-[var(--text-vanilla-body)] truncate max-w-[160px]">Brand_Guidelines_2024.pdf</span>
                <span className="text-[10px] text-[var(--text-vanilla-muted)] font-mono">1.2 MB</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-[var(--hairline)] rounded bg-[var(--bg-velvet-inset)]">
                <span className="text-sm text-[var(--text-vanilla-body)] truncate max-w-[160px]">Product_Features_Q3.csv</span>
                <span className="text-[10px] text-[var(--text-vanilla-muted)] font-mono">450 KB</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-[var(--hairline)] rounded bg-[var(--bg-velvet-inset)]">
                <span className="text-sm text-[var(--text-vanilla-body)] truncate max-w-[160px]">Customer_Testimonials.txt</span>
                <span className="text-[10px] text-[var(--text-vanilla-muted)] font-mono">85 KB</span>
              </div>
              
              <button className="btn-ghost w-full mt-2 text-xs py-2 justify-center">Upload Document</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ensure CheckCircle2 is imported if used in the table
import { CheckCircle2 } from "lucide-react";
