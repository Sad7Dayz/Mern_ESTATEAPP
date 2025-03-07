import "./register.scss"; // 스타일 시트를 가져옴
import { Link, useNavigate } from "react-router-dom"; // Link와 useNavigate 훅을 react-router-dom에서 가져옴
import { useState } from "react"; // useState 훅을 가져옴
import apiRequest from "../../lib/apiRequest"; // apiRequest 모듈을 가져옴

function Register() {
  const [error, setError] = useState(); // 에러 상태를 관리
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작을 막음
    setError(""); // 에러 상태 초기화
    setIsLoading(true); // 로딩 상태를 true로 설정
    const formData = new FormData(e.target); // 폼 데이터를 가져옴

    const username = formData.get("username"); // 폼 데이터에서 username을 가져옴
    const email = formData.get("email"); // 폼 데이터에서 email을 가져옴
    const password = formData.get("password"); // 폼 데이터에서 password를 가져옴

    //console.log(username, email, password);

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      }); // 회원가입 API 요청

      // Login Page로 전환
      navigate("/login"); // 로그인 페이지로 이동
    } catch (err) {
      console.log(err);
      setError(err.response.data.message); // 에러 메시지를 상태에 설정
    } finally {
      setIsLoading(false); // 로딩 상태를 false로 설정
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register; // Register 컴포넌트를 기본 내보내기로 내보냄
