"use client";

import ResumeCard from "@/components/ResumeCard";
import ProfileCard from "@/components/ProfileCard";
import MailCard from "@/components/MailCard";
import Github from "@/components/Github";
import CoverLetter from "@/components/CoverLetter";
import WebPageCard from "@/components/WebPageCard";
import PieChartCard from "@/components/PieChartCard";
import ContactCard from "@/components/ContactCard";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = (route: string) => {
    router.push(route);
  };
  return (
    <div className="relative flex flex-col items-center justify-center ">
      <div className="absolute top-[100px] left-[48px] inset-1  hover:opacity-100 hover:cursor-pointer">
        <Sidebar />
      </div>
      <div className="absolute top-[56px] left-[812px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer">
        <MailCard />
      </div>
      <div className="absolute top-[97px] left-[947px] inset-1  opacity-0 hover:opacity-100 hover:cursor-pointer">
        <WebPageCard />
      </div>
      <div className="absolute top-[191px] left-[1044px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer">
        <ProfileCard />
      </div>
      <div className="absolute top-[213px] left-[849px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer">
        <PieChartCard />
      </div>

      <div
        className="absolute top-[240px] left-[1158px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer"
        onClick={() => handleClick("/resume")}
      >
        <ResumeCard />
      </div>
      <div className="absolute top-[478px] left-[1144px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer">
        <ContactCard />
      </div>
      <div className="absolute top-[445px] left-[602px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer">
        <Github />
      </div>
      <div
        className="absolute top-[143px] left-[700px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer "
        onClick={() => handleClick("/cover-letter")}
      >
        <CoverLetter />
      </div>
      <div className="absolute top-[100px] left-[1800px] inset-1  hover:opacity-100 hover:cursor-pointer ">
        <NavBar />
      </div>
    </div>
  );
}
