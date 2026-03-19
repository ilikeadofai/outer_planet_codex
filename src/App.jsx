import { useMemo, useState } from 'react';

const environmentOptions = {
  "건조·강한 햇빛": 1.1,
  "온화·보통 햇빛": 1.0,
  "한랭·약한 햇빛": 0.85
};

const producerOptions = [
  { name: '광합성 조류 매트', factor: 1.0 },
  { name: '화학합성 미생물 군집', factor: 0.9 }
];

const primaryConsumerOptions = [
  { name: '초식 절지형 생물', factor: 1.0 },
  { name: '여과 섭식 부유 생물', factor: 0.9 }
];

const secondaryConsumerOptions = [
  { name: '중형 포식 생물', factor: 1.0 },
  { name: '매복형 포식 생물', factor: 0.85 }
];

const BASE_ENERGY = 1000;
const TRANSFER_RATE = 0.1;

function App() {
  const [environment, setEnvironment] = useState('온화·보통 햇빛');
  const [producer, setProducer] = useState(producerOptions[0].name);
  const [primaryConsumer, setPrimaryConsumer] = useState(primaryConsumerOptions[0].name);
  const [secondaryConsumer, setSecondaryConsumer] = useState(secondaryConsumerOptions[0].name);

  const selectedProducer = producerOptions.find((item) => item.name === producer) ?? producerOptions[0];
  const selectedPrimary =
    primaryConsumerOptions.find((item) => item.name === primaryConsumer) ?? primaryConsumerOptions[0];
  const selectedSecondary =
    secondaryConsumerOptions.find((item) => item.name === secondaryConsumer) ?? secondaryConsumerOptions[0];

  const energy = useMemo(() => {
    const producerEnergy = BASE_ENERGY * environmentOptions[environment] * selectedProducer.factor;
    const primaryEnergy = producerEnergy * TRANSFER_RATE * selectedPrimary.factor;
    const secondaryEnergy = primaryEnergy * TRANSFER_RATE * selectedSecondary.factor;

    return { producerEnergy, primaryEnergy, secondaryEnergy };
  }, [environment, selectedProducer, selectedPrimary, selectedSecondary]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-5">
        <h1 className="text-2xl font-bold text-sky-300">외계 행성 생태계 설계와 에너지 흐름</h1>
        <p className="mt-1 text-sm text-slate-300">발표용 MVP: 단순한 에너지 전달(약 10% 법칙) 모델</p>
      </header>

      <main className="grid gap-4 p-4 lg:grid-cols-12">
        <section className="rounded-xl bg-slate-900 p-4 shadow-lg lg:col-span-3">
          <h2 className="mb-3 text-lg font-semibold text-sky-200">행성 환경 설정</h2>
          <label className="block text-sm">
            <span className="mb-1 block text-slate-300">환경 프리셋</span>
            <select
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"
              value={environment}
              onChange={(event) => setEnvironment(event.target.value)}
            >
              {Object.keys(environmentOptions).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </section>

        <section className="rounded-xl bg-slate-900 p-4 shadow-lg lg:col-span-5">
          <h2 className="mb-3 text-lg font-semibold text-sky-200">생물 선택</h2>
          <div className="space-y-3">
            <SelectCard title="생산자" value={producer} options={producerOptions} onChange={setProducer} />
            <SelectCard
              title="1차 소비자"
              value={primaryConsumer}
              options={primaryConsumerOptions}
              onChange={setPrimaryConsumer}
            />
            <SelectCard
              title="2차 소비자"
              value={secondaryConsumer}
              options={secondaryConsumerOptions}
              onChange={setSecondaryConsumer}
            />
          </div>
        </section>

        <section className="rounded-xl bg-slate-900 p-4 shadow-lg lg:col-span-4">
          <h2 className="mb-3 text-lg font-semibold text-sky-200">에너지 피라미드</h2>
          <EnergyBars energy={energy} />
          <div className="mt-4 rounded-lg bg-slate-950 p-3 text-sm text-slate-300">
            <p>모델 설명: 다음 영양 단계로 전달되는 에너지는 약 10%로 가정합니다.</p>
            <p className="mt-1">2차 소비자 도달 에너지: 약 {Math.round((energy.secondaryEnergy / energy.producerEnergy) * 100)}%</p>
          </div>
        </section>
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

function SelectCard({ title, value, options, onChange }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-3">
      <p className="mb-2 text-sm font-semibold text-sky-100">{title}</p>
      <select
        className="w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function EnergyBars({ energy }) {
  const bars = [
    { name: '생산자', value: energy.producerEnergy, widthClass: 'w-full', color: 'bg-sky-500' },
    { name: '1차 소비자', value: energy.primaryEnergy, widthClass: 'w-2/3', color: 'bg-emerald-500' },
    { name: '2차 소비자', value: energy.secondaryEnergy, widthClass: 'w-1/3', color: 'bg-violet-500' }
  ];

  return (
    <div className="space-y-2">
      {bars.map((bar) => (
        <div key={bar.name} className={`${bar.color} ${bar.widthClass} rounded-md px-3 py-2 text-xs font-semibold text-slate-950`}>
          {bar.name}: {Math.round(bar.value).toLocaleString()} 단위
        </div>
      ))}
    </div>
  );
}

export default App;
