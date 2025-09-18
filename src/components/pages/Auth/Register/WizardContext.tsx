import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRegister } from "@/api/modernCommuneApi";

interface WizardContextType {
  formValues: UserRegister;
  setFormValues: React.Dispatch<React.SetStateAction<UserRegister>>;
}

const initialValues: UserRegister = {
  email: '',
  firstName: '',
  lastName: '',
  alias: '',
  password: '',
  confirmPassword: '',
  country: '',
  address: '',
  unit: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  isPhoneVerification: false,
  notifications: [false, false, false, false, false],
  terms: false,
  promoCode: '',
  isUserCheck: false,
  isAlert: false
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [formValues, setFormValues] = useState<UserRegister>(initialValues);

  return (
    <WizardContext.Provider value={{ formValues, setFormValues }}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardContext = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizardContext must be used within a WizardProvider');
  }
  return context;
};