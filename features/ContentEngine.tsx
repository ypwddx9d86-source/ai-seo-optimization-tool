import React, { useState } from 'react';
import { FeatureType, ContentSubType } from '../types';
import { TextInput, TextArea, Button } from '../components/InputComponents';
import { generateSeoData } from '../services/geminiService';

interface Props {
  onResult: (data: any) => void;
  onError: (msg: string) => void;
}

export const ContentEngine: React.FC<Props> = ({ onResult, onError }) => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<ContentSubType>(ContentSubType.PRODUCT);
  
  // Product Inputs
  const [productName, setProductName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [productFocusKeyword, setProductFocusKeyword] = useState('');

  // Blog Inputs
  const [blogKeyword, setBlogKeyword] = useState('');

  const handleGenerate = async () => {
    if (mode === ContentSubType.PRODUCT) {
      if (!productName || !prodDesc || !productFocusKeyword) {
        onError("Product Name, Description, and Focus Keyword are required.");
        return;
      }
    } else {
      if (!blogKeyword) {
        onError("Focus Keyword is required for blog content.");
        return;
      }
    }

    setLoading(true);
    try {
      const inputs = mode === ContentSubType.PRODUCT 
        ? { subType: mode, productName, description: prodDesc, focusKeyword: productFocusKeyword }
        : { subType: mode, focusKeyword: blogKeyword };

      const data = await generateSeoData(FeatureType.CONTENT_ENGINE, inputs);
      onResult(data);
    } catch (err) {
      onError("Failed to generate content. The AI engine might be busy, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      {/* Toggle Switch */}
      <div className="flex bg-black/20 rounded-lg p-1 mb-8 border border-white/5">
        <button
          onClick={() => setMode(ContentSubType.PRODUCT)}
          className={`flex-1 py-3 text-sm font-bold rounded-md transition-all ${
            mode === ContentSubType.PRODUCT 
              ? 'bg-brand-600 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Product Sales Copy
        </button>
        <button
          onClick={() => setMode(ContentSubType.BLOG)}
          className={`flex-1 py-3 text-sm font-bold rounded-md transition-all ${
            mode === ContentSubType.BLOG 
              ? 'bg-brand-600 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Blog/Article Content
        </button>
      </div>

      <div className="animate-fade-in">
        {mode === ContentSubType.PRODUCT ? (
          <>
            <div className="bg-brand-500/5 border border-brand-500/10 p-4 rounded-lg mb-6 text-xs text-brand-200 leading-relaxed">
              <span className="font-bold text-brand-400 block mb-1">PRO TIP:</span>
              For best results, provide a detailed description of technical specs and target audience. The AI will generate a high-conversion sales page with 8+ deep-dive feature sections.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <TextInput 
                label="Product Name" 
                value={productName} 
                onChange={(e) => setProductName(e.target.value)} 
                placeholder="e.g., ErgoLift X1" 
                required
              />
              <TextInput 
                label="Focus Keyword" 
                value={productFocusKeyword} 
                onChange={(e) => setProductFocusKeyword(e.target.value)} 
                placeholder="e.g., ergonomic standing desk" 
                required
              />
            </div>
            <TextArea 
              label="Product Features & Benefits" 
              value={prodDesc} 
              onChange={(e) => setProdDesc(e.target.value)} 
              placeholder="Key technical specs, target audience, and main value proposition..." 
              required
            />
          </>
        ) : (
          <>
            <TextInput 
              label="Article Topic / Focus Keyword" 
              value={blogKeyword} 
              onChange={(e) => setBlogKeyword(e.target.value)} 
              placeholder="e.g., benefits of intermittent fasting" 
              required
            />
            <div className="mt-2 mb-4 p-3 bg-brand-500/10 rounded border border-brand-500/20 text-xs text-brand-300">
              <span className="font-bold">Generation Plan:</span> The AI will structure a complete authoritative article (Intro, Body with 6-7 H2s, H3 subheadings, Conclusion) optimized for this keyword.
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex justify-end">
         <div className="w-full md:w-auto">
            <Button 
            onClick={handleGenerate} 
            loading={loading} 
            text={mode === ContentSubType.PRODUCT ? "Generate Sales Copy" : "Draft Optimized Article"} 
            />
        </div>
      </div>
    </div>
  );
};