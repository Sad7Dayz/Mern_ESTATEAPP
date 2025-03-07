import { Server } from "socket.io"; // Socket.IO 서버 모듈을 가져옴

const io = new Server({
  cors: {
    origin: "http://localhost:5173", // CORS 설정: 이 도메인에서의 요청을 허용
  },
});

let onlineUser = []; // 온라인 사용자 목록을 저장하는 배열

// 사용자를 추가하는 함수
const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

// 사용자를 제거하는 함수
const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

// 특정 사용자를 찾는 함수
const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

// Socket.IO 설정
io.on("connection", (socket) => {
  // 새로운 사용자가 연결되었을 때
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(onlineUser); // 온라인 사용자 목록을 콘솔에 출력
  });

  // 메시지를 전송할 때
  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getMessage", data); // 수신자에게 메시지를 보냄
  });

  // 사용자가 연결을 끊었을 때
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen("4000"); // 서버를 포트 4000에서 실행
