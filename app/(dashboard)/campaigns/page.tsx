'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Megaphone, 
  AlertCircle, 
  BarChart, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  X,
  Layers,
  Sparkles,
  Link2
} from "lucide-react";

export default function CampaignStudio() {
  const router = useRouter();
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [adConnected, setAdConnected] = useState(false);

  const handleDiagnose = () => {
    setIsDiagnosing(true);
    setTimeout(() => {
      setIsDiagnosing(false);
    }, 1200);
  };

  const campaigns = [
    {
      id: 'camp-1',
      name: 'Evergreen: Brand Awareness',
      status: 'Active',
      badgeClass: 'badge-emerald',
      spend: '$4,250',
      roas: '2.8x',
      ctr: '3.4%',
      cpc: '$0.84',
      recommendation: 'Creative scaling well. Maintain current daily budget and test 2 new hook variations.'
    },
    {
      id: 'camp-2',
      name: 'Q3 Webinar: "Mastering Retention"',
      status: 'Bottleneck',
      badgeClass: 'badge-rose',
      spend: '$1,800',
      roas: '0.4x',
      ctr: '4.2%',
      cpc: '$0.62',
      recommendation: 'Ad click-through is high (4.2%) but landing page bounce rate is 68%. Align headline with ad promise.'
    },
    {
      id: 'camp-3',
      name: 'Retargeting: Pricing Page Visitors',
      status: 'Active',
      badgeClass: 'badge-emerald',
      spend: '$850',
      roas: '4.1x',
      ctr: '5.6%',
      cpc: '$1.12',
      recommendation: 'High-intent audience. Add dynamic social proof testimonials to push conversion higher.'
    }
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto p-4 text-[#fcfcf9] selection:bg-white/20">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[var(--hairline)] pb-6 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-vanilla-high)] tracking-tight font-display">
            Campaign Studio
          </h1>
          <p className="text-[var(--text-vanilla-muted)] mt-2 text-sm">
            Ad creative performance and conversion drop-off diagnosis.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowConnectModal(true)}
            className="btn-ghost flex items-center gap-2 text-xs py-2 px-3.5"
          >
            <Link2 size={14} />
            {adConnected ? "Meta Ads Connected" : "Connect Ad Account"}
          </button>
          <button 
            onClick={handleDiagnose}
            disabled={isDiagnosing}
            className="btn-vanilla flex items-center gap-2 text-xs py-2 px-4 shadow-lg shadow-emerald-500/10"
          >
            <RefreshCw size={14} className={isDiagnosing ? "animate-spin text-emerald-400" : ""} />
            {isDiagnosing ? "Diagnosing Creatives..." : "Diagnose Active"}
          </button>
        </div>
      </header>

      {/* Funnel Diagnostics Banner */}
      <section className="evidence-card p-6">
        <div className="flex items-center justify-between border-b border-rose-500/20 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="text-rose-400" size={20} />
            <h2 className="text-lg font-bold text-white font-display">Active Bottleneck</h2>
          </div>
          <span className="badge badge-rose text-xs">1 Critical Issue</span>
        </div>
        
        <div className="metric-well p-5 flex flex-col md:flex-row gap-6 md:items-center justify-between border border-rose-500/30 bg-rose-950/20 rounded-xl">
          <div className="flex-1">
            <h3 className="text-base font-bold text-white font-display">Q3 Webinar: "Mastering Retention"</h3>
            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              <strong>Diagnosis:</strong> The ad creative is highly effective (CTR 4.2%), but the landing page is failing to convert (Conversion Rate 1.1%). The drop-off is caused by a mismatch between the ad's problem-focused hook and the landing page's feature-focused copy.
            </p>
          </div>
          <div className="flex gap-4 items-center shrink-0">
            <div className="text-center">
              <span className="block text-2xl font-bold font-mono text-emerald-400">4.2%</span>
              <span className="text-[10px] uppercase font-mono text-zinc-400">Ad CTR</span>
            </div>
            <ArrowRight className="text-zinc-500" size={20} />
            <div className="text-center">
              <span className="block text-2xl font-bold font-mono text-rose-400">1.1%</span>
              <span className="text-[10px] uppercase font-mono text-zinc-400">LP Conv.</span>
            </div>
          </div>
          <div className="flex-none">
            <button 
              onClick={() => router.push('/studio?topic=Q3%20Webinar%20Landing%20Page%20Harmonization')}
              className="btn-vanilla !bg-rose-600 hover:!bg-rose-500 !text-white text-xs py-2 px-4 shadow-lg shadow-rose-600/20"
            >
              Fix Landing Page →
            </button>
          </div>
        </div>
      </section>

      {/* Active Campaigns Table */}
      <section className="velvet-card p-6">
        <div className="flex items-center gap-3 border-b border-[var(--hairline)] pb-4 mb-4">
          <Megaphone className="text-[var(--text-vanilla-high)]" size={20} />
          <h2 className="text-lg font-bold text-[var(--text-vanilla-high)] font-display">Active Campaigns</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[var(--hairline)] text-zinc-500 font-mono uppercase">
                <th className="p-3">Campaign Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Spend</th>
                <th className="p-3">ROAS</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((camp) => (
                <tr key={camp.id} className="border-b border-[var(--hairline)] hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 text-white font-medium">{camp.name}</td>
                  <td className="p-3">
                    <span className={`badge ${camp.badgeClass}`}>{camp.status}</span>
                  </td>
                  <td className="p-3 text-zinc-300 font-mono">{camp.spend}</td>
                  <td className={`p-3 font-mono font-semibold ${
                    parseFloat(camp.roas) >= 2.0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {camp.roas}
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => setSelectedCampaign(camp)}
                      className="btn-ghost text-xs py-1.5 px-3"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Connect Ad Account Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-md w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-white text-base">Connect Advertising Account</h3>
              <button onClick={() => setShowConnectModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <p>Select your ad network to sync live campaign metrics and drop-off analytics:</p>
              
              <button 
                onClick={() => {
                  setAdConnected(true);
                  setShowConnectModal(false);
                }}
                className="w-full p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 flex items-center justify-between text-left transition-all"
              >
                <div>
                  <div className="font-semibold text-white">Meta Ads Manager</div>
                  <div className="text-[11px] text-zinc-500">Instagram & Facebook Ads</div>
                </div>
                <span className="badge badge-emerald text-[10px]">Connect</span>
              </button>

              <button 
                onClick={() => {
                  setAdConnected(true);
                  setShowConnectModal(false);
                }}
                className="w-full p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 flex items-center justify-between text-left transition-all"
              >
                <div>
                  <div className="font-semibold text-white">TikTok Ads for Business</div>
                  <div className="text-[11px] text-zinc-500">Short-form Video Campaigns</div>
                </div>
                <span className="badge badge-emerald text-[10px]">Connect</span>
              </button>

              <button 
                onClick={() => {
                  setAdConnected(true);
                  setShowConnectModal(false);
                }}
                className="w-full p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 flex items-center justify-between text-left transition-all"
              >
                <div>
                  <div className="font-semibold text-white">Google / YouTube Ads</div>
                  <div className="text-[11px] text-zinc-500">Search, Display & Video</div>
                </div>
                <span className="badge badge-emerald text-[10px]">Connect</span>
              </button>
            </div>

            <div className="flex justify-end pt-3 border-t border-white/10">
              <button onClick={() => setShowConnectModal(false)} className="btn-ghost text-xs py-2 px-3">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-lg w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-display font-bold text-white text-base">{selectedCampaign.name}</h3>
                <span className={`badge ${selectedCampaign.badgeClass} text-[10px] mt-1`}>{selectedCampaign.status}</span>
              </div>
              <button onClick={() => setSelectedCampaign(null)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-xl text-center">
              <div>
                <span className="text-zinc-500 font-mono text-[10px] uppercase block">Total Spend</span>
                <span className="text-white font-bold font-mono text-sm">{selectedCampaign.spend}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono text-[10px] uppercase block">Click-Through</span>
                <span className="text-emerald-400 font-bold font-mono text-sm">{selectedCampaign.ctr}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono text-[10px] uppercase block">ROAS</span>
                <span className="text-cyan-400 font-bold font-mono text-sm">{selectedCampaign.roas}</span>
              </div>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl text-xs text-zinc-300">
              <strong>AI Recommendation:</strong> {selectedCampaign.recommendation}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button onClick={() => setSelectedCampaign(null)} className="btn-ghost text-xs py-2 px-3">
                Close
              </button>
              <button 
                onClick={() => {
                  const name = selectedCampaign.name;
                  setSelectedCampaign(null);
                  router.push(`/studio?topic=${encodeURIComponent(name + ' Ad Variations')}`);
                }}
                className="btn-vanilla text-xs py-2 px-4"
              >
                Generate Creative Iteration →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
