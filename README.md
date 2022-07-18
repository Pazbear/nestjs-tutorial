### https://www.youtube.com/watch?v=3JminDpCJNE를 통한 NestJS 튜토리얼 공부

## NestJs의 미들웨어들

1. Pipes : 유효성검사 및 페이로드 변환
2. Filters : 오류처리
3. Guards : 인증 미들웨어
4. Interceptors : 응답 매핑 및 캐시 관리와 함께 요청 로깅과 같은 전후 미들웨어

# 미들웨어가 불려지는 순서

middleware -> guard -> interceptor (전) -> pipe -> controller -> service -> controller -> interceptor (후) -> filter (사용한다면) -> client

## 로그

1. Log - 중요한 정보
2. Warning - 치명적이지 않은 문제
3. Error - 치명적인 문제
4. Debug - 오류 발생시 디버그하는데 도움이 되는 정보(개발자용)
5. Verbose - 어플리케이션의 동작에 대한 통찰력 제공(운영자용)
