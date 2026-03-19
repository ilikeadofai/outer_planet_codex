const TRANSFER_RATE = 0.1;

function round(value) {
  return Math.round(value);
}

/**
 * 교육용 단순 에너지 흐름 모델
 * 1) 생산자 최종 에너지 = 입력 에너지 × 환경 보정치
 * 2) 1차 소비자 에너지 = 생산자 에너지의 10% × 온도 보정치
 * 3) 2차 소비자 에너지 = 1차 소비자 에너지의 10% × 온도 보정치
 * 4) 각 단계 손실량 = 이전 단계 에너지 - 다음 단계 전달 에너지
 */
export function calculateEnergyFlow({
  baseProducerEnergy,
  h2s,
  light,
  temperature,
  producerType = 'chemosynthesis'
}) {
  // 생산자 보정: 화학합성 생산자는 H2S가 높을수록 효율이 소폭 증가
  const h2sBoost = producerType === 'chemosynthesis' ? (h2s >= 70 ? 1.12 : h2s >= 40 ? 1.05 : 0.95) : 1.0;

  // 생산자 보정: 화학합성 생산자는 낮은 빛에서도 불이익이 거의 없도록 완만한 보정 적용
  const lightFactor =
    producerType === 'chemosynthesis' ? (light < 30 ? 0.98 : 1.0) : light < 30 ? 0.85 : light < 60 ? 0.95 : 1.05;

  // 소비자 보정: 온도가 너무 낮으면 활동 효율이 약간 감소
  const consumerTemperatureFactor = temperature < 25 ? 0.92 : 1.0;

  const producerEnergy = baseProducerEnergy * h2sBoost * lightFactor;
  const primaryEnergy = producerEnergy * TRANSFER_RATE * consumerTemperatureFactor;
  const secondaryEnergy = primaryEnergy * TRANSFER_RATE * consumerTemperatureFactor;

  const producerLoss = producerEnergy - primaryEnergy;
  const primaryLoss = primaryEnergy - secondaryEnergy;

  return {
    raw: {
      producerEnergy,
      primaryEnergy,
      secondaryEnergy,
      producerLoss,
      primaryLoss,
      h2sBoost,
      lightFactor,
      consumerTemperatureFactor
    },
    rounded: {
      producerEnergy: round(producerEnergy),
      primaryEnergy: round(primaryEnergy),
      secondaryEnergy: round(secondaryEnergy),
      producerLoss: round(producerLoss),
      primaryLoss: round(primaryLoss)
    }
  };
}
