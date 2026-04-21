"use client";

import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import useSWR from "swr";

// Lazy load all sections
const ClientHomeView               = dynamic(() => import("@/components/client-view/home"),       { ssr: false });
const ClientAboutView              = dynamic(() => import("@/components/client-view/about"),       { ssr: false });
const ClientExperienceAndEducation = dynamic(() => import("@/components/client-view/experience"), { ssr: false });
const ClientProjectView            = dynamic(() => import("@/components/client-view/projects"),    { ssr: false });
const ClientContactView            = dynamic(() => import("@/components/client-view/contact"),     { ssr: false });
const ClientServicesView           = dynamic(() => import("@/components/client-view/services"),    { ssr: false });

// Fetcher with 5-second timeout
const fetcher = (url) =>
  Promise.race([
    fetch(url).then((res) => res.json()).then((data) => data.data ?? null),
    new Promise((resolve) => setTimeout(() => resolve(null), 5000)),
  ]);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const { data: homeSectionData,  isLoading: loadingHome }      = useSWR("/api/home/get",       fetcher);
  const { data: aboutData,        isLoading: loadingAbout }      = useSWR("/api/about/get",      fetcher);
  const { data: experienceData,   isLoading: loadingExperience } = useSWR("/api/experience/get", fetcher);
  const { data: educationData,    isLoading: loadingEducation }  = useSWR("/api/education/get",  fetcher);
  const { data: projectsData,     isLoading: loadingProjects }   = useSWR("/api/projects/get",   fetcher);
  const { data: servicesData,     isLoading: loadingServices }   = useSWR("/api/services/get",   fetcher);
  const { data: platformsData,    isLoading: loadingPlatforms }  = useSWR("/api/platforms/get",  fetcher);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setTimedOut(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const isLoading =
    !timedOut &&
    (!mounted || loadingHome || loadingAbout || loadingExperience ||
     loadingEducation || loadingProjects || loadingServices || loadingPlatforms);

  if (isLoading) return <LoadingScreen isLoading />;

  return (
    <div style={{ backgroundColor: "var(--bg-base)" }} className="min-h-screen w-full overflow-x-hidden">

      <Suspense fallback={<LoadingScreen isLoading />}>
        <ClientHomeView data={homeSectionData || []} platformsData={platformsData || []} />
      </Suspense>

      <Suspense fallback={null}>
        <ClientAboutView data={aboutData?.[0] || {}} platformsData={platformsData || []} />
      </Suspense>

      <Suspense fallback={null}>
        <ClientServicesView data={servicesData || []} platformsData={platformsData || []} />
      </Suspense>

      <Suspense fallback={null}>
        <ClientExperienceAndEducation
          educationData={educationData || []}
          experienceData={experienceData || []}
        />
      </Suspense>

      <Suspense fallback={null}>
        <ClientProjectView data={projectsData || []} />
      </Suspense>

      <ClientContactView />

    </div>
  );
}
