import { createContext, useEffect, useState } from "react";

// AuthContext를 생성
export const AuthContext = createContext();

// AuthContextProvider 컴포넌트를 정의
export const AuthContextProvider = ({ children }) => {
  // 현재 사용자 상태를 관리
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null // 로컬 스토리지에서 사용자 정보를 가져옴
  );

  // 사용자 정보를 업데이트하는 함수
  const updateUser = (data) => {
    setCurrentUser(data);
  };

  // currentUser 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    // AuthContext.Provider를 사용하여 하위 컴포넌트에 currentUser와 updateUser를 제공
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
