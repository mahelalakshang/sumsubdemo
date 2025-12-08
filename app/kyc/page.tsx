// app/kyc/page.tsx
import SumsubKYC from '@/components/SumsubKYC';

export default function KYCPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-6">Identity Verification</h1>
            <p className="mb-8 text-gray-600">
                Please complete the steps below to verify your account.
            </p>

            {/* The Integration */}
            <SumsubKYC />
        </main>
    );
}