import JSZip from 'jszip';
import { CanonicalProfile, ThemeConfig } from '../types/profile';
import { COLOR_PALETTES } from './themeEngine';
import { safeProfile, getInitials } from '../services/validation/profileSafety';

export async function generatePortfolioZip(profile: CanonicalProfile, theme: ThemeConfig): Promise<Blob> {
  const zip = new JSZip();
  const safe = safeProfile(profile);
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const initials = getInitials(safe.personal.name);

  // 1. Generate comprehensive standalone long-form index.html
  const htmlContent = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safe.personal.name} — ${safe.personal.professionalTitle}</title>
  <meta name="description" content="${safe.personal.headline}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Outfit:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background-color: ${palette.bg};
      color: ${palette.text};
      font-family: 'Outfit', sans-serif;
    }
  </style>
</head>
<body class="min-h-screen selection:bg-blue-600 selection:text-white antialiased">
  
  <!-- Navigation -->
  <header class="sticky top-0 z-40 w-full py-4 border-b border-white/10 bg-[#090a0f]/90 backdrop-blur-md">
    <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white" style="background-color: ${palette.accent};">
          ${initials}
        </div>
        <div>
          <div class="font-extrabold text-sm text-white uppercase">${safe.personal.name}</div>
          <div class="text-[10px] text-slate-400 font-mono uppercase">${safe.personal.professionalTitle}</div>
        </div>
      </div>

      <nav class="hidden sm:flex items-center gap-6 text-xs font-mono text-slate-300">
        <a href="#work" class="hover:text-blue-400 uppercase transition-colors">Work</a>
        <a href="#about" class="hover:text-blue-400 uppercase transition-colors">About</a>
        <a href="#experience" class="hover:text-blue-400 uppercase transition-colors">Experience</a>
        <a href="#skills" class="hover:text-blue-400 uppercase transition-colors">Skills</a>
        <a href="#contact" class="hover:text-blue-400 uppercase transition-colors">Contact</a>
      </nav>

      ${safe.personal.email ? `<a href="mailto:${safe.personal.email}" class="px-4 py-2 rounded-full text-xs font-bold text-white shadow" style="background-color: ${palette.accent};">Let's Talk</a>` : ''}
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-6 sm:px-10 space-y-32 py-16">
    
    <!-- Hero -->
    <section class="space-y-6">
      ${safe.personal.location ? `
      <div class="inline-block px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-slate-300 border border-white/10 bg-white/5">
        ${safe.personal.professionalTitle.toUpperCase()} · ${safe.personal.location.toUpperCase()}
      </div>` : `
      <div class="inline-block px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-slate-300 border border-white/10 bg-white/5">
        ${safe.personal.professionalTitle.toUpperCase()}
      </div>`}
      <h1 class="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-tight">
        ${safe.personal.name}
      </h1>
      <p class="text-2xl sm:text-4xl text-slate-300 font-light max-w-4xl leading-relaxed">
        ${safe.personal.headline}
      </p>
      <div class="pt-4 flex gap-4">
        <a href="#work" class="px-7 py-3 rounded-full text-xs font-bold text-white uppercase shadow-lg transition-transform hover:scale-105" style="background-color: ${palette.accent};">View Selected Work</a>
        <a href="#contact" class="px-7 py-3 rounded-full text-xs font-bold text-slate-300 uppercase border border-white/10 bg-white/5 hover:bg-white/10">Contact</a>
      </div>
    </section>

    <!-- Visual Statement -->
    <section class="p-8 sm:p-12 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="space-y-1">
        <div class="text-xs font-mono uppercase text-blue-400 font-bold">VERIFIED CANONICAL PROFILE</div>
        <h2 class="text-3xl font-extrabold uppercase text-white">${safe.personal.professionalTitle}</h2>
        <div class="text-xs font-mono text-slate-400">${safe.education[0] ? `${safe.education[0].institution} · ${safe.education[0].degree}` : safe.personal.headline}</div>
      </div>
      <div class="text-3xl font-extrabold font-mono text-white p-6 rounded-xl bg-white/5 border border-white/10">
        [ ${initials} ]
      </div>
    </section>

    <!-- About -->
    <section id="about" class="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/10 pt-16">
      <div class="md:col-span-4">
        <div class="text-xs font-mono uppercase text-blue-400 font-bold">01 / Introduction</div>
        <h2 class="text-3xl font-extrabold text-white mt-1">About My Work</h2>
      </div>
      <div class="md:col-span-8 space-y-6 text-lg text-slate-300 font-light leading-relaxed">
        <p>${safe.personal.bio}</p>
        <div class="p-6 rounded-xl border border-white/10 bg-white/[0.02] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          ${safe.education[0] ? `<div><span class="text-slate-400">Education:</span><div class="text-white font-bold">${safe.education[0].degree}</div></div>` : ''}
          ${safe.personal.location ? `<div><span class="text-slate-400">Location:</span><div class="text-white font-bold">${safe.personal.location}</div></div>` : ''}
          <div><span class="text-slate-400">Focus:</span><div class="text-white font-bold">${safe.personal.professionalTitle}</div></div>
        </div>
      </div>
    </section>

    <!-- What I Build -->
    <section class="border-t border-white/10 pt-16 space-y-8">
      <div class="text-xs font-mono uppercase text-blue-400 font-bold">02 / Capabilities</div>
      <h2 class="text-3xl font-extrabold text-white">What I Build</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${(safe.whatIBuild || []).map(w => `
          <div class="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
            <span class="text-xs font-mono text-blue-400 font-bold">${w.number}</span>
            <h3 class="font-bold text-white text-base">${w.title}</h3>
            <p class="text-xs text-slate-400 font-light">${w.description}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Selected Works -->
    <section id="work" class="border-t border-white/10 pt-16 space-y-16">
      <div class="flex justify-between items-end">
        <div>
          <div class="text-xs font-mono uppercase text-blue-400 font-bold">03 / Selected Works</div>
          <h2 class="text-4xl sm:text-5xl font-extrabold text-white mt-1">Featured Projects</h2>
        </div>
        <div class="text-xs font-mono text-slate-400">${safe.projects.length} Architectures</div>
      </div>

      <div class="space-y-12">
        ${safe.projects.map((p, idx) => `
          <div class="p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6">
            <div class="flex justify-between items-start">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">PROJECT 0${idx + 1}</span>
              ${p.startDate ? `<span class="text-xs font-mono text-slate-400">${p.startDate}</span>` : ''}
            </div>
            <h3 class="text-3xl font-extrabold text-white">${p.name}</h3>
            <p class="text-base text-slate-300 font-light leading-relaxed">${p.description}</p>
            <div class="flex flex-wrap gap-2">
              ${p.technologies.map(t => `<span class="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">${t}</span>`).join('')}
            </div>
            ${p.liveUrl || p.github ? `
              <div class="pt-2 flex gap-4 text-xs font-mono">
                ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="text-blue-400 hover:underline">Live System →</a>` : ''}
                ${p.github ? `<a href="${p.github}" target="_blank" class="text-slate-400 hover:underline">Source Code →</a>` : ''}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Education -->
    <section class="border-t border-white/10 pt-16 space-y-6">
      <div class="text-xs font-mono uppercase text-blue-400 font-bold">04 / Foundation</div>
      <h2 class="text-3xl font-extrabold text-white">Education</h2>
      ${safe.education.map(e => `
        <div class="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-2">
          <div class="flex justify-between items-center">
            <h3 class="text-2xl font-bold text-white">${e.institution}</h3>
            ${e.grade ? `<span class="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-400 font-mono text-xs font-bold border border-blue-500/20">${e.grade}</span>` : ''}
          </div>
          <div class="text-base text-slate-300">${e.degree} (${e.startDate} — ${e.endDate})</div>
        </div>
      `).join('')}
    </section>

    <!-- Skills -->
    <section id="skills" class="border-t border-white/10 pt-16 space-y-6">
      <div class="text-xs font-mono uppercase text-blue-400 font-bold">05 / Capabilities</div>
      <h2 class="text-3xl font-extrabold text-white">Technical Radar</h2>
      <div class="flex flex-wrap gap-2.5">
        ${safe.skills.all.map(s => `<span class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-200">${s}</span>`).join('')}
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="border-t border-white/10 pt-20 pb-12 text-center space-y-6">
      <h2 class="text-4xl sm:text-6xl font-extrabold text-white">Let's build something useful.</h2>
      <p class="text-slate-400 max-w-xl mx-auto">Have an idea? Want to collaborate?</p>
      ${safe.personal.email ? `<a href="mailto:${safe.personal.email}" class="inline-block px-8 py-4 rounded-full text-sm font-bold text-white shadow-xl" style="background-color: ${palette.accent};">${safe.personal.email}</a>` : ''}
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/10 pt-8 pb-12 text-center text-xs font-mono text-slate-500">
      © ${new Date().getFullYear()} ${safe.personal.name} · Built with Zenith Stack
    </footer>

  </main>

</body>
</html>`;

  zip.file('index.html', htmlContent);
  zip.file('profile.json', JSON.stringify(safe, null, 2));
  zip.file('README.md', `# ${safe.personal.name} — Portfolio Website

Generated with Zenith Stack AI Resume-to-Portfolio Builder.

## How to Deploy:
- **Vercel**: Drag and drop this folder onto https://vercel.com/new
- **Netlify**: Drag and drop onto https://app.netlify.com/drop
- **GitHub Pages**: Push to a repository and enable GitHub Pages on root.
`);

  return await zip.generateAsync({ type: 'blob' });
}
