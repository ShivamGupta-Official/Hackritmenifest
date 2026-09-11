'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Send, 
  ShieldCheck, 
  Eye, 
  RefreshCw,
  Clock,
  UserCheck,
  ChevronRight,
  Flame
} from 'lucide-react';

interface GeneratedAssetBrief {
  objective?: string;
  targetAudience?: string;
  hookHeadline: string;
  hookVisualCue: string;
  bodyPoints: string[];
  callToAction: string;
  groundingDNAEvidence?: string;
}

interface WorkflowStep {
  step: string;
  timestamp: string;
  actor: string;
  notes?: string;
}

interface GeneratedAsset {
  id: string;
  title: string;
  assetType: string;
  brief: GeneratedAssetBrief;
  aiOriginLikelihood: number;
  confidenceTier: string;
  originClassification: string;
  linguisticSignals?: {
    perplexityScore: number;
    burstinessScore: number;
    repetitivePhrasing: boolean;
  };
  workflowSteps: WorkflowStep[];
  status: string;
  createdAt: string;
}

export default function ContentStudioPage() {
  const [topic, setTopic] = useState('food');
  const [format, setFormat] = useState('reel_script');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<'idle' | 'strategist' | 'creator' | 'critic'>('idle');
  const [currentAsset, setCurrentAsset] = useState<GeneratedAsset | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedHeadline, setEditedHeadline] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [editedCta, setEditedCta] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const quickTopics = ['food', 'fitness & recovery', 'ai productivity', 'clean skincare', 'saas growth'];

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) {
      setErrorMessage('Please enter a target topic or trend.');
      return;
    }

    setErrorMessage('');
    setIsGenerating(true);
    setIsApproved(false);
    setIsEditing(false);

    // Step animation sequence
    setGenerationStep('strategist');
    const timer1 = setTimeout(() => setGenerationStep('creator'), 600);
    const timer2 = setTimeout(() => setGenerationStep('critic'), 1200);

    try {
      const res = await fetch('/api/studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          assetType: format,
          orgId: 'org_example_fitness',
          actorName: 'Lead Creator'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.asset) {
        throw new Error(data.error || 'Failed to generate brief');
      }

      setCurrentAsset(data.asset);
      setEditedHeadline(data.asset.brief?.hookHeadline || '');
      setEditedBody(data.asset.brief?.bodyPoints?.join('\n\n') || '');
      setEditedCta(data.asset.brief?.callToAction || '');
    } catch (err: any) {
      console.error('Studio generation error:', err);
      setErrorMessage(err.message || 'Generation failed. Please try again.');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsGenerating(false);
      setGenerationStep('idle');
    }
  };

  const handleSaveEdit = () => {
    if (!currentAsset) return;
    const updatedAsset: GeneratedAsset = {
      ...currentAsset,
      brief: {
        ...currentAsset.brief,
        hookHeadline: editedHeadline,
        bodyPoints: editedBody.split('\n\n').filter(Boolean),
        callToAction: editedCta
      },
      workflowSteps: [
        ...currentAsset.workflowSteps,
        {
          step: 'human_edit',
          timestamp: new Date().toISOString(),
          actor: 'Human Editor',
          notes: 'Refined hook headline and narrative flow in Content Studio.'
        }
      ]
    };
    setCurrentAsset(updatedAsset);
    setIsEditing(false);
  };

  const handleApprove = () => {
    if (!currentAsset) return;
    const approvedAsset: GeneratedAsset = {
      ...currentAsset,
      status: 'approved',
      workflowSteps: [
        ...currentAsset.workflowSteps,
        {
          step: 'approval',
          timestamp: new Date().toISOString(),
          actor: 'Creative Director',
          notes: 'Approved for production pipeline.'
        }
      ]
    };
    setCurrentAsset(approvedAsset);
    setIsApproved(true);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto font-sans text-[#fcfcf9] selection:bg-white/20">
      {/* Page Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>LOOPAGENT WORKSPACE v2.4</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white mb-2">
              Content Studio
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
              Draft, audit, and approve high-converting content briefs using the autonomous Creator ↔ Critic loop grounded in Company Brain.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="badge badge-emerald text-xs">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Brand Safety Guard Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Brief Generator Card (5 Cols) */}
        <div className="lg:col-span-5 velvet-card p-6 sm:p-7 border border-white/15 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Cpu className="w-4 h-4 text-emerald-400" />
              </div>
              <h2 className="text-lg font-display font-bold text-white tracking-tight">Brief Generator</h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">Groq Multi-Agent</span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Target Topic Input */}
            <div>
              <label className="block text-xs font-mono font-medium text-zinc-300 mb-2 uppercase tracking-wider">
                Target Topic / Trend
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. food, recovery routines, high-protein snacks"
                className="w-full bg-white/[0.04] border border-white/15 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
              />

              {/* Quick Topic Chips */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="text-[11px] text-zinc-500 mr-1 flex items-center">
                  <Flame className="w-3 h-3 mr-0.5 text-amber-400" /> Ideas:
                </span>
                {quickTopics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      topic.toLowerCase() === t.toLowerCase()
                        ? 'bg-white/20 text-white border-white/30'
                        : 'bg-white/[0.02] text-zinc-400 border-white/5 hover:border-white/20 hover:text-zinc-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Asset Format Selector */}
            <div>
              <label className="block text-xs font-mono font-medium text-zinc-300 mb-2 uppercase tracking-wider">
                Asset Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-[#18181b] border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all cursor-pointer"
              >
                <option value="reel_script">15-30s Short-Form Video Script (Reel / TikTok / Shorts)</option>
                <option value="carousel">Multi-Slide Carousel Breakdown (LinkedIn / Instagram)</option>
                <option value="blog_brief">Editorial Narrative Article / Newsletter</option>
                <option value="ad_variant">Paid Conversion Ad Creative</option>
              </select>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className="w-full btn-vanilla py-3.5 px-5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>
                    {generationStep === 'strategist' && 'Step 1/3: Strategist Synthesizing Hook...'}
                    {generationStep === 'creator' && 'Step 2/3: Creator Drafting Narrative...'}
                    {generationStep === 'critic' && 'Step 3/3: Critic Auditing Rules...'}
                    {generationStep === 'idle' && 'Running LoopAgent Swarm...'}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Generate Brief</span>
                </>
              )}
            </button>
          </form>

          {/* Workflow Architecture Footnote */}
          <div className="mt-6 pt-5 border-t border-white/10 text-xs text-zinc-500 flex items-center justify-between">
            <span>Powered by Groq Swarm</span>
            <div className="flex items-center gap-1 font-mono text-[11px] text-zinc-400">
              <span>Strategist</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span>Creator</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span>Critic</span>
            </div>
          </div>
        </div>

        {/* Right Column: Current Draft & Multi-Agent Lineage (7 Cols) */}
        <div className="lg:col-span-7 velvet-card p-6 sm:p-7 border border-white/15 rounded-2xl shadow-xl flex flex-col min-h-[580px]">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between pb-5 mb-5 border-b border-white/10 gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-white tracking-tight">Current Draft</h2>
                <p className="text-xs text-zinc-400">Verified Output & Critic Audit</p>
              </div>
            </div>

            {currentAsset && (
              <div className="flex items-center gap-2">
                <span className="badge badge-emerald text-xs">
                  {currentAsset.assetType?.replace('_', ' ').toUpperCase()}
                </span>
                {isApproved && (
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Content Body */}
          <div className="flex-1 flex flex-col justify-between">
            {isGenerating ? (
              /* Generating Skeleton State */
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/15 flex items-center justify-center mb-5 animate-pulse">
                  <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
                </div>
                <h3 className="text-base font-display font-semibold text-white mb-2">
                  LoopAgent Swarm In Progress
                </h3>
                <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
                  Synthesizing high-retention hooks and auditing against Acme brand guidelines...
                </p>
                <div className="w-full max-w-xs bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-white h-full animate-pulse w-3/4" />
                </div>
              </div>
            ) : !currentAsset ? (
              /* Empty Placeholder State */
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-5 text-zinc-500">
                  <Sparkles className="w-7 h-7 text-zinc-400" />
                </div>
                <h3 className="text-base font-display font-semibold text-white mb-2">
                  No draft generated yet
                </h3>
                <p className="text-sm text-zinc-400 max-w-sm leading-relaxed mb-6">
                  Select a target topic like <span className="text-white font-medium">"{topic || 'food'}"</span> on the left and click <span className="text-white font-medium">Generate Brief</span> to launch the autonomous LoopAgent.
                </p>
                <button
                  type="button"
                  onClick={() => handleGenerate()}
                  className="btn-ghost text-xs px-4 py-2 border border-white/15 rounded-xl hover:border-white/30"
                >
                  Generate sample brief now →
                </button>
              </div>
            ) : isEditing ? (
              /* Inline Edit Mode */
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">Hook Headline</label>
                  <input
                    type="text"
                    value={editedHeadline}
                    onChange={(e) => setEditedHeadline(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/20 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">Narrative Body Points</label>
                  <textarea
                    rows={6}
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/20 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-white/40 font-mono leading-relaxed"
                    placeholder="Separate distinct points with double line breaks"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">Call To Action (CTA)</label>
                  <input
                    type="text"
                    value={editedCta}
                    onChange={(e) => setEditedCta(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/20 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="btn-vanilla py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    Save & Re-Audit Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-ghost py-2.5 px-4 text-xs rounded-xl border border-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Verified Output Display */
              <div className="space-y-5 overflow-y-auto max-h-[480px] pr-1">
                {/* Hook Card */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                      Frame 1 Visual & Hook (0-3s)
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">Attention Anchor</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-white leading-snug mb-2">
                    "{currentAsset.brief?.hookHeadline}"
                  </h3>
                  {currentAsset.brief?.hookVisualCue && (
                    <p className="text-xs text-zinc-400 italic bg-black/40 p-2.5 rounded-lg border border-white/5">
                      🎬 <span className="font-semibold text-zinc-300">Visual Cue:</span> {currentAsset.brief.hookVisualCue}
                    </p>
                  )}
                </div>

                {/* Key Body Points */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                    Core Value Delivery Beats
                  </label>
                  {currentAsset.brief?.bodyPoints?.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3 text-sm text-zinc-200"
                    >
                      <span className="w-5 h-5 rounded-full bg-white/10 text-white text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{pt}</p>
                    </div>
                  ))}
                </div>

                {/* Call To Action */}
                <div className="p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-semibold mb-0.5">
                      Conversion Trigger
                    </span>
                    <p className="text-sm font-medium text-emerald-200">{currentAsset.brief?.callToAction}</p>
                  </div>
                  <Send className="w-4 h-4 text-emerald-400 shrink-0 ml-3" />
                </div>

                {/* Critic Review & Provenance Badge Row */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Critic Review
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-2">
                      {currentAsset.workflowSteps?.find(s => s.step === 'critic_review')?.notes || 'Compliant with all brand rules and filters.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 mb-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      AI Origin Score
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      {currentAsset.aiOriginLikelihood}% Human-Crafted Score ({currentAsset.originClassification?.replace('_', ' ')})
                    </p>
                  </div>
                </div>

                {/* Provenance Trail */}
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                    Verified Agent Lineage
                  </span>
                  <div className="space-y-1.5">
                    {currentAsset.workflowSteps?.map((step, sIdx) => (
                      <div key={sIdx} className="text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                        <span className="text-zinc-300">
                          {sIdx + 1}. {step.step.replace('_', ' ').toUpperCase()} ({step.actor})
                        </span>
                        <span className="text-zinc-500 text-[10px]">
                          {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons Footer */}
            {currentAsset && !isEditing && (
              <div className="flex flex-wrap gap-3 pt-5 mt-5 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn-ghost flex-1 py-2.5 px-4 rounded-xl border border-white/20 text-xs font-medium text-zinc-200 hover:text-white flex items-center justify-center gap-1.5 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Human Edit
                </button>

                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={isApproved}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isApproved
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg hover:shadow-emerald-500/20'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isApproved ? 'Approved & Ready' : 'Approve & Publish'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
