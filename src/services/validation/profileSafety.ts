import { CanonicalProfile, ProjectItem } from '../../types/profile';

/**
 * Global Safety Layer
 * Guarantees that null, undefined, NaN, "[object Object]", "Student Candidate"
 * will NEVER leak onto any rendered portfolio.
 */
export function safeString(val: any, fallback = ''): string {
  if (val === null || val === undefined) return fallback;
  const str = String(val).trim();
  if (
    str === 'null' ||
    str === 'undefined' ||
    str === 'NaN' ||
    str === '[object Object]' ||
    str.toLowerCase() === 'student candidate'
  ) {
    return fallback;
  }
  return str;
}

export function getInitials(name: string): string {
  const clean = safeString(name, 'Dev').replace(/[^a-zA-Z\s]/g, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'ZY';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getProjectGradient(id: string | number): string {
  const gradients = [
    'from-purple-600 via-indigo-600 to-blue-600',
    'from-emerald-500 via-teal-600 to-cyan-600',
    'from-rose-500 via-pink-600 to-purple-600',
    'from-amber-500 via-orange-600 to-red-600',
    'from-blue-600 via-cyan-600 to-teal-500',
    'from-violet-600 via-fuchsia-600 to-pink-500'
  ];
  const hash = String(id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
}

export function getProjectPattern(index: number): string {
  const patterns = [
    'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 60%)',
    'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)',
    'radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.4) 0%, transparent 60%)',
    'radial-gradient(circle at 10% 70%, rgba(244, 63, 94, 0.4) 0%, transparent 60%)'
  ];
  return patterns[index % patterns.length];
}

export function safeProfile(profile: CanonicalProfile): CanonicalProfile {
  const name = safeString(profile.personal?.name, 'Zenith Developer');
  const title = safeString(profile.personal?.professionalTitle, 'Software Engineer');

  return {
    ...profile,
    personal: {
      ...profile.personal,
      name,
      professionalTitle: title,
      headline: safeString(profile.personal?.headline, `${title} building intelligent & scalable digital systems.`),
      email: safeString(profile.personal?.email),
      phone: safeString(profile.personal?.phone),
      location: safeString(profile.personal?.location),
      website: safeString(profile.personal?.website),
      profileImage: profile.personal?.profileImage || null,
      bio: safeString(profile.personal?.bio, profile.summary || `Professional engineer specialized in high-performance digital products and scalable architectures.`)
    },
    projects: (profile.projects || []).map((p, idx) => ({
      ...p,
      name: safeString(p.name, `Featured Project ${idx + 1}`),
      description: safeString(p.description, 'Comprehensive technical implementation focusing on real-time processing and modular architecture.'),
      technologies: Array.isArray(p.technologies) ? p.technologies.filter(Boolean) : []
    })),
    education: (profile.education || []).map(e => ({
      ...e,
      institution: safeString(e.institution, 'University'),
      degree: safeString(e.degree, 'Bachelor of Science / Technology')
    })),
    experience: (profile.experience || []).map(ex => ({
      ...ex,
      company: safeString(ex.company, 'Company'),
      role: safeString(ex.role, 'Engineer')
    }))
  };
}
