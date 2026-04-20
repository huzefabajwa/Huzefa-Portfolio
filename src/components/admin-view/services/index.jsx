"use client";

import { ServicesDelete } from "@/services";
import FormControls from "../form-controls";

const controls = [
    {
        name: 'title',
        placeholder: 'Enter your title here',
        type: 'text',
        label: 'Enter Title Text'
    },
    {
        name: 'service',
        placeholder: 'Enter Service Summary',
        type: 'text',
        label: 'Enter Service Summary'
    },
    {
        name: 'fareacticon',
        placeholder: 'Enter Icon Name here',
        type: 'text',
        label: 'Enter Icon Name'
    },
];

export default function AdminServicesView({ formData, setFormData, handleSaveData, data, setAllData }) {

    const handleDeleteItem = async (id) => {
                        const response = await ServicesDelete(id);
                        if (response.success) {
                            const updatedData  = data.filter((item) => item._id !== id);
                            setAllData((prevData) => ({
                                ...prevData,
                                services: updatedData
                            }));
                            console.log("Item deleted successfully");
                        }
                        else {
                            console.log("Failed to delete item", response.message);
                        }
                    
            };

    return (
        <div className="w-full">
            <div className="bg-[#d7d7d7] shadow-md rounded px-8 pt-6 pb-8">
                <div className="mb-10 space-y-6">
                    {data && data.length ? (
                        data.map((item, index) => (
                            <div key={index} className="flex bg-[#ffffff] flex-col gap-2 p-6 rounded-md shadow-md border border-green-600 hover:border-green-800 transition duration-300">
                                <p className="text-lg font-semibold text-gray-700">
                                    <strong>Title:</strong> {item.title}
                                </p>
                                <p className="text-lg font-semibold text-gray-700">
                                    <strong>Service:</strong> {item.service}
                                </p>
                                <p className="text-lg font-semibold text-gray-700">
                                    <strong>Fareacticon:</strong> {item.fareacticon}
                                </p>
                                <div className="flex gap-2">
                                        <button onClick={() => handleDeleteItem(item._id)} className="bg-red-500 text-white p-2 rounded">
                                            Delete
                                        </button>
                                        </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No data found</p>
                    )}
                </div>

                <FormControls controls={controls} formData={formData} setFormData={setFormData} />

                <button onClick={() => handleSaveData('services')} className="mt-5 border border-blue-600 bg-blue-600 text-white p-3 font-bold text-[16px] focus:bg-green-800 rounded-md">
                    Save Changes
                </button>
            </div>
        </div>
    );
}
