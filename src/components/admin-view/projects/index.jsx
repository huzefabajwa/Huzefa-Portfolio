"use client";
import { useRef, useState } from "react";
import FormControls from "../form-controls";
import { CldUploadButton } from "next-cloudinary";
import { TrashIcon } from "@heroicons/react/24/solid"; // ✅ Import Trash Icon

const controls = [
    { name: "name", placeholder: "Enter your Project Name", type: "text", label: "name" },
    { name: "application", placeholder: "Application Link", type: "text", label: "application" },
    { name: "github", placeholder: "Enter Github Link", type: "text", label: "github" },
    { name: "description", placeholder: "Enter Description", type: "text", label: "description" },
    { name: "shortdescription", placeholder: "Enter short Description", type: "text", label: "Short description" },
    { name: "playstore", placeholder: "Enter Playstore Link", type: "text", label: "Playstore" },
    { name: "ios", placeholder: "Enter Ios Link", type: "text", label: "IOS Link" },
    { name: "techstack", placeholder: "Enter TechStack", type: "text", label: "Techstack" },
    { name: "weburl", placeholder: "Enter WebURL", type: "text", label: "WEB URL" },
    { name: "projecttype", placeholder: "Enter PROJECT TYPE", type: "text", label: "Project Type" },
];

export default function AdminProjectView({ formData, setFormData, handleSaveData, data, setData }) {
    console.log(formData);
    const formRef = useRef();
    const [imagePreviews, setImagePreviews] = useState(formData.imageUrl || []);

    // ✅ Handle image uploads (store multiple images in imageUrl array)
    const handleUpload = (result) => {
        if (result.info && result.info.secure_url) {
            console.log(`🎉 Uploaded Image URL:`, result.info.secure_url);
    
            // Ensure imageUrl is treated as an array
            setFormData((prevFormData) => {
                const existingImages = Array.isArray(prevFormData.imageUrl) 
                    ? prevFormData.imageUrl 
                    : prevFormData.imageUrl ? prevFormData.imageUrl.split(",") : [];
    
                const newImageList = [...existingImages, result.info.secure_url];
    
                return { ...prevFormData, imageUrl: newImageList };
            });
    
            setImagePreviews((prevImages) => [...prevImages, result.info.secure_url]);
        } else {
            console.error(`⚠️ Upload failed:`, result);
        }
    };
    

    // ✅ Handle Delete Project
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });
            const result = await response.json();

            if (result.success) {
                setData((prevData) => prevData.filter((project) => project._id !== id));
            } else {
                alert("❌ Failed to delete project");
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <div className="w-full">
            <div className="bg-[#d7d7d7] shadow-md rounded px-8 pt-6 pb-8">
                <div className="mb-10 space-y-6">
                    {data && data.length ? (
                        data.map((item, index) => (
                            <div
                                key={index}
                                className="flex bg-[#ffffff] flex-col gap-2 p-6 rounded-md shadow-md border border-green-600 hover:border-green-800 transition duration-300"
                            >
                                {/* ✅ Display multiple images (ensure imageUrl is an array) */}
                                <div className="flex gap-3 flex-wrap">
                                    {Array.isArray(item.imageUrl) // ✅ Ensure imageUrl is an array
                                        ? item.imageUrl.map((img, i) => (
                                            <img key={i} src={img} alt={`Project Image ${i}`} className="w-20 h-20 object-cover rounded-md border shadow-md" />
                                        ))
                                        : item.imageUrl?.split(",").map((img, i) => ( // ✅ Fallback for string values
                                            <img key={i} src={img} alt={`Project Image ${i}`} className="w-20 h-20 object-cover rounded-md border shadow-md" />
                                        ))
                                    }
                                </div>

                                <p className="text-lg font-semibold text-gray-700">Name: {item.name}</p>
                                <p className="text-lg font-semibold text-gray-700 hover:text-blue-600">
                                    <a href={item.application} target="_blank" rel="noopener noreferrer">
                                        Application: {item.application}
                                    </a>
                                </p>
                                <p className="text-lg font-semibold text-gray-700 hover:text-blue-600">
                                    <a href={item.github} target="_blank" rel="noopener noreferrer">
                                        Github: {item.github}
                                    </a>
                                </p>
                                <p className="text-lg font-semibold text-gray-700">Description: {item.description}</p>
                                <p className="text-lg font-semibold text-gray-700">Short Description: {item.shortdescription}</p>
                                <p className="text-lg font-semibold text-gray-700">Playstore: {item.playstore}</p>
                                <p className="text-lg font-semibold text-gray-700">Tech Stack: {item.techstack}</p>
                                <p className="text-lg font-semibold text-gray-700">IOS Link: {item.ios}</p>
                                <p className="text-lg font-semibold text-gray-700">Web URL: {item.weburl}</p>
                                <p className="text-lg font-semibold text-gray-700">Project Type: {item.projecttype}</p>

                                {/* ✅ Delete Button with Trash Icon */}
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="mt-3 flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
                                >
                                    <TrashIcon className="h-5 w-5 text-white" />
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No data found</p>
                    )}
                </div>

                {/* ✅ Image Upload Section (handles multiple images) */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Upload Images</label>
                    <CldUploadButton 
                        uploadPreset="projects"
                        onSuccess={handleUpload}
                        onError={(error) => console.error("❌ Upload Error:", error)}
                    />
                    {/* ✅ Show image previews */}
                    <div className="flex gap-3 flex-wrap mt-3">
                        {imagePreviews.map((img, index) => (
                            <img key={index} src={img} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded-md shadow-md" />
                        ))}
                    </div>
                </div>

                {/* Form Controls */}
                <FormControls controls={controls} formData={formData} setFormData={setFormData} />

                {/* Save Project Button */}
                <button
                    onClick={() => handleSaveData("projects")}
                    className="mt-4 border border-blue-600 bg-blue-600 text-white p-3 font-bold text-[16px] focus:bg-green-800 rounded-md w-full hover:bg-blue-700 transition"
                >
                    Add Info
                </button>
            </div>
        </div>
    );
}
