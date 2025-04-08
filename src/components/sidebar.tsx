import { NavLink } from "react-router";
import { Button, cn, Tooltip } from "@heroui/react";

import LOGO from "../assets/logo.webp";
import { DASHBOARD_ROUTES, DashboardRoute } from "../routes";
import Icon from "./icons/icon";

interface NavigationItem extends DashboardRoute {
  icon: React.ReactNode;
}

const navigationItems: NavigationItem[] = [
  {
    ...DASHBOARD_ROUTES.HOME,
    icon: <Icon name="home" size={20} />,
  },
  {
    ...DASHBOARD_ROUTES.ALERTS,
    icon: <Icon name="flag" size={20} />,
  },
  {
    ...DASHBOARD_ROUTES.FLOW,
    icon: <Icon name="connection" size={20} />,
  },
  {
    ...DASHBOARD_ROUTES.REPORTS,
    icon: <Icon name="chart-column" size={20} />,
  },
  {
    ...DASHBOARD_ROUTES.CHATS,
    icon: <Icon name="comment-2-text" size={20} />,
  },
];

const bottomNavigationItems: NavigationItem[] = [
  {
    ...DASHBOARD_ROUTES.SETTINGS,
    icon: <Icon name="gear" size={20} />,
  },
  {
    ...DASHBOARD_ROUTES.PROFILE,
    icon: <Icon name="user" size={20} />,
  },
];

const Sidebar = () => {
  return (
    <nav className="h-screen fixed top-0 left-0 w-16 flex flex-col items-center py-4 bg-white shadow-md">
      <div className="border-b border-gray-200 pb-4">
        <img
          src={LOGO}
          alt="Sentisum."
          className="w-12 h-12 aspect-square object-cover"
        />
      </div>
      <ul className="my-4 flex flex-col items-center gap-y-3">
        {navigationItems.map((item) => (
          <li key={item.title}>
            <NavLink to={item.path}>
              {({ isActive }) => (
                <Tooltip
                  classNames={{
                    content: "bg-primary-50 rounded-md text-primary-500",
                  }}
                  content={item.title}
                  placement="right"
                >
                  <Button
                    isIconOnly
                    radius="sm"
                    color="primary"
                    variant={isActive ? "shadow" : "light"}
                    className={cn({
                      "text-white opacity-85": isActive,
                      "text-black opacity-75": !isActive,
                    })}
                  >
                    {item.icon}
                  </Button>
                </Tooltip>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className="mt-auto mb-4 flex flex-col items-center gap-y-3">
        {bottomNavigationItems.map((item) => (
          <li key={item.title}>
            <NavLink to={item.path}>
              {({ isActive }) => (
                <Tooltip
                  classNames={{
                    content: "bg-primary-50 rounded-md text-primary-500",
                  }}
                  content={item.title}
                  placement="right"
                >
                  <Button
                    isIconOnly
                    radius="sm"
                    color="primary"
                    variant={isActive ? "shadow" : "light"}
                    className={cn({
                      "text-white opacity-85": isActive,
                      "text-black opacity-75": !isActive,
                    })}
                  >
                    {item.icon}
                  </Button>
                </Tooltip>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
