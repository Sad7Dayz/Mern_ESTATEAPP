import express from "express"; // Express 모듈을 가져옴
import {
  getChats, // 채팅 목록 조회 함수
  getChat, // 특정 채팅 조회 함수
  addChat, // 채팅 추가 함수
  readChat, // 채팅 읽음 처리 함수
} from "../controllers/chat.controller.js"; // 채팅 컨트롤러에서 함수들을 가져옴
import { verifyToken } from "../middleware/verifyToken.js"; // 토큰 검증 미들웨어를 가져옴

const router = express.Router(); // Express 라우터를 생성

// 채팅 목록 조회 라우트
router.get("/", verifyToken, getChats); // GET 요청을 / 경로로 보내면 verifyToken 미들웨어를 거쳐 getChats 함수가 실행됨

// 특정 채팅 조회 라우트
router.get("/:id", verifyToken, getChat); // GET 요청을 /:id 경로로 보내면 verifyToken 미들웨어를 거쳐 getChat 함수가 실행됨

// 채팅 추가 라우트
router.post("/", verifyToken, addChat); // POST 요청을 / 경로로 보내면 verifyToken 미들웨어를 거쳐 addChat 함수가 실행됨

// 채팅 읽음 처리 라우트
router.put("/read/:id", verifyToken, readChat); // PUT 요청을 /read/:id 경로로 보내면 verifyToken 미들웨어를 거쳐 readChat 함수가 실행됨

export default router; // 라우터를 기본 내보내기로 내보냄
