import SumsubKYC from "@/components/SumsubKYC";
import Image from "next/image";

export default function Home() {
  console.log(process.env.XX)
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <h1 className="text-2xl font-bold mb-6">Identity Verification</h1>
        <p className="mb-8 text-gray-600">
          Please complete the steps below to verify your account.
        </p>

        {/* The Integration */}
        <SumsubKYC />
      </main>
    </div>
  );
}
