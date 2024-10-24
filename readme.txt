<> 배포 (deploy)
사이트:   https://vercel.com/
프론트 사이드 서버를 무료로 3개 이용 가능, 깃허브에 올린 소스코드를 이용하여 서버 가동
배포:   Add New > Project > 깃허브 검색 > 깃허브 연동하여 선택 > 배포 > 완료
환경변수:   해당 프로젝트 > Settings > Environment Variables > import .env > .env파일 선택 > Save

<> 에러 대응
화면로딩실패(빈화면)
    <div id="root"></div> 에 내용이 비어있었음
    index.html 의 스크립트부분이 읽히지 않았던 것에 문제
    원인은 <head>내에 kakao API 읽는 부분에서 에러가 나서 밑에 스크립트가 읽히지 않은 것임
    kakao API 읽는데 에러가 난 이유는 API의 도메인 등록이 안되었기 때문, 도메인 등록후 제대로 동작함
유투브로딩실패(빈화면)
    iframe이 제대로 읽히지 않음, 로컬서버에서는 제대로 작동했었음
    src의 프로토콜이 http로 되어 있어서 https 바꾸니 제대로 동작함

