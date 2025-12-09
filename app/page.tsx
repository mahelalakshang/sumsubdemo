import SumsubKYC from "@/components/SumsubKYC";
import Image from "next/image";

export default function Home() {
  console.log(process.env.XX)
  return (
    <div className="w-full ">


      {/* The Integration */}
      <SumsubKYC />

    </div>
  );
}
