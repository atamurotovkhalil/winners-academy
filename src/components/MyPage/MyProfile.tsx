import {  useState } from "react";
//import { useUserStore } from "@/Features/Signup&Login/getUsers-store";
import { Label } from "@/components/ui/label";
import teacher from "./../../assets/teacher2.avif";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaCloudUploadAlt } from "react-icons/fa";
interface User {
  firstname: string;
  lastname: string;
  phonenumber: string;
  address: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  detailedinformation: string;
}

const MyProfile = () => {
  //const currentUser = useUserStore((state: any) => state.user);
  //const fetchUserData = useUserStore((state: any) => state.fetchUserData);
  const [user, setUser] = useState<User>({
    firstname: "",
    lastname: "",
    phonenumber: "",
    address: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
    detailedinformation: "",
  });

  // Fetch user data on component mount
  //   useEffect(() => {
  //     fetchUserData();
  //   }, [fetchUserData]);

  //   // Set user state when currentUser updates
  //   useEffect(() => {
  //     if (currentUser) {
  //       setUser({
  //         firstname: currentUser.firstname || "",
  //         lastname: currentUser.lastname || "",
  //         phonenumber: currentUser.phonenumber || "",
  //         address: currentUser.address || "",
  //         city: currentUser.city || "",
  //         street: currentUser.street || "",
  //         house: currentUser.house || "",
  //         apartment: currentUser.apartment || "",
  //         detailedinformation: currentUser.detailedinformation || "",
  //       });
  //     }
  //   }, [currentUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();

  //     try {
  //       const response = await fetch(
  //         `http://localhost:3000/auth/userupdate/${currentUser?._id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //           body: JSON.stringify(user),
  //         }
  //       );

  //       if (response.ok) {
  //         alert("Profile updated successfully!");
  //         //fetchUserData(); // Refresh user data after update
  //       } else {
  //         alert("Failed to update profile!");
  //       }
  //     } catch (error) {
  //       console.error("Error during form submission:", error);
  //       alert("An error occurred while updating the profile!");
  //     }
  //   };
  const imageChange = () => {};

  return (
    <div className="p-4 lg:mt-0 md:mt-0 sm:mt-10 mt-10">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <form>
        <div className="border border-[#fc8100] p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Edit Information</h2>
          <div className="flex items-center border-t border-b border-[#fc8100] justify-center">
            <div className="flex flex-col items-center">
              {/* Image Preview */}
              <label htmlFor="fileInput" className="relative cursor-pointer">
                <img
                  className="w-40 h-40 rounded-full object-cover"
                  src={teacher}
                  alt="Profile"
                />
                {/* Hidden File Input */}
                <input
                  id="fileInput"
                  type="file"
                  onChange={imageChange}
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
              First Name*
              <input
                type="text"
                name="firstname"
                value={user.firstname}
                placeholder="Name*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-5">
              Last Name*
              <input
                type="text"
                name="lastname"
                value={user.lastname}
                placeholder="Last name*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-5">
              Address*
              <input
                type="text"
                name="city"
                value={user.city}
                placeholder="Address*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-6">
              Email*
              <input
                type="text"
                name="street"
                value={user.street}
                placeholder="Email*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4">
              <div className="flex justify-between items-start flex-col w-full ">
                <Label htmlFor="framework" className="text-[16px]">
                  Level*
                </Label>
                <Select>
                  <SelectTrigger
                    className="h-14 mt-1 bg-slate-200"
                    id="framework"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">All</SelectItem>
                    <SelectItem value="sveltekit">Grammar</SelectItem>
                    <SelectItem value="astro">Pre-IELTS</SelectItem>
                    <SelectItem value="nuxt">IELTS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="col-span-5">
              Phone*
              <input
                type="text"
                name="phonenumber"
                value={user.phonenumber}
                placeholder="Phone*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-5">
              Telegram link*
              <input
                type="text"
                name="phonenumber"
                value={user.phonenumber}
                placeholder="Telegram link*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-5">
              Instagram link*
              <input
                type="text"
                name="phonenumber"
                value={user.phonenumber}
                placeholder="Instagram link*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-5">
              Tik Tok link*
              <input
                type="text"
                name="phonenumber"
                value={user.phonenumber}
                placeholder="Tik tok link*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-10">
            Detailed Information*
            <textarea
              name="detailedinformation"
              value={user.detailedinformation}
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
