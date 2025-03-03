import {  useState } from "react";
//import { useUserStore } from "@/Features/Signup&Login/getUsers-store";
import { Label } from "@/components/ui/label";
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

const AddLesson = () => {
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
    <div className="p-4 lg:mt-0 md:mt-0 sm:mt-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Lesson*</h2>
      <form>
        <div className="border border-[#fc8100] p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Add Lesson</h2>
          <div className="flex items-center border-t border-b border-[#fc8100] justify-center"></div>

          <div className="grid grid-cols-10 gap-2">
            <div className="col-span-10">
              Title*
              <input
                type="text"
                name="Title"
                value={user.firstname}
                placeholder="Title*"
                className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                onChange={handleChange}
              />
            </div>
            
            <div className="col-span-10">
              <div className="flex justify-between items-start flex-col w-full ">
                <Label htmlFor="framework" className="text-[16px]">
                  Lesson Level*
                </Label>
                <Select>
                  <SelectTrigger
                    className="h-14 mt-1 bg-slate-200"
                    id="framework"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">General</SelectItem>
                    <SelectItem value="sveltekit">Grammar</SelectItem>
                    <SelectItem value="astro">Pre-IELTS</SelectItem>
                    <SelectItem value="nuxt">IELTS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="col-span-10">
            Detailed Information*
            <textarea
              name="detailedinformation"
              value={user.detailedinformation}
              placeholder="Detailed Information*"
              className="my-1 border bg-slate-200 h-32 rounded-lg w-full"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-span-10">
            Upload file*
            <label className="flex bg-slate-200 w-full h-32 justify-center items-center gap-2 cursor-pointer border p-2 rounded-md">
              <div className="items-center justify-center">
                <FaCloudUploadAlt className="text-2xl mx-auto" />
                <span className="">Upload File</span>
              </div>
              <input type="file" className="hidden " onChange={imageChange} />
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

export default AddLesson;
