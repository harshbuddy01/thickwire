'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { getOrderStatus } from '@/lib/api';
import type { OrderStatus } from '@/lib/types';
import axios from 'axios';

export function useOrderPolling(orderId: string | null) {
    const [order, setOrder] = useState<OrderStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Use a ref to track current order state to avoid stale closures
    const orderRef = useRef<OrderStatus | null>(null);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        orderRef.current = order;
    }, [order]);

    const fetchStatus = useCallback(async () => {
        if (!orderId) return;
        try {
            const data = await getOrderStatus(orderId);
            if (isMounted.current) {
                setOrder(data);
                setError(null);
            }
        } catch (err: unknown) {
            if (isMounted.current) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || err.message || 'Failed to fetch order status');
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Failed to fetch order status');
                }
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, [orderId]);

    useEffect(() => {
        if (!orderId) return;

        fetchStatus();

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            const current = orderRef.current;
            if (!current) {
                fetchStatus();
                return;
            }
            const terminal = ['FULFILLED', 'MANUAL_FULFILLED'];
            const failed = current.paymentStatus === 'FAILED';
            if (!terminal.includes(current.fulfillmentStatus) && !failed) {
                fetchStatus();
            }
        }, 5000);

        // Auto-stop after 2 minutes
        const timeout = setTimeout(() => {
            if (isMounted.current) {
                clearInterval(interval);
            }
        }, 120000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [orderId, fetchStatus]); // removed "order" from deps to prevent re-creating interval

    return { order, loading, error, refetch: fetchStatus };
}
