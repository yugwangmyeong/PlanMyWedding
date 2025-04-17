# 💍 Plan My Wedding - 비동행 웨딩 준비 플랫폼

**Plan My Wedding**은 플래너 없이도 결혼 준비를 체계적으로 할 수 있도록 돕는 통합 플랫폼입니다. 일정, 예산, 추천, 커뮤니티 기능을 통해 사용자의 결혼 준비 부담을 줄이고, 맞춤형 서비스를 제공합니다.

---------------------------

##  프로젝트 개요

### 📌 제안 배경
- 30대 미혼 인구 증가, 결혼 의향 55% 이상
- 결혼을 망설이는 주된 이유: **결혼 비용 부담**
- **비동행 웨딩** 확산 (플래너 없이 결혼 준비)
  - 비용 약 150~450만 원 정도 플래너비용 절약가능

### 🎯 개발 목표
- 예식일 기반 체크리스트 및 일정 자동 관리
- 예산 계획 및 실시간 공유/수정
- AI 기반 맞춤 웨딩홀 추천
- 사용자 커뮤니티 및 협업 시스템

---

## 🛠 사용 기술


| 구분         | 기술 |
|--------------|------|
| **Frontend** | 
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chartdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/FullCalendar-3E4E88?style=flat-square&logo=google-calendar&logoColor=white"/>
<img src="https://img.shields.io/badge/React--Big--Calendar-DD0031?style=flat-square&logo=react&logoColor=white"/> |

| **Backend**  | 
<img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT%20Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white"/> |

| **AI 추천**  | 
<img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white"/>
<img src="https://img.shields.io/badge/Content--based%20Filtering-FF8C00?style=flat-square"/> |

| **기타**     | 
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/VS%20Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white"/> |


---

## 🔧 주요 기능

### 📅 일정 관리
- 예식일 기준 일정 템플릿 자동 생성
- 사용자 일정 생성, 수정, 삭제 기능
- 일정 공유 및 초대 기능 구현 (JWT 인증 기반)
- 미니홈에서 다가오는 이벤트 슬라이드로 표시

### 💰 예산 관리
- 항목별 예산/지출 실시간 입력 및 수정
- 담당자 선택, 메모 작성 기능 포함
- 총합, 신랑/신부 지출 비율 등 차트 시각화

### 🏛 웨딩홀 추천
- 설문 기반 가중치 설정 (숨고 스타일 UI 참고)
- 설문응답 기반 유사도 계산으로 상위 3개 웨딩홀 추천
- Flask 서버와의 연동을 통한 추천 처리 예정

### 🌐 커뮤니티
- 사용자 간 질문/답변 및 정보 공유
- 웨딩 준비 노하우 및 후기 게시

---

## 🔄 시스템 아키텍처
![image](https://github.com/user-attachments/assets/110a01ca-9f4b-4f3c-8b65-cc9fe31c4646)

----


## 🖥 Front-end 

cd front
npm install
npm start


## ⌨ Back-end 

??
