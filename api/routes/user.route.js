import express from "express"; // Express 모듈을 가져옴
import {
  getUsers, // 사용자 목록 조회 함수
  getUser, // 특정 사용자 조회 함수
  updateUser, // 사용자 업데이트 함수
  deleteUser, // 사용자 삭제 함수
  savePost, // 게시물 저장 함수
  profilePosts, // 프로필 게시물 조회 함수
  getNotificationNumber, // 알림 수 조회 함수
} from "../controllers/user.controller.js"; // 사용자 컨트롤러에서 함수들을 가져옴
import { verifyToken } from "../middleware/verifyToken.js"; // 토큰 검증 미들웨어를 가져옴

const router = express.Router(); // Express 라우터를 생성

// 사용자 목록 조회 라우트
router.get("/", getUsers); // GET 요청을 / 경로로 보내면 getUsers 함수가 실행됨

// 특정 사용자 조회 라우트 (주석 처리됨)
// router.get("/search/:id", verifyToken, getUser); // GET 요청을 /search/:id 경로로 보내면 verifyToken 미들웨어를 거쳐 getUser 함수가 실행됨

// 사용자 업데이트 라우트
router.put("/:id", verifyToken, updateUser); // PUT 요청을 /:id 경로로 보내면 verifyToken 미들웨어를 거쳐 updateUser 함수가 실행됨

// 사용자 삭제 라우트
router.delete("/:id", verifyToken, deleteUser); // DELETE 요청을 /:id 경로로 보내면 verifyToken 미들웨어를 거쳐 deleteUser 함수가 실행됨

// 게시물 저장 라우트
router.post("/save", verifyToken, savePost); // POST 요청을 /save 경로로 보내면 verifyToken 미들웨어를 거쳐 savePost 함수가 실행됨

// 프로필 게시물 조회 라우트
router.get("/profilePosts", verifyToken, profilePosts); // GET 요청을 /profilePosts 경로로 보내면 verifyToken 미들웨어를 거쳐 profilePosts 함수가 실행됨

// 알림 수 조회 라우트
router.get("/notification", verifyToken, getNotificationNumber); // GET 요청을 /notification 경로로 보내면 verifyToken 미들웨어를 거쳐 getNotificationNumber 함수가 실행됨

export default router; // 라우터를 기본 내보내기로 내보냄
