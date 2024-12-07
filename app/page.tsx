import ResumeCard from "@/components/ResumeCard";
import Image from "next/image";
import Background from "@/public/images/21.png";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  return (
    <>
      <div className=" flex flex-col items-center justify-center w-full h-screen">
        <div className="relative w-full h-full ">
          <Image src={Background} alt="background" objectFit="cover" />

          <div className="absolute w-full h-full top-[500px] left-[1320px] inset-0 ">
            <ResumeCard />
          </div>
          <div className="absolute w-full h-full top-[415px] left-[1115px] inset-0 ">
            <ProfileCard />
          </div>
        </div>
      </div>
    </>
  );
}
