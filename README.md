# WeTube

Cloning Youtube with VanillaJS and NodeJS

## Pages:

- [x] Home
- [x] Join
- [x] Login
- [x] Search
- [x] User Detail
- [x] Edit Profile
- [x] Change Password
- [x] Video Upload
- [x] Video Detail
- [x] Video Edit

## ToDo:

- [x] 채팅 유저클릭하여 User Detail 이동 구현
- [x] 영상 업로드시 ffmpeg 이용하여 mp4형식으로 파일 업로드 구현
      => local에 mp4 Convert후, S3에 업로드하는 방식(후에 local Data 삭제)으로 해결
- [x] 모바일 버전 css 구현
      => @media screen and (max-device-width) 활용하여 구현
- [x] ERROR H12 해결 ( 30초 TimeOut - Post로 Data를 30초내에 받지않을경우 에러발생)
      => 비동기형식으로 업로드함수 await 제거하여 바로 next()로 넘어감으로 해결
- [x] 업로드 진행중인 영상 미표기 또는 업로드중 표기 구현
- [ ] 좋아요,싫어요 기능 구현 (한번 좋아요후에는 추가좋아요 불가)
- [ ] 모바일 전용 videoPlayer UI 구현
- [x] 업로드 버튼 중복클릭으로 여러번 올라가능 버그 fix
      => javascript 클릭시 disabled=True로 구현
- [x] 삭제시 S3 데이터베이스에서도 데이터 삭제
- [x] 서버가 해외에있으므로 시간표시 오류
      =>Date의 toLocaleString함수 사용하여 Korea/Seoul Time Zone으로 변경.
- [ ] 썸네일 제작
