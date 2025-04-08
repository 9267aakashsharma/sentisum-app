import {
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

import { Metrics } from "../types";
import AreaDataChart from "@/components/area-chart";
import SlackButton from "@/components/slack-button";
import { getHeroUIColorBySeverity, getHexColorBySeverity } from "../utils";

const MetricsModal = ({
  metrics,
  onClose,
}: {
  metrics: Metrics | null;
  onClose: () => void;
}) => {
  if (!metrics) return null;
  return (
    <Modal
      isOpen={!!metrics}
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
              <h4 className="font-text">{metrics.title}</h4>
              <Chip
                size="sm"
                variant="flat"
                radius="sm"
                color={getHeroUIColorBySeverity(metrics.severity)}
              >
                {metrics.severityText ?? metrics.severity}
              </Chip>
            </ModalHeader>
            <ModalBody>
              <p>{metrics.description}</p>
              <div>
                <AreaDataChart
                  minHeight={400}
                  data={["last 90 days", "last 30 days", "last 7 days"]}
                  fillColor={getHexColorBySeverity(metrics.severity)}
                  strokeColor={getHexColorBySeverity(metrics.severity)}
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

export default MetricsModal;
