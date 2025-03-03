import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./widgets/Navbar";
import Home from "./Pages/Main/Home";
import Footer from "./widgets/Footer";
import Lessons from "./components/Lessons/index";
import Teachers from "./components/Teachers/index";
import Community from "./components/Community/index";
import LessonsDetail from "./components/Lessons/LessonsDetail";
import TeacherDetail from "./components/Teachers/TeacherDetail";
import CommunityDetail from "./components/Community/CommunityDetail";
import MyPage from "./components/MyPage/index";
import MyProfile from "./components/MyPage/MyProfile";
import MyLesson from "./components/MyPage/MyLesson";
import MyFavourites from "./components/MyPage/MyFavourites";
import MyArticles from "./components/MyPage/MyArticles";
import WriteArticle from "./components/MyPage/WriteArticle";
import AddLesson from "./components/MyPage/AddLesson";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/community" element={<Community />} />
          <Route path="/lessonsdetail" element={<LessonsDetail />} />
          <Route path="/teacherdetail" element={<TeacherDetail />} />
          <Route path="/communitydetail" element={<CommunityDetail />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/mylesson" element={<MyLesson />} />
          <Route path="/myfavourites" element={<MyFavourites />} />
          <Route path="/myarticles" element={<MyArticles />} />
          <Route path="/writearticle" element={<WriteArticle />} />
          <Route path="/addlesson" element={<AddLesson />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
