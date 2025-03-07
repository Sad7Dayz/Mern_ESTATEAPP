import express from "express"; // Express 모듈을 가져옴
import { verifyToken } from "./../middleware/verifyToken.js"; // 토큰 검증 미들웨어를 가져옴
import {
  getPosts, // 게시물 목록 조회 함수
  getPost, // 특정 게시물 조회 함수
  addPost, // 게시물 추가 함수
  updatePost, // 게시물 업데이트 함수
  deletePost, // 게시물 삭제 함수
} from "../controllers/post.controller.js"; // 게시물 컨트롤러에서 함수들을 가져옴

const router = express.Router(); // Express 라우터를 생성

// 게시물 목록 조회 라우트
router.get("/", getPosts); // GET 요청을 / 경로로 보내면 getPosts 함수가 실행됨

// 특정 게시물 조회 라우트
router.get("/:id", getPost); // GET 요청을 /:id 경로로 보내면 getPost 함수가 실행됨

// 게시물 추가 라우트
router.post("/", verifyToken, addPost); // POST 요청을 / 경로로 보내면 verifyToken 미들웨어를 거쳐 addPost 함수가 실행됨

// 게시물 업데이트 라우트
router.put("/:id", verifyToken, updatePost); // PUT 요청을 /:id 경로로 보내면 verifyToken 미들웨어를 거쳐 updatePost 함수가 실행됨

// 게시물 삭제 라우트
router.delete("/:id", verifyToken, deletePost); // DELETE 요청을 /:id 경로로 보내면 verifyToken 미들웨어를 거쳐 deletePost 함수가 실행됨

export default router; // 라우터를 기본 내보내기로 내보냄
