import { RiEmotionNormalFill } from "react-icons/ri";
import { usePopup } from "../popup-store/popup-store";
import { useArticleStore } from "@/components/Community/store/article-stroe";

const ConfirmPopup = () => {
  const setDeletepopup = usePopup((state: any) => state.setDeletepopup);
  const articleCardId = usePopup((state: any) => state.articleCardId);
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );
  const setSignuppopup = usePopup((state: any) => state.setSignuppopup);
  const getArticles = useArticleStore((state) => state.getArticles);
  console.log(articleCardId);

  const deleteArticle = async () => {
    try {
      if (articleCardId!==null) {
        const response = await fetch(
          `http://localhost:3000/articles/${articleCardId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          setSignErroruppopup(true, `Something went wrong`);
        } else {
          setDeletepopup(false);
          setSignuppopup(true, "Deleted successfully");
          getArticles("page", 1);
        }
      }
    } catch (err) {
      setSignErroruppopup(true, `Error has happened ${err}`);
    }
  };
  return (
    <div>
      <div>
        <div
          className="h-screen w-screen fixed top-0 left-0 bg-primary/50 z-50
          backdrop-blur-xs"
        >
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              p-0  shadow-md bg-white/80  rounded-xl duration-200
               w-[400px]  h-[400px]"
          >
            <div className="flex text-black w-full h-full items-center justify-center">
              <div className="mx-auto">
                <RiEmotionNormalFill className="w-16 mx-auto  h-16" />
                <h1 className="text-3xl text-center">REALLY?</h1>
                <p className="text-center m-3">Are you sure want do delete?</p>
                <div className="flex items-center gap-4 justify-center">
                  <button
                    className="mt-4 px-8 py-2 text-white bg-primary hover:bg-primary-dark rounded-md"
                    onClick={() => {
                      deleteArticle();
                      //setDeletepopup(true, false);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="mt-4 px-8 py-2 text-white bg-primary hover:bg-primary-dark rounded-md"
                    onClick={() => {
                      setDeletepopup(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
