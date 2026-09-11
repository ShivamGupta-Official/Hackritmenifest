import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-3xl mb-12">
        <h1 className="text-5xl font-display font-bold text-vanilla-high mb-6 tracking-tight">
          Content<span className="text-vanilla-subtle">OS</span>
        </h1>
        <p className="text-xl text-vanilla-body mb-8">
          The evidence-driven marketing intelligence operating system. Connect organic content, audience signals, Content DNA, and advertising campaigns into a continuous growth loop.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <Link href="/dashboard" className="velvet-card hover:-translate-y-1 transition-transform cursor-pointer no-underline block text-left">
          <div className="velvet-card-body">
            <h2 className="text-xl font-bold text-vanilla-high mb-2">Executive Overview</h2>
            <p className="text-sm text-vanilla-subtle mb-4">Health scores, growth signals, and active alerts across your ContentOS.</p>
            <span className="text-sm font-medium text-status-emerald-text">Go to Dashboard →</span>
          </div>
        </Link>

        <Link href="/intelligence" className="velvet-card hover:-translate-y-1 transition-transform cursor-pointer no-underline block text-left">
          <div className="velvet-card-body">
            <h2 className="text-xl font-bold text-vanilla-high mb-2">Content Intelligence</h2>
            <p className="text-sm text-vanilla-subtle mb-4">Visual breakdown of winning hooks, formats, and statistical win rates.</p>
            <span className="text-sm font-medium text-status-emerald-text">Explore DNA →</span>
          </div>
        </Link>

        <Link href="/radar" className="velvet-card hover:-translate-y-1 transition-transform cursor-pointer no-underline block text-left">
          <div className="velvet-card-body">
            <h2 className="text-xl font-bold text-vanilla-high mb-2">Trend Radar</h2>
            <p className="text-sm text-vanilla-subtle mb-4">Scored commercial opportunities with supporting evidence.</p>
            <span className="text-sm font-medium text-status-emerald-text">View Radar →</span>
          </div>
        </Link>

        <Link href="/campaigns" className="velvet-card hover:-translate-y-1 transition-transform cursor-pointer no-underline block text-left">
          <div className="velvet-card-body">
            <h2 className="text-xl font-bold text-vanilla-high mb-2">Campaign Studio</h2>
            <p className="text-sm text-vanilla-subtle mb-4">Ad creative performance and conversion drop-off diagnosis.</p>
            <span className="text-sm font-medium text-status-emerald-text">Diagnose Funnels →</span>
          </div>
        </Link>

        <Link href="/brain" className="velvet-card hover:-translate-y-1 transition-transform cursor-pointer no-underline block text-left">
          <div className="velvet-card-body">
            <h2 className="text-xl font-bold text-vanilla-high mb-2">Brand Brain</h2>
            <p className="text-sm text-vanilla-subtle mb-4">Interactive manager for brand rules, audience personas, and directives.</p>
            <span className="text-sm font-medium text-status-emerald-text">Manage Rules →</span>
          </div>
        </Link>

        <Link href="/studio" className="velvet-card hover:-translate-y-1 transition-transform cursor-pointer no-underline block text-left">
          <div className="velvet-card-body">
            <h2 className="text-xl font-bold text-vanilla-high mb-2">Content Studio</h2>
            <p className="text-sm text-vanilla-subtle mb-4">Draft, refine, and approve content using the LoopAgent and Company Brain.</p>
            <span className="text-sm font-medium text-status-emerald-text">Create Content →</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
