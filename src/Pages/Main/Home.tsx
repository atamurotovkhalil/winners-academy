import Lenta from "@/components/ui/Lenta";
import Articles from "./Articles";
import Contact from "./Contact";
import FeaturedCourses from "./FeaturedCourses";
import Header from "./Header";
import Passion from "./Passion";
import Recommendations from "./Recommendations";
import Workshops from "./Workshops";


const Home = () => {
  return (
    <div>
      <Header />
      <Lenta />
      <FeaturedCourses />
      <Recommendations />
      <Workshops />
      <Lenta />
      <Passion />
      <Articles />
      <Lenta />
      <Contact />
    </div>
  );
};

export default Home;
