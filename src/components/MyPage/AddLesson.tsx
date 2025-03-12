import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useUserStore } from "../Signup/store/user-store";

import { FaBold, FaItalic, FaUnderline, FaUndo } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaCloudUploadAlt } from "react-icons/fa";
import React from "react";
import { usePopup } from "@/widgets/popup-store/popup-store";

const AddLesson = () => {
  const currentUser = useUserStore((state: any) => state.currentUser);
  const fetchUserData = useUserStore((state: any) => state.fetchUserData);
  const [newfiles, setnewfiles] = useState<File[]>([]);
  const [lessonLevel, setLessonLevel] = useState("");
  const [lesson, setLesson] = useState({
    title: "",
    author: "",
    category: "",
  });
  const setSignuppopup = usePopup((state: any) => state.setSignuppopup);
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );
  useEffect(() => {
    if (!currentUser) {
      fetchUserData();
    }
  }, [fetchUserData, currentUser]);
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Image],
    content: "<p></p>",
  });

  if (!editor) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target; 
    setLesson((prev) => ({
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
    formData.append("description", editor.getHTML()); // Add editor content as FormData
    formData.append("category", lessonLevel);
    formData.append("author", lesson.author);
    formData.append("title", lesson.title);
    formData.append("userId", currentUser._id);
    for (let i = 0; i < newfiles.length; i++) {
      formData.append("file", newfiles[i]);
    }
    try {
      const response = await fetch("http://localhost:3000/lessons", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSignuppopup(true, "Lesson saved successfully!");
      } else {
        setSignErroruppopup(true, "Failed to save Lesson.");
      }
    } catch (error) {
      setSignErroruppopup(true, `Error adding Lesson ${error}`);
    }
  };

  return (
    <div className=" lg:w-[100%] md:w-[100%] sm:w-[100%] lg:mt-0 flex items-center justify-center  md:mt-0 sm:mt-2">
      <div className="w-[100%]">
        <h2 className="text-2xl font-bold mb-4">Add Lesson*</h2>
        <form onSubmit={handleSubmit} className="">
          <div className="border border-[#fc8100] p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Lesson</h2>
            <div className="flex items-center border-t border-b border-[#fc8100] justify-center"></div>

            <div className="grid grid-cols-10 gap-2">
              <div className="col-span-10">
                Title*
                <input
                  type="text"
                  name="title"
                  value={lesson.title}
                  placeholder="Title*"
                  className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-10">
                Author*
                <input
                  type="text"
                  name="author"
                  value={lesson.author}
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
                  <Select value={lessonLevel} onValueChange={setLessonLevel}>
                    <SelectTrigger
                      className="h-14 mt-1 bg-slate-200"
                      id="framework"
                    >
                      <SelectValue placeholder="Select" />
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
            </div>
            <div className="col-span-10">
              Detailed Information*
              <div className="border p-4 rounded-md shadow-md w-full my-2 mx-auto bg-white">
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      editor.chain().focus().toggleBold().run();
                    }}
                  >
                    <FaBold />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      editor.chain().focus().toggleItalic().run();
                    }}
                    className="p-2 border rounded-md hover:bg-gray-200"
                  >
                    <FaItalic />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      editor.chain().focus().toggleUnderline().run();
                    }}
                    className="p-2 border rounded-md hover:bg-gray-200"
                  >
                    <FaUnderline />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      editor.chain().focus().undo().run();
                    }}
                    className="p-2 border rounded-md hover:bg-gray-200"
                  >
                    <FaUndo />
                  </button>
                </div>
                <EditorContent
                  editor={editor}
                  className="border p-2 min-h-[150px] rounded-md"
                />
              </div>
            </div>

            <div className="col-span-10">
              Upload file*
              <label className="flex bg-slate-200 w-full h-32 justify-center items-center gap-2 cursor-pointer border p-2 rounded-md">
                <div className="items-center justify-center">
                  <FaCloudUploadAlt className="text-2xl mx-auto" />
                  <span className="">Upload File</span>
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
           + Add Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
