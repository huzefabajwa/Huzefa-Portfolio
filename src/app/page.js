"use client";

import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import useSWR from "swr";

// ── Hero loads with SSR disabled but does NOT block page render
const ClientHomeView               = dynamic(() => import("@/components/client-view/home"),       { ssr: false });

// ── Below-fold sections — lazy, never block the hero
const ClientAboutView              = dynamic(() => import("@/components/client-view/about"),       { ssr: false });
const ClientServicesView           = dynamic(() => import("@/components/client-view/services"),    { ssr: false });
const ClientExperienceAndEducation = dynamic(() => import("@/components/client-view/experience"), { ssr: false });
const ClientProjectView            = dynamic(() => import("@/components/client-view/projects"),    { ssr: false });
const ClientContactView            = dynamic(() => import("@/components/client-view/contact"),     { ssr: false });

// ── SWR fetcher — 5 s timeout per call so one slow API never blocks all ──
const fetcher = (url) =>
  Promise.race([
    fetch(url).then((r) => r.json()).then((d) => d.data ?? null),
    new Promise((resolve) => setTimeout(() => resolve(null), 5000)),
  ]);

// ── Thin skeleton shown while individual below-fold sections load ──
function SectionSkeleton() {
  return (
    <div style={{ minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 40, height: 40, border: "2px solid rgba(0,161,224,0.3)", borderTopColor: "#00A1E0", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  // loading screen visible only while hero data + initial mount settle (max 4 s)
  const [showLoader, setShowLoader] = useState(true);

  // ── Data fetching — all sections fetch in parallel ──────────────
  const { data: homeSectionData  } = useSWR("/api/home/get",       fetcher);
  const { data: aboutData        } = useSWR("/api/about/get",      fetcher);
  const { data: experienceData   } = useSWR("/api/experience/get", fetcher);
  const { data: educationData    } = useSWR("/api/education/get",  fetcher);
  const { data: projectsData     } = useSWR("/api/projects/get",   fetcher);
  const { data: servicesData     } = useSWR("/api/services/get",   fetcher);
  const { data: platformsData    } = useSWR("/api/platforms/get",  fetcher);

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroReady = homeSectionData !== undefined && platformsData !== undefined && aboutData !== undefined;

  // Hide loader as soon as hero data arrives
  useEffect(() => {
    if (!mounted) return;
    if (heroReady) {
      const t = setTimeout(() => setShowLoader(false), 200);
      return () => clearTimeout(t);
    }
  }, [mounted, heroReady]);

  // ── Loading screen ───────────────────────────────────────────────
  if (showLoader) {
    return <LoadingScreen isLoading />;
  }

  return (
    <>
      {/* Spin keyframe injected inline — minimal, no extra CSS file needed */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ backgroundColor: "var(--bg-base)" }} className="min-h-screen w-full overflow-x-hidden">

        {/* ── Hero — renders first, immediately ── */}
        <Suspense fallback={<SectionSkeleton />}>
          <ClientHomeView
            data={homeSectionData || []}
            platformsData={platformsData || []}
            aboutData={aboutData?.[0] || {}}
          />
        </Suspense>

        {/* ── About ── */}
        <Suspense fallback={<SectionSkeleton />}>
          {aboutData === undefined ? <SectionSkeleton /> : (
            <ClientAboutView
              data={aboutData?.[0] || {}}
              platformsData={platformsData || []}
            />
          )}
        </Suspense>

        {/* ── Services ── */}
        <Suspense fallback={<SectionSkeleton />}>
          {servicesData === undefined ? <SectionSkeleton /> : (
            <ClientServicesView
              data={servicesData || []}
              platformsData={platformsData || []}
            />
          )}
        </Suspense>

        {/* ── Experience & Education ── */}
        <Suspense fallback={<SectionSkeleton />}>
          {(experienceData === undefined || educationData === undefined) ? <SectionSkeleton /> : (
            <ClientExperienceAndEducation
              educationData={educationData || []}
              experienceData={experienceData || []}
            />
          )}
        </Suspense>

        {/* ── Projects ── */}
        <Suspense fallback={<SectionSkeleton />}>
          {projectsData === undefined ? <SectionSkeleton /> : (
            <ClientProjectView data={projectsData || []} />
          )}
        </Suspense>

        {/* ── Contact ── */}
        <Suspense fallback={null}>
          <ClientContactView />
        </Suspense>

      </div>
    </>
  );
}
