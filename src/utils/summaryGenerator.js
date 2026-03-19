function levelText(value) {
  if (value <= 33) return '낮고';
  if (value <= 66) return '보통이며';
  return '높고';
}

export function generateResultSummary({ environment, selected, energy }) {
  const h2sText = environment.h2s >= 67 ? '풍부하고' : environment.h2s <= 33 ? '부족하고' : '중간 수준이며';
  const temperatureText = environment.temperature <= 33 ? '온도가 낮고' : environment.temperature >= 67 ? '온도가 높고' : '온도가 중간이며';
  const lightText = environment.light <= 33 ? '빛은 약한 편입니다' : environment.light >= 67 ? '빛은 강한 편입니다' : '빛은 보통 수준입니다';

  const reductionRate = Math.round((energy.secondaryEnergy / Math.max(energy.producerEnergy, 1)) * 100);

  return [
    `이 행성은 황화수소가 ${h2sText} ${temperatureText} 압력은 ${levelText(environment.pressure)} ${lightText}.`,
    `이 조건에서는 ${selected.producer.name}이(가) 생태계의 시작점이 되어 에너지를 공급합니다.`,
    `${selected.primary.name}과(와) ${selected.secondary.name}은(는) ${selected.secondary.strategy.replace('합니다.', '하며')} 먹이 단계를 이어 갑니다.`,
    `상위 소비자로 갈수록 에너지가 급격히 줄어들어, 최종적으로 생산자 에너지의 약 ${reductionRate}%만 2차 소비자에게 전달됩니다.`
  ];
}
