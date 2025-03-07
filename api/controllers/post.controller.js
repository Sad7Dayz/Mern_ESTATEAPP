import prisma from "../lib/prisma.js"; // Prisma 클라이언트
import jwt from "jsonwebtoken"; // JWT 토큰 생성을 위한 jsonwebtoken 모듈

// 게시물 목록 조회 함수
export const getPosts = async (req, res) => {
  const query = req.query; // 요청 쿼리 파라미터를 가져옴

  try {
    // 쿼리 조건에 맞는 게시물 목록 조회
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    // 성공 응답
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    // 실패 응답
    res.status(500).json({ message: "Failed to get posts" });
  }
};

// 특정 게시물 조회 함수
export const getPost = async (req, res) => {
  const id = req.params.id; // 요청 파라미터에서 게시물 ID를 가져옴
  try {
    // 특정 게시물 조회
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token; // 쿠키에서 JWT 토큰을 가져옴

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          res.status(200).json({ ...post, isSaved: saved ? true : false });
        } else {
          res.status(200).json({ ...post, isSaved: false });
        }
      });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    console.log(err);
    // 실패 응답
    res.status(500).json({ message: "Failed to get post" });
  }
};

// 게시물 추가 함수
export const addPost = async (req, res) => {
  const body = req.body; // 요청 본문에서 데이터를 가져옴
  const tokenUserId = req.userId; // 토큰에서 사용자 ID를 가져옴

  try {
    // 새로운 게시물 생성 및 데이터베이스에 저장
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    // 성공 응답
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    // 실패 응답
    res.status(500).json({ message: "Failed to create post" });
  }
};

// 게시물 업데이트 함수
export const updatePost = async (req, res) => {
  try {
    // 업데이트 로직 추가 필요
    res.status(200).json();
  } catch (err) {
    console.log(err);
    // 실패 응답
    res.status(500).json({ message: "Failed to update posts" });
  }
};

// 게시물 삭제 함수
export const deletePost = async (req, res) => {
  const id = req.params.id; // 요청 파라미터에서 게시물 ID를 가져옴
  const tokenUserId = req.userId; // 토큰에서 사용자 ID를 가져옴

  try {
    // 삭제할 게시물 조회
    const post = await prisma.post.findUnique({
      where: { id },
    });

    // 게시물 작성자와 요청 사용자가 일치하는지 확인
    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    // 게시물 삭제
    await prisma.post.delete({
      where: { id },
    });

    // 성공 응답
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    // 실패 응답
    res.status(500).json({ message: "Failed to delete post" });
  }
};
