"use client";
import { useRef, useState } from "react";
import FormControls from "../form-controls";
import { CldUploadButton } from "next-cloudinary";
import { TrashIcon, PencilIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const controls = [
    { name: "name", placeholder: "Enter your Project Name", type: "text", label: "Name" },
    { name: "application", placeholder: "Application Link", type: "text", label: "Application" },
    { name: "github", placeholder: "Enter Github Link", type: "text", label: "Github" },
    { name: "description", placeholder: "Enter Description", type: "text", label: "Description" },
    { name: "shortdescription", placeholder: "Enter short Description", type: "text", label: "Short Description" },
    { name: "playstore", placeholder: "Enter Playstore Link", type: "text", label: "Playstore" },
    { name: "ios", placeholder: "Enter Ios Link", type: "text", label: "IOS Link" },
    { name: "techstack", placeholder: "Enter TechStack", type: "text", label: "Tech Stack" },
    { name: "weburl", placeholder: "Enter WebURL", type: "text", label: "Web URL" },
    { name: "projecttype", placeholder: "Enter PROJECT TYPE", type: "text", label: "Project Type" },
];

export default function AdminProjectView({ formData, setFormData, handleSaveData, data, setData }) {
    const [editProjectId, setEditProjectId] = useState(null);
    const [editFormData, setEditFormData] = useState(null);

    const handleUpload = (result) => {
        if (result.info && result.info.secure_url) {
            const newImageUrl = result.info.secure_url;
            if (editProjectId) {
                setEditFormData((prev) => ({
                    ...prev,
                    imageUrl: [...(prev?.imageUrl || []), newImageUrl],
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    imageUrl: [...(prev?.imageUrl || []), newImageUrl],
                }));
            }
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });
            const result = await response.json();

            if (result.success) {
                setData((prevData) => (Array.isArray(prevData) ? prevData.filter((project) => project._id !== id) : []));
                alert("Deleted successfully!");
            } else {
                alert("❌ Failed to delete project");
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleEdit = (item) => {
        setEditProjectId(item._id);
        setEditFormData({ ...item, imageUrl: Array.isArray(item.imageUrl) ? item.imageUrl : item.imageUrl?.split(",") || [] });
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`/api/projects/${editProjectId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editFormData),
            });

            const result = await response.json();

            if (result.success) {
                setData((prevData) =>
                    Array.isArray(prevData)
                        ? prevData.map((proj) => (proj._id === editProjectId ? { ...proj, ...editFormData } : proj))
                        : []
                );
                alert("Updated successfully!");
                
            } else {
                alert("❌ Failed to update project");
            }
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const handleRemoveImage = (index) => {
        if (editProjectId) {
            setEditFormData((prev) => ({
                ...prev,
                imageUrl: prev.imageUrl.filter((_, i) => i !== index),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                imageUrl: prev.imageUrl.filter((_, i) => i !== index),
            }));
        }
    };

    return (
        <div className="w-full">
        <div className="bg-[#d7d7d7] shadow-md rounded px-8 pt-6 pb-8">
            <div className="mb-10 space-y-6">
                {Array.isArray(data) && data.length ? (
                    data.map((item) => (
                        <div
                            key={item._id}
                            className="flex bg-[#ffffff] flex-col gap-2 p-6 rounded-md shadow-md border border-green-600 hover:border-green-800 transition duration-300"
                        >
                            <div className="flex gap-3 flex-wrap">
                                {Array.isArray(item.imageUrl) &&
                                    item.imageUrl.map((img, i) => (
                                        <Image
                                            key={i}
                                            src={img}
                                            alt={`Project Image ${i}`}
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 object-cover rounded-md border shadow-md"
                                            loading="lazy"
                                            unoptimized={true}
                                        />
                                    ))}
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

                            <button
                                onClick={() => handleDelete(item._id)}
                                className="mt-3 flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
                            >
                                <TrashIcon className="h-5 w-5 text-white" />
                                Delete
                            </button>

                            <button
                                onClick={() => handleEdit(item)}
                                className="mt-3 flex items-center gap-2 bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700 transition"
                            >
                                <PencilIcon className="h-5 w-5 text-white" />
                                Edit
                            </button>

                            {editProjectId === item._id && editFormData && (
                                <div className="mt-4 border-t pt-4">
                                    <FormControls controls={controls} formData={editFormData} setFormData={setEditFormData} />

                                    <div className="mt-4">
                                        <label className="block font-semibold mb-2">Upload Images</label>
                                        <CldUploadButton
                                            uploadPreset="projects"
                                            onSuccess={handleUpload}
                                            onError={(error) => console.error("❌ Upload Error:", error)}
                                        />
                                        <div className="flex gap-3 flex-wrap mt-3 relative">
                                            {Array.isArray(editFormData.imageUrl) &&
                                                editFormData.imageUrl.map((img, index) => (
                                                    <div key={index} className="relative w-20 h-20">
                                                        <Image src={img} alt={`Preview ${index}`} width={80} height={80} className="w-full h-full object-cover rounded-md shadow-md" loading="lazy" unoptimized={true} />
                                                        <button
                                                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                                                            onClick={() => handleRemoveImage(index)}
                                                        >
                                                            <XCircleIcon className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    <button onClick={handleSaveEdit} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                                        Save Changes
                                    </button>

                                    <button onClick={() => setEditProjectId(null)} className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No data found</p>
                )}
            </div>

                <FormControls controls={controls} formData={formData} setFormData={setFormData} />

                <div className="mt-4">
                    <label className="block font-semibold mb-2">Upload Images</label>
                    <CldUploadButton
                        uploadPreset="projects"
                        onSuccess={handleUpload}
                        onError={(error) => console.error("❌ Upload Error:", error)}
                    />
                    <div className="flex gap-3 flex-wrap mt-3 relative">
                        {Array.isArray(formData.imageUrl) &&
                            formData.imageUrl.map((img, index) => (
                                <div key={index} className="relative w-20 h-20">
                                    <Image src={img} alt={`Preview ${index}`} width={80} height={80} className="w-full h-full object-cover rounded-md shadow-md" loading="lazy" unoptimized={true} />
                                    <button
                                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <XCircleIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>

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