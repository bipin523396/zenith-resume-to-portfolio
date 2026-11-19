import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { cleanResumeText, CleanedTextResult } from './textCleaner';

// Configure pdfjs worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
}

export interface ExtractedDocument {
  filename: string;
  fileType: 'pdf' | 'docx' | 'txt';
  rawText: string;
  cleaned: CleanedTextResult;
}

export async function processResumeFile(file: File): Promise<ExtractedDocument> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  let rawText = '';
  let fileType: 'pdf' | 'docx' | 'txt' = 'txt';

  if (extension === 'pdf') {
    fileType = 'pdf';
    rawText = await extractPdfText(file);
  } else if (extension === 'docx' || extension === 'doc') {
    fileType = 'docx';
    rawText = await extractDocxText(file);
  } else {
    fileType = 'txt';
    rawText = await file.text();
  }

  const cleaned = cleanResumeText(rawText);

  return {
    filename: file.name,
    fileType,
    rawText,
    cleaned
  };
}

async function extractPdfText(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
      disableFontFace: true
    });
    
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageItems = textContent.items.map((item: any) => item.str || '').join(' ');
      fullText += `\n--- PAGE ${i} ---\n` + pageItems + '\n';
    }

    return fullText;
  } catch (error) {
    console.warn('PDF.js standard parse failed, trying binary text decode fallback', error);
    // Fallback simple buffer string extraction
    const arrayBuffer = await file.arrayBuffer();
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(arrayBuffer);
    // Filter printable ascii characters
    return text.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
  }
}

async function extractDocxText(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error('Docx extraction error', error);
    return await file.text();
  }
}
