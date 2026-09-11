'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Settings, 
  LogOut, 
  Hash, 
  ChevronDown, 
  ChevronRight, 
  Inbox, 
  Calendar, 
  Activity, 
  CreditCard, 
  Globe, 
  Terminal, 
  Blocks, 
  Command, 
  Sparkles, 
  X,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Zap,
  Plus,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export type NavItemData = {
  id: string;
  title: string;
  icon: React.ElementType;
  badge?: number | string;
  shortcut?: string;
  href?: string;
  children?: NavItemData[];
  action?: () => void;
};

export type NavGroupData = {
  heading?: string;
  items: NavItemData[];
};

function WorkspaceSwitcher({ 
  selected, 
  onSelect,
  workspaces,
  onAddWorkspace
}: { 
  selected?: string, 
  onSelect?: (ws: string) => void,
  workspaces: string[],
  onAddWorkspace: (name: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNewWsModal, setShowNewWsModal] = useState(false);
  const [newWsName, setNewWsName] = useState('');
  const [internalSelected, setInternalSelected] = useState('Acme Corp');
  
  const current = selected || internalSelected;
  const handleSelect = onSelect || setInternalSelected;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWsName.trim()) {
      onAddWorkspace(newWsName.trim());
      handleSelect(newWsName.trim());
      setNewWsName('');
      setShowNewWsModal(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-2 py-2 mb-4 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors select-none group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[6px] bg-primary text-primary-foreground flex items-center justify-center font-semibold text-[13px] shadow-sm">
            {current.charAt(0)}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[13px] font-medium leading-none mb-1 text-foreground truncate max-w-[120px]">{current}</span>
            <span className="text-[11px] text-muted-foreground leading-none">Pro Plan</span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground/50 group-hover:text-foreground/70 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-[52px] left-0 w-full bg-[#18181b] border border-white/15 rounded-xl shadow-2xl shadow-black/90 z-50 p-1.5 flex flex-col gap-1 backdrop-blur-2xl animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200 ease-out">
            <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Workspaces
            </div>
            {workspaces.map(ws => {
              const isSelected = current === ws;
              return (
                <div 
                  key={ws}
                  onClick={() => { handleSelect(ws); setIsOpen(false); }}
                  className={`flex items-center justify-between px-3 py-2 text-[13px] rounded-lg cursor-pointer transition-all duration-150 ${
                    isSelected 
                      ? 'bg-emerald-500/15 text-emerald-300 font-medium border border-emerald-500/30' 
                      : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                      isSelected ? 'bg-emerald-500 text-black' : 'bg-white/10 text-zinc-300'
                    }`}>
                      {ws.charAt(0)}
                    </div>
                    <span className="truncate">{ws}</span>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                  )}
                </div>
              );
            })}
            <div className="h-px bg-white/10 my-1 mx-1" />
            <div 
              onClick={() => { setShowNewWsModal(true); setIsOpen(false); }}
              className="px-3 py-2 text-[12px] font-medium text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer flex items-center gap-2 transition-colors"
            >
              <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[13px] leading-none text-white">+</span>
              <span>Create Workspace</span>
            </div>
          </div>
        </>
      )}

      {showNewWsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-sm w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-white text-base">New Workspace</h3>
              <button onClick={() => setShowNewWsModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">Workspace Name</label>
                <input 
                  type="text" 
                  autoFocus
                  value={newWsName} 
                  onChange={(e) => setNewWsName(e.target.value)}
                  placeholder="e.g. Aura Beauty Labs"
                  className="w-full bg-white/[0.04] border border-white/15 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowNewWsModal(false)} className="btn-ghost text-xs py-2 px-3">
                  Cancel
                </button>
                <button type="submit" className="btn-vanilla text-xs py-2 px-4 font-semibold">
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ 
  item, 
  activeId, 
  onSelect,
  level = 0
}: { 
  item: NavItemData; 
  activeId: string; 
  onSelect: (id: string) => void;
  level?: number;
}) {
  const isActive = activeId === item.id;
  const hasChildren = !!item.children;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else if (item.action) {
      item.action();
    } else {
      onSelect(item.id);
    }
  };

  const Content = (
    <div 
      className={`group flex items-center justify-between px-2.5 py-[7px] rounded-[6px] cursor-pointer transition-all duration-200 select-none
        ${isActive 
          ? 'bg-black/5 dark:bg-white/10 text-foreground font-medium' 
          : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground/90'
        }
      `}
      style={{ paddingLeft: `${level * 12 + 10}px` }}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2.5">
        <item.icon 
          className={`w-[16px] h-[16px] transition-colors
            ${isActive ? 'text-foreground' : 'text-muted-foreground/70 group-hover:text-foreground/70'}
          `} 
          strokeWidth={1.5} 
        />
        <span className="text-[13px] tracking-wide truncate">
          {item.title}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        {item.shortcut && (
           <kbd className="hidden group-hover:inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-medium font-mono text-muted-foreground/60 bg-background/50 border border-border/50 rounded-[4px] shadow-xs">
             {item.shortcut}
           </kbd>
        )}
        {item.badge && (
          <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronRight 
            className={`w-3.5 h-3.5 text-muted-foreground/50 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} 
            strokeWidth={2}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full">
      {item.href ? (
        <Link href={item.href}>
          {Content}
        </Link>
      ) : (
        Content
      )}

      {hasChildren && (
        <div 
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden min-h-0 relative flex flex-col gap-0.5 mt-0.5">
            <div 
              className="absolute top-0 bottom-0 border-l border-black/5 dark:border-white/5"
              style={{ left: `${level * 12 + 17.5}px` }}
            />
            {item.children!.map(child => (
              <NavItem 
                key={child.id} 
                item={child} 
                activeId={activeId} 
                onSelect={onSelect} 
                level={level + 1} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SidebarNav({ 
  className = '',
  activeWorkspace,
  onWorkspaceSelect
}: { 
  className?: string,
  activeWorkspace?: string,
  onWorkspaceSelect?: (ws: string) => void
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [internalId, setInternalId] = useState('home');
  const [workspaces, setWorkspaces] = useState(['Acme Corp', 'Personal Workspace', 'Client Sandbox']);

  // Modal States
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamDept, setTeamDept] = useState('all');
  const [showFinanceModal, setShowFinanceModal] = useState(false);

  // Keyboard shortcut listener (⌘K and ⌘,)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowSearchModal(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        setShowSettingsModal(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddWorkspace = (name: string) => {
    if (!workspaces.includes(name)) {
      setWorkspaces(prev => [...prev, name]);
    }
  };

  const navGroups: NavGroupData[] = [
    {
      items: [
        { id: 'search', title: 'Search', icon: Search, shortcut: '⌘K', action: () => setShowSearchModal(true) },
        { id: 'home', title: 'Executive Overview', icon: LayoutDashboard, href: '/dashboard' },
        { id: 'intelligence', title: 'Content Intelligence', icon: Activity, href: '/intelligence' },
        { id: 'blueprint', title: 'Growth Blueprint', icon: Sparkles, href: '/blueprint' },
        { id: 'radar', title: 'Opportunity Radar', icon: Globe, href: '/radar' },
        { id: 'studio', title: 'Content Studio', icon: Blocks, href: '/studio' },
        { id: 'campaigns', title: 'Campaign Studio', icon: FolderKanban, href: '/campaigns' },
        { id: 'brain', title: 'Brand Brain', icon: Terminal, href: '/brain' },
        { id: 'demo', title: 'Mock Data Lab', icon: Zap, href: '/demo', badge: 'SANDBOX' },
      ]
    },
    {
      heading: 'Workspace',
      items: [
        { id: 'calendar', title: 'Calendar', icon: Calendar, action: () => setShowCalendarModal(true) },
        { 
          id: 'team', 
          title: 'Team', 
          icon: Users,
          action: () => { setTeamDept('all'); setShowTeamModal(true); },
          children: [
            { id: 't-design', title: 'Designers', icon: Hash, action: () => { setTeamDept('design'); setShowTeamModal(true); } },
            { id: 't-eng', title: 'Engineering', icon: Hash, action: () => { setTeamDept('engineering'); setShowTeamModal(true); } },
            { id: 't-product', title: 'Product', icon: Hash, action: () => { setTeamDept('product'); setShowTeamModal(true); } },
          ]
        },
        { id: 'finance', title: 'Finance', icon: CreditCard, action: () => setShowFinanceModal(true) },
      ]
    },
  ];

  const bottomItems: NavItemData[] = [
    { id: 'settings', title: 'Settings', icon: Settings, shortcut: '⌘,', action: () => setShowSettingsModal(true) },
    { id: 'logout', title: 'Log out', icon: LogOut, action: () => setShowLogoutModal(true) },
  ];

  // Match active path
  const allItems = [...navGroups.flatMap(g => g.items), ...bottomItems];
  const flatItems = flattenItems(allItems);
  const activeItem = flatItems.find(item => item.href === pathname);
  const currentId = activeItem ? activeItem.id : internalId;

  // Search Results
  const searchablePages = [
    { title: 'Executive Overview', desc: 'Health score, signals, and drop-off diagnosis', href: '/dashboard', icon: LayoutDashboard },
    { title: 'Content Intelligence', desc: 'Reverse-engineer competitor transcripts and DNA', href: '/intelligence', icon: Activity },
    { title: 'Growth Blueprint', desc: '5 original video hooks, 7-day calendar, ad angles', href: '/blueprint', icon: Sparkles },
    { title: 'Opportunity Radar', desc: 'Search momentum and emerging content gaps', href: '/radar', icon: Globe },
    { title: 'Content Studio', desc: 'Multi-agent Creator ↔ Critic brief generator', href: '/studio', icon: Blocks },
    { title: 'Campaign Studio', desc: 'Ad conversion metrics and landing page alignment', href: '/campaigns', icon: FolderKanban },
    { title: 'Brand Brain', desc: 'Strict directives, personas, and semantic knowledge base', href: '/brain', icon: Terminal },
    { title: 'Mock Data Lab', desc: 'One-click demo profiles, sample hooks, and instant sandbox', href: '/demo', icon: Zap }
  ];

  const filteredPages = searchablePages.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className={`flex flex-col w-[260px] h-full bg-card/50 border-r border-border/50 p-3 font-sans ${className}`}>
        <WorkspaceSwitcher 
          selected={activeWorkspace} 
          onSelect={onWorkspaceSelect} 
          workspaces={workspaces}
          onAddWorkspace={handleAddWorkspace}
        />

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-4 mt-2">
          {navGroups.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-0.5">
              {group.heading && (
                <span className="px-2.5 mb-1 text-[11px] font-semibold tracking-wider text-muted-foreground/50 uppercase">
                  {group.heading}
                </span>
              )}
              {group.items.map(item => (
                <NavItem 
                  key={item.id} 
                  item={item} 
                  activeId={currentId} 
                  onSelect={(id) => setInternalId(id)} 
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-border/50 flex flex-col gap-0.5">
          {bottomItems.map(item => (
            <NavItem 
              key={item.id} 
              item={item} 
              activeId={currentId} 
              onSelect={(id) => setInternalId(id)} 
            />
          ))}
        </div>
      </div>

      {/* ⌘K Search Modal / Command Palette */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-24 p-4 animate-in fade-in duration-100">
          <div className="velvet-card max-w-xl w-full p-4 border border-white/20 shadow-2xl space-y-3">
            <div className="flex items-center gap-3 px-2 border-b border-white/10 pb-3">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workspaces, pages, tools (e.g. Blueprint, Studio, Hooks)..."
                className="w-full bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none"
              />
              <kbd className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-zinc-400">ESC</kbd>
              <button onClick={() => setShowSearchModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-1 max-h-72 overflow-y-auto pt-1">
              {filteredPages.map((page, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setShowSearchModal(false);
                    router.push(page.href);
                  }}
                  className="w-full p-3 rounded-xl hover:bg-white/10 flex items-center justify-between text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-emerald-400">
                      <page.icon size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{page.title}</div>
                      <div className="text-xs text-zinc-400">{page.desc}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
              {filteredPages.length === 0 && (
                <div className="p-8 text-center text-zinc-500 text-xs font-mono">
                  No matching tools or pages found for "{searchQuery}".
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-lg w-full p-6 space-y-5 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-zinc-300" />
                <h3 className="font-display font-bold text-white text-base">Workspace Settings</h3>
              </div>
              <button onClick={() => setShowSettingsModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs text-zinc-300">
              <div>
                <label className="block font-mono uppercase text-zinc-400 mb-1">Active Multi-Agent Model Swarm</label>
                <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl space-y-1">
                  <div className="flex justify-between text-zinc-200 font-semibold">
                    <span>Reasoning Engine:</span>
                    <span className="text-emerald-400 font-mono">OpenAI GPT-OSS-120B / 20B</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Safety Critic:</span>
                    <span className="text-emerald-400 font-mono">Safeguard-20B</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-400 mb-1">Database Cluster Status</label>
                <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-between">
                  <span className="text-zinc-200">MongoDB Atlas Vector DB</span>
                  <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                    <CheckCircle2 size={12} /> Connected
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-400 mb-1">Default Ingestion Depth</label>
                <select className="w-full bg-[#18181b] border border-white/15 text-white rounded-xl p-2.5 text-xs focus:outline-none">
                  <option value="12">12 Posts (Standard Feed)</option>
                  <option value="25">25 Posts (Deep Audit)</option>
                  <option value="50">50 Posts (Exhaustive Scan)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button onClick={() => setShowSettingsModal(false)} className="btn-ghost text-xs py-2 px-3">
                Close
              </button>
              <button 
                onClick={() => setShowSettingsModal(false)} 
                className="btn-vanilla text-xs py-2 px-4 font-semibold"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-sm w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <LogOut className="w-5 h-5 text-rose-400" />
              <h3 className="font-display font-bold text-white text-base">Sign Out of ContentOS</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Are you sure you want to sign out of the active workspace session?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setShowLogoutModal(false)} className="btn-ghost text-xs py-2 px-3">
                Stay
              </button>
              <button 
                onClick={() => {
                  setShowLogoutModal(false);
                  router.push('/');
                }} 
                className="btn-vanilla !bg-rose-600 hover:!bg-rose-500 !text-white text-xs py-2 px-4 font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-lg w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold text-white text-base">Content Release Calendar</h3>
              </div>
              <button onClick={() => setShowCalendarModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-2.5 text-xs">
              {[
                { day: 'Monday', time: '10:00 AM', title: 'Short-Form Reel: Problem-Hook Breakdown', channel: 'Instagram & TikTok', status: 'Scheduled' },
                { day: 'Wednesday', time: '02:30 PM', title: 'LinkedIn Carousel: 5 Data-Backed Insights', channel: 'LinkedIn', status: 'Drafting' },
                { day: 'Friday', time: '09:00 AM', title: 'Founder Retrospective & Video Script', channel: 'YouTube Shorts', status: 'Ready' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-[11px] text-zinc-400">{item.day} at {item.time} • {item.channel}</div>
                  </div>
                  <span className="badge badge-emerald text-[10px]">{item.status}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-white/10">
              <span className="text-[11px] text-zinc-500 font-mono">Syncs automatically with Studio drafts</span>
              <button onClick={() => setShowCalendarModal(false)} className="btn-vanilla text-xs py-2 px-4">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-lg w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <h3 className="font-display font-bold text-white text-base">
                  Team Members {teamDept !== 'all' ? `— ${teamDept.toUpperCase()}` : ''}
                </h3>
              </div>
              <button onClick={() => setShowTeamModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                { name: 'Alex Rivera', role: 'Lead Growth Strategist', dept: 'design', email: 'alex@company.com' },
                { name: 'Sarah Chen', role: 'Staff AI Engineer', dept: 'engineering', email: 'sarah@company.com' },
                { name: 'David Kumar', role: 'Product Lead', dept: 'product', email: 'david@company.com' },
              ]
              .filter(m => teamDept === 'all' || m.dept === teamDept)
              .map((member, idx) => (
                <div key={idx} className="p-3 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{member.name}</div>
                    <div className="text-[11px] text-zinc-400">{member.role} • {member.email}</div>
                  </div>
                  <span className="badge badge-velvet text-[10px] uppercase font-mono">{member.dept}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button onClick={() => setShowTeamModal(false)} className="btn-ghost text-xs py-2 px-3">
                Close
              </button>
              <button 
                onClick={() => {
                  alert('Invite link copied to clipboard!');
                }}
                className="btn-vanilla text-xs py-2 px-4"
              >
                + Invite Collaborator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Finance / Billing Modal */}
      {showFinanceModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="velvet-card max-w-lg w-full p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <h3 className="font-display font-bold text-white text-base">Usage & Subscriptions</h3>
              </div>
              <button onClick={() => setShowFinanceModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-white/[0.03] border border-white/10 rounded-xl text-center">
              <div>
                <span className="text-zinc-500 font-mono text-[10px] uppercase block">Current Tier</span>
                <span className="text-white font-bold font-mono text-sm">PRO PLAN</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono text-[10px] uppercase block">AI Generation Credits</span>
                <span className="text-emerald-400 font-bold font-mono text-sm">Unlimited (Active)</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Monthly Billing Cycle:</span>
                <span className="text-white font-mono">Renews Oct 1</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Multi-Agent Swarm Invocations:</span>
                <span className="text-white font-mono">1,482 calls</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Database Storage:</span>
                <span className="text-emerald-400 font-mono">0.4 GB / 50 GB</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button onClick={() => setShowFinanceModal(false)} className="btn-vanilla text-xs py-2 px-4">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function flattenItems(items: NavItemData[]): NavItemData[] {
  return items.reduce((acc, item) => {
    acc.push(item);
    if (item.children) acc.push(...flattenItems(item.children));
    return acc;
  }, [] as NavItemData[]);
}

