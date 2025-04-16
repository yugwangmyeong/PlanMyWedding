# 💍 Plan My Wedding - 웨딩 일정 & 예산 관리 플랫폼

**Plan My Wedding**은 예비 부부를 위한 웨딩 준비 통합 플랫폼입니다. 일정 관리, 예산 계획, 업체 추천, 미니홈 꾸미기 등 다양한 기능을 제공합니다.

## 🚀 주요 기능

### ✅ 일정 관리
- FullCalendar를 활용한 캘린더 뷰
- 결혼식 날짜 입력 시 템플릿 일정 자동 생성
- 일정 생성, 수정, 삭제
- 일정 공유 및 초대 기능 구현 (JWT 인증 기반)

### ✅ 예산 관리
- 항목별 예산/지출 입력 및 실시간 수정
- 담당자(신랑/신부/함께) 선택 및 메모 작성
- 총 예산, 지출, 잔액, 신랑/신부 비율 시각화
- 예산 공유 및 초대 기능 구현

### ✅ 추천 시스템
- 웨딩홀 견적 질문 흐름 UI 구성 (숨고 스타일)
- 답변 기반 추천 알고리즘 준비 중 (Flask 연동 예정)

### ✅ 미니홈
- 템플릿 일정 기반 이미지 표시
- 다가오는 이벤트 카드 형식으로 구성

### ✅ 사용자 시스템
- 회원가입, 로그인(JWT 인증), 회원 정보 수정
- 초대 수락/거절, 공유 해제 기능

## ⚙️ 기술 스택

- **Frontend**: React, Axios, FullCalendar, Chart.js
- **Backend**: Spring Boot (JPA, MySQL)
- **AI 추천 시스템 (예정)**: Python (Flask), Content-based Filtering
- **인증**: JWT 기반 로그인/권한 확인

## 📁 프로젝트 구조 (간략)

