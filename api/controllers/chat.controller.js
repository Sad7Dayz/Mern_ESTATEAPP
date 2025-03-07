import prisma from "../lib/prisma.js"; // Prisma 클라이언트

// 채팅 목록 조회 함수
export const getChats = async (req, res) => {
  const tokenUserId = req.userId; // 토큰에서 사용자 ID를 가져옴

  try {
    // 사용자가 포함된 채팅 목록 조회
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    // 각 채팅에 대해 상대방 정보 추가
    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

      const receiver = await prisma.user.findFirst({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }

    // 성공 응답
    res.status(200).json(chats);
  } catch (err) {
    console.log(err);

    // 실패 응답
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

// 특정 채팅 조회 함수
export const getChat = async (req, res) => {
  const tokenUserId = req.userId; // 토큰에서 사용자 ID를 가져옴

  try {
    // 특정 채팅 조회
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    // 채팅 읽음 처리
    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });

    // 성공 응답
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);

    // 실패 응답
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

// 채팅 추가 함수
export const addChat = async (req, res) => {
  const tokenUserId = req.userId; // 토큰에서 사용자 ID를 가져옴

  try {
    // 새로운 채팅 생성
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.receiverId],
      },
    });

    // 성공 응답
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);

    // 실패 응답
    res.status(500).json({ message: "Failed to add chats!" });
  }
};

// 채팅 읽음 처리 함수
export const readChat = async (req, res) => {
  const tokenUserId = req.userId; // 토큰에서 사용자 ID를 가져옴

  try {
    // 채팅 읽음 처리
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });

    // 성공 응답
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);

    // 실패 응답
    res.status(500).json({ message: "Failed to read chats!" });
  }
};
