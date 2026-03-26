# TripZone

국내 숙소 예약 서비스 프론트엔드와 설계 문서 허브를 함께 관리하는 저장소다.

현재 기준:

- `프론트 우선`
- `설계도 우선`
- `백엔드는 팀원이 이어붙이기 쉽게 문서와 연결 기준 유지`

## Source Of Truth

아래 문서를 먼저 본다.

- 통합 기준: `docs/tripzone-company-spec.md`
- 구조 기준: `docs/tripzone-structure-spec-v2.md`
- DDL 기준: `docs/tripzone-ddl-v2.sql`
- 기능 명세: `docs/02_기능명세서.md`
- 프론트 연동 기준: `docs/06_프론트연동가이드.md`

## 빠른 실행

```bash
cd frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

빌드 확인:

```bash
cd frontend
npm run build
```

## 문서 인덱스

### 기본 설계 문서

- 요구사항: `docs/01_요구사항명세서.md`
- 기능 명세: `docs/02_기능명세서.md`
- 구조 명세: `docs/03_구조명세서.md`
- DB 명세: `docs/04_DB명세서.md`
- 프론트 연동 가이드: `docs/06_프론트연동가이드.md`

### handoff 문서

- 인덱스: `docs/handoff/README.md`
- 백엔드 AI 브리프: `docs/handoff/01_백엔드AI작업브리프.md`
- 프론트-백엔드 연결 순서: `docs/handoff/02_프론트-백엔드연결순서.md`
- mock 데이터 DB 이관 가이드: `docs/handoff/03_mock데이터-DB이관가이드.md`
- 이미지 경로/시드 가이드: `docs/handoff/04_이미지경로-시드데이터가이드.md`
- 설계도-백엔드 충돌 정리: `docs/handoff/05_설계도-백엔드충돌정리.md`

## 프론트 연결 기준

백엔드 연결은 `pages`를 먼저 뜯지 않는다.

우선 보는 파일:

- `frontend/src/lib/appClient.js`
- `frontend/src/lib/mockDb.js`
- `frontend/src/services/lodgingService.js`
- `frontend/src/services/bookingService.js`
- `frontend/src/services/mypageService.js`
- `frontend/src/services/dashboardService.js`

즉, 현재 기준은 `appClient -> services -> mockDb/data` 구조다.

## HTML 문서 허브

- 메인 허브: `frontend/public/submission-html/index.html`
- 문서 HTML: `frontend/public/submission-html/docs/`
- 발표자료: `frontend/public/submission-html/presentation/index.html`
