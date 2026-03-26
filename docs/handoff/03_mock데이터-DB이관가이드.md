# TripZone mock 데이터 DB 이관 가이드

이 문서는 현재 프론트 mock 데이터를 실제 DB seed 데이터나 초기 API 응답 기준으로 옮길 때 참고하는 문서다.

## 목적

- 화면을 크게 바꾸지 않고 mock 데이터를 DB로 옮긴다.
- 프론트가 쓰는 핵심 shape를 유지한다.
- 초기 연결 단계에서 `mock과 실제 API가 너무 다르다`는 문제를 줄인다.

## 기본 원칙

- mock 데이터는 폐기 대상이 아니라 `초기 seed 기준`으로 본다.
- DB에는 가능한 한 `화면에서 직접 쓰는 핵심 값`이 유지되게 넣는다.
- API는 엔티티 전체 노출보다 화면 응답용 DTO를 우선한다.
- 초기 단계에서는 복잡한 조인 최적화보다 `프론트가 깨지지 않는 shape`가 더 중요하다.

## 우선 이관 대상

1. `frontend/src/data/homeData.js`
2. `frontend/src/data/lodgingData.js`
3. `frontend/src/data/lodgingDetailData.js`
4. `frontend/src/data/bookingData.js`
5. `frontend/src/data/mypageData.js`
6. `frontend/src/data/dashboardData.js`
7. `frontend/src/data/opsData.js`

## 이관 방식

### 1. mock 값 분석

먼저 각 data 파일에서 아래를 분리한다.

- 실제 엔티티 필드
- 화면 전용 라벨
- 요약/통계 값
- 이미지 경로

### 2. DB seed 데이터화

DB에 먼저 넣을 것은 아래다.

- 회원
- 판매자
- 숙소
- 객실
- 숙소 이미지
- 예약
- 결제
- 리뷰
- 쿠폰/마일리지
- 문의

### 3. API DTO 분리

DB 컬럼명과 프론트 응답 키는 바로 1:1일 필요는 없다.

예:

- DB: `BOOKING_NO`
- API DTO: `bookingNo`
- 프론트 최종 shape: `bookingId`

이 경우:

- 백엔드 DTO 또는
- 프론트 `services`

중 한 곳에서 어댑터를 둔다.

## 도메인별 주의점

### 숙소

유지하면 좋은 핵심 값:

- `lodgingId`
- `lodgingName`
- `lodgingType`
- `region`
- `thumbnailUrl`
- `reviewAverage`
- `reviewCount`

### 예약

유지하면 좋은 핵심 값:

- `bookingId`
- `lodgingId`
- `roomId`
- `checkInDate`
- `checkOutDate`
- `guestCount`
- `bookingStatus`
- `bookingStatusLabel`
- `totalPrice`

### 결제

유지하면 좋은 핵심 값:

- `paymentId`
- `bookingId`
- `paymentStatus`
- `paymentStatusLabel`
- `paymentAmount`
- `payMethod`
- `approvedAt`

### 마이페이지

상세 엔티티보다 아래 값이 더 중요하다.

- `summary`
- `statusLabel`
- `actions`
- 상단 count/amount

즉, 마이페이지는 조회 API에서 화면용 조합 응답을 주는 편이 안전하다.

## 하지 말아야 할 것

- mock을 보고 화면 문자열까지 DB 컬럼으로 박아넣기
- 초기에 BLOB 이미지 저장부터 시도하기
- 라벨/요약/count를 모두 프론트에서 다시 계산하게 미루기
- 페이지 단에서 직접 DTO 모양을 바꾸기

## 추천 작업 순서

1. DDL 기준 테이블/시퀀스 정리
2. mock 데이터에서 seed로 옮길 필드 선별
3. DB seed 입력
4. API DTO 설계
5. `services` 기준 연결
6. 필요한 경우에만 `features` 보정
