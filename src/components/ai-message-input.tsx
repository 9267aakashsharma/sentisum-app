import { Button, Chip, Textarea } from "@heroui/react";
import { useState } from "react";
import { GlowingEffect } from "./aceternity/glowing-effect";
import Icon from "./icons/icon";

const suggestions = [
  "What is the percentage increase in volume for Gaming Support?",
  "Summarize all metrics for the last 30 days",
  "What is the CSAT for last 10 days?",
  "What is the increase in percentage ticket count?",
];

const AiMessageInput = () => {
  const [inputValue, setInputValue] = useState("");

  const hasInputValue = inputValue.trim().length > 0;

  return (
    <div className="bg-white text-black w-full border border-gray-200 rounded-xl flex flex-col gap-2 min-w-[600px] shadow-md relative">
      <GlowingEffect
        blur={0}
        borderWidth={2}
        spread={40}
        glow={true}
        disabled={false}
        proximity={34}
        inactiveZone={0.01}
      />
      <div className="rounded-t-[10px] overflow-hidden border-b border-gray-200">
        <Textarea
          label=""
          isClearable
          radius="none"
          variant="flat"
          value={inputValue}
          onClear={() => setInputValue("")}
          onChange={(e) => setInputValue(e.target.value)}
          className="shadow-none"
          placeholder="Ask Sentisum AI..."
          classNames={{
            clearButton: "text-primary hover:bg-transparent",
            innerWrapper: "px-2",
            inputWrapper:
              "bg-transparent data-[focus=true]:!bg-transparent data-[hover=true]:bg-transparent",
          }}
        />
      </div>
      <div className="w-full flex items-start justify-between px-4 pt-2 pb-4">
        <div className="flex items-center gap-2 grow shrink flex-wrap">
          {suggestions.map((suggestion, index) => (
            <Chip
              key={index}
              variant="flat"
              color="primary"
              radius="sm"
              className="cursor-pointer bg-primary-100/70 text-primary"
              startContent={<Icon name="plus" size={16} />}
              onClick={() => setInputValue(suggestion)}
            >
              {suggestion}
            </Chip>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            isDisabled={!hasInputValue}
            variant="shadow"
            color="primary"
            className="text-white opacity-85 disabled:opacity-50"
            startContent={<Icon name="ai" size={16} className="-ml-1" />}
          >
            Dig in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiMessageInput;
