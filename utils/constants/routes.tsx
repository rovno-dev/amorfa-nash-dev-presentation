import type { ReactNode } from "react";

export interface RouteLinkProps {
  id?: string;
  href: string;
  title?: string | ReactNode;
}

export const ROUTES = {
  home: { id: "home", href: "/", title: "Home" },
};
