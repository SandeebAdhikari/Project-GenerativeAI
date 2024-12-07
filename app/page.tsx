import MainCard from "@/components/MainCard";
import Image from "next/image";
import Background from "@/public/images/18.png";

export default function Home() {
  return (
    <>
      <div className=" flex flex-col items-center justify-center w-full h-screen">
        <div className="relative w-full h-full ">
          <Image src={Background} alt="background" layout="fill" />

          <div className="absolute w-full h-full flex flex-col items-center justify-center inset-0 gap-2">
            <MainCard />
          </div>
        </div>
      </div>
    </>
  );
}
