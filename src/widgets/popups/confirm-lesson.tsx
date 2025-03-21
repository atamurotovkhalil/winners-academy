import { usePopup } from "../popup-store/popup-store";
import { RiEmotionNormalFill } from "react-icons/ri";
import { useLessonStore } from "@/components/Lessons/store/lessons-store";

const ConfirmLesson = () => {
  const setDeleteLessonpopup = usePopup((state: any) => state.setDeleteLessonpopup);
  const lessonCardId = usePopup((state: any) => state.lessonCardId);
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );
  const setSignuppopup = usePopup((state: any) => state.setSignuppopup);
  const getLessons = useLessonStore((state) => state.getLessons);

  console.log(lessonCardId);

  const deleteLesson = async () => {
    try {
      if (lessonCardId !== null) {
        const response = await fetch(
          `http://localhost:3000/lessons/${lessonCardId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          setSignErroruppopup(true, "Something went wrong");
        } else {
          setDeleteLessonpopup(false); // Removed second argument
          setSignuppopup(true, "Deleted successfully");
          getLessons("page", 1); // Refresh articles after deletion
        }
      }
    } catch (err) {
      setSignErroruppopup(true, `Error has happened: ${err}`);
    }
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-primary/50 z-50 backdrop-blur-xs">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-0 shadow-md bg-white/80 rounded-xl duration-200 w-[400px] h-[400px]">
        <div className="flex text-black w-full h-full items-center justify-center">
          <div className="mx-auto text-center">
            <RiEmotionNormalFill className="w-16 mx-auto h-16" />
            <h1 className="text-3xl">REALLY?</h1>
            <p className="m-3">Are you sure you want to delete?</p>
            <div className="flex items-center gap-4 justify-center">
              <button
                className="mt-4 px-8 py-2 text-white bg-primary hover:bg-primary-dark rounded-md"
                onClick={() => {
                  deleteLesson();
                  //setDeleteLessonpopup(true, false);
                }}
              >
                Confirm
              </button> 
              <button
                className="mt-4 px-8 py-2 text-white bg-primary hover:bg-primary-dark rounded-md"
                onClick={() => setDeleteLessonpopup(false, false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLesson;
