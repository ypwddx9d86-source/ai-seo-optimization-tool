import React, { useState } from 'react';
import { FeatureType } from '../types';
import { TextInput, TextArea, Button } from '../components/InputComponents';
import { generateSeoData } from '../services/geminiService';

interface Props {
  onResult: (data: any) => void;
  onError: (msg: string) => void;
}

export const KeywordResearch: React.FC<Props> = ({ onResult, onError }) => {
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState('');
  const [desc, setDesc] = useState('');

  const handleGenerate = async () => {
    if (!domain || !desc) {
      onError("Please provide both Domain Name and Short Description.");
      return;
    }
    setLoading(true);
    try {
      const data = await generateSeoData(FeatureType.KEYWORD_RESEARCH, {
        domain,
        description: desc
      });
      onResult(data);
    } catch (err) {
      onError("Failed to generate keywords. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6">
        <TextInput 
          label="Target Domain" 
          value={domain} 
          onChange={(e) => setDomain(e.target.value)} 
          placeholder="e.g., techgear.com" 
          required
        />
        <TextArea 
          label="Niche & Business Context" 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
          placeholder="Describe your business model, target audience, and primary value proposition..." 
          required
        />
      </div>
      <div className="mt-8 flex justify-end">
        <div className="w-full md:w-auto">
           <Button onClick={handleGenerate} loading={loading} text="Initialize Keyword Strategy" />
        </div>
      </div>
    </div>
  );
};