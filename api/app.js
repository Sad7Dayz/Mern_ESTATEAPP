import express from "express"; // Express 모듈을 가져옴
import cors from "cors"; // CORS 설정을 위한 모듈을 가져옴
import cookieParser from "cookie-parser"; // 쿠키 파싱을 위한 모듈을 가져옴
import authRoute from "./routes/auth.route.js"; // 인증 라우트를 가져옴
import postRoute from "./routes/post.route.js"; // 게시물 라우트를 가져옴
import testRoute from "./routes/test.route.js"; // 테스트 라우트를 가져옴
import userRoute from "./routes/user.route.js"; // 사용자 라우트를 가져옴
import chatRoute from "./routes/chat.route.js"; // 채팅 라우트를 가져옴
import messageRoute from "./routes/message.route.js"; // 메시지 라우트를 가져옴

const app = express(); // Express 애플리케이션을 생성

// 미들웨어 설정
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // CORS 설정
app.use(express.json()); // JSON 요청 본문을 파싱
app.use(cookieParser()); // 쿠키 파싱

// 라우트 설정
app.use("/api/auth", authRoute); // 인증 관련 라우트
app.use("/api/users", userRoute); // 사용자 관련 라우트
app.use("/api/posts", postRoute); // 게시물 관련 라우트
app.use("/api/test", testRoute); // 테스트 관련 라우트
app.use("/api/chats", chatRoute); // 채팅 관련 라우트
app.use("/api/messages", messageRoute); // 메시지 관련 라우트

// 서버 시작
app.listen(8800, () => {
  console.log("Server is running!"); // 서버가 실행 중임을 콘솔에 출력
});
