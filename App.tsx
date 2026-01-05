import React, { useState } from 'react';
import { FeatureType } from './types';
import { KeywordResearch } from './features/KeywordResearch';
import { PageOptimization } from './features/PageOptimization';
import { ContentEngine } from './features/ContentEngine';
import { ResultsDisplay } from './components/ResultsDisplay';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeatureType>(FeatureType.KEYWORD_RESEARCH);
  const [resultData, setResultData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: FeatureType) => {
    setActiveTab(tab);
    setResultData(null); // Clear previous results
    setError(null);
    setMobileMenuOpen(false);
  };

  const handleResult = (data: any) => {
    setError(null);
    setResultData(data);
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleError = (msg: string) => {
    setError(msg);
  };

  const navItems = [
    { 
      id: FeatureType.KEYWORD_RESEARCH, 
      label: 'Keyword Research',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    { 
      id: FeatureType.PAGE_OPTIMIZATION, 
      label: 'Page Blueprint',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: FeatureType.CONTENT_ENGINE, 
      label: 'Content Engine',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex min-h-screen bg-transparent font-sans selection:bg-accent-500/30 selection:text-accent-200">
      
      {/* Mobile Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-brand-950/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-600 rounded-lg flex items-center justify-center shadow-lg shadow-accent-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
             </div>
             <span className="font-bold text-white tracking-tight">AI SEO Tool</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
           </svg>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        glass-panel border-r border-white/5 flex flex-col
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-white/5">
           <div className="flex items-center gap-3 mb-1">
             <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-600 rounded-lg flex items-center justify-center shadow-lg shadow-accent-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
             </div>
             <h1 className="text-lg font-bold text-white tracking-tight leading-tight">AI SEO <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">OPTIMIZATION</span></h1>
           </div>
           <p className="text-[10px] text-brand-400 uppercase tracking-widest mt-2 pl-1">Enterprise Edition</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden ${
                activeTab === item.id
                  ? 'bg-brand-500/10 text-white shadow-[0_0_15px_rgba(14,165,233,0.15)] border border-brand-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {activeTab === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-400 to-accent-500 rounded-r-full"></div>
              )}
              <span className={`${activeTab === item.id ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="bg-brand-950/50 rounded-lg p-4 border border-white/5">
             <div className="flex items-center justify-between mb-2">
               <span className="text-xs font-bold text-white">System Status</span>
               <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
             </div>
             <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
               <div className="bg-gradient-to-r from-brand-500 to-accent-500 h-1.5 rounded-full w-3/4"></div>
             </div>
             <p className="text-[10px] text-slate-400">AI Core: Online</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Overlay for mobile sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>
        )}

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Context Header for View */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-brand-400 font-mono mb-2">
                  <span>HOME</span>
                  <span>/</span>
                  <span className="uppercase">{navItems.find(n => n.id === activeTab)?.label}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {navItems.find(n => n.id === activeTab)?.label}
                </h2>
                <p className="text-slate-400 mt-2 max-w-2xl">
                  {activeTab === FeatureType.KEYWORD_RESEARCH && "Analyze niche markets and generate high-intent keyword clusters based on semantic relevance."}
                  {activeTab === FeatureType.PAGE_OPTIMIZATION && "Construct authoritative content blueprints with optimal hierarchy and meta data."}
                  {activeTab === FeatureType.CONTENT_ENGINE && "Generate conversion-focused copy and educational content with keyword transparency."}
                </p>
              </div>
            </div>

            {/* Input Section */}
            <div className="glass-panel rounded-2xl p-1 shadow-2xl shadow-black/50">
               {activeTab === FeatureType.KEYWORD_RESEARCH && (
                  <KeywordResearch onResult={handleResult} onError={handleError} />
                )}
                {activeTab === FeatureType.PAGE_OPTIMIZATION && (
                  <PageOptimization onResult={handleResult} onError={handleError} />
                )}
                {activeTab === FeatureType.CONTENT_ENGINE && (
                  <ContentEngine onResult={handleResult} onError={handleError} />
                )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-200 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {/* Results Area */}
            <div id="results-section" className="space-y-6">
              {resultData && <ResultsDisplay data={resultData} />}
            </div>
          
          </div>
          
          <footer className="mt-20 py-6 border-t border-white/5 text-center">
            <p className="text-slate-500 text-xs">
              AI SEO Optimization Tool v2.0 • Powered by Gemini 2.5 • Enterprise Grade
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;