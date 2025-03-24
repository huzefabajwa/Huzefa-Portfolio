"use client"

import { ReviewsDelete } from "@/services";
import FormControls from "../form-controls"


const controls = [
    {
        name: 'author',
        placeholder:'Enter author name',
        type:'text',
        label:'Enter author name'
    },
    {
        name: 'content',
        placeholder:'Enter content here',
        type:'text',
        label:'Enter content'
    },
    {
        name: 'rating',
        placeholder:'Enter Rating here',
        type:'number',
        label:'Enter Rating'
    },
    {
        name: 'company',
        placeholder:'Enter company name',
        type:'text',
        label:'Enter company name'
    },
    {
        name: 'link',
        placeholder:'Enter link',
        type:'text',
        label:'Enter link'
    },
]
export default function AdminReviewsView({formData,setFormData,handleSaveData,data,setAllData}) {
    const handleDeleteItem = async (id) => {
                        const response = await ReviewsDelete(id);
                        if (response.success) {
                            const updatedData  = data.filter((item) => item._id !== id);
                            setAllData((prevData) => ({
                                ...prevData,
                                reviews: updatedData
                            }));
                            console.log("Item deleted successfully");
                        }
                        else {
                            console.log("Failed to delete item", response.message);
                        }
                    
            };
    console.log(formData);
    return (
        <div className="w-full">
            <div className="bg-[#d7d7d7] shadow-md rounded px-8 pt-6 pb-8">
            <div className="mb-10 space-y-6">
                        {data && data.length?(
                            data.map((item,index) => (
                                <div key={index} className="flex bg-[#ffffff] flex-col gap-2 p-6 rounded-md shadow-md border border-green-600
                                hover:border-green-800 transition duration-300 ">
                                    <p className="text-lg font-semibold text-gray-700">
                                      Author : {item.author}  
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700">
                                      Content : {item.content}  
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700">
                                      Rating : {item.rating}  
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700">
                                      link : {item.link}  
                                    </p>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleDeleteItem(item._id)} className="bg-red-500 text-white p-2 rounded">
                                            Delete
                                        </button>
                                        </div>
                                    </div>
                            ))
                        )
                        :(
                            <p className="text-center text-gray-600">No data found</p>
                        )}
                    </div>
                <FormControls controls={controls} 
                formData={formData} 
                setFormData={setFormData}/>
                <button onClick={() => handleSaveData('services')} className="mt-[5px] border border-blue-600 bg-blue-600 text-white p-3 font-bold text-[16px] focus:bg-green-800 rounded-md">
                    Save Changes
                </button>
            </div>
        </div>
    )
}