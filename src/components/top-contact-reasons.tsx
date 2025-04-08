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

interface Reason {
  id: string;
  title: string;
  description: string;
  severity: ReasonSeverity;
  severityText?: string;
  timestamp: Date;
  read: boolean;
  tags: string[];
  source: ReasonSource;
}

const severity = ["info", "warning", "danger", "success"] as const;
const source = ["user", "system", "external"] as const;

type ReasonSeverity = (typeof severity)[number];
type ReasonSource = (typeof source)[number];

function getHexColorBySeverity(severity: ReasonSeverity) {
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

const getHeroUIColorBySeverity = (severity: ReasonSeverity) =>
  severity === "info" ? "primary" : severity || "default";

const reason: Reason[] = [
  {
    id: "1",
    title: "Application not responding",
    description:
      "The application is not responding for some users. Please check the logs.",
    severity: "danger",
    timestamp: new Date(),
    read: false,
    tags: ["support", "volume"],
    source: "system",
    severityText: "Critical",
  },
  {
    id: "2",
    title: "Flawless and smooth experience",
    description:
      "The new update is fantastic. Great job! The app is running smoothly.",
    severity: "success",
    timestamp: new Date(),
    read: false,
    tags: ["success", "ui", "app"],
    source: "user",
    severityText: "Success",
  },
  {
    id: "3",
    title: "New Feature Requests",
    description: "Many users are requesting new features on the app.",
    severity: "info",
    timestamp: new Date(),
    read: false,
    tags: ["maintenance", "info"],
    source: "system",
    severityText: "Info",
  },
  {
    id: "4",
    title: "Few pages are not loading",
    description: "Some pages are not loading for some users.",
    severity: "warning",
    timestamp: new Date(),
    read: false,
    tags: ["user", "signup"],
    source: "user",
    severityText: "Warning",
  },
];

const TopContactReasons = () => {
  const [selectedReason, setSelectedReason] = useState<Reason | null>(null);
  const [selectedSeverities, setSelectedSeverities] = useState<
    ReasonSeverity[]
  >([]);
  const [selectedSources, setSelectedSources] = useState<ReasonSource[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const resetFilters = () => {
    setSelectedSeverities([]);
    setSelectedSources([]);
    setSearchQuery("");
  };

  const [areFiltersVisible, setAreFiltersVisible] = useState(false);

  const handleAlertModalClose = () => {
    setSelectedReason(null);
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
        <p className="font-semibold text-lg">Top Contact Reasons</p>
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
        <ReasonList
          reasons={reason}
          selectedSeverities={selectedSeverities}
          selectedSources={selectedSources}
          searchQuery={searchQuery}
          onSelectReason={setSelectedReason}
        />
      </div>
      <ReasonModal reason={selectedReason} onClose={handleAlertModalClose} />
    </div>
  );
};

export default TopContactReasons;

const severityOptions = severity.reduce((acc, s) => {
  acc[s] = s.charAt(0).toUpperCase() + s.slice(1);
  return acc;
}, {} as Record<ReasonSeverity, string>);

const SeverityFilter = ({
  selectedSeverities,
  setSelectedSeverities,
}: {
  selectedSeverities: ReasonSeverity[];
  setSelectedSeverities: (severities: ReasonSeverity[]) => void;
}) => {
  const handleSeverityChange = (severity: string) => {
    const updatedSeverities = (severity.split(",") as ReasonSeverity[]).filter(
      (s) => s.length
    );
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
            {severityOptions[key as ReasonSeverity]}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

const sourceOptions = source.reduce((acc, s) => {
  acc[s] = s.charAt(0).toUpperCase() + s.slice(1);
  return acc;
}, {} as Record<ReasonSource, string>);

const SourceFilter = ({
  selectedSources,
  setSelectedSources,
}: {
  selectedSources: ReasonSource[];
  setSelectedSources: (sources: ReasonSource[]) => void;
}) => {
  const handleSourceChange = (source: string) => {
    const updatedSources = (source.split(",") as ReasonSource[]).filter(
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
            {sourceOptions[key as ReasonSource]}
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

const ReasonList = ({
  reasons,
  selectedSeverities,
  selectedSources,
  searchQuery,
  onSelectReason,
}: {
  reasons: Reason[];
  selectedSeverities: ReasonSeverity[];
  selectedSources: ReasonSource[];
  searchQuery: string;
  onSelectReason: (conversation: Reason | null) => void;
}) => {
  const filteredReasons = reasons.filter((reason) => {
    const matchesSeverity =
      selectedSeverities.length === 0 ||
      selectedSeverities.includes(reason.severity);
    const matchesSource =
      selectedSources.length === 0 ||
      selectedSources.includes(reason.source as ReasonSource);
    const matchesSearch =
      reason.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reason.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSeverity && matchesSource && matchesSearch;
  });

  return (
    <Accordion selectionMode="multiple">
      {filteredReasons.map((reason) => (
        <AccordionItem
          key={reason.id}
          title={
            <div className="flex items-center justify-between gap-2">
              {reason.title}
              <Chip
                size="sm"
                variant="flat"
                radius="sm"
                className="font-text shrink-0 uppercase h-5 min-w-fit text-[10px] font-semibold"
                color={getHeroUIColorBySeverity(reason.severity)}
              >
                {reason.severityText ?? reason.severity}
              </Chip>
            </div>
          }
          classNames={{
            trigger: "py-2.5 font-text flex items-center",
            title: "text-small font-medium",
          }}
        >
          <div className="-mt-2.5">
            <p className="text-sm">{reason.description}</p>

            <div className="flex flex-wrap justify-between gap-2 mt-1.5">
              <div className="flex gap-px -ml-3 items-center">
                <Button
                  variant="light"
                  color="primary"
                  className="shrink-0 h-7 items-center flex"
                  radius="sm"
                  size="sm"
                  onPress={() => onSelectReason(reason)}
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
                  onPress={() => onSelectReason(reason)}
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
                {format(new Date(reason.timestamp), "E dd, hh:mm aaa")}
              </p>
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const ReasonModal = ({
  reason,
  onClose,
}: {
  reason: Reason | null;
  onClose: () => void;
}) => {
  if (!reason) return null;
  return (
    <Modal
      isOpen={!!reason}
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
              <h4 className="font-text">{reason.title}</h4>
              <Chip
                size="sm"
                variant="flat"
                radius="sm"
                color={getHeroUIColorBySeverity(reason.severity)}
              >
                {reason.severityText ?? reason.severity}
              </Chip>
            </ModalHeader>
            <ModalBody>
              <p>{reason.description}</p>
              <div>
                <AreaDataChart
                  minHeight={400}
                  data={["last 90 days", "last 30 days", "last 7 days"]}
                  fillColor={getHexColorBySeverity(reason.severity)}
                  strokeColor={getHexColorBySeverity(reason.severity)}
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
