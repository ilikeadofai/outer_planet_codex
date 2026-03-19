function EnergyBar({ label, value, unit, colorClass, ratio }) {
  const widthPercent = Math.max(8, Math.round(ratio * 100));

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-100">{label}</span>
        <span className="text-slate-300">
          {value.toLocaleString()} {unit}
        </span>
      </div>
      <div className="h-7 rounded-md bg-slate-800">
        <div
          className={`${colorClass} flex h-full items-center rounded-md px-2 text-xs font-semibold text-slate-950`}
          style={{ width: `${widthPercent}%` }}
        >
          {widthPercent}%
        </div>
      </div>
    </div>
  );
}

function LossCard({ title, value }) {
  return (
    <div className="rounded-md border border-slate-700 bg-slate-800 p-3">
      <p className="text-xs text-slate-400">{title}</p>
      <p className="mt-1 text-sm font-semibold text-rose-300">{value.toLocaleString()} 단위 손실</p>
    </div>
  );
}

function EnergyResultPanel({ energy }) {
  const maxEnergy = Math.max(energy.producerEnergy, 1);

  const levels = [
    {
      label: '생산자 에너지',
      value: energy.producerEnergy,
      unit: '단위',
      colorClass: 'bg-cyan-400',
      ratio: energy.producerEnergy / maxEnergy
    },
    {
      label: '1차 소비자 에너지',
      value: energy.primaryEnergy,
      unit: '단위',
      colorClass: 'bg-emerald-400',
      ratio: energy.primaryEnergy / maxEnergy
    },
    {
      label: '2차 소비자 에너지',
      value: energy.secondaryEnergy,
      unit: '단위',
      colorClass: 'bg-violet-400',
      ratio: energy.secondaryEnergy / maxEnergy
    }
  ];

  return (
    <section className="rounded-xl bg-slate-900 p-4 shadow-lg lg:col-span-4">
      <h2 className="mb-3 text-lg font-semibold text-sky-200">에너지 피라미드 결과</h2>

      <div className="space-y-3">
        {levels.map((level) => (
          <EnergyBar
            key={level.label}
            label={level.label}
            value={level.value}
            unit={level.unit}
            colorClass={level.colorClass}
            ratio={level.ratio}
          />
        ))}
      </div>

      <div className="mt-4 grid gap-2">
        <LossCard title="생산자 → 1차 소비자 손실" value={energy.producerLoss} />
        <LossCard title="1차 소비자 → 2차 소비자 손실" value={energy.primaryLoss} />
      </div>
    </section>
  );
}

export default EnergyResultPanel;
