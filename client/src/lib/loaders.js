import apiRequest from "./apiRequest"; // apiRequest 모듈을 가져옴
import { defer } from "react-router-dom"; // defer 함수를 react-router-dom에서 가져옴

// 단일 페이지 로더
export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id); // 특정 게시물 데이터를 가져옴
  return res.data; // 데이터를 반환
};

// 목록 페이지 로더
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1]; // URL에서 쿼리 파라미터를 추출
  const postPromise = apiRequest("/posts?" + query); // 쿼리 파라미터를 사용하여 게시물 데이터를 가져옴
  return defer({
    postResponse: postPromise, // 데이터를 지연 로딩으로 반환
  });
};

// 프로필 페이지 로더
export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts"); // 프로필 게시물 데이터를 가져옴
  const chatPromise = apiRequest("/chats"); // 채팅 데이터를 가져옴
  return defer({
    postResponse: postPromise, // 게시물 데이터를 지연 로딩으로 반환
    chatResponse: chatPromise, // 채팅 데이터를 지연 로딩으로 반환
  });
};
