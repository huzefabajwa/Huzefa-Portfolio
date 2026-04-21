"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import AdminLayout from "@/components/admin-view/layout";
import AdminHomeView from "@/components/admin-view/home";
import AdminAboutView from "@/components/admin-view/about";
import AdminPlatformsView from "@/components/admin-view/platforms";
import AdminServicesView from "@/components/admin-view/services";
import AdminExperienceView from "@/components/admin-view/experience";
import AdminEducationView from "@/components/admin-view/education";
import AdminProjectView from "@/components/admin-view/projects";
import AdminReviewsView from "@/components/admin-view/reviews";
import AdminContactView from "@/components/admin-view/contact";
import Login from "@/components/admin-view/login";
import { addData, getData, updateData, login } from "@/services";

// ── Initial form states ──────────────────────────────────────────
const INIT = {
  home:       { heading:"", summary:"", roleTitle:"", hireme:"", upwork:"", slack:"", github:"", linkedin:"", stack:"", imageUrl:"" },
  services:   { title:"", service:"", fareacticon:"" },
  reviews:    { author:"", content:"", company:"", rating:0, link:"" },
  about:      { aboutme:"", noofprojects:"", yearsofexperience:"", noofclients:"", noofplatforms:"", skills:"", progress:"" },
  experience: { position:"", company:"", duration:"", location:"", jobprofile:"" },
  education:  { degree:"", year:"", college:"" },
  projects:   { name:"", application:"", github:"", imageUrl:"", images:[], description:"", shortdescription:"", playstore:"", ios:"", techstack:"", weburl:"", projecttype:"", tags:[], thumbnailPosition:"center" },
  platforms:  { name:"", description:"", logoUrl:"", color:"#00A1E0", order:0 },
  login:      { username:"", password:"" },
};

export default function AdminPage() {
  const [currentTab, setCurrentTab] = useState("home");
  const [authUser, setAuthUser] = useState(false);
  const [allData, setAllData] = useState({});
  const [update, setUpdate] = useState(false);
  const [loginFormData, setLoginFormData] = useState(INIT.login);

  // Per-tab form states
  const [homeForm,       setHomeForm]       = useState(INIT.home);
  const [aboutForm,      setAboutForm]      = useState(INIT.about);
  const [servicesForm,   setServicesForm]   = useState(INIT.services);
  const [experienceForm, setExperienceForm] = useState(INIT.experience);
  const [educationForm,  setEducationForm]  = useState(INIT.education);
  const [projectForm,    setProjectForm]    = useState(INIT.projects);
  const [reviewsForm,    setReviewsForm]    = useState(INIT.reviews);
  const [platformsForm,  setPlatformsForm]  = useState(INIT.platforms);

  // ── Auth ─────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      setAuthUser(JSON.parse(sessionStorage.getItem("authUser")));
    } catch {}
  }, []);

  async function handleLogin() {
    const res = await login(loginFormData);
    if (res?.success) {
      setAuthUser(true);
      sessionStorage.setItem("authUser", JSON.stringify(true));
      toast.success("Welcome back, Admin! 👋");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("authUser");
    setAuthUser(false);
    toast.success("Logged out successfully");
  }

  // ── Data fetch ───────────────────────────────────────────────────
  useEffect(() => {
    if (authUser) extractAllData();
  }, [currentTab, authUser]);

  async function extractAllData() {
    try {
      const response = await getData(currentTab);
      if (!response?.success) return;

      if (currentTab === "home" && response.data?.length) {
        setHomeForm(response.data[0]);
        setUpdate(true);
      }
      if (currentTab === "about" && response.data?.length) {
        setAboutForm(response.data[0]);
        setUpdate(true);
      }

      setAllData(prev => ({ ...prev, [currentTab]: response.data }));
    } catch (e) {
      console.error(e);
    }
  }

  // ── Save ─────────────────────────────────────────────────────────
  async function handleSaveData() {
    const formMap = {
      home: homeForm, about: aboutForm, services: servicesForm,
      experience: experienceForm, education: educationForm,
      projects: projectForm, reviews: reviewsForm, platforms: platformsForm,
    };

    // Singleton tabs: always upsert (PUT) regardless of `update` flag
    const SINGLETON_TABS = ["home", "about"];
    const isSingleton = SINGLETON_TABS.includes(currentTab);

    const toastId = toast.loading("Saving...");
    try {
      const response = (update || isSingleton)
        ? await updateData(currentTab, formMap[currentTab])
        : await addData(currentTab, formMap[currentTab]);

      if (response?.success) {
        toast.success("Saved successfully! ✓", { id: toastId });
        if (!isSingleton) resetFormData();
        await extractAllData();
      } else {
        toast.error("Failed to save. Please try again.", { id: toastId });
      }
    } catch (e) {
      toast.error("An error occurred.", { id: toastId });
    }
  }

  function resetFormData() {
    setHomeForm(INIT.home); setAboutForm(INIT.about);
    setServicesForm(INIT.services); setExperienceForm(INIT.experience);
    setEducationForm(INIT.education); setProjectForm(INIT.projects);
    setReviewsForm(INIT.reviews); setPlatformsForm(INIT.platforms);
    setUpdate(false);
  }

  // ── Tab content map ──────────────────────────────────────────────
  const tabContent = {
    home: <AdminHomeView formData={homeForm} setFormData={setHomeForm} handleSaveData={handleSaveData} />,
    about: <AdminAboutView formData={aboutForm} setFormData={setAboutForm} handleSaveData={handleSaveData} />,
    platforms: <AdminPlatformsView formData={platformsForm} setFormData={setPlatformsForm} handleSaveData={handleSaveData} data={allData?.platforms} setAllData={setAllData} />,
    services: <AdminServicesView formData={servicesForm} setFormData={setServicesForm} handleSaveData={handleSaveData} data={allData?.services} setAllData={setAllData} />,
    experience: <AdminExperienceView formData={experienceForm} setFormData={setExperienceForm} handleSaveData={handleSaveData} data={allData?.experience} setAllData={setAllData} />,
    education: <AdminEducationView formData={educationForm} setFormData={setEducationForm} handleSaveData={handleSaveData} data={allData?.education} setAllData={setAllData} />,
    projects: <AdminProjectView formData={projectForm} setFormData={setProjectForm} handleSaveData={handleSaveData} data={allData?.projects} setData={setAllData} setUpdate={setUpdate} />,
    reviews: <AdminReviewsView formData={reviewsForm} setFormData={setReviewsForm} handleSaveData={handleSaveData} data={allData?.reviews} setAllData={setAllData} setUpdate={setUpdate} />,
    contact: <AdminContactView />,
  };

  if (!authUser) {
    return (
      <>
        <Toaster position="top-right" toastOptions={{
          style: { background: "#0C1829", color: "#F0F6FF", border: "1px solid rgba(255,255,255,0.08)" }
        }} />
        <Login formData={loginFormData} setFormData={setLoginFormData} handlelogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" toastOptions={{
        style: { background: "#0C1829", color: "#F0F6FF", border: "1px solid rgba(255,255,255,0.08)" },
        success: { iconTheme: { primary: "#00A1E0", secondary: "#fff" } },
        error:   { iconTheme: { primary: "#FF6B6B", secondary: "#fff" } },
      }} />
      <AdminLayout
        currentTab={currentTab}
        setActiveTab={(tab) => { setCurrentTab(tab); resetFormData(); }}
        onLogout={handleLogout}
        allData={allData}
      >
        {tabContent[currentTab] || <div />}
      </AdminLayout>
    </>
  );
}