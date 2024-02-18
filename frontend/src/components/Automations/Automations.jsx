import { useState, useEffect } from "react";
import { dummyAutomations } from "../../dummyData/dummyAutomations";
import { AutomationCard } from "./AutomationCard";
import { Link } from "react-router-dom";

export const Automations = () => {
  const [automations, setAutomations] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAutomations(dummyAutomations);
    }, 1000);
  }, []);

  return (
    <div>
      {automations.map((automation) => (
        <AutomationCard key={automation.id} automation={automation} />
      ))}
      <Link to="/automations/new">
        <button>Create New Automation</button>
      </Link>
    </div>
  );
};
