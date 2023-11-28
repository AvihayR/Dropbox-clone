"use client";

// other imports...

import { app } from './firebase'
import { useEffect } from 'react'
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"


export default function Providers() {

    useEffect(() => {
        console.log('initializing app check')

        initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(
                process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_KEY as string

            ),
            isTokenAutoRefreshEnabled: true,
        })
    }, [])

    return (
        <div id="recaptcha-container"></div>
    )
}