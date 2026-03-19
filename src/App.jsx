import { useMemo, useState } from 'react';
import EnvironmentPanel from './components/EnvironmentPanel';
import OrganismSelectionPanel from './components/OrganismSelectionPanel';
import EnergyResultPanel from './components/EnergyResultPanel';
import { organismData } from './data/organisms';
import { calculateEnergyFlow } from './utils/energyModel';

const BASE_PRODUCER_ENERGY = 1000;

function App() {
  // 극한 심해형 행성 기본값: H2S 높음, 온도 낮음, 압력 높음, 빛 낮음
  const [h2s, setH2s] = useState(85);
  const [temperature, setTemperature] = useState(20);
  const [pressure, setPressure] = useState(90);
  const [light, setLight] = useState(15);

  // 단계별 단일 선택 상태(상위 컴포넌트에서 관리)
  const [selectedProducerId, setSelectedProducerId] = useState(organismData.producers[0].id);
  const [selectedPrimaryId, setSelectedPrimaryId] = useState(organismData.primaryConsumers[0].id);
  const [selectedSecondaryId, setSelectedSecondaryId] = useState(organismData.secondaryConsumers[0].id);

  const selectedProducer =
    organismData.producers.find((item) => item.id === selectedProducerId) ?? organismData.producers[0];
  const selectedPrimary =
    organismData.primaryConsumers.find((item) => item.id === selectedPrimaryId) ?? organismData.primaryConsumers[0];
  const selectedSecondary =
    organismData.secondaryConsumers.find((item) => item.id === selectedSecondaryId) ?? organismData.secondaryConsumers[0];

  const energy = useMemo(() => {
    const pressureFactor = 1 - Math.abs(pressure - 80) / 400;
    const baseProducerEnergy = BASE_PRODUCER_ENERGY * pressureFactor * selectedProducer.factor;

    const flow = calculateEnergyFlow({
      baseProducerEnergy,
      h2s,
      light,
      temperature,
      producerType: selectedProducer.producerType
    });

    const primaryAfterSpecies = flow.rounded.primaryEnergy * selectedPrimary.factor;
    const secondaryAfterSpecies = flow.rounded.secondaryEnergy * selectedSecondary.factor;

    return {
      producerEnergy: flow.rounded.producerEnergy,
      primaryEnergy: Math.round(primaryAfterSpecies),
      secondaryEnergy: Math.round(secondaryAfterSpecies),
      producerLoss: Math.round(flow.rounded.producerEnergy - primaryAfterSpecies),
      primaryLoss: Math.round(primaryAfterSpecies - secondaryAfterSpecies),
      modifiers: flow.raw
    };
  }, [pressure, selectedProducer, selectedPrimary, selectedSecondary, h2s, light, temperature]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-5">
        <h1 className="text-2xl font-bold text-sky-300">외계 행성 생태계 설계와 에너지 흐름</h1>
        <p className="mt-1 text-sm text-slate-300">발표용 MVP: 단순한 에너지 전달(약 10% 법칙) 모델</p>
      </header>

      <main className="grid gap-4 p-4 lg:grid-cols-12">
        <EnvironmentPanel
          h2s={h2s}
          setH2s={setH2s}
          temperature={temperature}
          setTemperature={setTemperature}
          pressure={pressure}
          setPressure={setPressure}
          light={light}
          setLight={setLight}
        />

        <OrganismSelectionPanel
          producers={organismData.producers}
          primaryConsumers={organismData.primaryConsumers}
          secondaryConsumers={organismData.secondaryConsumers}
          selectedProducerId={selectedProducerId}
          setSelectedProducerId={setSelectedProducerId}
          selectedPrimaryId={selectedPrimaryId}
          setSelectedPrimaryId={setSelectedPrimaryId}
          selectedSecondaryId={selectedSecondaryId}
          setSelectedSecondaryId={setSelectedSecondaryId}
        />

        <EnergyResultPanel energy={energy} />
      </main>

      <footer className="p-4">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-200">
          <h3 className="mb-2 text-base font-semibold text-sky-200">과학 개념 요약</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>생산자에서 시작한 에너지는 소비자로 이동하면서 대부분 열로 소실됩니다.</li>
            <li>교육용 단순 모델에서는 단계당 약 10%만 전달된다고 봅니다.</li>
            <li>환경이 바뀌면 시작 에너지(생산자 단계)가 달라지고 전체 먹이사슬에 영향을 줍니다.</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
