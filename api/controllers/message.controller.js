import prisma from "../lib/prisma.js"; // Prisma 클라이언트

// 메시지 추가 함수
export const addMessage = async (req, res) => {
  const tokenUserId = req.userId; // 토큰에서 사용자 ID를 가져옴
  const chatId = req.params.chatId; // 요청 파라미터에서 채팅 ID를 가져옴
  const text = req.body.text; // 요청 본문에서 메시지 텍스트를 가져옴

  try {
    // 채팅 존재 여부 확인
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    if (!chat) return res.status(404).json({ message: "Chat not found!" });

    // 새로운 메시지 생성 및 데이터베이스에 저장
    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    // 채팅 업데이트 (읽음 처리 및 마지막 메시지 업데이트)
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [tokenUserId],
        lastMessage: text,
      },
    });

    // 성공 응답
    res.status(200).json(message);
  } catch (err) {
    console.log(err);

    // 실패 응답
    res.status(500).json({ message: "Failed to add message!" });
  }
};
