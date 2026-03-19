function KeyField({ label, value, onChange }) {
  const status = value.trim() ? '입력됨' : '미입력';

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-sky-100">{label}</label>
      <input
        type="password"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="키를 붙여넣어 주세요"
        className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
      />
      <p className="text-xs text-slate-400">상태: {status}</p>
    </div>
  );
}

function ApiKeyPanel({
  openaiKey,
  setOpenaiKey,
  openrouterKey,
  setOpenrouterKey,
  onGenerateAi,
  isLoading
}) {
  const isAiEnabled = openaiKey.trim().length > 0 || openrouterKey.trim().length > 0;

  return (
    <section className="ui-panel p-4">
      <h2 className="ui-panel-title">선택적 AI 기능 설정</h2>
      <div className="space-y-3">
        <KeyField label="OpenAI API Key" value={openaiKey} onChange={setOpenaiKey} />
        <KeyField label="OpenRouter Key" value={openrouterKey} onChange={setOpenrouterKey} />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate-400 break-words">
        API 키는 이 브라우저 세션에서만 사용되며 저장되지 않습니다.
      </p>

      <button type="button" disabled={!isAiEnabled || isLoading} onClick={onGenerateAi} className="ui-button-primary mt-3 w-full">
        {isLoading ? '생성 중...' : 'AI 발표 설명 생성'}
      </button>
    </section>
  );
}

export default ApiKeyPanel;
