export interface CleanedTextResult {
  cleanText: string;
  pagesEstimated: number;
  headingsFound: string[];
  contactsFound: {
    emails: string[];
    phones: string[];
    links: string[];
  };
  metrics: {
    rawLength: number;
    cleanedLength: number;
    reductionPercentage: number;
  };
}

export function cleanResumeText(rawText: string): CleanedTextResult {
  if (!rawText) {
    return {
      cleanText: '',
      pagesEstimated: 1,
      headingsFound: [],
      contactsFound: { emails: [], phones: [], links: [] },
      metrics: { rawLength: 0, cleanedLength: 0, reductionPercentage: 0 }
    };
  }

  const rawLength = rawText.length;

  // 1. Remove PDF binary artifacts and stream garbage
  let text = rawText
    .replace(/%PDF-[\d\.]+/gi, '')
    .replace(/\b(obj|endobj|xref|trailer|startxref|stream|endstream)\b/gi, '')
    .replace(/<<[\s\S]*?>>/g, '')
    .replace(/\\u[0-9a-fA-F]{4}/g, ' ')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' '); // non-printable ASCII

  // 2. Remove common page numbers like "Page 1 of 2", "- 1 -", "Page 2"
  text = text
    .replace(/Page\s+\d+\s+(of|\/)\s+\d+/gi, '')
    .replace(/\bPage\s+\d+\b/gi, '')
    .replace(/^\s*[-–—]\s*\d+\s*[-–—]\s*$/gm, '');

  // 3. Extract contact info prior to aggressive line processing
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const emails = Array.from(new Set(text.match(emailRegex) || []));

  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}/g;
  const potentialPhones = (text.match(phoneRegex) || [])
    .map(p => p.trim())
    .filter(p => p.replace(/\D/g, '').length >= 10);
  const phones = Array.from(new Set(potentialPhones));

  const linkRegex = /(https?:\/\/[^\s]+|github\.com\/[^\s]+|linkedin\.com\/in\/[^\s]+|portfolio\.[^\s]+|[a-zA-Z0-9-]+\.(?:dev|app|me|io|com)(?:\/[^\s]*)?)/gi;
  const links = Array.from(new Set(text.match(linkRegex) || []));

  // 4. Repair broken lines (e.g. "Engi-\nneer" -> "Engineer", "Rohit \n Yadav" with split names)
  text = text.replace(/(\w+)-\n\s*(\w+)/g, '$1$2');

  // 5. Detect and standardize common resume section headings
  const standardHeadings = [
    'EDUCATION',
    'EXPERIENCE',
    'WORK EXPERIENCE',
    'PROJECTS',
    'PERSONAL PROJECTS',
    'TECHNICAL SKILLS',
    'SKILLS',
    'ACHIEVEMENTS',
    'AWARDS',
    'CERTIFICATIONS',
    'HACKATHONS',
    'PUBLICATIONS',
    'LEADERSHIP',
    'SUMMARY',
    'ABOUT ME',
    'CONTACT'
  ];

  const headingsFound: string[] = [];
  standardHeadings.forEach(h => {
    const reg = new RegExp(`(^|\\n)\\s*(${h})\\s*(:)?(\\n|$)`, 'i');
    if (reg.test(text)) {
      headingsFound.push(h);
      text = text.replace(reg, `\n\n### $2\n`);
    }
  });

  // 6. Normalize bullet points and whitespace
  text = text
    .replace(/[•●▪■◆★\u2022\u2023\u25E6\u2043\u2219]/g, '\n- ')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/ {2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const cleanedLength = text.length;
  const reductionPercentage = Math.round(((rawLength - cleanedLength) / (rawLength || 1)) * 100);
  const pagesEstimated = Math.max(1, Math.ceil(cleanedLength / 1800));

  return {
    cleanText: text,
    pagesEstimated,
    headingsFound,
    contactsFound: { emails, phones, links },
    metrics: {
      rawLength,
      cleanedLength,
      reductionPercentage
    }
  };
}
