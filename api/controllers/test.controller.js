import jwt from "jsonwebtoken"; // JWT 토큰 생성을 위한 jsonwebtoken 모듈

// 사용자가 로그인했는지 확인하는 함수
export const shouldBeLoggedIn = async (req, res) => {
  console.log(req.userId); // 요청에서 사용자 ID를 로그로 출력

  const token = req.cookies.token; // 쿠키에서 JWT 토큰을 가져옴
  if (!token) return res.status(401).json({ message: "Not Authenticated!" }); // 토큰이 없으면 인증되지 않음을 응답

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Invalid!" }); // 토큰이 유효하지 않으면 응답
  });

  res.status(200).json({ message: "You are Authenticated!" }); // 인증되었음을 응답
};

// 사용자가 관리자 권한을 가지고 있는지 확인하는 함수
export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token; // 쿠키에서 JWT 토큰을 가져옴
  if (!token) return res.status(401).json({ message: "Not Authenticated!" }); // 토큰이 없으면 인증되지 않음을 응답

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Invalid!" }); // 토큰이 유효하지 않으면 응답
    if (!payload.isAdmin)
      return res.status(403).json({ message: "Not Authorized!" }); // 사용자가 관리자가 아니면 응답
  });

  res.status(200).json({ message: "You are Authenticated!" }); // 인증되었음을 응답
};
