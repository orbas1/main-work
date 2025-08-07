"use client";

import { createContext, useContext, useState } from "react";

export type SignupData = {
  name: string;
  email: string;
  password: string;
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

interface SignupContextValue {
  data: SignupData;
  setData: (values: Partial<SignupData>) => void;
}

const SignupContext = createContext<SignupContextValue | undefined>(undefined);

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
  });

  const setData = (values: Partial<SignupData>) => {
    setDataState((prev) => ({ ...prev, ...values }));
  };

  return <SignupContext.Provider value={{ data, setData }}>{children}</SignupContext.Provider>;
}

export function useSignup() {
  const context = useContext(SignupContext);
  if (!context) throw new Error("useSignup must be used within SignupProvider");
  return context;
}
