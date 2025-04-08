import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { format } from "date-fns";
import { useState } from "react";
import { GlowingEffect } from "./aceternity/glowing-effect";
import AreaDataChart from "./area-chart";
import Icon from "./icons/icon";
import SlackButton from "./slack-button";

interface Conversation {
  id: string;
  title: string;
  description: string;
  severity: ConversationSeverity;
  severityText?: string;
  timestamp: Date;
  read: boolean;
  tags: string[];
  source: ConversationSource;
}

const severity = ["info", "warning", "danger", "success"] as const;
const source = ["user", "system", "external"] as const;

type ConversationSeverity = (typeof severity)[number];
type ConversationSource = (typeof source)[number];

function getHexColorBySeverity(severity: ConversationSeverity) {
  switch (severity) {
    case "info":
      return "#444ce7";
    case "warning":
      return "#f5a524";
    case "danger":
      return "#f31260";
    case "success":
      return "#17c964";
    default:
      return "#444ce7";
  }
}

const getHeroUIColorBySeverity = (severity: ConversationSeverity) =>
  severity === "info" ? "primary" : severity || "default";

const conversations: Conversation[] = [
  {
    id: "1",
    title: "Facing issues with the application",
    description:
      "The application is not responding. Please check the server status.",
    severity: "danger",
    timestamp: new Date(),
    read: false,
    tags: ["support", "volume"],
    source: "system",
    severityText: "Critical",
  },
  {
    id: "2",
    title: "Payment failing for orders",
    description:
      "Users are reporting that their payments are failing. Please investigate.",
    severity: "danger",
    timestamp: new Date(),
    read: false,
    tags: ["bug", "payment", "user"],
    source: "user",
    severityText: "Critical",
  },
  {
    id: "3",
    title: "New feature request",
    description: "Add FAQ section to the help page for better user experience.",
    severity: "info",
    timestamp: new Date(),
    read: false,
    tags: ["maintenance", "info"],
    source: "system",
    severityText: "Info",
  },
  {
    id: "4",
    title: "Past Orders page is not loading",
    description: "Server error when trying to access past orders.",
    severity: "warning",
    timestamp: new Date(),
    read: false,
    tags: ["maintenance", "server"],
    source: "system",
    severityText: "Warning",
  },
  {
    id: "5",
    title: "Loved the new update!",
    description: "The new update is fantastic. Great job!",
    severity: "success",
    timestamp: new Date(),
    read: false,
    tags: ["user", "signup"],
    source: "user",
    severityText: "Success",
  },
];

const TopConversations = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [selectedSeverities, setSelectedSeverities] = useState<
    ConversationSeverity[]
  >([]);
  const [selectedSources, setSelectedSources] = useState<ConversationSource[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");

  const resetFilters = () => {
    setSelectedSeverities([]);
    setSelectedSources([]);
    setSearchQuery("");
  };

  const [areFiltersVisible, setAreFiltersVisible] = useState(false);

  const handleAlertModalClose = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="shadow-md border bg-white border-gray-200 rounded-xl p-4 relative">
      <GlowingEffect
        blur={0}
        borderWidth={2}
        spread={40}
        glow={true}
        disabled={false}
        proximity={34}
        inactiveZone={0.01}
      />
      <div className="flex items-center gap-2 justify-between">
        <p className="font-semibold text-lg">Top Conversations</p>
        <div className="flex gap-px items-center">
          <Button
            variant={areFiltersVisible ? "solid" : "light"}
            color="primary"
            className="shrink-0 h-7 items-center flex"
            radius="sm"
            size="sm"
            onPress={() => {
              if (areFiltersVisible) {
                resetFilters();
              }
              setAreFiltersVisible(!areFiltersVisible);
            }}
            startContent={<Icon name="filter-2" className="-mr-1" size={14} />}
          >
            Filters
          </Button>
          <Button
            variant="light"
            color="primary"
            className="shrink-0 h-7 items-center flex"
            radius="sm"
            size="sm"
            endContent={<Icon name="arrow-right" className="-ml-1" size={14} />}
          >
            View all
          </Button>
        </div>
      </div>
      {areFiltersVisible && (
        <>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="flex gap-4 justify-between items-center">
            <SeverityFilter
              selectedSeverities={selectedSeverities}
              setSelectedSeverities={setSelectedSeverities}
            />
            <SourceFilter
              selectedSources={selectedSources}
              setSelectedSources={setSelectedSources}
            />
          </div>
        </>
      )}
      <div className="mt-4">
        <ConversationList
          conversations={conversations}
          selectedSeverities={selectedSeverities}
          selectedSources={selectedSources}
          searchQuery={searchQuery}
          onSelectConversation={setSelectedConversation}
        />
      </div>
      <ConversationModal
        conversation={selectedConversation}
        onClose={handleAlertModalClose}
      />
    </div>
  );
};

export default TopConversations;

const severityOptions = severity.reduce((acc, s) => {
  acc[s] = s.charAt(0).toUpperCase() + s.slice(1);
  return acc;
}, {} as Record<ConversationSeverity, string>);

const SeverityFilter = ({
  selectedSeverities,
  setSelectedSeverities,
}: {
  selectedSeverities: ConversationSeverity[];
  setSelectedSeverities: (severities: ConversationSeverity[]) => void;
}) => {
  const handleSeverityChange = (severity: string) => {
    const updatedSeverities = (
      severity.split(",") as ConversationSeverity[]
    ).filter((s) => s.length);
    setSelectedSeverities(updatedSeverities || []);
  };

  return (
    <div className="flex-1 flex justify-start items-center">
      <Select
        label="Severity"
        color="primary"
        className="max-w-sm min-w-64"
        placeholder="Select severity"
        variant="bordered"
        selectedKeys={selectedSeverities}
        value={selectedSeverities}
        onChange={(e) => handleSeverityChange(e.target.value)}
        selectionMode="multiple"
        size="sm"
      >
        {Object.keys(severityOptions).map((key) => (
          <SelectItem key={key}>
            {severityOptions[key as ConversationSeverity]}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

const sourceOptions = source.reduce((acc, s) => {
  acc[s] = s.charAt(0).toUpperCase() + s.slice(1);
  return acc;
}, {} as Record<ConversationSource, string>);

const SourceFilter = ({
  selectedSources,
  setSelectedSources,
}: {
  selectedSources: ConversationSource[];
  setSelectedSources: (sources: ConversationSource[]) => void;
}) => {
  const handleSourceChange = (source: string) => {
    const updatedSources = (source.split(",") as ConversationSource[]).filter(
      (s) => s.length
    );
    setSelectedSources(updatedSources || []);
  };

  return (
    <div className="flex-1 flex justify-end items-center">
      <Select
        label="Source"
        className="max-w-sm min-w-64"
        placeholder="Select source"
        value={selectedSources}
        variant="bordered"
        color="primary"
        selectedKeys={selectedSources}
        onChange={(e) => handleSourceChange(e.target.value)}
        selectionMode="multiple"
        size="sm"
      >
        {Object.keys(sourceOptions).map((key) => (
          <SelectItem key={key}>
            {sourceOptions[key as ConversationSource]}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

const SearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => {
  return (
    <Input
      label=""
      variant="bordered"
      color="primary"
      labelPlacement="outside"
      placeholder="Search alerts..."
      startContent={
        <Icon
          name="search"
          size={20}
          className="text-default-500 pointer-events-none flex-shrink-0"
        />
      }
      type="text"
      value={searchQuery}
      className="mt-2 mb-3"
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

const ConversationList = ({
  conversations,
  selectedSeverities,
  selectedSources,
  searchQuery,
  onSelectConversation,
}: {
  conversations: Conversation[];
  selectedSeverities: ConversationSeverity[];
  selectedSources: ConversationSource[];
  searchQuery: string;
  onSelectConversation: (conversation: Conversation | null) => void;
}) => {
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSeverity =
      selectedSeverities.length === 0 ||
      selectedSeverities.includes(conversation.severity);
    const matchesSource =
      selectedSources.length === 0 ||
      selectedSources.includes(conversation.source as ConversationSource);
    const matchesSearch =
      conversation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesSeverity && matchesSource && matchesSearch;
  });

  return (
    <Accordion selectionMode="multiple">
      {filteredConversations.map((conversation) => (
        <AccordionItem
          key={conversation.id}
          title={
            <div className="flex items-center justify-between gap-2">
              {conversation.title}
              <Chip
                size="sm"
                variant="flat"
                radius="sm"
                className="font-text shrink-0 uppercase h-5 min-w-fit text-[10px] font-semibold"
                color={getHeroUIColorBySeverity(conversation.severity)}
              >
                {conversation.severityText ?? conversation.severity}
              </Chip>
            </div>
          }
          classNames={{
            trigger: "py-2.5 font-text flex items-center",
            title: "text-small font-medium",
          }}
        >
          <div className="-mt-2.5">
            <p className="text-sm">{conversation.description}</p>

            <div className="flex flex-wrap justify-between gap-2 mt-1.5">
              <div className="flex gap-px -ml-3 items-center">
                <Button
                  variant="light"
                  color="primary"
                  className="shrink-0 h-7 items-center flex"
                  radius="sm"
                  size="sm"
                  onPress={() => onSelectConversation(conversation)}
                  startContent={
                    <Icon name="external-link-2" className="-mr-1" size={14} />
                  }
                >
                  View
                </Button>
                <Button
                  variant="light"
                  color="primary"
                  className="shrink-0 h-7 items-center flex"
                  radius="sm"
                  size="sm"
                  onPress={() => onSelectConversation(conversation)}
                  startContent={
                    <Icon name="archive" className="-mr-1" size={14} />
                  }
                >
                  Archive
                </Button>
              </div>
              <div className="flex gap-px items-center">
                <SlackButton onClick={() => {}} />
              </div>
            </div>

            <div className="inline-flex items-center gap-2">
              <p className="text-tiny">
                {format(new Date(conversation.timestamp), "E dd, hh:mm aaa")}
              </p>
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const ConversationModal = ({
  conversation,
  onClose,
}: {
  conversation: Conversation | null;
  onClose: () => void;
}) => {
  if (!conversation) return null;
  return (
    <Modal
      isOpen={!!conversation}
      onClose={onClose}
      size="3xl"
      classNames={{
        closeButton: "z-10",
      }}
    >
      <ModalContent className="p-0.5">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b-1 border-neutral-100 mx-2 pt-4 pb-3 px-2">
              <h4 className="font-text">{conversation.title}</h4>
              <Chip
                size="sm"
                variant="flat"
                radius="sm"
                color={getHeroUIColorBySeverity(conversation.severity)}
              >
                {conversation.severityText ?? conversation.severity}
              </Chip>
            </ModalHeader>
            <ModalBody>
              <p>{conversation.description}</p>
              <div>
                <AreaDataChart
                  minHeight={400}
                  data={["last 90 days", "last 30 days", "last 7 days"]}
                  fillColor={getHexColorBySeverity(conversation.severity)}
                  strokeColor={getHexColorBySeverity(conversation.severity)}
                />
              </div>
            </ModalBody>
            <ModalFooter className="border-t-1 border-neutral-100 mx-2 mt-4">
              <SlackButton onClick={onClose} />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
