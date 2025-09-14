import DisclaimerSection from "./DisclaimerSection";
import IntroSection from "./IntroSection";
import MissionCard from "./MissionCard";
import LinksSection from "./MyLinks";
import ProjectSkillsSection from "./ProjectSkillsSection";

const AboutMeSection = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Intro */}
      <IntroSection />

      <ProjectSkillsSection />

      {/* Mission */}
      <MissionCard />

      {/* Links */}
      <LinksSection />

      {/* Disclaimer */}
      <DisclaimerSection />
    </div>
  );
};

export default AboutMeSection;
