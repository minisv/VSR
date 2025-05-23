# VSR
Visualizing System Resources

# 사용목적
이 프로그램은 CPU 와 Memory 그리고 C 드라이브의 디스크 사용에 대한 정보를 얻어 시각화 하여 보여 줄 수 있게 만들어 주는 프로그램 입니다.

# 라이선스
이 프로그램의 이용은 '무료' 입니다. 소스 또한 GitHub 에 공개합니다.
다만, 이 프로그램 자체를 무단으로 복사하여 상업적으로 이용한다거나 판매 하는 행위는 금지 합니다.

# 사용방법 - windows [ 1단계 Git 설치하기 ]
1. 먼저 [Git](http://git-scm.com/download/win) 을 설치 합니다. 파란색 글자를 누르면 자동으로 설치 페이지로 이동합니다.
2. Git 이 설치 되었다는 가정 하에 설명 합니다.

# 사용방법 - windows [ 2-1단계 프로젝트 다운받기 ]
1. windows + R 키를 누릅니다.
2. cmd 라고 입력 후 Enter 키를 누릅니다.
3. 보통 C:\Users\[사용자명] 으로 나옵니다. 여러분이 찾기 쉽고 접근하기 쉽게 폴더(디렉토리)를 하나 만들겠습니다.
4. cd c:\ 라고 입력 후 Enter 키를 누릅니다.
5. c:\> 라고 바뀌었고 위의 1번에서 Git 을 설치 하였다면 git clone https://github.com/minisv/VSR.git 라고 입력 후 Enter 키를 누릅니다. 그럼 지금 보고 계시는 이 프로젝트를 다운로드 받습니다.

# 사용방법 - windows [ 2-2단계 git 없이 다운받기 ]
1. [다운로드](https://github.com/minisv/VSR/archive/refs/heads/main.zip) 를 누르면 zip 파일을 받습니다.
2. c 드라이브에 vsr 폴더를 생성하고 main.zip 파일을 넣고 압축을 풀어줍니다.
3. 다만, 압축이 main.zip 이고, 압축을 풀면 VSR-main 이라는 폴더 아래에 압축이 풀리므로 vsr 폴더에 압축푼 VSR-main 폴더 안의 파일들을 모두 복사하여 넣어주세요. 

# 사용방법 - windows [ 3단계 NPM 설치하기 ]
1. 이 프로젝트는 [nodejs](https://nodejs.org/ko/) 를 이용하여 만들어 졌습니다. 파란색 글자를 누르면 자동으로 설치 페이지로 이동합니다.
2. Node.js 다운로드 (LTS) 를 눌러 설치 합니다.
3. 이후는 nodejs 설치 되었다는 가정 하에 설명 합니다.

# 사용방법 - windows [ 4단계 프로젝트 실행하기 ]
1. 위의 2단계에서 c:\> 라고 된 상태라면 cd vsr 을 입력 후 Enter 키를 누릅니다.
2. vsr 폴더에서 start.bat 를 실행해야 합니다.
3. c:\vsr\> 상태라면 ./start.bat 라고 입력 후 Enter 키를 누릅니다. 자동으로 서버 프로그램이 설치되어 구성된 후 서버가 시작 됩니다.
4. 혹은 start.bat 파일을 더블클릭 해서 실행해도 됩니다.
5. 웹 브라우저 (크롬 등) 를 열고 주소창에 http://localhost:3000 를 입력합니다.
6. 필요하다면 OBS 에 소스 목록 하단에 + 버튼을 눌러 브라우저 에서 URL 에 http://localhost:3000/index.html 를 입력 후 최소 크기는 너비 200 에 높이 720 으로 맞춰 주세요. (최소 크기 이므로 적절하게 크기 조절 해주세요)

# 종료방법 - windows
위의 cmd 라고 입력하여 열려진 창에서 ./start.bat 를 입력하여 실행하였다면 그 창을 끄시면 바로 서버가 종료 됩니다.
물론, 서버가 꺼진 상황에서는 모니터링이 작동되지 않으므로 cpu / memory 상태를 확인 할 수 없습니다.