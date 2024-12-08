import ResumeCard from "@/components/ResumeCard";
import Image from "next/image";
import Background from "@/public/images/21.png";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  return (
    <div className="bg-custom-pattern  bg-center h-screen w-screen bg-no-repeat bg-white">
      <div className="relative flex flex-col items-center justify-center ">
        <div className="absolute top-[191px] left-[1044px] inset-1 opacity-0 hover:opacity-100 hover:cursor-pointer">
          <ProfileCard />
        </div>

        <div className="absolute top-[240px] left-[1158px] inset-1  opacity-0 hover:opacity-100 hover:cursor-pointer">
          <ResumeCard />
        </div>
      </div>
    </div>
  );
}
