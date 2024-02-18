import { dummyAutomations } from "../../dummyData/dummyAutomations";
import { AutomationCard } from "./AutomationCard";

export const Automations = () => {
  return (
    <div>
      {dummyAutomations.map((automation) => (
        <AutomationCard key={automation.id} automation={automation} />
      ))}
    </div>
  );
};
