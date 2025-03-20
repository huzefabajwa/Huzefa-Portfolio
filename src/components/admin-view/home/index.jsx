"use client"

import FormControls from "../form-controls"

const controls = [
    {
        name: 'heading',
        placeholder:'Enter your text here',
        type:'text',
        label:'Enter Heading Text'
    },
    {
        name: 'summary',
        placeholder:'Enter Career Summary',
        type:'text',
        label:'Enter Career Summarys'
    },
    {
        name: 'hireme',
        placeholder:'Enter Link for Hire Me',
        type:'text',
        label:'Enter Hire Me Link'
    },
    {
        name: 'slack',
        placeholder:'Enter Slack Link',
        type:'text',
        label:'Enter Slack Link'
    },
    {
        name: 'github',
        placeholder:'Enter Github Link',
        type:'text',
        label:'Enter Github Link'
    },
    {
        name: 'upwork',
        placeholder:'Enter Upwork Link',
        type:'text',
        label:'Enter Upwork Link'
    },
]
export default function AdminHomeView({formData,setFormData,handleSaveData}) {
    console.log(formData);
    return (
        <div className="w-full">
            <div className="bg-[#d7d7d7] shadow-md rounded px-8 pt-6 pb-8">
                <FormControls controls={controls} 
                formData={formData} 
                setFormData={setFormData}/>
                <button onClick={() => handleSaveData('home')} className="mt-[5px] border border-blue-600 bg-blue-600 text-white p-3 font-bold text-[16px] focus:bg-green-800 rounded-md">
                    Save Changes
                </button>
            </div>
        </div>
    )
}