import { usePopup } from "../popup-store/popup-store";
import { RiEmotionSadFill } from "react-icons/ri";

const SignupErrorPopup = () => {
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );
  const errorMsg = usePopup((state: any) => state.errorMsg);
  return (
    <div>
      <div
        className="h-screen w-screen fixed top-0 left-0 bg-primary/50 z-50
                backdrop-blur-xs"
      >
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    p-0  shadow-md bg-black/80  rounded-xl duration-200
                     w-[400px]  h-[400px]"
        >
          <div className="flex text-white w-full h-full items-center justify-center">
            <div className="mx-auto">
              <RiEmotionSadFill className="w-50 text-6xl mx-auto  h-50" />
              <h1 className="text-3xl text-center">PITY!</h1>
              <p className="text-center m-3">{errorMsg}!</p>
              <div className="flex items-center justify-center">
                <button
                  className="mt-4 px-8 py-2 text-white bg-primary hover:bg-primary-dark rounded-md"
                  onClick={() => {
                    setSignErroruppopup(false);
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

export default SignupErrorPopup;
