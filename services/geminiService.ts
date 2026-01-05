import { GoogleGenAI } from "@google/genai";
import { FeatureType, ContentSubType } from '../types';

const apiKey = process.env.API_KEY;
// Initialize with strict error handling if key is missing (though handled by env usually)
const ai = new GoogleGenAI({ apiKey: apiKey || '' });
// Upgrading to Pro model for Enterprise-grade reasoning and SEO strategy
const modelId = 'gemini-3-pro-preview'; 

const SYSTEM_INSTRUCTION = `
You are the "SEO Core AI Engine," a high-performance SEO Strategist and Expert Copywriter.
Strictly adhere to 2026 SEO standards (E-E-A-T, Topical Authority, Semantic Search).
Output MUST be valid JSON only. Do not wrap in markdown code blocks.
`;

// Helper to ensure clean JSON output even if model adds markdown fences
const cleanJsonOutput = (text: string): string => {
  if (!text) return "{}";
  // Remove markdown code blocks if present (e.g. ```json ... ```)
  let clean = text.replace(/```json\n?|```/g, '');
  return clean.trim();
};

export const generateSeoData = async (
  feature: FeatureType,
  inputs: Record<string, any>
): Promise<any> => {
  if (!apiKey) {
    throw new Error("API Key is missing from environment variables.");
  }

  let prompt = "";
  let schemaDescription = "";

  if (feature === FeatureType.KEYWORD_RESEARCH) {
    prompt = `
      TASK: EXACT-MATCH KEYWORD RESEARCH & STRATEGY
      Domain: ${inputs.domain}
      Description: ${inputs.description}

      STRICT CONSTRAINT: 
      Generate a precise list of EXACTLY 53 specific keywords.
      DO NOT use broad or generic terms (e.g., use "Men's Leather Loafers" instead of "Shoes").
      Every keyword must be an "Exact Match", "Exact Match Synonym", or a "Paraphrased Term" reflecting specific user intent.

      OUTPUT STRUCTURE & QUANTITIES:
      1. Focus Keywords (3 items): The primary commercial/intent pillars of the site.
      2. Short-Tail Keywords (15 items): Highly specific 1-2 word exact match terms.
      3. Long-Tail Keywords (15 items): Precise 3+ word phrases, questions, or specific needs.
      4. Related Keywords (20 items): Exact match synonyms and semantically similar paraphrased terms (LSI).

      INDICATION LEVELS:
      - [Very Important]: For Focus Keywords and high-intent Short-Tail.
      - [Important]: For most Long-Tail and specific Related terms.
      - [Less Important]: For niche paraphrases or low-volume exact synonyms.
    `;
    schemaDescription = `
      Return a JSON object with this structure:
      {
        "strategySummary": "A brief 2-sentence summary of the niche strategy.",
        "keywords": [
          { 
            "keyword": "...", 
            "category": "Focus" | "Short-tail" | "Long-tail" | "Related", 
            "indicationLevel": "Very Important" | "Important" | "Less Important" 
          }
        ]
      }
    `;
  } else if (feature === FeatureType.PAGE_OPTIMIZATION) {
    prompt = `
      TASK: DYNAMIC PAGE OPTIMIZATION & INFORMATION ARCHITECTURE
      Domain: ${inputs.domain}
      Focus Keyword: ${inputs.focusKeyword}
      Page Description: ${inputs.description}

      GENERATE A COMPREHENSIVE, HIGH-AUTHORITY SEO BLUEPRINT. 
      The goal is to determine the necessary depth of information required to satisfy the search intent of the Focus Keyword and create a "Complete Guide" that outranks competitors.

      1. META ASSETS (STRICT LENGTH CONSTRAINTS):
      - Meta Title: EXACTLY 45-50 characters. Must lead with "${inputs.focusKeyword}".
      - Meta Description: EXACTLY 140-145 characters. Must include a persuasive CTA.

      2. DYNAMIC HEADING STRUCTURE (INFORMATIONAL DEPTH):
      - H1 Heading: The primary title (Must include "${inputs.focusKeyword}").
      - Headings (H2 & H3): Generate a VARIABLE number of H2 and H3 headings based on the complexity of the topic.
          - If the topic is complex, generate MORE headings to ensure no information is missing (aim for Topical Authority).
          - If the topic is simple, keep it concise but thorough.
      - Intent Fulfillment: Every heading must be Informational (answering "How", "Why", "What").
      - Strategic Summary: The structure must conclude with an H2 "Strategic Summary" that reinforces the Focus Keyword.

      3. TECHNICAL BRIEF (INSTRUCTIONS):
      - For EVERY heading (H1, H2, H3), provide a 2-3 sentence "Technical Brief" in the description field.
      - This brief must specify exactly which sub-topics to cover.
      - It must explicitly state where to place **Short-tail** vs **Long-tail** keywords within that section for maximum informational density.

      VALIDATION RULE: Do not stick to fixed counts. Use as many headings as necessary for a complete guide. Maintain strict H1 -> H2 -> H3 nesting.
    `;
    schemaDescription = `
      Return a JSON object with this structure:
      {
        "metaTitle": "...",
        "metaDescription": "...",
        "keywordCluster": {
          "shortTail": ["..."],
          "longTail": ["..."],
          "related": ["..."]
        },
        "headings": [
          // STRICT ORDER: H1 -> H2 -> H3... -> H2 "Strategic Summary"
          { "level": "H1" | "H2" | "H3", "text": "Heading Text", "description": "2-3 sentence Technical Brief with keyword placement instructions..." }
        ]
      }
    `;
  } else if (feature === FeatureType.CONTENT_ENGINE) {
    if (inputs.subType === ContentSubType.PRODUCT) {
      prompt = `
        TASK: SEO COPYWRITING & KEYWORD TRANSPARENCY (Product Sales Focus)
        Product Name: ${inputs.productName}
        Focus Keyword: ${inputs.focusKeyword}
        Short Description: ${inputs.description}

        Generate high-conversion, long-form SEO copy with full keyword transparency.

        1. KEYWORD USAGE REPORT (Pre-Computation):
        - Identify and list the keywords you WILL use in the copy below.
        - Focus: "${inputs.focusKeyword}" (Must use).
        - Short-Tail: Generate 3 high-impact variants.
        - Long-Tail: Generate 3 specific queries.
        - Related: Generate 4 semantically related terms.

        2. INTRODUCTION (Hook):
        - Length: 100-150 words.
        - Rule: Place Focus Keyword in the FIRST sentence. Maintain high emotional resonance.

        3. MARKETING DESCRIPTION (Deep Dive):
        - Length: 150-200 words.
        - Rule: Focus on "Biological Necessity" and "Professional Performance". Integrate at least 4 Related/LSI keywords identified above.

        4. 8 EXTENDED FEATURE HEADINGS:
        - Heading Format: [Feature Name] + [Strategic Keyword].
        - Description Length: Minimum 350-400 characters per feature (Deepening the information).
        - Rule: Each description must explain the technical "How" and the user "Benefit". Ensure it is an informational powerhouse.
        - Validation: If descriptions are too short, expand on material durability, ergonomic science, or use-cases.

        5. CONCLUSION & CTA:
        - Length: 150-200 words.
        - Rule: Summarize value proposition, include Focus Keyword, end with high-urgency CTA (e.g., 'Add to Cart').

        6. SEO META:
        - Title (45-50 chars).
        - Description (140-145 chars).
      `;
      schemaDescription = `
        Return a JSON object with this structure:
        {
          "type": "product",
          "keywordMapping": {
             "focus": ["..."],
             "shortTail": ["..."],
             "longTail": ["..."],
             "related": ["..."]
          },
          "metaTitle": "...",
          "metaDescription": "...",
          "intro": "...",
          "marketingDesc": "...",
          "features": [
            { "heading": "Feature + Keyword", "explanation": "Long description > 350 chars..." }
          ],
          "conclusion": "..."
        }
      `;
    } else {
      prompt = `
        TASK: CONTENT WRITING (Blog/Article Focus)
        Focus Keyword: ${inputs.focusKeyword}

        Structure:
        1. Intro: Exactly 3 paragraphs (100 words each). Para 1 uses focus keyword. Para 2 uses short & long tail. Para 3 uses related keywords.
        2. Body: 6-7 H2 Headings. Each H2 has two H3 subheadings. H2 content approx 150 words. H3 content approx 100 words.
        3. Conclusion: 200 words exactly, ending with focus keyword.
        4. SEO Meta: Title (45-50 chars), Desc (140-145 chars).
      `;
      schemaDescription = `
        Return a JSON object with this structure:
        {
          "type": "blog",
          "metaTitle": "...",
          "metaDescription": "...",
          "introduction": {
            "para1": "...",
            "para2": "...",
            "para3": "..."
          },
          "body": [
            {
              "heading": "H2 Title",
              "content": "Intro text for this section...",
              "subheadings": [
                { "heading": "H3 Title", "content": "Content..." }
              ]
            }
          ],
          "conclusion": "..."
        }
      `;
    }
  }

  const finalPrompt = `${prompt}\n\n${schemaDescription}`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: finalPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response generated");
    
    // Robust cleanup to ensure valid JSON
    const cleanText = cleanJsonOutput(text);
    
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};