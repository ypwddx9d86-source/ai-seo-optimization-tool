import React, { useState } from 'react';
import { FeatureType } from '../types';
import { TextInput, TextArea, Button } from '../components/InputComponents';
import { generateSeoData } from '../services/geminiService';

interface Props {
  onResult: (data: any) => void;
  onError: (msg: string) => void;
}

export const PageOptimization: React.FC<Props> = ({ onResult, onError }) => {
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [desc, setDesc] = useState('');

  const handleGenerate = async () => {
    if (!domain || !focusKeyword || !desc) {
      onError("All fields are required for page optimization.");
      return;
    }
    setLoading(true);
    try {
      const data = await generateSeoData(FeatureType.PAGE_OPTIMIZATION, {
        domain,
        focusKeyword,
        description: desc
      });
      onResult(data);
    } catch (err) {
      onError("Failed to optimize page. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TextInput 
          label="Target Domain" 
          value={domain} 
          onChange={(e) => setDomain(e.target.value)} 
          placeholder="e.g., myblog.com" 
          required
        />
        <TextInput 
          label="Primary Focus Keyword" 
          value={focusKeyword} 
          onChange={(e) => setFocusKeyword(e.target.value)} 
          placeholder="e.g., organic coffee beans" 
          required
        />
      </div>
      <TextArea 
        label="Page Objectives & Context" 
        value={desc} 
        onChange={(e) => setDesc(e.target.value)} 
        placeholder="What is the user intent? What problem does this page solve?" 
        required
      />
      <div className="mt-8 flex justify-end">
         <div className="w-full md:w-auto">
            <Button onClick={handleGenerate} loading={loading} text="Generate Architecture Blueprint" />
         </div>
      </div>
    </div>
  );
};