import { GiCheckMark } from "react-icons/gi";
import { usePopup } from "../popup-store/popup-store";

const SignupValidatePopup = () => {
  const setSignuppopup = usePopup((state: any) => state.setSignuppopup);
  const doneMsg = usePopup((state: any) => state.doneMsg);
  return (
    <div>
      <div
        className="h-screen w-screen fixed top-0 left-0 bg-primary/50 z-50
                backdrop-blur-xs"
      >
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    p-0  shadow-md bg-[#fc8100]/80  rounded-xl duration-200
                     w-[400px]  h-[400px]"
        >
          <div className="flex text-black w-full h-full items-center justify-center">
            <div className="mx-auto">
              <GiCheckMark className="w-16 mx-auto  h-16" />
              <h1 className="text-3xl text-center">DONE!</h1>
              <p className="text-center m-3">
                {doneMsg}!
              </p>
              <div className="flex items-center justify-center">
                <button
                  className="mt-4 px-8 py-2 text-white bg-primary hover:bg-primary-dark rounded-md"
                  onClick={() => {
                    setSignuppopup(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupValidatePopup;
