import bcrypt from "bcrypt"; // 비밀번호 해싱을 위한 bcrypt 모듈
import jwt from "jsonwebtoken"; // JWT 토큰 생성을 위한 jsonwebtoken 모듈
import prisma from "../lib/prisma.js"; // Prisma 클라이언트

// 사용자 등록 함수
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // 새로운 사용자 생성 및 데이터베이스에 저장
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    // 성공 응답
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.log(err);

    // 실패 응답
    res.status(500).json({ message: "Failed to create user!" });
  }
};

// 사용자 로그인 함수
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 사용자 존재 여부 확인
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });

    // JWT 토큰 생성 및 쿠키에 저장
    const age = 1000 * 60 * 60 * 24 * 7; // 7일
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true, // HTTPS에서만 전송
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

// 사용자 로그아웃 함수
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
