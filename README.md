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


## 🛠️ 사용기술

| 구분         | 기술 |
|--------------|------|
| **Frontend** | ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chartdotjs&logoColor=white) ![FullCalendar](https://img.shields.io/badge/FullCalendar-3E4E88?style=flat-square&logo=google-calendar&logoColor=white) ![React Big Calendar](https://img.shields.io/badge/React--Big--Calendar-DD0031?style=flat-square&logo=react&logoColor=white) |
| **Backend**  | ![Java](https://img.shields.io/badge/Java-007396?style=flat-square&logo=java&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white) ![JWT Auth](https://img.shields.io/badge/JWT%20Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) ![Apache Tomcat](https://img.shields.io/badge/Tomcat-FF9900?style=flat-square&logo=apachetomcat&logoColor=white) |
| **AI 추천**  | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) ![Content-based Filtering](https://img.shields.io/badge/Content--based%20Filtering-FF8C00?style=flat-square) ![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=flat-square&logo=selenium&logoColor=white) ![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white) ![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white) ![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white) ![Gensim](https://img.shields.io/badge/Gensim-3498DB?style=flat-square) |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white) |
| **IDE**      | ![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white) ![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=flat-square&logo=jupyter&logoColor=white) ![Eclipse](https://img.shields.io/badge/Eclipse-2C2255?style=flat-square&logo=eclipseide&logoColor=white) |
| **배포 및 협업** | ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white) ![Hancom Docs](https://img.shields.io/badge/Hancom%20Docs-0054A6?style=flat-square&logo=googledocs&logoColor=white) |


----

## 🖥 WEB 페이지
### 🎎 메인페이지
![Image](https://github.com/user-attachments/assets/4bafd6e7-aac2-4410-893f-41972ee8ec4c)

----

### 😀 회원가입
![Image](https://github.com/user-attachments/assets/33a50aa0-ced3-4f9c-bb65-2ab448380aa9)

----

### 📆 일정 관리
![Image](https://github.com/user-attachments/assets/66b55b6f-0fdc-413b-b299-5a6facf51d36)

----

### 💰 예산 관리
![Image](https://github.com/user-attachments/assets/730a3420-7983-4c58-acf3-c1eb4b7daaf5)

----

### 🕍 웨딩홀 추천 페이지
<p align="center">
  <img src="https://github.com/user-attachments/assets/20b2cdc3-0f90-43bd-9f6d-29c150a59399" width="45%"/>
  <img src="https://github.com/user-attachments/assets/547f3f9d-9bb0-4af9-8249-3d42d3915e90" width="45%"/>
</p>

----

### 👪 커뮤니티
![Image](https://github.com/user-attachments/assets/627b888d-bf62-4f4e-9523-e4589e9a395b)

----

## 😎 팀원 역할
![Image](https://github.com/user-attachments/assets/f40c8a13-4a76-4b94-b367-c2e8b24960a1)

----

## 💥 트러블 슈팅
![image]()




