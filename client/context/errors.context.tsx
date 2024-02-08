import { ReactNode, createContext, useEffect, useState } from "react";

// =========== Redux =========== \\
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type InitialStateType = {
  errors: Array<Object>;
  makeError?: any;
};

const initialState = {
  errors: [],
  makeError: null,
};

export const ErrorContext = createContext<InitialStateType>(initialState);

const ErrorContextWrapper = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<any>([]);

  // ======= Redux
  const taskSelector = useSelector((select: RootState) => select.task);
  const accountSelector = useSelector((select: RootState) => select.account);

  useEffect(() => {
    if (accountSelector.fetchError)
      return setErrors(accountSelector.fetchError);
  }, [accountSelector.fetchError]);

  useEffect(() => {
    if (taskSelector.fetchError) return setErrors(taskSelector.fetchError);
  }, [taskSelector.fetchError]);

  // ======== make Error
  const MakeError = (message: string) => {
    if (!message) return;

    setErrors([message]);

    setTimeout(() => {
      setErrors([]);
    }, 1500);
  };

  // ========= Finlly
  const value = {
    errors: errors,
    makeError: MakeError,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export default ErrorContextWrapper;
