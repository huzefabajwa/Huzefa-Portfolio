"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ClientAboutView from "@/components/client-view/about";
import ClientHomeView from "@/components/client-view/home";
import ClientExperienceAndEducation from "@/components/client-view/experience";
import ClientProjectView from "@/components/client-view/projects";
import ClientContactView from "@/components/client-view/contact";
import ClientServicesView from "@/components/client-view/services";
import ClientReviewsView from "@/components/client-view/reviews";

async function extractAllDatas(currentSection) {
  const res = await fetch(`http://localhost:3000/api/${currentSection}/get`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();
  return data && data.data;
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // Prevents hydration issues

  // Store the fetched data in state
  const [homeSectioData, setHomeSectioData] = useState(null);
  const [aboutSectioData, setAboutSectioData] = useState(null);
  const [experienceSectioData, setExperienceSectioData] = useState(null);
  const [educationSectioData, setEducationSectioData] = useState(null);
  const [projectsSectioData, setProjectsSectioData] = useState(null);
  const [servicesSectioData, setServicesSectioData] = useState(null);
  const [reviewsSectioData, setReviewsSectioData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setHomeSectioData(await extractAllDatas("home"));
      setAboutSectioData(await extractAllDatas("about"));
      setExperienceSectioData(await extractAllDatas("experience"));
      setEducationSectioData(await extractAllDatas("education"));
      setProjectsSectioData(await extractAllDatas("projects"));
      setServicesSectioData(await extractAllDatas("services"));
      setReviewsSectioData(await extractAllDatas("reviews"));
    }
    fetchData();
    setMounted(true);
  }, []);

  if (!mounted) return null; // Fix for hydration mismatch

  return (
    <div className="bg-[#070E1B] max-w-screen w-full min-h-screen w-full bg-primary text-primary">
     

      {/* Content Sections */}
      <ClientHomeView data={homeSectioData} aboutData={aboutSectioData && aboutSectioData.length ? aboutSectioData[0] : []} />
      <ClientAboutView data={aboutSectioData && aboutSectioData.length ? aboutSectioData[0] : []} />
      <ClientServicesView data={servicesSectioData} />
      { <ClientExperienceAndEducation educationData={educationSectioData} experienceData={experienceSectioData} /> }
      <ClientProjectView data={projectsSectioData} />
      <ClientReviewsView data={reviewsSectioData} />
      <ClientContactView />
    </div>
  );
}
