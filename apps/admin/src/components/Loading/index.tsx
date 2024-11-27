import { useEffect, useState } from "react";
import Nprogress from "nprogress";

const LoadingSuspense = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      Nprogress.start();
      setVisible(true);
    }, 100);
    return () => {
      window.clearTimeout(timer);
      Nprogress.done();
    };
  }, []);
  if (!visible) {
    return null;
  }

  return <div>loading</div>;
};

export default LoadingSuspense;
