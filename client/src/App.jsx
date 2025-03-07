import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ListPage from "./routes/listPage/listPage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/SinglePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import {
  listPageLoader,
  singlePageLoader,
  profilePageLoader,
} from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // 기본 레이아웃 컴포넌트
      children: [
        {
          path: "/",
          element: <HomePage />, // 홈 페이지 컴포넌트
        },
        {
          path: "/list",
          element: <ListPage />, // 목록 페이지 컴포넌트
          loader: listPageLoader, // 목록 페이지 로더
        },
        {
          path: "/:id",
          element: <SinglePage />, // 단일 페이지 컴포넌트
          loader: singlePageLoader, // 단일 페이지 로더
        },
        {
          path: "/login",
          element: <Login />, // 로그인 페이지 컴포넌트
        },
        {
          path: "/register",
          element: <Register />, // 회원가입 페이지 컴포넌트
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />, // 인증이 필요한 경로의 기본 컴포넌트
      children: [
        {
          path: "/profile",
          element: <ProfilePage />, // 프로필 페이지 컴포넌트
          loader: profilePageLoader, // 프로필 페이지 로더
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />, // 프로필 업데이트 페이지 컴포넌트
        },
        {
          path: "/add",
          element: <NewPostPage />, // 새 게시물 추가 페이지 컴포넌트
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />; // 라우터를 제공
}

export default App;
