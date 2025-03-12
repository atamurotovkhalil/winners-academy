import { GiCheckMark } from "react-icons/gi";

const LikesPopup = () => {
  return (
    <div>
      <div
        className="h-screen w-screen fixed top-0 left-0 bg-primary/50 z-50
                backdrop-blur-xs"
      >
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    p-0  shadow-md bg-[#fc8100]/80  rounded-lg duration-200
                     w-[300px]  h-[300px]"
        >
          <div className="flex text-white mx-auto w-1/2 h-1/2 items-center justify-center">
            <GiCheckMark className="text-9xl" />
          </div>
          <h1 className="text-3xl text-white text-center">DONE!</h1>
        </div>
      </div>
    </div>
  );
};

export default LikesPopup;
