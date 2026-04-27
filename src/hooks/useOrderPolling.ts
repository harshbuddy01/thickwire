'use client';

import { useEffect, useState, useCallback } from 'react';
import { getOrderStatus } from '@/lib/api';
import type { OrderStatus } from '@/lib/types';

export function useOrderPolling(orderId: string | null) {
    const [order, setOrder] = useState<OrderStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStatus = useCallback(async () => {
        if (!orderId) return;
        try {
            const data = await getOrderStatus(orderId);
            setOrder(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch order status');
        } finally {
            setLoading(false);
        }
    }, [orderId]);

    useEffect(() => {
        if (!orderId) return;

        fetchStatus();

        // Stop polling if order is fulfilled or failed
        const shouldPoll = () => {
            if (!order) return true;
            const terminal = ['FULFILLED', 'MANUAL_FULFILLED'];
            const failed = order.paymentStatus === 'FAILED';
            return !terminal.includes(order.fulfillmentStatus) && !failed;
        };

        const interval = setInterval(() => {
            if (shouldPoll()) {
                fetchStatus();
            }
        }, 5000);

        // Auto-stop after 2 minutes
        const timeout = setTimeout(() => clearInterval(interval), 120000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [orderId, fetchStatus, order]);

    return { order, loading, error, refetch: fetchStatus };
}
