'use client';

import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Book, 
  ShieldAlert, 
  PlusCircle, 
  CheckCircle2, 
  Download, 
  Upload, 
  X, 
  Trash2,
  Sparkles
} from "lucide-react";

export default function BrandBrain() {
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [ruleType, setRuleType] = useState('Vocabulary');
  const [newDirective, setNewDirective] = useState('');
  const [rules, setRules] = useState([
    { id: 1, type: 'Vocabulary', directive: 'NEVER use the words "revolutionary", "game-changer", or "synergy".', status: 'Active' },
    { id: 2, type: 'Formatting', directive: 'Always include a verifiable statistic or data point in the first paragraph of blog posts.', status: 'Active' },
    { id: 3, type: 'Compliance', directive: 'Do not make guarantees about specific ROI percentages or revenue timelines.', status: 'Active' }
  ]);
  const [documents, setDocuments] = useState([
    { name: 'Brand_Guidelines_2024.pdf', size: '1.2 MB' },
    { name: 'Product_Features_Q3.csv', size: '450 KB' },
    { name: 'Customer_Testimonials.txt', size: '85 KB' }
  ]);
  const [exportNotice, setExportNotice] = useState(false);

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDirective.trim()) return;
    setRules([...rules, {
      id: Date.now(),
      type: ruleType,
      directive: newDirective.trim(),
      status: 'Active'
    }]);
    setNewDirective('');
    setShowAddRuleModal(false);
  };

  const handleDeleteRule = (id: number) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const handleExportRuleset = () => {
    const data = {
      brandVoice: "Authoritative but accessible. Data-backed, zero marketing fluff, directly addressing founder pain points.",
      primaryPersona: "The Scaling Founder",
      strictDirectives: rules,
      indexedDocuments: documents
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brand_brain_ruleset_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;
      setDocuments([...documents, { name: file.name, size: sizeStr }]);
      setShowUploadModal(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto p-4 text-[#fcfcf9] selection:bg-white/20">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[var(--hairline)] pb-6 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-vanilla-high)] tracking-tight font-display">
            Brand Brain
          </h1>
          <p className="text-[var(--text-vanilla-muted)] mt-2 text-sm">
            Interactive manager for brand rules, audience personas, and human directives.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportRuleset}
            className="btn-ghost flex items-center gap-2 text-xs py-2 px-3.5"
          >
            <Download size={14} />
            {exportNotice ? "Exported!" : "Export Ruleset"}
          </button>
          <button 
            onClick={() => setShowAddRuleModal(true)}
            className="btn-vanilla flex items-center gap-2 text-xs py-2 px-4 shadow-lg shadow-emerald-500/10"
          >
            <PlusCircle size={15} /> Add Rule
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Brand Voice & Personas */}
          <section className="velvet-card p-6">
            <div className="flex items-center gap-3 border-b border-[var(--hairline)] pb-4 mb-5">
              <BrainCircuit className="text-emerald-400" size={20} />
              <h2 className="text-lg font-bold text-white font-display">Voice & Personas</h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xs font-mono uppercase text-zinc-400 mb-2">Core Brand Voice</h3>
                <p className="text-xs text-zinc-300 bg-white/[0.02] p-4 border border-white/10 rounded-xl leading-relaxed">
                  Authoritative but accessible. We use data to back up our claims, avoid marketing fluff, and speak directly to the founder/executive's pain points. Tone is similar to a high-end business consultancy.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase text-zinc-400 mb-2">Primary Persona: The Scaling Founder</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/[0.02] p-4 border border-white/10 rounded-xl">
                    <h4 className="text-[11px] font-mono text-rose-400 uppercase mb-2">Pain Points</h4>
                    <ul className="text-xs text-zinc-300 list-disc pl-4 space-y-1">
                      <li>Customer acquisition costs (CAC) are rising</li>
                      <li>Content feels like an unpredictable black box</li>
                      <li>Lack of internal bandwidth for organic testing</li>
                    </ul>
                  </div>
                  <div className="bg-white/[0.02] p-4 border border-white/10 rounded-xl">
                    <h4 className="text-[11px] font-mono text-emerald-400 uppercase mb-2">Goals</h4>
                    <ul className="text-xs text-zinc-300 list-disc pl-4 space-y-1">
                      <li>Predictable revenue & retention growth</li>
                      <li>Establishing clear category thought leadership</li>
                      <li>Building a sustainable organic acquisition engine</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Strict Directives */}
          <section className="evidence-card p-6 border-rose-500/20">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-rose-400" size={20} />
                <h2 className="text-lg font-bold text-white font-display">Strict Directives (Guardrails)</h2>
              </div>
              <span className="badge badge-rose text-xs">Enforced in all AI generation</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-500 font-mono uppercase">
                    <th className="p-3">Rule Type</th>
                    <th className="p-3">Directive</th>
                    <th className="p-3 w-24">Status</th>
                    <th className="p-3 w-12 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <tr key={rule.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="p-3"><span className="badge badge-velvet">{rule.type}</span></td>
                      <td className="p-3 text-zinc-300">{rule.directive}</td>
                      <td className="p-3">
                        <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                          <CheckCircle2 size={12}/> Active
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => handleDeleteRule(rule.id)}
                          className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                          title="Delete Rule"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Sidebar: Knowledge Base */}
        <div className="flex flex-col gap-6">
          <div className="velvet-card p-6">
            <div className="flex items-center gap-3 border-b border-[var(--hairline)] pb-4 mb-4">
              <Book className="text-cyan-400" size={18} />
              <h3 className="text-base font-bold text-white font-display">Knowledge Base</h3>
            </div>
            
            <div className="flex flex-col gap-3">
              <p className="text-xs text-zinc-400 mb-2">
                Documents indexed for semantic RAG grounding across all script generation loops.
              </p>
              
              {documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-white/10 rounded-xl bg-white/[0.02]">
                  <span className="text-xs text-zinc-300 truncate max-w-[170px]">{doc.name}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{doc.size}</span>
                </div>
              ))}
              
              <button 
                onClick={() => setShowUploadModal(true)}
                className="btn-ghost w-full mt-3 text-xs py-2.5 justify-center flex items-center gap-2 border border-white/10"
              >
                <Upload size={14} /> Upload Document
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-md w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-white text-base">Add Brand Directive</h3>
              <button onClick={() => setShowAddRuleModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddRule} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">Rule Category</label>
                <select 
                  value={ruleType}
                  onChange={(e) => setRuleType(e.target.value)}
                  className="w-full bg-[#18181b] border border-white/15 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-400"
                >
                  <option value="Vocabulary">Vocabulary & Tone</option>
                  <option value="Formatting">Formatting & Structure</option>
                  <option value="Compliance">Legal & Compliance</option>
                  <option value="Competitor">Competitor Positioning</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">Directive Description</label>
                <textarea 
                  value={newDirective}
                  onChange={(e) => setNewDirective(e.target.value)}
                  placeholder="e.g. Always state that shipping is carbon-neutral in checkout calls to action."
                  rows={3}
                  className="w-full bg-white/[0.03] border border-white/15 text-white placeholder-zinc-500 rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddRuleModal(false)} 
                  className="btn-ghost text-xs py-2 px-3"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-vanilla text-xs py-2 px-4"
                >
                  Save Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-md w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-white text-base">Upload Knowledge Base Document</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center space-y-2 hover:border-emerald-500/40 transition-colors">
              <Upload className="w-8 h-8 text-zinc-400 mx-auto" />
              <p className="text-xs text-zinc-300 font-medium">Select PDF, CSV, or Markdown files</p>
              <p className="text-[11px] text-zinc-500">Files are converted into semantic vector embeddings.</p>
              <input 
                type="file" 
                onChange={handleFileUpload}
                accept=".pdf,.csv,.txt,.md"
                className="block mx-auto text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer pt-2"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setShowUploadModal(false)} className="btn-ghost text-xs py-2 px-3">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
