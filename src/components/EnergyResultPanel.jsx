import ApiKeyPanel from './ApiKeyPanel';
import ScienceExplanationBox from './ScienceExplanationBox';

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
    <div className="ui-card">
      <p className="text-xs text-slate-400">{title}</p>
      <p className="mt-1 text-sm font-semibold text-rose-300">{value.toLocaleString()} 단위 손실</p>
    </div>
  );
}

function EnergyResultPanel({
  energy,
  summarySentences,
  openaiKey,
  setOpenaiKey,
  openrouterKey,
  setOpenrouterKey,
  onGenerateAi,
  isAiLoading,
  aiNarration,
  aiError,
  hasSelectionFallback,
  onResetSelections
}) {
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
    <div className="space-y-4 lg:col-span-4">
      {hasSelectionFallback && (
        <section className="ui-panel border-amber-600 bg-amber-900/20 p-4">
          <p className="text-sm text-amber-200">일부 생물 선택값이 비어 있어 기본값으로 보정했습니다.</p>
          <button type="button" onClick={onResetSelections} className="ui-button mt-2 bg-amber-400 text-slate-900 hover:bg-amber-300">
            선택값 기본으로 복구
          </button>
        </section>
      )}

      <ApiKeyPanel
        openaiKey={openaiKey}
        setOpenaiKey={setOpenaiKey}
        openrouterKey={openrouterKey}
        setOpenrouterKey={setOpenrouterKey}
        onGenerateAi={onGenerateAi}
        isLoading={isAiLoading}
      />

      {(aiNarration || aiError) && (
        <section className="ui-panel p-4">
          <h3 className="mb-2 text-base font-semibold text-sky-200">AI 발표 설명</h3>
          {aiError ? (
            <p className="text-sm leading-relaxed text-rose-300 break-words">오류: {aiError}</p>
          ) : (
            <p className="whitespace-pre-line break-words text-sm leading-relaxed text-slate-200">{aiNarration}</p>
          )}
        </section>
      )}

      <section className="ui-panel p-4">
        <h2 className="ui-panel-title">에너지 피라미드 결과</h2>

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

      <section className="ui-panel p-4">
        <h3 className="mb-2 text-base font-semibold text-sky-200">자동 결과 요약</h3>
        <div className="space-y-1 text-sm leading-relaxed text-slate-200">
          {summarySentences.map((sentence) => (
            <p key={sentence} className="break-words">{sentence}</p>
          ))}
        </div>
      </section>

      <ScienceExplanationBox />
    </div>
  );
}

export default EnergyResultPanel;
