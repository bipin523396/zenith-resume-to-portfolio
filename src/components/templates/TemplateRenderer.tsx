import React from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../types/profile';
import { safeProfile } from '../../services/validation/profileSafety';
import { normalizeTemplateId } from '../../utils/templateRegistry';

// Category A: Corporate and Professional
import { ExecutiveTemplate } from './executive/ExecutiveTemplate';
import { MinimalistTemplate } from './minimalist/MinimalistTemplate';
import { SwissGridTemplate } from './swissgrid/SwissGridTemplate';
import { EditorialTemplate } from './editorial/EditorialTemplate';

// Category B: Developer and Technology
import { DevDarkTemplate } from './devdark/DevDarkTemplate';
import { FullStackTemplate } from './fullstack/FullStackTemplate';
import { SoftwareEngineerTemplate } from './softwareengineer/SoftwareEngineerTemplate';
import { AIMLResearcherTemplate } from './aimlresearcher/AIMLResearcherTemplate';

// Category C: Creative and Visual
import { CreativeDesignerTemplate } from './creativedesigner/CreativeDesignerTemplate';
import { BentoGridTemplate } from './bentogrid/BentoGridTemplate';
import { BoldTypographyTemplate } from './boldtypography/BoldTypographyTemplate';
import { ImageFirstTemplate } from './imagefirst/ImageFirstTemplate';

// Category D: Modern Interactive Websites
import { GlassmorphismTemplate } from './glassmorphism/GlassmorphismTemplate';
import { ThreeDTemplate } from './threed/ThreeDTemplate';
import { MotionTemplate } from './motion/MotionTemplate';
import { GradientModernTemplate } from './gradientmodern/GradientModernTemplate';

// Category E: Specialized Professional Portfolios
import { AcademicTemplate } from './academic/AcademicTemplate';
import { ProductManagerTemplate } from './productmanager/ProductManagerTemplate';
import { DataScientistTemplate } from './datascientist/DataScientistTemplate';
import { FreelancerTemplate } from './freelancer/FreelancerTemplate';

// Category F: Premium and Unique
import { NeoBrutalistTemplate } from './neobrutalist/NeoBrutalistTemplate';
import { LuxuryTemplate } from './luxury/LuxuryTemplate';
import { PersonalBrandTemplate } from './personalbrand/PersonalBrandTemplate';
import { TimelineTemplate } from './timeline/TimelineTemplate';

// Backwards-compatible imports for earlier specialized templates
import { MagicUITemplate } from './magicui/MagicUITemplate';
import { HoverDevTemplate } from './hoverdev/HoverDevTemplate';
import { FramerTemplate } from './framer/FramerTemplate';
import { SkipperTemplate } from './skipper/SkipperTemplate';
import { AuroraTemplate } from './aurora/AuroraTemplate';
import { DevOpsTemplate } from './devops/DevOpsTemplate';
import { AIMLTemplate } from './aiml/AIMLTemplate';
import { GameCraftTemplate } from './gamecraft/GameCraftTemplate';
import { ProductDesignerTemplate } from './productdesigner/ProductDesignerTemplate';
import { MobileDevTemplate } from './mobiledev/MobileDevTemplate';
import { FintechTemplate } from './fintech/FintechTemplate';
import { GlassDarkTemplate } from './glassdark/GlassDarkTemplate';
import { MatrixCodeTemplate } from './matrixcode/MatrixCodeTemplate';
import { SpotlightTemplate } from './spotlight/SpotlightTemplate';
import { BentoTemplate } from './bento/BentoTemplate';
import { TerminalTemplate } from './terminal/TerminalTemplate';
import { CaseStudyTemplate } from './casestudy/CaseStudyTemplate';
import { CreativeTemplate } from './creative/CreativeTemplate';

interface TemplateRendererProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  // Guaranteed safety sanitization so null/undefined never reach DOM
  const sanitized = safeProfile(profile);
  const normalizedId = normalizeTemplateId(theme.templateId);

  // Direct check against canonical 24 templates first
  switch (theme.templateId) {
    // Category A: Corporate and Professional
    case 'executive':
      return <ExecutiveTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'minimalist':
      return <MinimalistTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'fullstack':
    case 'devdark':
    case 'swissgrid':
      return <FullStackTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'softwareengineer':
      return <SoftwareEngineerTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'aimlresearcher':
      return <AIMLResearcherTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;

    // Category C: Creative and Visual
    case 'creativedesigner':
      return <CreativeDesignerTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'bentogrid':
      return <BentoGridTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'boldtypography':
      return <BoldTypographyTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'imagefirst':
      return <ImageFirstTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;

    // Category D: Modern Interactive Websites
    case 'glassmorphism':
      return <GlassmorphismTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'threed':
      return <ThreeDTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'motion':
      return <MotionTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'gradientmodern':
      return <GradientModernTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;

    // Category E: Specialized Professional Portfolios
    case 'academic':
      return <AcademicTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'productmanager':
      return <ProductManagerTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'datascientist':
      return <DataScientistTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'freelancer':
      return <FreelancerTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;

    // Category F: Premium and Unique
    case 'neobrutalist':
      return <NeoBrutalistTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'luxury':
      return <LuxuryTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'personalbrand':
      return <PersonalBrandTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'timeline':
      return <TimelineTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;

    // Legacy and Variant Handlers
    case 'magicui':
      return <MagicUITemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'hoverdev':
      return <HoverDevTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'framer':
      return <FramerTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'skipper':
      return <SkipperTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'aurora':
      return <AuroraTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'devops':
      return <DevOpsTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'aiml':
      return <AIMLTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'gamecraft':
      return <GameCraftTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'productdesigner':
      return <ProductDesignerTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'mobiledev':
      return <MobileDevTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'fintech':
      return <FintechTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'glassdark':
      return <GlassDarkTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'matrixcode':
      return <MatrixCodeTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'spotlight':
      return <SpotlightTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'bento':
      return <BentoGridTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'terminal':
      return <DevDarkTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'casestudy':
      return <SoftwareEngineerTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
    case 'creative':
      return <CreativeDesignerTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;

    default:
      // Fallback through normalized ID or default to Executive
      switch (normalizedId) {
        case 'executive':
          return <ExecutiveTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'minimalist':
          return <MinimalistTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'swissgrid':
          return <SwissGridTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'editorial':
          return <EditorialTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'devdark':
          return <DevDarkTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'fullstack':
          return <FullStackTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'softwareengineer':
          return <SoftwareEngineerTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'aimlresearcher':
          return <AIMLResearcherTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'creativedesigner':
          return <CreativeDesignerTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'bentogrid':
          return <BentoGridTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'boldtypography':
          return <BoldTypographyTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'imagefirst':
          return <ImageFirstTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'glassmorphism':
          return <GlassmorphismTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'threed':
          return <ThreeDTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'motion':
          return <MotionTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'gradientmodern':
          return <GradientModernTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'academic':
          return <AcademicTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'productmanager':
          return <ProductManagerTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'datascientist':
          return <DataScientistTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'freelancer':
          return <FreelancerTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'neobrutalist':
          return <NeoBrutalistTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'luxury':
          return <LuxuryTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'personalbrand':
          return <PersonalBrandTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        case 'timeline':
          return <TimelineTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
        default:
          return <ExecutiveTemplate profile={sanitized} theme={theme} onSelectProject={onSelectProject} isStandalone={isStandalone} />;
      }
  }
};
