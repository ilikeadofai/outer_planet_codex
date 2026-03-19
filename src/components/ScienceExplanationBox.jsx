function ScienceExplanationBox() {
  const items = [
    '생산자는 황화수소를 이용한 화학합성으로 에너지를 얻을 수 있어요.',
    '소비자는 저온·고압 환경에 적응해야 오래 살아남을 수 있어요.',
    '먹이 단계가 올라갈수록 실제로 쓸 수 있는 에너지는 크게 줄어들어요.',
    '이 현상은 열 손실과 열역학 제2법칙으로 설명할 수 있어요.'
  ];

  return (
    <section className="ui-panel p-4">
      <h3 className="mb-2 text-base font-semibold text-sky-200">과학 설명 박스</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-200">
        {items.map((item) => (
          <li key={item} className="break-words">{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default ScienceExplanationBox;
