import icons from "./icons";
import type { IconProps } from "./icons";

export type IconName = keyof typeof icons;

const Icon = (props: IconProps & { name: IconName }) => {
  const { name, ...rest } = props;
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...rest} />;
};

export default Icon;
