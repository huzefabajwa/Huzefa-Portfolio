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
  const res = await fetch(`https://huzefa-portfolio-4z76.vercel.app/api/${currentSection}/get`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data || null;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [homeSectioData, setHomeSectioData] = useState(null);
  const [sectionsData, setSectionsData] = useState({});

  useEffect(() => {
    async function fetchData() {
      // Fetch all data in parallel
      const [
        homeData,
        aboutData,
        experienceData,
        educationData,
        projectsData,
        servicesData,
        reviewsData,
      ] = await Promise.all([
        extractAllDatas("home"),
        extractAllDatas("about"),
        extractAllDatas("experience"),
        extractAllDatas("education"),
        extractAllDatas("projects"),
        extractAllDatas("services"),
        extractAllDatas("reviews"),
      ]);

      // Update state separately
      setHomeSectioData(homeData);
      setSectionsData({
        aboutData,
        experienceData,
        educationData,
        projectsData,
        servicesData,
        reviewsData,
      });

      setIsLoading(false);
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

      {/* Show Content */}
      {!isLoading && (
        <div className="bg-[#070E1B] max-w-screen w-full min-h-screen bg-primary text-primary">
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <ClientHomeView data={homeSectioData} aboutData={sectionsData.aboutData?.[0] || []} />
          </Suspense>

          {/* Other Sections Load Independently */}
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <ClientAboutView data={sectionsData.aboutData?.[0] || []} />
          </Suspense>
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <ClientServicesView data={sectionsData.servicesData} />
          </Suspense>
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <ClientExperienceAndEducation
              educationData={sectionsData.educationData}
              experienceData={sectionsData.experienceData}
            />
          </Suspense>
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <ClientProjectView data={sectionsData.projectsData} />
          </Suspense>
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <ClientReviewsView data={sectionsData.reviewsData} />
          </Suspense>
          <ClientContactView />
        </div>
      )}
    </>
  );
}
