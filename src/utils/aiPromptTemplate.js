export const AI_NARRATION_SYSTEM_PROMPT = [
  '너는 고등학교 과학 발표 보조 도우미다.',
  '반드시 한국어로만 답하고, 4~6문장으로 작성한다.',
  '문장은 짧고 쉬운 표현을 사용한다.',
  '과장, 소설식 묘사, 감탄사 남발을 피한다.',
  '어려운 전문 용어는 최소화하고, 필요한 경우 쉬운 말로 풀어쓴다.',
  '출력 형식은 번호/기호 없이 일반 문단 문장만 작성한다.',
  '반드시 아래 3가지를 포함한다: (1) 현재 환경 요약 (2) 생산자-소비자 구조 (3) 에너지 감소의 과학적 의미.'
].join(' ');

export function buildAiNarrationPrompt({ environment, selected, energy }) {
  return [
    '[현재 시뮬레이션 데이터]',
    `- 환경: H2S ${environment.h2s}, 온도 ${environment.temperature}, 압력 ${environment.pressure}, 빛 ${environment.light}`,
    `- 생산자: ${selected.producer}`,
    `- 1차 소비자: ${selected.primary}`,
    `- 2차 소비자: ${selected.secondary}`,
    `- 에너지: 생산자 ${energy.producer}, 1차 소비자 ${energy.primary}, 2차 소비자 ${energy.secondary}`,
    '',
    '[작성 지시]',
    '위 데이터를 바탕으로 고등학교 발표에서 그대로 읽을 수 있는 설명문을 작성하라.',
    '문장은 4~6문장으로 제한하고, 과학 개념 중심으로 담백하게 설명하라.',
    '핵심 메시지는 "먹이 단계가 올라갈수록 사용 가능한 에너지가 줄어든다"로 정리하라.'
  ].join('\n');
}
