import { Button, Tooltip } from "@heroui/react";
import Icon from "./icons/icon";

function getSalutation(name: string) {
  const date = new Date();
  const hour = date.getHours();

  if (hour < 12) {
    return `Good morning, ${name}!`;
  } else if (hour < 18) {
    return `Good afternoon, ${name}!`;
  } else {
    return `Good evening, ${name}!`;
  }
}

const Navbar = () => {
  const firstName = "Sharad";
  return (
    <section className="w-full flex items-center justify-between py-2 mb-4">
      <h1 className="text-3xl">{getSalutation(firstName)}</h1>
      <div className="flex items-center">
        <Tooltip
          classNames={{
            content: "bg-primary-50 rounded-md text-primary-500",
          }}
          content="Help"
          placement="bottom"
        >
          <Button isIconOnly variant="light" color="default">
            <Icon name="question" size={20} />
          </Button>
        </Tooltip>
        <Tooltip
          classNames={{
            content: "bg-primary-50 rounded-md text-primary-500",
          }}
          content="Notifications"
          placement="bottom"
        >
          <Button isIconOnly variant="light" color="default">
            <Icon name="bell" size={20} />
          </Button>
        </Tooltip>
      </div>
    </section>
  );
};

export default Navbar;
