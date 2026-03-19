import { useMemo, useState } from 'react';
import EnvironmentPanel from './components/EnvironmentPanel';
import OrganismSelectionPanel from './components/OrganismSelectionPanel';
import EnergyResultPanel from './components/EnergyResultPanel';
import { organismData } from './data/organisms';
import { calculateEnergyFlow } from './utils/energyModel';
import { generateResultSummary } from './utils/summaryGenerator';
import { generateAiNarration } from './utils/aiNarration';
import { AI_NARRATION_SYSTEM_PROMPT, buildAiNarrationPrompt } from './utils/aiPromptTemplate';

const BASE_PRODUCER_ENERGY = 1000;

const FALLBACK_PRODUCER = { id: 'fallback-producer', name: '기본 생산자', factor: 1, producerType: 'chemosynthesis' };
const FALLBACK_PRIMARY = { id: 'fallback-primary', name: '기본 1차 소비자', factor: 1 };
const FALLBACK_SECONDARY = { id: 'fallback-secondary', name: '기본 2차 소비자', factor: 1 };

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function safeRounded(value) {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.round(value);
}

function App() {
  const [h2s, setH2s] = useState(85);
  const [temperature, setTemperature] = useState(20);
  const [pressure, setPressure] = useState(90);
  const [light, setLight] = useState(15);
  const [openaiKey, setOpenaiKey] = useState('');
  const [openrouterKey, setOpenrouterKey] = useState('');
  const [aiNarration, setAiNarration] = useState('');
  const [aiError, setAiError] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [selectedProducerId, setSelectedProducerId] = useState(organismData.producers[0]?.id ?? FALLBACK_PRODUCER.id);
  const [selectedPrimaryId, setSelectedPrimaryId] = useState(
    organismData.primaryConsumers[0]?.id ?? FALLBACK_PRIMARY.id
  );
  const [selectedSecondaryId, setSelectedSecondaryId] = useState(
    organismData.secondaryConsumers[0]?.id ?? FALLBACK_SECONDARY.id
  );

  const selectedProducer =
    organismData.producers.find((item) => item.id === selectedProducerId) ?? organismData.producers[0] ?? FALLBACK_PRODUCER;
  const selectedPrimary =
    organismData.primaryConsumers.find((item) => item.id === selectedPrimaryId) ??
    organismData.primaryConsumers[0] ??
    FALLBACK_PRIMARY;
  const selectedSecondary =
    organismData.secondaryConsumers.find((item) => item.id === selectedSecondaryId) ??
    organismData.secondaryConsumers[0] ??
    FALLBACK_SECONDARY;

  const hasSelectionFallback =
    !organismData.producers.some((item) => item.id === selectedProducerId) ||
    !organismData.primaryConsumers.some((item) => item.id === selectedPrimaryId) ||
    !organismData.secondaryConsumers.some((item) => item.id === selectedSecondaryId);

  const safeEnvironment = {
    h2s: clamp(h2s, 0, 100),
    temperature: clamp(temperature, 0, 100),
    pressure: clamp(pressure, 0, 100),
    light: clamp(light, 0, 100)
  };

  const energy = useMemo(() => {
    const pressureFactor = 1 - Math.abs(safeEnvironment.pressure - 80) / 400;
    const baseProducerEnergy = BASE_PRODUCER_ENERGY * pressureFactor * (selectedProducer.factor || 1);

    const flow = calculateEnergyFlow({
      baseProducerEnergy,
      h2s: safeEnvironment.h2s,
      light: safeEnvironment.light,
      temperature: safeEnvironment.temperature,
      producerType: selectedProducer.producerType
    });

    const primaryAfterSpecies = flow.rounded.primaryEnergy * (selectedPrimary.factor || 1);
    const secondaryAfterSpecies = flow.rounded.secondaryEnergy * (selectedSecondary.factor || 1);

    const producerEnergy = safeRounded(flow.rounded.producerEnergy);
    const primaryEnergy = safeRounded(primaryAfterSpecies);
    const secondaryEnergy = safeRounded(secondaryAfterSpecies);

    return {
      producerEnergy,
      primaryEnergy,
      secondaryEnergy,
      producerLoss: safeRounded(producerEnergy - primaryEnergy),
      primaryLoss: safeRounded(primaryEnergy - secondaryEnergy)
    };
  }, [safeEnvironment.h2s, safeEnvironment.light, safeEnvironment.pressure, safeEnvironment.temperature, selectedPrimary.factor, selectedProducer.factor, selectedProducer.producerType, selectedSecondary.factor]);

  const summarySentences = useMemo(
    () =>
      generateResultSummary({
        environment: safeEnvironment,
        selected: {
          producer: selectedProducer,
          primary: selectedPrimary,
          secondary: selectedSecondary
        },
        energy
      }),
    [safeEnvironment, selectedProducer, selectedPrimary, selectedSecondary, energy]
  );

  const handleResetSelections = () => {
    setSelectedProducerId(organismData.producers[0]?.id ?? FALLBACK_PRODUCER.id);
    setSelectedPrimaryId(organismData.primaryConsumers[0]?.id ?? FALLBACK_PRIMARY.id);
    setSelectedSecondaryId(organismData.secondaryConsumers[0]?.id ?? FALLBACK_SECONDARY.id);
    setAiError('선택값을 기본 상태로 복구했습니다.');
  };

  const handleGenerateAi = async () => {
    if (!openaiKey.trim() && !openrouterKey.trim()) {
      setAiError('API 키가 없어 AI 설명을 생성할 수 없습니다. 키를 입력해 주세요.');
      return;
    }

    setIsAiLoading(true);
    setAiError('');

    try {
      const userPrompt = buildAiNarrationPrompt({
        environment: safeEnvironment,
        selected: {
          producer: selectedProducer.name,
          primary: selectedPrimary.name,
          secondary: selectedSecondary.name
        },
        energy: {
          producer: energy.producerEnergy,
          primary: energy.primaryEnergy,
          secondary: energy.secondaryEnergy
        }
      });

      const text = await generateAiNarration({
        openaiKey,
        openrouterKey,
        systemPrompt: AI_NARRATION_SYSTEM_PROMPT,
        userPrompt
      });

      setAiNarration(text);
    } catch (error) {
      setAiNarration('');
      setAiError(error instanceof Error ? error.message : 'AI 설명 생성 중 오류가 발생했습니다.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/95 px-8 py-6">
        <h1 className="text-3xl font-bold tracking-tight text-sky-300">외계 행성 생태계 설계와 에너지 흐름</h1>
        <p className="mt-2 text-base text-slate-300">발표용 MVP: 단순한 에너지 전달(약 10% 법칙) 모델</p>
      </header>

      <main className="mx-auto grid w-full max-w-[1700px] gap-5 px-6 py-6 lg:grid-cols-12">
        <EnvironmentPanel
          h2s={safeEnvironment.h2s}
          setH2s={setH2s}
          temperature={safeEnvironment.temperature}
          setTemperature={setTemperature}
          pressure={safeEnvironment.pressure}
          setPressure={setPressure}
          light={safeEnvironment.light}
          setLight={setLight}
        />

        <OrganismSelectionPanel
          producers={organismData.producers}
          primaryConsumers={organismData.primaryConsumers}
          secondaryConsumers={organismData.secondaryConsumers}
          selectedProducerId={selectedProducer.id}
          setSelectedProducerId={setSelectedProducerId}
          selectedPrimaryId={selectedPrimary.id}
          setSelectedPrimaryId={setSelectedPrimaryId}
          selectedSecondaryId={selectedSecondary.id}
          setSelectedSecondaryId={setSelectedSecondaryId}
        />

        <EnergyResultPanel
          energy={energy}
          summarySentences={summarySentences}
          openaiKey={openaiKey}
          setOpenaiKey={setOpenaiKey}
          openrouterKey={openrouterKey}
          setOpenrouterKey={setOpenrouterKey}
          onGenerateAi={handleGenerateAi}
          isAiLoading={isAiLoading}
          aiNarration={aiNarration}
          aiError={aiError}
          hasSelectionFallback={hasSelectionFallback}
          onResetSelections={handleResetSelections}
        />
      </main>
    </div>
  );
}

export default App;
