# 📄 이력서 빌더 (CV Builder)

인적사항을 입력하고 원하는 디자인의 이력서 양식을 선택하면 자동으로 이력서를 생성해줍니다. 또한 PDF 파일로 다운받거나 A4 크기에 맞춰 인쇄할 수 있습니다.

## ✨ 주요 기능

- **실시간 이력서 미리보기**: 정보를 입력하는 즉시 미리보기가 업데이트됩니다
- **2가지 디자인 템플릿**: 클래식(전통적), 모던(현대적) 스타일 선택 가능
- **PDF 다운로드**: 완성된 이력서를 PDF 파일로 저장
- **A4 인쇄 최적화**: `@media print`를 활용한 A4(210mm × 297mm) 최적화 인쇄
- **입력 섹션**: 인적사항, 학력, 경력, 보유기술, 자격증 등

## 🛠️ 기술 스택

- **Frontend**: React 19, JavaScript (Vite)
- **PDF 생성**: html2canvas + jsPDF
- **스타일링**: CSS Modules

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 📁 프로젝트 구조

```
src/
├── App.jsx                          # 메인 앱 (상태 관리)
├── App.css
├── index.css                        # 글로벌 스타일 + 인쇄 미디어 쿼리
├── main.jsx
├── components/
│   ├── ResumeForm.jsx               # 인적사항 입력 폼
│   ├── ResumeForm.css
│   ├── TemplateSelector.jsx         # 템플릿 선택 UI
│   ├── TemplateSelector.css
│   └── templates/
│       ├── ClassicTemplate.jsx      # 클래식 이력서 템플릿
│       ├── ClassicTemplate.css
│       ├── ModernTemplate.jsx       # 모던 이력서 템플릿
│       └── ModernTemplate.css
└── utils/
    └── pdfExport.js                 # PDF 다운로드 유틸리티
```
