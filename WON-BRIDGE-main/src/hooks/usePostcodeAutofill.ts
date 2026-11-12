import { useEffect, useRef, useState } from "react";
import { getPincodeData } from "@/services/shared/shared";
import { toast } from "sonner";

const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

export interface PincodeResponse {
  city?: string;
  state?: string;
  district?: string;
  street?: string;
  [key:string]:unknown;
}

interface UsePostcodeAutofillParams {
  postcode: string | null | undefined;
  enabled: boolean;
  onAutofill: (data: PincodeResponse) => void;
  debounceMs?: number;
}

interface UsePostcodeAutofillReturn {
  loading: boolean;
}

const usePostcodeAutofill = ({
  postcode,
  enabled,
  onAutofill,
  debounceMs = 500
}: UsePostcodeAutofillParams): UsePostcodeAutofillReturn => {
  const [loading, setLoading] = useState(false);

  const normalized = typeof postcode === "string" ? postcode.trim() : "";

  const lastFetchedRef = useRef<string | null>(null);
  const requestIdRef = useRef(0);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear any existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    // Hard stop if disabled or invalid
    if (!enabled || !PINCODE_REGEX.test(normalized)) {
      requestIdRef.current++; // invalidate in-flight
      setLoading(false);
      return;
    }

    // Prevent duplicate fetch
    if (normalized === lastFetchedRef.current) {
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      const currentRequestId = ++requestIdRef.current;

      const run = async () => {
        try {
          setLoading(true);

          const res = await getPincodeData(normalized);

          // Ignore stale responses
          if (requestIdRef.current !== currentRequestId) return;

          if (!res?.data?.success || !res.data.data) {
            toast.error(res?.data?.message ?? "Failed to fetch postcode data");
            return;
          }

          lastFetchedRef.current = normalized;
          onAutofill(res.data.data);
        } catch {
          if (requestIdRef.current === currentRequestId) {
            toast.error("Something went wrong while fetching postcode");
          }
        } finally {
          if (requestIdRef.current === currentRequestId) {
            setLoading(false);
          }
        }
      };

      void run();
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [normalized, enabled, onAutofill, debounceMs]);

  return { loading };
};

export default usePostcodeAutofill;
