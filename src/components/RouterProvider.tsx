import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteConfig } from "../types";
import ProtectedRoute from "./ProtectedRoute";

interface RouterProviderProps {
  routes: RouteConfig[];
  isAuthenticated: boolean;
  userRole?: string;
}

const RouterProvider: React.FC<RouterProviderProps> = ({
  routes,
  isAuthenticated,
  userRole,
}) => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(
          (
            {
              path,
              element,
              protected: isProtected,
              roles,
              redirectTo,
              layout: Layout,
            },
            i
          ) => {
            const page = Layout ? <Layout>{element}</Layout> : element;

            if (isProtected) {
              return (
                <Route
                  key={i}
                  path={path}
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      userRole={userRole}
                      allowedRoles={roles}
                      redirectTo={redirectTo || "/login"}
                    >
                      {page}
                    </ProtectedRoute>
                  }
                />
              );
            }

            return <Route key={i} path={path} element={page} />;
          }
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;
