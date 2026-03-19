# 외계 행성 생태계 설계와 에너지 흐름의 법칙

고등학교 과학 발표용 MVP 단일 페이지 웹앱입니다.

## 파일 구조
- `src/main.jsx`: 앱 진입점
- `src/App.jsx`: 화면 레이아웃과 에너지 계산 로직
- `src/index.css`: Tailwind 지시문 및 기본 스타일
- `index.html`: 루트 HTML
- `vite.config.js`: GitHub Pages 배포용 `base` 설정

## 컴포넌트 구조
- `App`
  - 헤더
  - 좌측: 환경 프리셋 선택
  - 중앙: 생산자/1차 소비자/2차 소비자 선택
  - 우측: div 기반 에너지 피라미드 막대
  - 하단: 과학 개념 요약
- `SelectCard`: 각 생물군 선택 UI
- `EnergyBars`: 3단계 에너지 막대 시각화

## MVP 제한 반영
- 생산자 2개
- 1차 소비자 2개
- 2차 소비자 2개
- 단계별 에너지 전달률 10% 단순 모델
- 애니메이션/복잡한 그래픽 미사용

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
