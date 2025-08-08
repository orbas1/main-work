"use client";

import { createContext, useContext, useState } from "react";

export type OnboardingData = {
  name?: string;
  phone?: string;
  location?: string;
  bio?: string;
  expertise?: string;
  payment?: string;
  taxId?: string;
  portfolio?: string;
  title?: string;
  image?: string;
  resume?: string;
  coverLetter?: string;
};

interface OnboardingContextValue {
  data: OnboardingData;
  setData: (values: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(
  undefined
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setDataState] = useState<OnboardingData>({});

  const setData = (values: Partial<OnboardingData>) => {
    setDataState((prev) => ({ ...prev, ...values }));
  };

  return (
    <OnboardingContext.Provider value={{ data, setData }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}

