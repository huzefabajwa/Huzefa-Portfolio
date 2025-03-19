"use client"
import FormControls from "../form-controls"

const controls = [
    {
        name: 'degree',
        placeholder:'Enter your Degree',
        type:'text',
        label:'Degree'
    },
    {
        name: 'year',
        placeholder:'Enter the passing year',
        type:'text',
        label:'year'
    },
    {
        name: 'college',
        placeholder:'Enter your University Name',
        type:'text',
        label:'college'
    },
]

export default function AdminEducationView({formData,setFormData,handleSaveData,data}) {
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
                                      Degree : {item.degree}  
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700">
                                      Year : {item.year}  
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700">
                                      College : {item.college}  
                                    </p>
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
                     <button onClick={() => handleSaveData('education')} className="mt-[5px] border border-blue-600 bg-blue-600 text-white p-3 font-bold text-[16px] focus:bg-green-800 rounded-md">
                         Add Info
                     </button>
                 </div>
             </div>
         )
}