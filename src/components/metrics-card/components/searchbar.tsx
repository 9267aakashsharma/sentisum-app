import { cn, Input } from "@heroui/react";

import Icon from "@/components/icons/icon";

const SearchBar = ({
  placeholder,
  className,
  query,
  onChange,
}: {
  placeholder?: string;
  className?: string;
  query: string;
  onChange: (query: string) => void;
}) => {
  return (
    <Input
      label=""
      variant="bordered"
      color="primary"
      labelPlacement="outside"
      placeholder={placeholder || "Search..."}
      startContent={
        <Icon
          name="search"
          size={20}
          className="text-default-500 pointer-events-none flex-shrink-0"
        />
      }
      type="text"
      value={query}
      className={cn("mt-2 mb-3", className)}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
