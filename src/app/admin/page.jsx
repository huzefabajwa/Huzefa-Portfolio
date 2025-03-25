"use client"

import AdminAboutView from "@/components/admin-view/about"
import AdminContactView from "@/components/admin-view/contact"
import AdminEducationView from "@/components/admin-view/education"
import AdminExperienceView from "@/components/admin-view/experience"
import AdminHomeView from "@/components/admin-view/home"
import AdminProjectView from "@/components/admin-view/projects"
import AdminServicesView from "@/components/admin-view/services"
import AdminReviewsView from "@/components/admin-view/reviews"
import { addData, getData, updateData, login } from "@/services"
import { use, useEffect, useState } from "react"
import Login from "@/components/admin-view/login"
import { Passero_One } from "next/font/google"

const initialHomeFormData = {
    heading:"",
    summary:"",
    hireme:"",
    upwork:"",
    slack:"",
    github:"",
    linkedin:"",
    stack:"",
};
const initialServicesFormData = {
    title:"",
    service:"",
    fareacticon:""
};
const initialReviewsFormData = {
    author:"",
    content:"",
    company:"",
    rating:0,
    link:"",
};
const initialAboutFormData = {
    aboutme:"",
    noofprojects:"",
    yearsofexperience:"",
    noofclients:"",
    skills:"",
    progress:"",
};
const initialExperienceFormData = {
    position:"",
    company:"",
    duration:"",
    location:"",
    jobprofile:""
};
const initialEducationFormData = {
    degree:"",
    year:"",
    college:"",
};
const initialProjectsFormData = {
    name:"",
    application:"",
    github:"",
    imageUrl:"",
    description:"",
    shortdescription:"",
    playstore:"",
    ios:"",
    techstack:"",
    weburl:"",
    projecttype:""
};
const initialLoginFormData = {
    username:"",
    Passeword:"",
};


export default function AdminView(){
    const [currentTab, setActiveTab] = useState('home');
    const [homeViewFormData, setHomeViewFormData] = useState(initialHomeFormData);
    const [servicesViewFormData, setServicesViewFormData] = useState(initialServicesFormData);
    const [aboutViewFormData, setAboutViewFormData] = useState(initialAboutFormData);
    const [ExperienceViewFormData, setExperienceViewFormData] = useState(initialExperienceFormData);
    const [educationViewFormData, setEducationViewFormData] = useState(initialEducationFormData);
    const [projectViewFormData, setProjectViewFormData] = useState(initialProjectsFormData);
    const [reviewsViewFormData, setReviewsViewFormData] = useState(initialReviewsFormData);
    const [allData,setAllData] = useState({});
    const [update,setUpdate] = useState(false);
    const [authUser, setAuthUser] = useState(false);
    const [loginFormData, setLoginFormdata] = useState(initialLoginFormData);
    const menuItem = [
        {
            id: 'home',
            label: 'Home',
            component:<AdminHomeView
            formData = {homeViewFormData}
            setFormData = {setHomeViewFormData}
            handleSaveData = {handleSaveData}
            />
        },
        {
            id: 'services',
            label: 'Services',
            component:<AdminServicesView
            formData = {servicesViewFormData}
            setFormData = {setServicesViewFormData}
            handleSaveData = {handleSaveData}
            data={allData?.services}
            setAllData={setAllData}
            />
        },
        {
            id: 'reviews',
            label: 'Reviews',
            component:<AdminReviewsView
            formData = {reviewsViewFormData}
            setFormData = {setReviewsViewFormData}
            handleSaveData = {handleSaveData}
            data={allData?.reviews}
            setAllData={setAllData}
            />
        },
        {
            id: 'about',
            label: 'About',
            component:<AdminAboutView
            formData = {aboutViewFormData}
            setFormData = {setAboutViewFormData}
            handleSaveData = {handleSaveData}
            />
        },
        {
            id: 'contact',
            label: 'Contact',
            component:<AdminContactView/>
        },
        {
            id: 'education',
            label: 'Education',
            component:<AdminEducationView
            formData = {educationViewFormData}
            setFormData = {setEducationViewFormData}
            handleSaveData = {handleSaveData}
            data={allData?.education}
            setAllData={setAllData}
            />
        },
        {
            id: 'experience',
            label: 'Experience',
            component:<AdminExperienceView
            formData = {ExperienceViewFormData}
            setFormData = {setExperienceViewFormData}
            handleSaveData = {handleSaveData}
            data={allData?.experience}
            setAllData={setAllData}
            />
        },
        {
            id: 'projects',
            label: 'Projects',
            component:<AdminProjectView
            formData = {projectViewFormData}
            setFormData = {setProjectViewFormData}
            handleSaveData = {handleSaveData}
            data={allData?.projects}
            setData={setAllData}
            />
        },
        
    ]
    
    async function handleSaveData() {
        const dataMap = {
            home: homeViewFormData,
            about: aboutViewFormData,
            experience: ExperienceViewFormData,
            education: educationViewFormData,
            projects: projectViewFormData,
            services: servicesViewFormData,
            reviews: reviewsViewFormData,
        };
        const response = update ? await updateData(currentTab,dataMap[currentTab]):
        await addData(currentTab,dataMap[currentTab]);
        console.log(response,"response");
        if (response.success) {
            resetFormData();
            extractAllData();
        }

}
useEffect(() => {
    extractAllData();
},[currentTab]);
async function extractAllData() {
     const response = await getData(currentTab);
     if (currentTab == "home" && response && response.data && response.data.length) {
         setHomeViewFormData(response && response.data[0]);
         setUpdate(true);
     }
     if (currentTab == "about" && response && response.data && response.data.length) {
        setAboutViewFormData(response && response.data[0]);
        setUpdate(true);
    }
    if (response?.success) {
        setAllData({
            ...allData,
            [currentTab]: response &&response.data
        });
    }
}
console.log(allData,homeViewFormData,"homeViewFormData");
function resetFormData() {
    setHomeViewFormData(initialHomeFormData);
    setAboutViewFormData(initialAboutFormData);
    setExperienceViewFormData(initialExperienceFormData);
    setEducationViewFormData(initialEducationFormData);
    setProjectViewFormData(initialProjectsFormData);
    setServicesViewFormData(initialServicesFormData);
    setReviewsViewFormData(initialReviewsFormData);
} 

  async function handleLogin() {
    const res = await login(loginFormData);
    console.log(res, "login");
    if (res?.success) {
        setAuthUser(true);
        sessionStorage.setItem("authUser", JSON.stringify(true));
       
    }
  }

  useEffect(() => {
      setAuthUser(JSON.parse(sessionStorage.getItem("authUser")));
  },[]);
    if (!authUser) {
        return(
            <Login 
            formData = {loginFormData}
            setFormData = {setLoginFormdata}
            handlelogin = {handleLogin}
            />
        );
    }
    return(
        <div className="border-b border-gray-200 bg-[#0A101E] items-center">
            <nav className="-mb-0.5 flex justify-center space-x-6" role="tablist">
                {menuItem.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className="p-4 font-bold text-xl text-white"
                        onClick={() => {
                            setActiveTab(item.id);
                            resetFormData();
                            setUpdate(false);
                       }}>
                            {item.label}
                        </button>
                ))}
                <button onClick={() => {
                  sessionStorage.removeItem("authUser");
                  setAuthUser(false);
            }}
            className="p-4 font-bold text-xl text-black"
                >
                    Logout
                </button>
            </nav>
            <div className="mt-10 p-10">
                {

                menuItem.map(item => item.id === currentTab && item.component)
              }
            </div>
        </div>
    )
}