# 쇼미

**_Show me what you got - 당신의 뇌를 때려 능력을 발휘해 보세요._**

기술면접 준비용 랜덤 문제 생성 서비스

## 서비스 링크 : https://bubobubobo.github.io/ShowMe/

<br>
<br>

## **Figma Design**

<br>

초기 디자인 link : https://www.figma.com/file/KaTcyyxCmQVfE37DbQmYeA/%EC%87%BC%EB%AF%B8?node-id=0%3A1

메인, 로그인, 회원가입 페이지로 구성

<br>
<p align="center"><img src="./img/pages.png" width="70%" margin="0 auto"></p>
<br>
<br>

## **개발 기록**

<br>

### 노션 링크 : https://bubobubobo.notion.site/9023e17f37284b61ac51f18b03551dc1

### 회고 : https://velog.io/@bubobubobo/%EC%B2%AB-%EA%B0%9C%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0

<br>
<br>

## **페이지별 기능**

<br>

### _1. 메인 페이지_

1. 로그인되지 않은 경우, 헤더와 "Hit me!" 버튼만 보이며, 버튼을 누르면 로그인을 해달라는 모달 창이 팝업된다.
1. "Sign in" 버튼을 클릭하면 로그인 페이지가 팝업된다.
1. "Sign up" 버튼을 클릭하면 회원가입 페이지가 팝업된다.

<br>

#### _1) Hit me!_

1. 로그인된 경우, 리셋된 스톱워치가 나타나며, "Hit me!" 버튼을 클릭하면 랜덤한 문제의 질문 창과 오른쪽 물음표 버튼이 나타난다.
1. 모든 질문을 푼 경우 다 풀었다는 메시지와 함께 눌러도 작동되지 않는다.

<br>

#### _2) 질문 창_

1. 물음표 버튼을 클릭하면 예시답안이 토글된다.

<br>

#### _3) 스톱워치_

1. 스톱워치의 "START" 버튼을 누르면 타이머가 시작되며 "STOP"으로 텍스트가 변경된다.
1. 스톱워치 작동 중 "STOP" 버튼을 누르면 일시정지하며 "START"로 바뀌고, "RESET" 버튼을 누르면 작동 중이든 아니든 정지하며 시간이 초기화된다.

<br>

### _2. 로그인 페이지_

1. 등록된 email과 password를 입력하면 로그인 버튼이 활성화되며, 로그인 시 메인 페이지로 넘어간다.

<br>

### _3. 회원가입 페이지_

1. 유효성 검사를 통과한 email/nickname/password/password confirm을 모두 입력하면 회원가입 버튼이 활성화되며, 회원가입 시 자동으로 로그인되며 메인 페이지로 넘어간다.
