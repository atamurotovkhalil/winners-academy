
const Contact = () => {
  return (
    <div className="">
      <div 
      data-aos="slide-up"
      className="container mx-auto max-w-6xl py-4 px-4 lg:px-16 bg-[#fc8100] lg:translate-y-24 md:translate-y-24">
        <div
          className="space-y-6 gap-y-10 drop-shadow-[-10px_10px_10px_rgba(0,0,0,1)]
                  object-cover lg:hover:scale-110 lg:hover:transition-all lg:hover:duration-300"
        >
          <p className="flex text-3xl py-5 items-center font-thin text-center justify-center">
            You have the power to define your future.
          </p>
          <div className="lg:flex md:flex gap-3  justify-center items-center ">
            <div className="flex items-center my-2 justify-center">
              <input
                placeholder="EMAIL"
                className="border rounded-sm   py-2 px-10 border-black"
              />
            </div>
            <div className="flex items-center my-2 justify-center">
              <button className="rounded-sm  border py-2 px-10 border-black hover:bg-white">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black  lg:h-48 md:h-48"></div>
    </div>
  );
};

export default Contact;
