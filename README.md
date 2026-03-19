# 외계 행성 생태계 설계와 에너지 흐름의 법칙

고등학교 과학 발표용 MVP 단일 페이지 웹앱입니다.

## 파일 구조
- `src/main.jsx`: 앱 진입점
- `src/App.jsx`: 상위 상태 관리 + 전체 레이아웃 + 결과 전달
- `src/components/EnvironmentPanel.jsx`: 좌측 환경 설정 슬라이더 패널
- `src/components/OrganismSelectionPanel.jsx`: 중앙 생물 선택 카드 패널
- `src/components/EnergyResultPanel.jsx`: 우측 에너지 피라미드 결과 패널
- `src/data/organisms.js`: 생물 카드 데이터 구조
- `src/utils/energyModel.js`: 교육용 단순 에너지 계산 유틸
- `src/index.css`: Tailwind 지시문 및 기본 스타일

## 컴포넌트 구조
- `App` (상위 상태)
  - `EnvironmentPanel` (H2S/온도/압력/빛)
  - `OrganismSelectionPanel` (생산자/1차/2차 소비자 카드)
  - `EnergyResultPanel` (에너지/손실 막대 렌더링)

## 계산 모델
- 생산자 기준 에너지를 입력으로 사용
- 1차 소비자: 생산자 에너지의 10%
- 2차 소비자: 1차 소비자 에너지의 10%
- 각 단계 손실 에너지를 함께 표시
- 환경 보정치는 단순하게 적용

## 실행
```bash
npm install
npm run dev
```

## 배포
```bash
npm run build
npm run deploy
```
