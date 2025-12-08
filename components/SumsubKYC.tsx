// components/SumsubKYC.tsx
'use client'; // This must be a client component

import React, { useEffect, useState } from 'react';
import SumsubWebSdk from '@sumsub/websdk-react';

export default function SumsubKYC() {
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 1. Fetch the access token from your backend when component mounts
    useEffect(() => {
        const fetchToken = async () => {
            try {
                // Pass your actual logged-in user's ID here if you have one
                const response = await fetch('/api/sumsub/token?userId=my-actual-user-id');
                const data = await response.json();

                if (response.ok) {
                    setToken(data.token);
                } else {
                    throw new Error(data.error || 'Failed to fetch token');
                }
            } catch (err) {
                console.error(err);
                setError('Could not initialize verification.');
            }
        };

        fetchToken();
    }, []);

    // 2. Define handler functions for SDK events
    const expirationHandler = () => {
        // If the token expires during the session, fetch a new one
        return fetch('/api/sumsub/token').then((res) => res.json()).then((data) => data.token);
    };

    const config = {
        lang: 'en',
        // email: 'user@example.com', // Pre-fill email if known
        // phone: '1234567890',       // Pre-fill phone if known
    };

    const options = {
        addViewportTag: false,
        adaptIframeHeight: true,
    };

    const handleMessage = (type: string, payload: any) => {
        console.log('Sumsub Message:', type, payload);
        // Handle specific events like 'reviewStatus' or 'idCheck.onStepCompleted'
        if (type === 'idCheck.onApplicantStatusChanged') {
            console.log('Applicant status changed:', payload.reviewStatus);
        }
    };

    const handleError = (payload: any) => {
        console.error('Sumsub Error:', payload);
    };

    if (error) return <div className="text-red-500">{error}</div>;
    if (!token) return <div>Loading Verification...</div>;

    // 3. Render the SDK
    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-sm">
            <SumsubWebSdk
                accessToken={token}
                expirationHandler={expirationHandler}
                config={config}
                options={options}
                onMessage={handleMessage}
                onError={handleError}
            />
        </div>
    );
}