const labelByLevel = {
  low: '낮음',
  medium: '보통',
  high: '높음'
};

function getLevel(value) {
  if (value <= 33) return 'low';
  if (value <= 66) return 'medium';
  return 'high';
}

function EnvironmentSlider({ title, value, onChange, description }) {
  const level = getLevel(value);

  return (
    <div className="ui-card">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-sky-100">{title}</span>
        <span className="text-slate-300">
          {value} / 100 ({labelByLevel[level]})
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-600"
      />
      <p className="mt-2 text-xs leading-relaxed text-slate-400 break-words">{description}</p>
    </div>
  );
}

function EnvironmentPanel({ h2s, setH2s, temperature, setTemperature, pressure, setPressure, light, setLight }) {
  return (
    <section className="ui-panel p-4 lg:col-span-3">
      <h2 className="ui-panel-title">행성 환경 설정</h2>
      <div className="space-y-3">
        <EnvironmentSlider
          title="황화수소(H2S) 농도"
          value={h2s}
          onChange={setH2s}
          description="높을수록 화학합성 생물이 유리한 환경입니다."
        />
        <EnvironmentSlider
          title="온도"
          value={temperature}
          onChange={setTemperature}
          description="낮은 온도는 대사 속도를 떨어뜨려 에너지 전달량을 줄일 수 있습니다."
        />
        <EnvironmentSlider
          title="압력"
          value={pressure}
          onChange={setPressure}
          description="심해형 고압 환경에서는 적응한 생물만 안정적으로 생존합니다."
        />
        <EnvironmentSlider
          title="빛의 양"
          value={light}
          onChange={setLight}
          description="빛이 적을수록 광합성 기반 에너지 생산이 제한됩니다."
        />
      </div>
    </section>
  );
}

export default EnvironmentPanel;
