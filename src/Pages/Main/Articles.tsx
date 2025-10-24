import cart1 from "./../../assets/articles1.jpeg";
import cart2 from "./../../assets/articles2.jpeg";
import cart3 from "./../../assets/articles2.jpeg";

const Articles = () => {
  return (
    <div>
      <div className="bg-gray-200">
        <div className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
          <div>
            <div data-aos="zoom-in" className="flex flex-col space-y-3">
              <div className="mx-auto">
                <span className="border-b mx-auto font-thin lg:text-xl md:text-sm sm:text-xl  text-[16px] border-[#fc8100]">
                  Articles
                </span>
              </div>
              <div>
                <p className="font-thin text-center">
                  At our language learning training center, students are
                  encouraged to express their thoughts and
                  <br />
                  ideas through writing. Over the years, they have produced
                  diverse and insightful articles on a
                  <br />
                  variety of topics. Here’s a glimpse into some of their work:
                </p>
              </div>
              <div className="mx-auto my-3">
                <div className="mx-auto my-3">
                  <button className="text-gray-700 lg:text-[16px] md:text-[16px] text-[12px]  rounded-lg hover:bg-gray-300 hover:text-black bg-[#fc8100] lg:py-2 lg:px-4 md:py-2 md:px-4 py-1  px-2 my-3">
                    View All Articles
                  </button>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 space-y-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
              <div
                data-aos="slide-up"
                className=" flex items-center w-80 justify-center drop-shadow-[-10px_10px_10px_rgba(0,0,0,1)]
                  object-cover lg:hover:scale-110 lg:hover:transition-all lg:hover:duration-300 "
              >
                <div className="border-1 border-black ">
                  <img className="w-80 h-60" src={cart1} />
                  <p className="m-3 ">
                    #Free Sharing
                    <br />
                    Many students write about their journey in learning English,
                    sharing their challenges and study
                    techniques.
                  </p>
                  <p className="m-3 text-gray-600">Jahon (John)</p>
                </div>
              </div>
              <div
                data-aos="slide-up"
                className=" flex items-center w-80 justify-center drop-shadow-[-10px_10px_10px_rgba(0,0,0,1)]
                  object-cover lg:hover:scale-110 lg:hover:transition-all lg:hover:duration-300 "
              >
                <div className="border-1 border-black ">
                  <img className="w-80 h-60" src={cart2} />
                  <p className="m-3 ">
                    #Class Based
                    <br />
                    Some students focus on how English proficiency has helped
                    them in higher education and job opportunities.
                  </p>
                  <p className="m-3 text-gray-600">Sitora</p>
                </div>
              </div>
              <div
                data-aos="slide-up"
                className=" flex items-center w-80 justify-center drop-shadow-[-10px_10px_10px_rgba(0,0,0,1)]
                  object-cover lg:hover:scale-110 lg:hover:transition-all lg:hover:duration-300 "
              >
                <div className="border-1 border-black ">
                  <img className="w-80 h-60" src={cart3} />
                  <p className="m-3 ">
                    #News
                    <br />
                    Encourages Peer Learning – Students read and learn from each
                    other’s perspectives.
                  </p>
                  <p className="m-3 text-gray-600">Salim</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
