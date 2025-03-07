import prisma from "../lib/prisma.js"; // Prisma 클라이언트
import bcrypt from "bcrypt"; // 비밀번호 해싱을 위한 bcrypt 모듈

// 사용자 목록 조회 함수
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // 모든 사용자 조회
    res.status(200).json(users); // 성공 응답
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" }); // 실패 응답
  }
};

// 특정 사용자 조회 함수
export const getUser = async (req, res) => {
  const id = req.params.id; // 요청 파라미터에서 사용자 ID를 가져옴
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user); // 성공 응답
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" }); // 실패 응답
  }
};

// 사용자 업데이트 함수
export const updateUser = async (req, res) => {
  const id = req.params.id; // 요청 파라미터에서 사용자 ID를 가져옴
  const tokenUserId = req.userId; // 토큰에서 사용자 ID를 가져옴
  const { password, avatar, ...inputs } = req.body; // 요청 본문에서 데이터 가져옴

  // Token User Id와 id가 같지 않으면 403 에러를 반환
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10); // 비밀번호 해싱
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs, // 입력된 데이터 업데이트
        ...(updatedPassword && { password: updatedPassword }), // 비밀번호가 있으면 업데이트
        ...(avatar && { avatar }), // 아바타가 있으면 업데이트
      },
    });

    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest); // 성공 응답
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update Users!" }); // 실패 응답
  }
};

// 사용자 삭제 함수
export const deleteUser = async (req, res) => {
  const id = req.params.id; // 요청 파라미터에서 사용자 ID를 가져옴
  const tokenUserId = req.userId; // 토큰에서 사용자 ID를 가져옴

  // Token User Id와 id가 같지 않으면 403 에러를 반환
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted" }); // 성공 응답
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" }); // 실패 응답
  }
};

// 게시물 저장 함수
export const savePost = async (req, res) => {
  const postId = req.body.postId; // 요청 본문에서 게시물 ID를 가져옴
  const tokenUserId = req.userId; // 토큰에서 사용자 ID를 가져옴

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "Post removed from saved list" }); // 성공 응답
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
      res.status(200).json({ message: "Post saved" }); // 성공 응답
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to save post!" }); // 실패 응답
  }
};

// 프로필 게시물 조회 함수
export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId; // 토큰에서 사용자 ID를 가져옴
  try {
    const userPosts = await prisma.post.findMany({
      where: {
        userId: tokenUserId,
      },
    });
    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });
    const savedPosts = saved.map((item) => item.post);

    res.status(200).json({ userPosts, savedPosts }); // 성공 응답
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" }); // 실패 응답
  }
};

// 알림 수 조회 함수
export const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId; // 토큰에서 사용자 ID를 가져옴
  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    });
    res.status(200).json(number); // 성공 응답
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get notification number!" }); // 실패 응답
  }
};
