import React, { ReactNode, useState } from "react";

// 用户信息

export const CommonContext = React.createContext<
  | {
      loading: boolean;
      setLoading: (data: boolean) => void;
    }
  | undefined
>(undefined);

CommonContext.displayName = "CommonContext";

export const CommonProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetLoading = (data: boolean) => {
    setLoading(data);
  };

  // const params = useMemo(() => ({ loading, setLoading: handleSetLoading }), []);
  return (
    <CommonContext.Provider value={{ loading, setLoading: handleSetLoading }}>
      {children}
    </CommonContext.Provider>
  );
};
