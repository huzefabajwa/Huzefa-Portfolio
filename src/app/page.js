"use client";

import { useEffect, useState, Suspense } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import useSWR from "swr";

// Lazy load components
const ClientHomeView = dynamic(() => import("@/components/client-view/home"), { ssr: false });
const ClientAboutView = dynamic(() => import("@/components/client-view/about"), { ssr: false });
const ClientExperienceAndEducation = dynamic(() => import("@/components/client-view/experience"), { ssr: false });
const ClientProjectView = dynamic(() => import("@/components/client-view/projects"), { ssr: false });
const ClientContactView = dynamic(() => import("@/components/client-view/contact"), { ssr: false });
const ClientServicesView = dynamic(() => import("@/components/client-view/services"), { ssr: false });
const ClientReviewsView = dynamic(() => import("@/components/client-view/reviews"), { ssr: false });

const fetcher = (url) => fetch(url).then((res) => res.json()).then((data) => data.data || null);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [homeLoaded, setHomeLoaded] = useState(false);

  // SWR hooks for each section
  const { data: homeSectioData, isLoading: loadingHome } = useSWR("/api/home/get", fetcher);
  const { data: aboutData, isLoading: loadingAbout } = useSWR("/api/about/get", fetcher);
  const { data: experienceData, isLoading: loadingExperience } = useSWR("/api/experience/get", fetcher);
  const { data: educationData, isLoading: loadingEducation } = useSWR("/api/education/get", fetcher);
  const { data: projectsData, isLoading: loadingProjects } = useSWR("/api/projects/get", fetcher);
  const { data: servicesData, isLoading: loadingServices } = useSWR("/api/services/get", fetcher);
  const { data: reviewsData, isLoading: loadingReviews } = useSWR("/api/reviews/get", fetcher);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoading = !mounted || loadingHome || loadingAbout || loadingExperience || loadingEducation || loadingProjects || loadingServices || loadingReviews;

  if (isLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  return (
    <div className="bg-[#070E1B] max-w-screen w-full min-h-screen bg-primary text-primary">
      <Suspense fallback={<LoadingScreen isLoading={true} />}>
        <ClientHomeView data={homeSectioData || []} aboutData={aboutData?.[0] || []} onLoaded={() => setHomeLoaded(true)} />
      </Suspense>
      {homeLoaded && (
        <>
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <ClientAboutView data={aboutData?.[0] || []} />
          </Suspense>
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <ClientServicesView data={servicesData || []} />
          </Suspense>
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <ClientExperienceAndEducation
              educationData={educationData || []}
              experienceData={experienceData || []}
            />
          </Suspense>
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <ClientProjectView data={projectsData || []} />
          </Suspense>
          <Suspense fallback={<LoadingScreen isLoading={true} />}>
            <ClientReviewsView data={reviewsData || []} />
          </Suspense>
          <ClientContactView />
        </>
      )}
    </div>
  );
}
