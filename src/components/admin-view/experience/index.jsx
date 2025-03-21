"use client"
import { ExperienceDelete } from "@/services";
import FormControls from "../form-controls"

const controls = [
    {
        name: 'position',
        placeholder:'Position',
        type:'text',
        label:'Position'
    },
    {
        name: 'company',
        placeholder:'Enter The Company Name',
        type:'text',
        label:'Company'
    },
    {
        name: 'duration',
        placeholder:'Duration',
        type:'text',
        label:'Enter the duration'
    },
    {
        name: 'location',
        placeholder:'Enter The Location',
        type:'text',
        label:'location'
    },
    {
        name: 'jobprofile',
        placeholder:'Enter the job profile',
        type:'text',
        label:'jobprofile'
    },
]
export default function AdminExperienceView({formData,setFormData,handleSaveData,data,setAllData}) {
     const handleDeleteItem = async (id) => {
                    const response = await ExperienceDelete(id);
                    if (response.success) {
                        const updatedData  = data.filter((item) => item._id !== id);
                        setAllData((prevData) => ({
                            ...prevData,
                            experience: updatedData
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
                                      Position : {item.position}  
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700">
                                      Company : {item.company}  
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700">
                                      Duration : {item.duration}  
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700">
                                      Location : {item.location}  
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700">
                                      Job Profile : {item.jobprofile}  
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
                  <button onClick={() => handleSaveData('experience')} className="mt-[5px] border border-blue-600 bg-blue-600 text-white p-3 font-bold text-[16px] focus:bg-green-800 rounded-md">
                      Add Info
                  </button>
              </div>
          </div>
      )
}