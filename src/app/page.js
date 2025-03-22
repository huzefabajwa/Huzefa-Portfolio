"use client";

import { useEffect, useState, Suspense } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";

// Lazy load components
const ClientHomeView = dynamic(() => import("@/components/client-view/home"), { ssr: false });
const ClientAboutView = dynamic(() => import("@/components/client-view/about"), { ssr: false });
const ClientExperienceAndEducation = dynamic(() => import("@/components/client-view/experience"), { ssr: false });
const ClientProjectView = dynamic(() => import("@/components/client-view/projects"), { ssr: false });
const ClientContactView = dynamic(() => import("@/components/client-view/contact"), { ssr: false });
const ClientServicesView = dynamic(() => import("@/components/client-view/services"), { ssr: false });
const ClientReviewsView = dynamic(() => import("@/components/client-view/reviews"), { ssr: false });

async function extractAllDatas(currentSection) {
  const res = await fetch(`http://localhost:3000/api/${currentSection}/get`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();
  return data && data.data;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);

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
      // Fetch home section first
      const homeData = await extractAllDatas("home");
      setHomeSectioData(homeData);

      // Fetch other sections after a slight delay
      const delay = 300;
      setTimeout(async () => {
        setAboutSectioData(await extractAllDatas("about"));
        setExperienceSectioData(await extractAllDatas("experience"));
        setEducationSectioData(await extractAllDatas("education"));
        setProjectsSectioData(await extractAllDatas("projects"));
        setServicesSectioData(await extractAllDatas("services"));
        setReviewsSectioData(await extractAllDatas("reviews"));

        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => setIsContentVisible(true), 200);
        }, delay);
      }, delay);
    }

    fetchData();
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen isLoading={isLoading} />}
      </AnimatePresence>

      {/* Show ONLY Home First */}
      {!isLoading && (
        <div className="bg-[#070E1B] max-w-screen w-full min-h-screen bg-primary text-primary">
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <ClientHomeView data={homeSectioData} aboutData={aboutSectioData?.[0] || []} />
          </Suspense>

          {/* Render Other Sections After Everything is Loaded */}
          {isContentVisible && (
            <>
              <Suspense fallback={<LoadingScreen isLoading={true} />}>
                <ClientAboutView data={aboutSectioData?.[0] || []} />
              </Suspense>
              <Suspense fallback={<LoadingScreen isLoading={true} />}>
                <ClientServicesView data={servicesSectioData} />
              </Suspense>
              <Suspense fallback={<LoadingScreen isLoading={true} />}>
                <ClientExperienceAndEducation
                  educationData={educationSectioData}
                  experienceData={experienceSectioData}
                />
              </Suspense>
              <Suspense fallback={<LoadingScreen isLoading={true} />}>
                <ClientProjectView data={projectsSectioData} />
              </Suspense>
              <Suspense fallback={<LoadingScreen isLoading={true} />}>
                <ClientReviewsView data={reviewsSectioData} />
              </Suspense>
              <ClientContactView />
            </>
          )}
        </div>
      )}
    </>
  );
}
