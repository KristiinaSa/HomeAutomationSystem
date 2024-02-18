import { useContext } from "react";
import { AutomationsContext } from "../../context/AutomationsContext";
// import { dummyAutomations } from "../../dummyData/dummyAutomations";
import { AutomationCard } from "./AutomationCard";

export const Automations = () => {
  const { automations } = useContext(AutomationsContext);

  return (
    <div>
      {automations.map((automation) => (
        <AutomationCard key={automation.id} automation={automation} />
      ))}
    </div>
  );
};
