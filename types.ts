import React from 'react';

export enum FeatureType {
  KEYWORD_RESEARCH = 'KEYWORD_RESEARCH',
  PAGE_OPTIMIZATION = 'PAGE_OPTIMIZATION',
  CONTENT_ENGINE = 'CONTENT_ENGINE',
}

export enum ContentSubType {
  PRODUCT = 'PRODUCT',
  BLOG = 'BLOG',
}

export enum IndicationLevel {
  VERY_IMPORTANT = 'Very Important',
  IMPORTANT = 'Important',
  LESS_IMPORTANT = 'Less Important',
}

// Feature 1: Keyword Research Result
export interface KeywordItem {
  keyword: string;
  category: 'Focus' | 'Short-tail' | 'Long-tail' | 'Related';
  indicationLevel: IndicationLevel;
}

export interface KeywordResearchResult {
  keywords: KeywordItem[];
  strategySummary: string;
}

// Feature 2: Page Optimization Result
export interface HeadingItem {
  level: 'H1' | 'H2' | 'H3';
  text: string;
  description: string;
}

export interface PageOptimizationResult {
  metaTitle: string;
  metaDescription: string;
  keywordCluster: {
    shortTail: string[];
    longTail: string[];
    related: string[];
  };
  headings: HeadingItem[];
}

// Feature 3: Content Engine Result
export interface FeatureItem {
  heading: string;
  explanation: string;
}

export interface KeywordMapping {
  focus: string[];
  shortTail: string[];
  longTail: string[];
  related: string[];
}

export interface ProductCopyResult {
  type: 'product';
  keywordMapping: KeywordMapping;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  marketingDesc: string;
  features: FeatureItem[];
  conclusion: string;
}

export interface BlogSection {
  heading: string;
  subheadings: {
    heading: string;
    content: string;
  }[];
  content: string; // Intro for the H2
}

export interface BlogContentResult {
  type: 'blog';
  metaTitle: string;
  metaDescription: string;
  introduction: {
    para1: string;
    para2: string;
    para3: string;
  };
  body: BlogSection[];
  conclusion: string;
}

export type SeoResult = KeywordResearchResult | PageOptimizationResult | ProductCopyResult | BlogContentResult;

// Component Props
export interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
}