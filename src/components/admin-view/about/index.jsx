"use client";
import { useState } from "react";

// Define form fields
const controls = [
    {
        name: "aboutme",
        placeholder: "About Me",
        type: "text",
        label: "About Me",
    },
    {
        name: "yearsofexperience",
        placeholder: "No Of Experience",
        type: "number",
        label: "No of Experience",
    },
    {
        name: "noofclients",
        placeholder: "No Of Clients",
        type: "number",
        label: "No of Clients",
    },
    {
        name: "skills",
        placeholder: "Skills",
        type: "text",
        label: "Skills",
    },
    {
        name: "noofprojects",
        placeholder: "No Of Projects",
        type: "number",
        label: "No of Projects",
    },
    {
        name: "skillheading",
        placeholder: "Enter the skill heading",
        type: "String",
        label: "skillheading",
    },
];

export default function AdminAboutView({ formData, setFormData, handleSaveData }) {
    // Function to handle input changes and ensure numbers are stored correctly
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        // Convert numeric inputs to numbers, leave other types as they are
        const newValue = type === "number" ? Number(value) : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue, // Ensures numbers are stored correctly
        }));
    };

    return (
        <div className="w-full">
            <div className="bg-[#d7d7d7] shadow-md rounded px-8 pt-6 pb-8">
                {controls.map((control) => (
                    <div key={control.name} className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            {control.label}
                        </label>
                        <input
                            type={control.type}
                            name={control.name}
                            placeholder={control.placeholder}
                            value={formData[control.name] || ""}
                            onChange={handleInputChange} // Handles number conversion
                            className="w-full p-2 border rounded"
                        />
                    </div>
                ))}
                <button
                    onClick={() => handleSaveData("about")}
                    className="mt-5 border border-blue-600 bg-blue-600 text-white p-3 font-bold text-[16px] focus:bg-green-800 rounded-md"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
