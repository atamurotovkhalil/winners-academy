import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useUserStore } from "../Signup/store/user-store";
import { usePopup } from "@/widgets/popup-store/popup-store";

const WriteArticle = () => {
  const currentUser = useUserStore((state: any) => state.currentUser);
  const fetchUserData = useUserStore((state: any) => state.fetchUserData);
  const [newfiles, setnewfiles] = useState<File[]>([]);
  const [articleLevel, setArticleLevel] = useState("");
  const setSignuppopup = usePopup((state: any) => state.setSignuppopup);
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );
  const [article, seArticle] = useState({
    title: "",
    category: "",
    description: "",
    author: "",
  });
  useEffect(() => {
    if (!currentUser) {
      fetchUserData();
    }
  }, [fetchUserData, currentUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    seArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setnewfiles([files[0]]); // Store only the latest selected image
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", article.description); // Add editor content as FormData
    formData.append("category", articleLevel);
    formData.append("title", article.title);
    formData.append("userId", currentUser._id);
    formData.append("author", article.author);
    for (let i = 0; i < newfiles.length; i++) {
      formData.append("file", newfiles[i]);
    }
    try {
      const response = await fetch("http://localhost:3000/articles", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSignuppopup(true, "Article saved successfully!");
      } else {
        setSignErroruppopup(true, "Failed to save Article.");
      }
    } catch (error) {
      setSignErroruppopup(true, `Error adding Article ${error}`);
    }
  };

  return (
    <div className="p-4 lg:mt-0 md:mt-0 sm:mt-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Write Article*</h2>
      <form onSubmit={handleSubmit}>
        <div className="border border-[#fc8100] p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Write Article</h2>
          <div className="flex items-center border-t border-b border-[#fc8100] justify-center"></div>

          <div className="grid grid-cols-10 gap-2">
            <div className="col-span-5">
              Title*
              <input
                type="text"
                name="title"
                value={article.title}
                placeholder="Title*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-5">
              Author*
              <input
                type="text"
                name="author"
                value={article.author}
                placeholder="Title*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>

            <div className="col-span-10">
              <div className="flex justify-between items-start flex-col w-full ">
                <Label htmlFor="framework" className="text-[16px]">
                  Article Category*
                </Label>
                <Select value={articleLevel} onValueChange={setArticleLevel}>
                  <SelectTrigger
                    className="h-14 mt-1 bg-slate-200"
                    id="framework"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="freesharing">Free Sharing</SelectItem>
                    <SelectItem value="classbased">Class Based</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="col-span-10">
            Description*
            <textarea
              name="description"
              value={article.description}
              placeholder="Description*"
              className="my-1 border bg-slate-200 h-32 rounded-lg w-full"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-span-10">
            Upload Image*
            <label className="flex bg-slate-200 w-full h-32 justify-center items-center gap-2 cursor-pointer border p-2 rounded-md">
              <div className="items-center justify-center">
                <FaCloudUploadAlt className="text-2xl mx-auto" />
                <span className="">Upload Image</span>
              </div>
              <input
                type="file"
                className="hidden "
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 mt-4 rounded-lg font-bold"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default WriteArticle;
