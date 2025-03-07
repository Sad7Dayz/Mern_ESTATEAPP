import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

// SocketContext를 생성
export const SocketContext = createContext();

// SocketContextProvider 컴포넌트를 정의
export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext); // AuthContext에서 현재 사용자 정보를 가져옴
  const [socket, setSocket] = useState(); // 소켓 상태를 관리

  // 컴포넌트가 마운트될 때 소켓을 설정
  useEffect(() => {
    setSocket(io("http://localhost:4000")); // 소켓 서버에 연결
  }, []);

  // currentUser 또는 socket이 변경될 때마다 실행
  useEffect(() => {
    currentUser && socket?.emit("newUser", currentUser.id); // 새로운 사용자가 연결되었음을 서버에 알림
  }, [currentUser, socket]);

  return (
    // SocketContext.Provider를 사용하여 하위 컴포넌트에 socket을 제공
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
