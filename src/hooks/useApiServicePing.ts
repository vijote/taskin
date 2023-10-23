// React specific
import { useRef, useEffect } from 'react'

// Services
import createApiService from '../api/api.service'

function useApiServicePing() {
    const shouldPingRef = useRef(true)

    function sendPingRequest() {
        // If a request was recently made
        // there's no need for a wake up
        
        if (!shouldPingRef.current) return

        createApiService().checkApiStatus()
    }

    useEffect(() => {
        const REQUEST_TIMEOFF = 290_000 // 4.8 minutes
        const PING_INTERVAL = 899_900 // Almost 15 minutes, which is the maximum Render inactivity time

        let previousTimeout: NodeJS.Timeout | null = null

        const pingInterval = setInterval(() => {
            sendPingRequest();
        }, PING_INTERVAL);

        // Listen to outcoming requests to prevent unnecesary pings
        const requestListener = () => {            
            // If there was a request fired recently
            // Cancel its wake up call
            if (previousTimeout) clearTimeout(previousTimeout)

            // Prevent unnecesary ping
            shouldPingRef.current = false

            // After some time of inactivity
            // Start pinging again
            previousTimeout = setTimeout(() => {
                shouldPingRef.current = true
            }, REQUEST_TIMEOFF)
        }

        document.addEventListener("request", requestListener)

        return () => {
            document.removeEventListener("request", requestListener);
            clearInterval(pingInterval)
        };
    }, [])
}

export default useApiServicePing