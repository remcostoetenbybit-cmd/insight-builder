import { useState, useEffect, useCallback, useRef } from "react";
import type { HealthResponse, MetricsResponse, StreamEvent, LatencyPoint } from "@/data/mock-api";
import { fetchHealth, fetchMetrics, fetchLatencyHistory, subscribeToStream } from "@/data/mock-api";

export function useHealth() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const res = await fetchHealth();
    setData(res);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 10_000);
    return () => clearInterval(id);
  }, [refresh]);

  return { data, loading };
}

export function useMetrics() {
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}

export function useLatencyHistory() {
  const [data, setData] = useState<LatencyPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatencyHistory().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}

const MAX_EVENTS = 100;

export function useEventStream() {
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setConnected(true);
    unsubRef.current = subscribeToStream((evt) => {
      setEvents((prev) => [evt, ...prev].slice(0, MAX_EVENTS));
    });
    return () => {
      unsubRef.current?.();
      setConnected(false);
    };
  }, []);

  return { events, connected };
}
