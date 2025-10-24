import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import WinnersLogo from "../../widgets/WinnersLogo";
import { usePopup } from "@/widgets/popup-store/popup-store";
import avatar from "./../../assets/avatar6.png";

const Signup = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [images, setImages] = useState<File[]>([]);
  const setSignuppopup = usePopup((state: any) => state.setSignuppopup);
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "" };

    if (formData.name.length < 5) {
      newErrors.name = "Name must be at least 5 characters long";
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImages([files[0]]); // Store only the latest selected image
      setImagePreview(URL.createObjectURL(files[0])); // Create a preview URL
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.email);
      data.append("password", formData.password);
      for (let i = 0; i < images.length; i++) {
        data.append("file", images[i]);
      }
      if (formData.name === "WINNERS_ADMIN") {
        data.append("profileRole", "ROLE_ADMIN");
      } else {
        data.append("profileRole", "ROLE_USER");
      }

      const response = await fetch(`${BASE_URL}/profile/registration`, {
        method: "POST",
        credentials: "include",
        body: data,
      });

      if (response.ok) {
        navigate("/login");
        setSignuppopup(true, "Success");
      } else {
        setSignErroruppopup(true, "Something went wrong");
      }
    } catch (error) {
      setSignErroruppopup(true, `Server error occured: ${error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md border-l-2 border-r-2 border-[#fc8100] rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <div className="flex items-center justify-center">
        <WinnersLogo />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          {/* Image Preview */}
          <label htmlFor="fileInput" className="relative cursor-pointer">
            <img
              className="w-40 h-40 border border-[#fc8100] rounded-full object-cover"
              src={imagePreview || avatar} // Show preview or a default image
              alt=""
            />
            {/* Hidden File Input */}
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
              Image
            </p>
          </div>
        </div>
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border-[#fc8100] border rounded"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border-[#fc8100] border rounded"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border-[#fc8100] border rounded"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-[#fc8100]"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center">or</p>
      <Link to="/login">
        <button className="w-full bg-black text-white py-2 rounded hover:bg-[#fc8100]">
          Log In
        </button>
      </Link>
    </div>
  );
};

export default Signup;
