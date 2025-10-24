import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Main/Home";
import Lessons from "./components/Lessons/index";
import Teachers from "./components/Teachers/index";
import Community from "./components/Community/index";
import LessonsDetail from "./components/Lessons/LessonsDetail";
import TeacherDetail from "./components/Teachers/TeacherDetail";
import CommunityDetail from "./components/Community/CommunityDetail";
import MyPage from "./components/MyPage/MyPage";
import MyProfile from "./components/MyPage/MyProfile";
import MyLesson from "./components/MyPage/MyLesson";
import MyFavourites from "./components/MyPage/MyFavourites";
import MyArticles from "./components/MyPage/MyArticles";
import WriteArticle from "./components/MyPage/WriteArticle";
import AddLesson from "./components/MyPage/AddLesson";
import Signup from "./components/Signup/Signup";
import Login from "./components/Signup/Login";
import AdminLayout from "./App/Layout/AdminLayout";
import AdminPage from "./App/Admin";
import MainLayout from "./App/Layout/MainLayout";
import { Suspense } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Navbar></Navbar> */}
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/community" element={<Community />} />
              <Route path="/lessons/:lessonId/:profileId" element={<LessonsDetail />} />
              <Route path="/community/:articleId/:profileId" element={<CommunityDetail />} />
              <Route path="/teacherdetail/:id" element={<TeacherDetail />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/mylesson" element={<MyLesson />} />
              <Route path="/myfavourites" element={<MyFavourites />} />
              <Route path="/myarticles" element={<MyArticles />} />
              <Route path="/writearticle" element={<WriteArticle />} />
              <Route path="/addlesson" element={<AddLesson />} />
              <Route path="/mypage" element={<MyPage />} /> 
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin/admin" element={<AdminPage />} />
            </Route>
          </Routes>
          {/* <Footer /> */}
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
