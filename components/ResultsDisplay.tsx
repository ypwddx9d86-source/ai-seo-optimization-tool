import React from 'react';
import { 
  SeoResult, 
  KeywordResearchResult, 
  PageOptimizationResult, 
  ProductCopyResult, 
  BlogContentResult,
  KeywordItem
} from '../types';

interface Props {
  data: SeoResult | null;
}

// Helper to determine feature name
const getFeatureName = (data: SeoResult): string => {
  if ('keywords' in data) return 'KEYWORD RESEARCH';
  if ('keywordCluster' in data) return 'PAGE BLUEPRINT';
  if ('features' in data) return 'PRODUCT COPY';
  if ('body' in data) return 'CONTENT ENGINE';
  return 'ANALYSIS';
};

const ResponseHeader: React.FC<{ feature: string }> = ({ feature }) => (
  <div className="mb-6 font-mono text-center space-y-2">
    <div className="text-xs text-brand-500 tracking-[0.2em] uppercase opacity-75">
      --- [ AI SEO OPTIMIZATION TOOL | FEATURE: {feature} ] ---
    </div>
    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider">
      <span>Home</span>
      <span className="text-slate-700">/</span>
      <span>{feature}</span>
      <span className="text-slate-700">/</span>
      <span className="text-brand-400">Analysis Complete</span>
    </div>
  </div>
);

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all border border-white/5 hover:border-white/10"
      title="Copy to clipboard"
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
};

const SectionCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "" }) => (
  <div className={`glass-panel rounded-xl overflow-hidden mb-8 shadow-lg shadow-black/20 ${className}`}>
    <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
        <span className="w-1.5 h-4 bg-accent-500 rounded-sm inline-block"></span>
        {title}
      </h3>
    </div>
    <div className="p-6 md:p-8">
      {children}
    </div>
  </div>
);

const KeywordGroup: React.FC<{ title: string; keywords: KeywordItem[]; badgeColor: string }> = ({ title, keywords, badgeColor }) => {
  if (!keywords.length) return null;
  
  return (
    <div className="mb-8 last:mb-0">
      <h4 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
        {title} <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-slate-400">{keywords.length}</span>
      </h4>
      <div className="overflow-hidden rounded-lg border border-white/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase text-slate-400 font-medium">
            <tr>
              <th className="px-4 py-3">Keyword</th>
              <th className="px-4 py-3 text-right">Indication</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {keywords.map((k, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors group">
                <td className="px-4 py-3 font-medium text-slate-200 select-all group-hover:text-white">{k.keyword}</td>
                <td className="px-4 py-3 text-right">
                   <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    k.indicationLevel === 'Very Important' ? 'bg-red-500/10 text-red-300 border-red-500/20' :
                    k.indicationLevel === 'Important' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                  }`}>
                    {k.indicationLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const KeywordStrategyDisplay: React.FC<{ data: KeywordResearchResult }> = ({ data }) => {
  const focusKeywords = data.keywords.filter(k => k.category === 'Focus');
  const shortTail = data.keywords.filter(k => k.category === 'Short-tail');
  const longTail = data.keywords.filter(k => k.category === 'Long-tail');
  const related = data.keywords.filter(k => k.category === 'Related');

  return (
    <div>
      <blockquote className="border-l-2 border-brand-500 pl-4 py-2 mb-8 bg-brand-500/5 text-brand-100 italic rounded-r-lg">
        "{data.strategySummary}"
      </blockquote>
      
      <div className="space-y-8">
        <KeywordGroup title="Focus Keywords (Commercial/Intent Pillars)" keywords={focusKeywords} badgeColor="bg-accent-500" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <KeywordGroup title="Short-Tail Keywords" keywords={shortTail} badgeColor="bg-blue-500" />
          <KeywordGroup title="Long-Tail Keywords" keywords={longTail} badgeColor="bg-purple-500" />
        </div>

        <KeywordGroup title="Related / LSI Keywords" keywords={related} badgeColor="bg-green-500" />
      </div>

      <div className="mt-8 flex justify-end">
        <div className="relative inline-block">
             <CopyButton text={data.keywords.map(k => k.keyword).join('\n')} />
             <span className="text-xs text-slate-500 mr-10 mt-2 block">Copy All Data</span>
        </div>
      </div>
    </div>
  );
};

const MetaBox: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div className="bg-white/5 p-5 rounded-xl border border-white/5 relative group hover:border-brand-500/30 transition-all">
        <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">Meta Title</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${title.length > 60 ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>{title.length} chars</span>
        </div>
      <p className="text-white font-medium pr-8 font-sans">{title}</p>
      <CopyButton text={title} />
    </div>
    <div className="bg-white/5 p-5 rounded-xl border border-white/5 relative group hover:border-brand-500/30 transition-all">
        <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">Meta Description</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${desc.length > 160 ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>{desc.length} chars</span>
        </div>
      <p className="text-slate-300 text-sm pr-8 leading-relaxed">{desc}</p>
      <CopyButton text={desc} />
    </div>
  </div>
);

export const ResultsDisplay: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  const featureName = getFeatureName(data);

  return (
    <div className="animate-fade-in-up">
      <ResponseHeader feature={featureName} />

      {/* KEYWORD RESEARCH RENDERER */}
      {'keywords' in data && (
        <SectionCard title="Strategic Keyword Matrix">
          <KeywordStrategyDisplay data={data as KeywordResearchResult} />
        </SectionCard>
      )}

      {/* PAGE OPTIMIZATION RENDERER */}
      {'keywordCluster' in data && 'headings' in data && (
        <>
          <MetaBox title={(data as PageOptimizationResult).metaTitle} desc={(data as PageOptimizationResult).metaDescription} />
          
          <SectionCard title="Semantic Keyword Cluster">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries((data as PageOptimizationResult).keywordCluster).map(([key, words]) => (
                <div key={key} className="bg-white/5 p-4 rounded-lg border border-white/5">
                  <h4 className="text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(words as string[]).map((w, i) => (
                      <span key={i} className="text-xs bg-slate-800/50 text-slate-300 px-2 py-1 rounded hover:text-white transition-colors">{w}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Architecture Blueprint">
            <div className="space-y-4">
              {(data as PageOptimizationResult).headings.map((h, i) => (
                <div key={i} className={`p-5 rounded-lg border-l-2 relative overflow-hidden transition-all hover:bg-white/5 ${
                  h.level === 'H1' ? 'bg-brand-500/10 border-brand-500' : 
                  h.level === 'H2' ? 'bg-white/5 border-blue-400 ml-4 md:ml-6' : 
                  'bg-transparent border-slate-600 ml-8 md:ml-12 border-l'
                }`}>
                  <div className="flex items-center gap-4 mb-2">
                    <span className={`text-[10px] font-mono px-1.5 rounded ${
                        h.level === 'H1' ? 'bg-brand-500 text-white' : 'bg-slate-700 text-slate-300'
                    }`}>{h.level}</span>
                    <span className={`font-bold ${h.level === 'H1' ? 'text-xl text-white' : 'text-slate-200'}`}>{h.text}</span>
                  </div>
                  <div className="pl-10">
                      <div className="inline-block px-2 py-0.5 rounded bg-accent-500/10 text-accent-300 text-[10px] font-bold uppercase mb-1">Technical Brief</div>
                      <p className="text-sm text-slate-400 leading-relaxed">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </>
      )}

      {/* PRODUCT COPY RENDERER */}
      {'features' in data && 'intro' in data && (
        <>
          <MetaBox title={(data as ProductCopyResult).metaTitle} desc={(data as ProductCopyResult).metaDescription} />
          
          {(data as ProductCopyResult).keywordMapping && (
            <SectionCard title="Keyword Transparency Report">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Focus', items: (data as ProductCopyResult).keywordMapping.focus, color: 'text-brand-400', bg: 'bg-brand-500/10' },
                  { label: 'Short-Tail', items: (data as ProductCopyResult).keywordMapping.shortTail, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { label: 'Long-Tail', items: (data as ProductCopyResult).keywordMapping.longTail, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { label: 'Related', items: (data as ProductCopyResult).keywordMapping.related, color: 'text-green-400', bg: 'bg-green-500/10' },
                ].map((group, idx) => (
                  <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/5">
                    <div className={`text-[10px] uppercase font-bold mb-2 ${group.color}`}>{group.label}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((k, i) => (
                        <span key={i} className={`text-[10px] px-2 py-0.5 rounded ${group.bg} text-slate-200`}>{k}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          <SectionCard title="Optimized Sales Copy">
             <div className="space-y-6">
                <div className="relative p-6 bg-brand-500/5 border border-brand-500/10 rounded-xl group">
                  <span className="absolute top-0 left-6 -translate-y-1/2 bg-brand-950 px-2 text-[10px] uppercase text-brand-400 font-bold tracking-widest">Introduction Hook</span>
                  <p className="text-slate-200 leading-relaxed whitespace-pre-line font-serif text-lg">{ (data as ProductCopyResult).intro }</p>
                  <CopyButton text={(data as ProductCopyResult).intro} />
                </div>

                <div className="relative p-6 bg-white/5 border border-white/5 rounded-xl group">
                  <span className="absolute top-0 left-6 -translate-y-1/2 bg-brand-950 px-2 text-[10px] uppercase text-slate-400 font-bold tracking-widest">Deep Dive</span>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">{ (data as ProductCopyResult).marketingDesc }</p>
                  <CopyButton text={(data as ProductCopyResult).marketingDesc} />
                </div>

                <div className="grid gap-4">
                   <div className="text-[10px] uppercase text-slate-500 font-bold tracking-widest ml-1">Extended Features</div>
                   {(data as ProductCopyResult).features.map((feat, i) => (
                     <div key={i} className="p-5 bg-white/5 rounded-xl border border-white/5 hover:border-brand-500/20 transition-all">
                        <div className="flex gap-4">
                           <div className="flex-shrink-0 w-6 h-6 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-400 font-mono text-xs border border-brand-500/30">
                             {i+1}
                           </div>
                           <div className="flex-1">
                             <h4 className="font-bold text-white mb-2 text-base">{feat.heading}</h4>
                             <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line border-l border-white/10 pl-4">
                               {feat.explanation}
                             </p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="relative p-8 bg-gradient-to-br from-brand-900/50 to-accent-900/20 border border-brand-500/20 rounded-xl">
                  <span className="absolute top-0 left-6 -translate-y-1/2 bg-brand-950 px-2 text-[10px] uppercase text-accent-400 font-bold tracking-widest">Conclusion & CTA</span>
                  <p className="text-white font-medium whitespace-pre-line text-center italic">{ (data as ProductCopyResult).conclusion }</p>
                  <CopyButton text={(data as ProductCopyResult).conclusion} />
                </div>
             </div>
          </SectionCard>
        </>
      )}

      {/* BLOG CONTENT RENDERER */}
      {'introduction' in data && 'body' in data && (
        <>
          <MetaBox title={(data as BlogContentResult).metaTitle} desc={(data as BlogContentResult).metaDescription} />

          <SectionCard title="Article Draft">
              <div className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-a:text-brand-400">
                <div className="bg-white/5 p-8 rounded-xl mb-8 relative border border-white/5">
                   <h4 className="text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Introduction</h4>
                   <p className="mb-4">{ (data as BlogContentResult).introduction.para1 }</p>
                   <p className="mb-4">{ (data as BlogContentResult).introduction.para2 }</p>
                   <p>{ (data as BlogContentResult).introduction.para3 }</p>
                   <CopyButton text={`${(data as BlogContentResult).introduction.para1}\n\n${(data as BlogContentResult).introduction.para2}\n\n${(data as BlogContentResult).introduction.para3}`} />
                </div>

                {(data as BlogContentResult).body.map((section, i) => (
                  <div key={i} className="mb-8 p-8 border border-white/5 rounded-xl relative hover:border-brand-500/20 transition-all bg-transparent">
                    <h2 className="text-2xl mb-4 flex items-center gap-3">
                      <span className="text-sm font-mono text-brand-500/50">##</span>
                      {section.heading}
                    </h2>
                    <p className="mb-6 text-lg leading-relaxed">{section.content}</p>
                    
                    <div className="space-y-6 pl-6 border-l border-brand-500/20">
                      {section.subheadings.map((sub, j) => (
                        <div key={j}>
                          <h3 className="text-lg font-semibold text-brand-100 flex items-center gap-2 mb-2">
                             <span className="text-xs font-mono text-brand-500/50">###</span>
                             {sub.heading}
                          </h3>
                          <p className="text-sm text-slate-400">{sub.content}</p>
                        </div>
                      ))}
                    </div>
                    <CopyButton text={`${section.heading}\n${section.content}\n\n${section.subheadings.map(s => `### ${s.heading}\n${s.content}`).join('\n\n')}`} />
                  </div>
                ))}

                <div className="bg-brand-500/5 p-8 rounded-xl border-l-4 border-green-500 relative">
                   <h4 className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-2">Final Thoughts</h4>
                   <p className="text-white italic">{ (data as BlogContentResult).conclusion }</p>
                   <CopyButton text={(data as BlogContentResult).conclusion} />
                </div>
              </div>
          </SectionCard>
        </>
      )}
    </div>
  );
};