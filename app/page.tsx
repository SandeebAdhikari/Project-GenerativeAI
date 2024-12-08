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
import TooltipComponent from "@/components/TooltipComponent";

export default function Home() {
  return (
    <div className="bg-custom-pattern  bg-center h-screen w-screen bg-no-repeat bg-[#F7FCFA]">
      <div className="relative flex flex-col items-center justify-center ">
        <div className="absolute top-[100px] left-[48px] inset-1  hover:opacity-100 hover:cursor-pointer">
          <Sidebar />
        </div>
        <div className="absolute top-[56px] left-[812px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer">
          <TooltipComponent text="Recruiter @mail format!">
            <MailCard />
          </TooltipComponent>
        </div>
        <div className="absolute top-[97px] left-[947px] inset-1  opacity-0 hover:opacity-100 hover:cursor-pointer">
          <TooltipComponent text="Create a new SaaS platform!">
            <WebPageCard />
          </TooltipComponent>
        </div>
        <div className="absolute top-[191px] left-[1044px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer">
          <TooltipComponent text="Create a Portfolio webpage!">
            <ProfileCard />
          </TooltipComponent>
        </div>
        <div className="absolute top-[213px] left-[849px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer">
          <TooltipComponent text="Learn to Create a graph!">
            <PieChartCard />
          </TooltipComponent>
        </div>

        <div className="absolute top-[240px] left-[1158px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer">
          <TooltipComponent text="Create a new Resume!">
            <ResumeCard />
          </TooltipComponent>
        </div>
        <div className="absolute top-[478px] left-[1144px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer">
          <TooltipComponent text="Have question? Contact Us!">
            <ContactCard />
          </TooltipComponent>
        </div>
        <div className="absolute top-[445px] left-[602px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer">
          <TooltipComponent text="Create a new GitHub account!">
            <Github />
          </TooltipComponent>
        </div>
        <div className="absolute top-[143px] left-[700px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer ">
          <TooltipComponent text="Create a new Cover Letter!">
            <CoverLetter />
          </TooltipComponent>
        </div>
        <div className="absolute top-[100px] left-[1800px] inset-1  hover:opacity-100 hover:cursor-pointer ">
          <NavBar />
        </div>
      </div>
    </div>
  );
}
