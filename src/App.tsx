import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load pages for better performance
const MorningAdhkar = lazy(() => import("./pages/MorningAdhkar"));
const EveningAdhkar = lazy(() => import("./pages/EveningAdhkar"));
const SleepAdhkar = lazy(() => import("./pages/SleepAdhkar"));
const Ruqyah = lazy(() => import("./pages/Ruqyah"));
const Settings = lazy(() => import("./pages/Settings"));
const Achievements = lazy(() => import("./pages/Achievements"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen bg-gray-50 dark:bg-gray-900">
          <p className="text-xl font-arabic">جاري التحميل...</p>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/morning-adhkar" element={<MorningAdhkar />} />
          <Route path="/evening-adhkar" element={<EveningAdhkar />} />
          <Route path="/sleep-adhkar" element={<SleepAdhkar />} />
          <Route path="/ruqyah" element={<Ruqyah />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
