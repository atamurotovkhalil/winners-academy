import { Link } from "react-router";

const Workshops = () => {
  return (
    <div>
      <div className="bg-gray-200">
        <div className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
          <div>
            <div data-aos="zoom-in" className="flex flex-col space-y-3">
              <div className="mx-auto">
                <span className="border-b mx-auto font-thin lg:text-xl md:text-sm sm:text-xl  text-[16px] border-[#fc8100]">
                  Upcoming Free Lessons
                </span>
              </div>
              <div>
                <p className="font-thin text-center">
                  Start your language learning journey without any cost! Our{" "}
                  <br />
                  free lessons provide essential training in English.
                  <br />
                  Whether you're a beginner or looking to <br />
                  improve, our interactive lessons, expert tips, and engaging
                  <br /> exercises will help you gain fluency step by step.
                </p>
              </div>
              <div className="mx-auto my-3">
                <Link to="/lessons">
                  <button className="text-gray-700 lg:text-[16px] md:text-[16px] text-[12px]  rounded-lg hover:bg-gray-300 hover:text-black bg-[#fc8100] lg:py-2 lg:px-4 md:py-2 md:px-4 py-1  px-2 my-3">
                    View All Lessons
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid  lg:grid-cols-3 space-y-2 lg:space-y-0 lg:space-x-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
              <div
                data-aos="slide-up"
                className=" flex items-center justify-center drop-shadow-[-10px_10px_10px_rgba(0,0,0,1)]
                    object-cover lg:hover:scale-110 lg:hover:transition-all lg:hover:duration-300 "
              >
                <div className="border-1 border-black ">
                  <p className="m-3 ">#Reading basics</p>
                  <div>
                    <p className="font-thin text-center">
                      Skim & Scan Like a Pro – Learn techniques to find answers
                      quickly <br />
                      Understand Complex Texts – Improve vocabulary and reading
                      fluency
                      <br /> True/False/Not Given Made Easy – Master tricky
                      question types
                      <br /> Time Management Strategies – Never run out of time
                      again!
                    </p>
                  </div>
                  <Link to="/lessons">
                    <button className="m-3 text-[#fc8100]">Learn More</button>
                  </Link>
                </div>
              </div>
              <div
                data-aos="slide-up"
                className=" flex items-center justify-center drop-shadow-[-10px_10px_10px_rgba(0,0,0,1)]
                    object-cover lg:hover:scale-110 lg:hover:transition-all lg:hover:duration-300 "
              >
                <div className="border-1 border-black ">
                  <p className="m-3 ">#Writing basics</p>
                  <div>
                    <p className="font-thin text-center">
                      Master Task 1 & Task 2 – Learn how to describe graphs,
                      charts, and write compelling
                      <br />
                      Improve Coherence & Cohesion – Structure your ideas
                      logically for maximum impact
                      <br /> Expand Your Vocabulary – Use advanced words and
                      phrases to impress examiners
                      <br /> Avoid Common Mistakes – Learn what examiners look
                      for and how to score higher,
                    </p>
                  </div>
                  <Link to="/lessons">
                    <button className="m-3 text-[#fc8100]">Learn More</button>
                  </Link>
                </div>
              </div>
              <div
                data-aos="slide-up"
                className=" flex items-center justify-center drop-shadow-[-10px_10px_10px_rgba(0,0,0,1)]
                    object-cover lg:hover:scale-110 lg:hover:transition-all lg:hover:duration-300 "
              >
                <div className="border-1  border-black ">
                  <p className="m-3 ">#Listening basics</p>
                  <div>
                    <p className="font-thin text-center">
                      Understand Different Accents – Get familiar with British,
                      American English <br />
                      Sharpen Your Focus – Learn how to catch key information
                      even in fast conversations
                      <br /> Improve Note-Taking – Develop techniques to quickly
                      jot down important details
                      <br /> Avoid Common Traps – Identify distractors and
                      tricky question types <br />{" "}
                    </p>
                  </div>
                  <Link to="/lessons">
                    <button className="m-3 text-[#fc8100]">Learn More</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshops;
