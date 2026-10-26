import { useState } from "react";
import ProfileBanner from "./components/ProfileBanner";
import ProfileHeader from "./components/ProfileHeader";
import Gallery from "./components/Gallery";
import Favourite from "./components/Favourite";
import Video from "./components/Video";
import MyStory from "./components/MyStory";
import MemoryWall from "./components/MemoryWall";
import Timeline from "./components/Timeline";
import FamilyTree from "./components/FamilyTree";
import Footer from "./components/Footer";
import PageSettingsSidebar from "./components/PageSettingsSidebar";
import { usePageSettings } from "./hooks/usePageSettings";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { settings, update } = usePageSettings();

  const viewLivePage = () => console.log("View Live Page");

  return (
    <>
      <ProfileBanner
        width="100%"
        height={400}
        onPageSetting={() => setIsSidebarOpen(true)}
      />

      <ProfileHeader />

      <main className="mx-auto flex w-full max-w-[1100px] flex-col gap-24 px-6 py-16">
        <Gallery />
        <Favourite />
        <Video />
        <MyStory />
        <MemoryWall />
        <Timeline />
        <FamilyTree />
      </main>

      <Footer onViewLive={viewLivePage} />

      <PageSettingsSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        settings={settings}
        onChange={update}
        onViewLive={viewLivePage}
        onRegister={() => console.log("Register Page")}
      />
    </>
  );
}