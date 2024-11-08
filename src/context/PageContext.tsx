import React, { useContext, useState, createContext, useEffect } from "react";

type PageType = {
  pageName: string;
  subPage: string;
  setPageName: (value: string) => void;
  setSubPage: (value: string) => void;
};

const Context = createContext<PageType>({} as PageType);

const PageContextContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pageName, setPageName] = useState<string>("Home");
  const [subPage, setSubPage] = useState<string>("");

  useEffect(() => {
    setPageName(
      window.location.pathname.slice(1).charAt(0).toUpperCase() +
        window.location.pathname.slice(2)
    );
  }, []);
  return (
    <Context.Provider
      value={{
        pageName,
        subPage,
        setPageName,
        setSubPage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default PageContextContextProvider;

export const usePages = () => useContext(Context);
