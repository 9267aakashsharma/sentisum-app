import {
  AiMessageInput,
  CriticalAlerts,
  TopContactReasons,
  TopConversations,
  UnifiedMetrics,
} from "./components";

function App() {
  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-x-4 grid-flow-row">
        <div className="col-span-12 lg:col-span-7">
          <div className="flex flex-col gap-4">
            <AiMessageInput />
            <UnifiedMetrics />
          </div>
        </div>
        <div className="col-span-5">
          <div className="flex flex-col gap-x-4 gap-y-6">
            <CriticalAlerts />
            <TopConversations />
            <TopContactReasons />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
