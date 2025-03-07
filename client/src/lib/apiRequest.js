import axios from "axios"; // Axios 모듈을 가져옴

// Axios 인스턴스를 생성하여 API 요청을 설정
const apiRequest = axios.create({
  baseURL: "http://localhost:8800/api", // 기본 URL 설정
  withCredentials: true, // 자격 증명(쿠키 등)을 포함하여 요청을 보냄
});

export default apiRequest; // 설정된 Axios 인스턴스를 기본 내보내기로 내보냄
