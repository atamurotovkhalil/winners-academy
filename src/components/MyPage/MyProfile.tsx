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
import avatar from "./../../assets/avatar6.png";
import { usePopup } from "@/widgets/popup-store/popup-store";
import { baseURL } from "@/lib/baseURL";

const MyProfile = () => {
  const [images, setImages] = useState<File[]>([]);
  const currentUser = useUserStore((state: any) => state.currentUser);
  const fetchUserData = useUserStore((state: any) => state.fetchUserData);
  const setSignuppopup = usePopup((state: any) => state.setSignuppopup);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );
  const [level, setLevel] = useState("General");
  const [user, setUser] = useState({
    name: "",
    surname: "",
    phone: "",
    address: "",
    email: "",
    telegramLink: "",
    instagramLink: "",
    tiktokLink: "",
    detail: "",
  });

  useEffect(() => {
    if (!currentUser) {
      fetchUserData();
    }
  }, [fetchUserData, currentUser]);

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.name || "",
        surname: currentUser.surname || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        email: currentUser.email || "",
        telegramLink: currentUser.telegramLink || "",
        instagramLink: currentUser.instagramLink || "",
        tiktokLink: currentUser.tiktokLink || "",
        detail: currentUser.detail || "",
      });
    }
  }, [currentUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(currentUser)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", user.name);
      data.append("email", user.email);
      data.append("surname", user.surname);
      data.append("phone", user.phone);
      data.append("address", user.address);
      data.append("level", level);
      data.append("telegramLink", user.telegramLink);
      data.append("instagramLink", user.instagramLink);
      data.append("tiktokLink", user.tiktokLink);
      for (let i = 0; i < images.length; i++) {
        data.append("image", images[i]);
      }
      if (user.name === "WEBSITE_ADMIN") {
        data.append("type", "ADMIN");
      } else {
        data.append("type", "USER");
      }

      const response = await fetch(
        `http://localhost:3000/auth/signup/${currentUser._id}`,
        {
          method: "PUT",
          body: data,
        }
      );

      if (response.ok) {
        setSignuppopup(true, "Changes saved");
      } else {
        setSignErroruppopup(true);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setSignErroruppopup(true, `Server error occured: ${error}`);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImages([files[0]]); // Store only the latest selected image
      setImagePreview(URL.createObjectURL(files[0])); // Create a preview URL
    }
  };

  return (
    <div className="p-4 lg:mt-0 md:mt-0 sm:mt-10 mt-10">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="border border-[#fc8100] p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Edit Information</h2>
          <div className="flex items-center border-t border-b border-[#fc8100] justify-center">
            <div className="flex flex-col items-center">
              {/* Image Preview */}
              <label htmlFor="fileInput" className="relative cursor-pointer">
                <img
                  className="w-40 h-40 border border-[#fc8100] rounded-full object-cover"
                  src={
                    imagePreview ||
                    (currentUser?.image?.[0]
                      ? `${baseURL}${currentUser.image[0]}`
                      : avatar) // Check if image exists and concatenate baseURL
                  }
                  alt="User Image"
                />
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {/* Upload Button */}
              <div className="flex items-center justify-center mt-2">
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCloudUploadAlt className="text-xl text-[#fc8100]" /> Upload
                  New Image
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-10 gap-2">
            <div className="col-span-10">
              Name*
              <input
                type="text"
                name="name"
                value={user.name}
                placeholder="Name*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-5">
              Surname*
              <input
                type="text"
                name="surname"
                value={user.surname}
                placeholder="Surname*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-5">
              Address*
              <input
                type="text"
                name="address"
                value={user.address}
                placeholder="Address*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-6">
              Email*
              <input
                type="email"
                name="email"
                value={user.email}
                placeholder="Email*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4">
              <div className="flex justify-between items-start flex-col w-full ">
                <Label htmlFor="framework" className="text-[16px]">
                  Your Level*
                </Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger
                    className="h-14 mt-1 bg-slate-200"
                    id="framework"
                  >
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="grammar">Grammar</SelectItem>
                    <SelectItem value="pre-ielts">Pre-IELTS</SelectItem>
                    <SelectItem value="ielts">IELTS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="col-span-5">
              Phone*
              <input
                type="text"
                name="phone"
                value={user.phone}
                placeholder="Phone*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-5">
              Telegram link*
              <input
                type="text"
                name="telegramLink"
                value={user.telegramLink}
                placeholder="Telegram link*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-5">
              Instagram link*
              <input
                type="text"
                name="instagramLink"
                value={user.instagramLink}
                placeholder="Instagram link*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-5">
              Tik Tok link*
              <input
                type="text"
                name="tiktokLink"
                value={user.tiktokLink}
                placeholder="Tik tok link*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-10">
            Detailed Information*
            <textarea
              name="detail"
              value={user.detail}
              placeholder="Who are you?*"
              className="my-1 border bg-slate-200 h-32 rounded-lg w-full"
              onChange={handleChange}
            ></textarea>
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

export default MyProfile;
