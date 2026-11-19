import { CanonicalProfile, ReviewIssue } from '../../types/profile';

export interface ValidationReport {
  isValid: boolean;
  totalFieldsChecked: number;
  verifiedFieldsCount: number;
  flaggedIssuesCount: number;
  overallConfidence: number;
  issues: ReviewIssue[];
}

export function validateExtractedProfile(profile: CanonicalProfile, originalText: string): ValidationReport {
  const issues: ReviewIssue[] = [];
  let totalFields = 0;
  let verifiedFields = 0;

  const textLower = originalText.toLowerCase();

  // 1. Personal Name Check
  totalFields++;
  if (!profile.personal.name || profile.personal.name.toLowerCase() === 'student candidate' || profile.personal.name.toLowerCase() === 'developer') {
    issues.push({
      field: 'personal.name',
      issue: 'Candidate name could not be definitively matched from the first header lines.',
      confidence: 0.5,
      suggestion: 'Please verify your full legal / preferred name.'
    });
  } else {
    // Check if name letters are in raw text
    const nameParts = profile.personal.name.toLowerCase().split(/\s+/);
    const inText = nameParts.every(p => textLower.includes(p));
    if (!inText) {
      issues.push({
        field: 'personal.name',
        issue: 'Extracted name differed slightly from resume text.',
        confidence: 0.72
      });
    } else {
      verifiedFields++;
    }
  }

  // 2. Email & Phone
  totalFields++;
  if (profile.personal.email) {
    if (textLower.includes(profile.personal.email.toLowerCase())) {
      verifiedFields++;
    } else {
      issues.push({
        field: 'personal.email',
        issue: 'Email format detected with possible typo.',
        confidence: 0.8
      });
    }
  }

  // 3. Education
  profile.education.forEach((edu, idx) => {
    totalFields += 3;
    if (edu.institution && textLower.includes(edu.institution.toLowerCase().slice(0, 8))) {
      verifiedFields++;
    } else {
      issues.push({
        field: `education[${idx}].institution`,
        issue: `Institution name "${edu.institution}" may need quick review.`,
        confidence: 0.75
      });
    }

    if (edu.degree) verifiedFields++;
    if (edu.grade) {
      if (textLower.includes(edu.grade.toLowerCase().replace(/[^0-9.]/g, ''))) {
        verifiedFields++;
      } else {
        issues.push({
          field: `education[${idx}].grade`,
          issue: `Grade / CGPA score "${edu.grade}" extracted from text.`,
          confidence: 0.85
        });
      }
    }
  });

  // 4. Projects
  profile.projects.forEach((proj, idx) => {
    totalFields += 3;
    if (proj.name) verifiedFields++;
    if (proj.description && proj.description.length > 20) verifiedFields++;
    if (proj.technologies && proj.technologies.length > 0) verifiedFields++;

    if (!proj.technologies || proj.technologies.length === 0) {
      issues.push({
        field: `projects[${idx}].technologies`,
        issue: `Project "${proj.name}" had no explicit technologies detected.`,
        confidence: 0.65,
        suggestion: 'Add tags such as React, Python, or Docker.'
      });
    }
  });

  // 5. Skills verification against hallucinations
  const unverifiedSkills: string[] = [];
  (profile.skills.all || []).forEach(skill => {
    totalFields++;
    const skillNorm = skill.toLowerCase();
    if (textLower.includes(skillNorm) || textLower.includes(skillNorm.replace(/\s+/g, ''))) {
      verifiedFields++;
    } else {
      unverifiedSkills.push(skill);
    }
  });

  if (unverifiedSkills.length > 3) {
    issues.push({
      field: 'skills.all',
      issue: `${unverifiedSkills.length} inferred skills were added during AI semantic analysis: ${unverifiedSkills.slice(0, 4).join(', ')}.`,
      confidence: 0.78,
      suggestion: 'Confirm if you have proficiency with these tools.'
    });
  }

  // 6. Experience
  profile.experience.forEach((exp, idx) => {
    totalFields += 2;
    if (exp.company) verifiedFields++;
    if (exp.role) verifiedFields++;
  });

  const overallConfidence = totalFields > 0 ? Math.min(0.99, Math.max(0.70, (verifiedFields / totalFields))) : 0.95;

  return {
    isValid: issues.filter(i => i.confidence < 0.6).length === 0,
    totalFieldsChecked: totalFields,
    verifiedFieldsCount: verifiedFields,
    flaggedIssuesCount: issues.length,
    overallConfidence,
    issues
  };
}
