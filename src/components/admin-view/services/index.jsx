"use client"

import FormControls from "../form-controls"


const controls = [
    {
        name: 'title',
        placeholder:'Enter your title here',
        type:'text',
        label:'Enter title Text'
    },
    {
        name: 'service',
        placeholder:'Enter Service Summary',
        type:'text',
        label:'Enter Service Summarys'
    },
    {
        name: 'fareacticon',
        placeholder:'Enter Icon Name here',
        type:'text',
        label:'Enter Icon Name'
    },
]
export default function AdminServicesView({formData,setFormData,handleSaveData}) {
    console.log(formData);
    return (
        <div className="w-full">
            <div className="bg-[#d7d7d7] shadow-md rounded px-8 pt-6 pb-8">
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