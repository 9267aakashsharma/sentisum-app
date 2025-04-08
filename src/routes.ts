export interface DashboardRoute {
  title: string;
  description?: string;
  path: string;
}

export const DASHBOARD_ROUTES = {
  HOME: {
    title: "Home",
    description: "",
    path: "/",
  },
  ALERTS: {
    title: "Alerts",
    description: "",
    path: "/alerts",
  },
  FLOW: {
    title: "Flow",
    description: "",
    path: "/flow",
  },
  REPORTS: {
    title: "Reports",
    description: "",
    path: "/reports",
  },
  CHATS: {
    title: "Chats",
    description: "",
    path: "/chats",
  },
  SETTINGS: {
    title: "Settings",
    description: "",
    path: "/settings",
  },
  PROFILE: {
    title: "Profile",
    description: "",
    path: "/profile",
  },
} as const satisfies Record<string, DashboardRoute>;

export const DASHBOARD_ROUTES_LIST = Object.values(DASHBOARD_ROUTES);
