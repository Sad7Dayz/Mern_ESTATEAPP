import express from "express"; // Express 모듈을 가져옴
import { register, login, logout } from "../controllers/auth.controller.js"; // 인증 컨트롤러에서 함수들을 가져옴
const router = express.Router(); // Express 라우터를 생성

// 사용자 등록 라우트
router.post("/register", register); // POST 요청을 /register 경로로 보내면 register 함수가 실행됨

// 사용자 로그인 라우트
router.post("/login", login); // POST 요청을 /login 경로로 보내면 login 함수가 실행됨

// 사용자 로그아웃 라우트
router.post("/logout", logout); // POST 요청을 /logout 경로로 보내면 logout 함수가 실행됨

export default router; // 라우터를 기본 내보내기로 내보냄
