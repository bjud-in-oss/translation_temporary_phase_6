
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownSection = ({ content }: { content: string }) => (
    <div className="prose prose-invert max-w-none prose-headings:text-slate-200 prose-a:text-blue-400 prose-code:text-pink-400 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
);
import MasterDevelopmentPlan from '../../docs/architecture/00_MasterDevelopmentPlan.md?raw';
import Phase1CoreState from '../../docs/architecture/01_Phase1_CoreState.md?raw';
import Phase2AILogic from '../../docs/architecture/02_Phase2_AILogic.md?raw';
import Phase4UX from '../../docs/architecture/04_Phase4_UX.md?raw';
import Phase5SFU from '../../docs/architecture/05_Phase5_SFU.md?raw';
import Phase6BYOKSecurity from '../../docs/architecture/06_Phase6_BYOK_Security.md?raw';
import OverviewPurpose from '../../docs/architecture/01_OverviewPurpose.md?raw';
import OverviewProblems from '../../docs/architecture/02_OverviewProblems.md?raw';
import OverviewArchitecture from '../../docs/architecture/03_OverviewArchitecture.md?raw';
import BargeInDeepDive from '../../docs/architecture/04_BargeInDeepDive.md?raw';
import PredictionLogicDeepDive from '../../docs/architecture/05_PredictionLogicDeepDive.md?raw';
import EvaluationRealityCheck from '../../docs/architecture/06_EvaluationRealityCheck.md?raw';
import FutureOptimizationPlan from '../../docs/architecture/07_FutureOptimizationPlan.md?raw';
import StartupRaceConditionDeepDive from '../../docs/architecture/08_StartupRaceConditionDeepDive.md?raw';
import ArchitectureDeepDiveBlob from '../../docs/architecture/09_ArchitectureDeepDiveBlob.md?raw';
import FutureRisksAndPlans from '../../docs/architecture/10_FutureRisksAndPlans.md?raw';
import VadHysteresisAnalysis from '../../docs/architecture/11_VadHysteresisAnalysis.md?raw';
import VadArchitectureDeepDive from '../../docs/architecture/12_VadArchitectureDeepDive.md?raw';
import ScenarioAnalysis from '../../docs/architecture/13_ScenarioAnalysis.md?raw';
import VadDynamics from '../../docs/architecture/14_VadDynamics.md?raw';
import TheSqueezeDeepDive from '../../docs/architecture/15_TheSqueezeDeepDive.md?raw';
import RenderPipeline from '../../docs/architecture/16_RenderPipeline.md?raw';
import BucketLogic from '../../docs/architecture/17_BucketLogic.md?raw';
import TimeAnchoring from '../../docs/architecture/18_TimeAnchoring.md?raw';
import TheBlinkAnalysis from '../../docs/architecture/19_TheBlinkAnalysis.md?raw';
import AbstractionLayers from '../../docs/architecture/20_AbstractionLayers.md?raw';
import VisualHandover from '../../docs/architecture/21_VisualHandover.md?raw';
import TheAccordionEffect from '../../docs/architecture/22_TheAccordionEffect.md?raw';
import CodeArchaeology from '../../docs/architecture/23_CodeArchaeology.md?raw';
import TheStuckCounter from '../../docs/architecture/24_TheStuckCounter.md?raw';
import CleanBreakDeepDive from '../../docs/architecture/25_CleanBreakDeepDive.md?raw';
import GhostPressureDeepDive from '../../docs/architecture/26_GhostPressureDeepDive.md?raw';
import AudioEnginePotential from '../../docs/architecture/27_AudioEnginePotential.md?raw';
import HardwareIntegration from '../../docs/architecture/28_HardwareIntegration.md?raw';
import AudioMixingScenarios from '../../docs/architecture/29_AudioMixingScenarios.md?raw';
import MasterWiringGuide from '../../docs/guides/30_MasterWiringGuide.md?raw';
import VirtualCableGuide from '../../docs/guides/31_VirtualCableGuide.md?raw';
import SimpleJabraGuide from '../../docs/guides/32_SimpleJabraGuide.md?raw';
import UniversalAutomation from '../../docs/architecture/33_UniversalAutomation.md?raw';
import LongDurationStrategy from '../../docs/architecture/34_LongDurationStrategy.md?raw';
import TotalSystemCritique from '../../docs/architecture/35_TotalSystemCritique.md?raw';
import AudioDistribution from '../../docs/architecture/36_AudioDistribution.md?raw';
import PuppeteerProtocol from '../../docs/architecture/37_PuppeteerProtocol.md?raw';
import TheTapeRecorderProtocol from '../../docs/architecture/38_TheTapeRecorderProtocol.md?raw';
import PromptSimplification from '../../docs/architecture/39_PromptSimplification.md?raw';
import ShieldPunctureDeepDive from '../../docs/architecture/40_ShieldPunctureDeepDive.md?raw';
import VisualDebuggingFix from '../../docs/architecture/41_VisualDebuggingFix.md?raw';
import HybridSpeedControl from '../../docs/architecture/42_HybridSpeedControl.md?raw';
import AdaptiveSlew from '../../docs/architecture/43_AdaptiveSlew.md?raw';
import TowerUnification from '../../docs/architecture/44_TowerUnification.md?raw';
import PipeliningDeepDive from '../../docs/architecture/45_PipeliningDeepDive.md?raw';
import TheBlindSpotDeepDive from '../../docs/architecture/46_TheBlindSpotDeepDive.md?raw';
import WakeUpProtocol from '../../docs/architecture/47_WakeUpProtocol.md?raw';
import DynamicPersonaInjection from '../../docs/architecture/48_DynamicPersonaInjection.md?raw';
import EcoMode from '../../docs/architecture/49_EcoMode.md?raw';
import HybridVelocity from '../../docs/architecture/50_HybridVelocity.md?raw';
import PromptEngineering from '../../docs/architecture/51_PromptEngineering.md?raw';
import SfuArchitecture from '../../docs/architecture/52_SfuArchitecture.md?raw';
import RoomAndRoleManagement from '../../docs/architecture/53_RoomAndRoleManagement.md?raw';
import AudioRoutingStateMachine from '../../docs/architecture/54_AudioRoutingStateMachine.md?raw';
import RoomAndMeetingUX from '../../docs/architecture/55_RoomAndMeetingUX.md?raw';
import HardwareProfiles from '../../docs/architecture/56_HardwareProfiles.md?raw';
import LongDurationMemory from '../../docs/architecture/57_LongDurationMemory.md?raw';
import PhysicalAudioScenarios from '../../docs/architecture/58_PhysicalAudioScenarios.md?raw';
import RolesVsHardwareModes from '../../docs/architecture/59_RolesVsHardwareModes.md?raw';
import Module90EntryStrategiesDiscovery from '../../docs/architecture/90_EntryStrategies_Discovery.md?raw';
import Module91CMSOnboardingArchitecture from '../../docs/architecture/91_CMS_Onboarding_Architecture.md?raw';
import Module92SaaSTranslationCrowdsourcing from '../../docs/architecture/92_SaaS_Translation_Crowdsourcing.md?raw';
import Module93MultiTenantByokUX from '../../docs/architecture/93_MultiTenantByok_UX.md?raw';
import Module94BffSecurityNetlify from '../../docs/architecture/94_BffSecurity_Netlify.md?raw';
import Module95SfuAdapterMunging from '../../docs/architecture/95_SfuAdapter_Munging.md?raw';
import Module96CriticalGotchas from '../../docs/architecture/96_CriticalGotchas.md?raw';
import InteractiveOnboardingEngine from '../../docs/architecture/97_InteractiveOnboardingEngine.md?raw';
import ZoomAudioMasterguide from '../../docs/guides/97_ZoomAudioMasterguide.md?raw';
import CriticalGotchasAndAcoustics from '../../docs/architecture/98_CriticalGotchasAndAcoustics.md?raw';
import FutureVisions from '../../docs/architecture/99_FutureVisions.md?raw';

interface TowerOverviewProps {
    onClose: () => void;
    highlightedId?: string | null;
}

const TowerOverview: React.FC<TowerOverviewProps> = ({ onClose, highlightedId }) => {
    return (
        <div className="w-full flex flex-col font-sans space-y-12 text-base text-slate-300">
            {/* Render all modules with spacing */}
            <div className="space-y-10 [&>section>div]:border-0 [&>section>div]:bg-transparent [&>section>div]:p-0 [&>section>h3]:text-sm [&>section>h3]:mb-4">
                <MarkdownSection content={MasterDevelopmentPlan} />
                <MarkdownSection content={Phase1CoreState} />
                <MarkdownSection content={Phase2AILogic} />
                <MarkdownSection content={Phase4UX} />
                <MarkdownSection content={Phase5SFU} />
                <MarkdownSection content={Phase6BYOKSecurity} />
                <MarkdownSection content={OverviewPurpose} />
                <MarkdownSection content={OverviewProblems} />
                <MarkdownSection content={OverviewArchitecture} />
                <MarkdownSection content={BargeInDeepDive} />
                <MarkdownSection content={PredictionLogicDeepDive} />
                <MarkdownSection content={EvaluationRealityCheck} />
                <MarkdownSection content={FutureOptimizationPlan} />
                <MarkdownSection content={StartupRaceConditionDeepDive} />
                <MarkdownSection content={ArchitectureDeepDiveBlob} />
                <MarkdownSection content={FutureRisksAndPlans} />
                <MarkdownSection content={VadHysteresisAnalysis} />
                <MarkdownSection content={VadArchitectureDeepDive} />
                <MarkdownSection content={ScenarioAnalysis} />
                <MarkdownSection content={VadDynamics} />
                <MarkdownSection content={TheSqueezeDeepDive} />
                
                {/* GRAPHICS & RENDERING DEEP DIVE */}
                <MarkdownSection content={RenderPipeline} />
                <MarkdownSection content={BucketLogic} />
                <MarkdownSection content={TimeAnchoring} />
                <MarkdownSection content={TheBlinkAnalysis} />
                <MarkdownSection content={AbstractionLayers} />
                <MarkdownSection content={VisualHandover} />
                <MarkdownSection content={TheAccordionEffect} />
                <MarkdownSection content={CodeArchaeology} />
                <MarkdownSection content={TheStuckCounter} />
                
                {/* PROTOCOLS */}
                <MarkdownSection content={CleanBreakDeepDive} />
                <MarkdownSection content={GhostPressureDeepDive} />
                
                {/* FUTURE DEV */}
                <MarkdownSection content={AudioEnginePotential} />
                <MarkdownSection content={HardwareIntegration} />
                <MarkdownSection content={AudioMixingScenarios} />
                
                {/* THE MASTER GUIDES */}
                <MarkdownSection content={MasterWiringGuide} />
                <MarkdownSection content={VirtualCableGuide} />
                <MarkdownSection content={SimpleJabraGuide} />
                <MarkdownSection content={UniversalAutomation} />
                <MarkdownSection content={LongDurationStrategy} />
                
                {/* THE DISTRIBUTION & CRITIQUE */}
                <MarkdownSection content={TotalSystemCritique} />
                <MarkdownSection content={AudioDistribution} />
                
                {/* THE PUPPETEER & NEW PROTOCOLS */}
                <MarkdownSection content={PuppeteerProtocol} />
                <MarkdownSection content={TheTapeRecorderProtocol} />
                <MarkdownSection content={PromptSimplification} />
                
                {/* CRITICAL BUG FIXES & ENGINE UPDATES */}
                <MarkdownSection content={ShieldPunctureDeepDive} />
                <MarkdownSection content={VisualDebuggingFix} />
                <MarkdownSection content={HybridSpeedControl} />
                <MarkdownSection content={AdaptiveSlew} />
                <MarkdownSection content={TowerUnification} />
                <MarkdownSection content={PipeliningDeepDive} />
                <MarkdownSection content={TheBlindSpotDeepDive} />
                <MarkdownSection content={WakeUpProtocol} />
                <MarkdownSection content={DynamicPersonaInjection} />
                <MarkdownSection content={EcoMode} />
                <MarkdownSection content={HybridVelocity} />
                
                {/* PROMPT & LANGUAGE */}
                <MarkdownSection content={PromptEngineering} />
                
                {/* ARCHITECTURE SHIFT */}
                <MarkdownSection content={SfuArchitecture} />
                <MarkdownSection content={RoomAndRoleManagement} />
                <MarkdownSection content={AudioRoutingStateMachine} />
                <MarkdownSection content={RoomAndMeetingUX} />
                <MarkdownSection content={HardwareProfiles} />
                <MarkdownSection content={LongDurationMemory} />
                <MarkdownSection content={PhysicalAudioScenarios} />
                <MarkdownSection content={RolesVsHardwareModes} />
                <MarkdownSection content={Module90EntryStrategiesDiscovery} />
                <MarkdownSection content={Module91CMSOnboardingArchitecture} />
                <MarkdownSection content={Module92SaaSTranslationCrowdsourcing} />
                <MarkdownSection content={Module93MultiTenantByokUX} />
                <MarkdownSection content={Module94BffSecurityNetlify} />
                <MarkdownSection content={Module95SfuAdapterMunging} />
                <MarkdownSection content={Module96CriticalGotchas} />
                <MarkdownSection content={InteractiveOnboardingEngine} />
                <MarkdownSection content={ZoomAudioMasterguide} />
                <MarkdownSection content={CriticalGotchasAndAcoustics} />
                <MarkdownSection content={FutureVisions} />
            </div>
            
            {/* End Marker to confirm scroll reach */}
            <div className="flex items-center justify-center pt-8 opacity-30 pb-8">
                <div className="h-1 w-20 bg-slate-700 rounded-full"></div>
            </div>
        </div>
    );
};

export default TowerOverview;
