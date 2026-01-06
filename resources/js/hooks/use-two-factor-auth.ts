import { useCallback, useMemo, useState } from "react";

import { qrCode, recoveryCodes, secretKey } from "@/routes/two-factor";

interface TwoFactorSetupData {
  svg: string;
  url: string;
}

interface TwoFactorSecretKey {
  secretKey: string;
}

export const OTP_MAX_LENGTH = 6;

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  return response.json();
};

export const useTwoFactorAuth = () => {
  const {
    hasSetupData,
    manualSetupKey,
    qrCodeSvg,
    setManualSetupKey,
    setQrCodeSvg,
  } = useTwoFactorSetupDataState();
  const [recoveryCodesList, setRecoveryCodesList] = useState<string[]>([]);
  const { clearErrors, errors, setErrors } = useErrorState();

  const fetchQrCode = useCallback(async (): Promise<void> => {
    try {
      const { svg } = await fetchJson<TwoFactorSetupData>(qrCode.url());
      setQrCodeSvg(svg);
    } catch {
      setErrors((prev) => [...prev, "Failed to fetch QR code"]);
      setQrCodeSvg(null);
    }
  }, [setErrors, setQrCodeSvg]);

  const fetchSetupKey = useCallback(async (): Promise<void> => {
    try {
      const { secretKey: key } = await fetchJson<TwoFactorSecretKey>(
        secretKey.url()
      );
      setManualSetupKey(key);
    } catch {
      setErrors((prev) => [...prev, "Failed to fetch a setup key"]);
      setManualSetupKey(null);
    }
  }, [setErrors, setManualSetupKey]);

  const clearSetupData = useCallback((): void => {
    setManualSetupKey(null);
    setQrCodeSvg(null);
    clearErrors();
  }, [clearErrors, setManualSetupKey, setQrCodeSvg]);

  const fetchRecoveryCodes = useCallback(async (): Promise<void> => {
    try {
      clearErrors();
      const codes = await fetchJson<string[]>(recoveryCodes.url());
      setRecoveryCodesList(codes);
    } catch {
      setErrors((prev) => [...prev, "Failed to fetch recovery codes"]);
      setRecoveryCodesList([]);
    }
  }, [clearErrors, setErrors, setRecoveryCodesList]);

  const fetchSetupData = useCallback(async (): Promise<void> => {
    try {
      clearErrors();
      await Promise.all([fetchQrCode(), fetchSetupKey()]);
    } catch {
      setQrCodeSvg(null);
      setManualSetupKey(null);
    }
  }, [
    clearErrors,
    fetchQrCode,
    fetchSetupKey,
    setManualSetupKey,
    setQrCodeSvg,
  ]);

  return {
    clearErrors,
    clearSetupData,
    errors,
    fetchQrCode,
    fetchRecoveryCodes,
    fetchSetupData,
    fetchSetupKey,
    hasSetupData,
    manualSetupKey,
    qrCodeSvg,
    recoveryCodesList,
  };
};

const useTwoFactorSetupDataState = () => {
  const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
  const [manualSetupKey, setManualSetupKey] = useState<string | null>(null);

  const hasSetupData = useMemo<boolean>(
    () => qrCodeSvg !== null && manualSetupKey !== null,
    [qrCodeSvg, manualSetupKey]
  );

  return {
    hasSetupData,
    manualSetupKey,
    qrCodeSvg,
    setManualSetupKey,
    setQrCodeSvg,
  };
};

const useErrorState = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const clearErrors = useCallback((): void => {
    setErrors([]);
  }, []);

  return { clearErrors, errors, setErrors };
};
