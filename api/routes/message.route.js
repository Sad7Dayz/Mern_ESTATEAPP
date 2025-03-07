import express from "express"; // Express 모듈을 가져옴
import { addMessage } from "../controllers/message.controller.js"; // 메시지 컨트롤러에서 addMessage 함수를 가져옴
import { verifyToken } from "../middleware/verifyToken.js"; // 토큰 검증 미들웨어를 가져옴

const router = express.Router(); // Express 라우터를 생성

// 메시지 추가 라우트
router.post("/:chatId", verifyToken, addMessage); // POST 요청을 /:chatId 경로로 보내면 verifyToken 미들웨어를 거쳐 addMessage 함수가 실행됨

export default router; // 라우터를 기본 내보내기로 내보냄
