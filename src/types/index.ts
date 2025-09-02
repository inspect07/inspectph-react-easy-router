import { ReactNode } from "react";

export interface RouteConfig {
  path: string;
  element: ReactNode;
  protected?: boolean;
  roles?: string[];
  redirectTo?: string;
  layout?: React.ComponentType<{ children: ReactNode }>;
}
