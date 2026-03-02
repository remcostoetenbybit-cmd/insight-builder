import { useState, useCallback } from "react";

export type TestStatus = "idle" | "loading" | "success" | "error";

export interface TestResult {
  status: TestStatus;
  data: unknown | null;
  error: string | null;
  durationMs: number | null;
  testedAt: string | null;
}

const INITIAL: TestResult = {
  status: "idle",
  data: null,
  error: null,
  durationMs: null,
  testedAt: null,
};

export function useEndpointTester(handler: () => Promise<unknown>) {
  const [result, setResult] = useState<TestResult>(INITIAL);

  const run = useCallback(async () => {
    setResult({ ...INITIAL, status: "loading" });
    const start = performance.now();
    try {
      const data = await handler();
      const durationMs = Math.round(performance.now() - start);
      setResult({
        status: "success",
        data,
        error: null,
        durationMs,
        testedAt: new Date().toISOString(),
      });
    } catch (err: unknown) {
      const durationMs = Math.round(performance.now() - start);
      setResult({
        status: "error",
        data: null,
        error: err instanceof Error ? err.message : String(err),
        durationMs,
        testedAt: new Date().toISOString(),
      });
    }
  }, [handler]);

  const reset = useCallback(() => setResult(INITIAL), []);

  return { result, run, reset };
}
