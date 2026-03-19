export const organismData = {
  producers: [
    {
      id: 'producer-1',
      name: '황화합성 미생물 군집',
      feature: '빛이 거의 없는 환경에서도 황화수소를 이용해 에너지를 생산합니다.',
      strategy: '화학합성 중심 대사로 심해 열수구 주변에 군집을 형성합니다.',
      factor: 1.0,
      producerType: 'chemosynthesis'
    },
    {
      id: 'producer-2',
      name: '화학합성 심해 매트형 생물',
      feature: '넓은 표면으로 용존 화학물질을 흡수해 에너지를 만듭니다.',
      strategy: '저온·고압에 맞춘 점액질 매트 구조로 손실을 줄입니다.',
      factor: 0.92,
      producerType: 'chemosynthesis'
    }
  ],
  primaryConsumers: [
    {
      id: 'primary-1',
      name: '저온 적응형 절지동물형 생물',
      feature: '미생물 매트를 긁어 먹으며 느린 대사로 생존합니다.',
      strategy: '체온 변화를 최소화하는 외피로 에너지 소비를 억제합니다.',
      factor: 1.0
    },
    {
      id: 'primary-2',
      name: '저에너지 여과섭식 생물',
      feature: '느리게 이동하며 부유 유기물을 걸러 먹습니다.',
      strategy: '낮은 활동량과 간헐적 섭식으로 장기 생존에 유리합니다.',
      factor: 0.88
    }
  ],
  secondaryConsumers: [
    {
      id: 'secondary-1',
      name: '저온·고압 포식성 생물',
      feature: '짧은 돌진으로 1차 소비자를 포획합니다.',
      strategy: '근육 사용 시간을 줄여 급격한 에너지 낭비를 피합니다.',
      factor: 1.0
    },
    {
      id: 'secondary-2',
      name: '저대사 매복형 포식자',
      feature: '거의 움직이지 않다가 기회가 오면 빠르게 사냥합니다.',
      strategy: '매우 낮은 대사율로 먹이 간격이 길어도 버팁니다.',
      factor: 0.84
    }
  ]
};
