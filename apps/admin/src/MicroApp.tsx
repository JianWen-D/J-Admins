import { Suspense } from "react";
import { JAuth } from "@devin/ui";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router";
import LoadingSuspense from "./components/Loading";
import { useCommon } from "./context/commonContext";
import { KeepAlive } from "keepalive-for-react";

const MiniApp = () => {
  const _router = createBrowserRouter(router(true), {
    basename: "/",
  });
  const { auth } = useCommon();

  return (
    <div id="container">
      <KeepAlive>
        <Suspense fallback={<LoadingSuspense />}>
          <JAuth
            type="page"
            authKey={location.pathname}
            auth={auth}
            hideNoFound
          >
            <RouterProvider router={_router}></RouterProvider>
          </JAuth>
        </Suspense>
      </KeepAlive>
    </div>
  );
};

export default MiniApp;
