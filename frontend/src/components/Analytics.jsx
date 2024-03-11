import "./Analytics.css";
import { getAllAnalytics } from "../services/accessoryServices";
import { useEffect, useState } from "react";

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.log(error);
        setMessage("Uh-oh! We ran into a snag pulling up your analytics. Could you try again later?");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="analytics-container">
      <h1>Analytics</h1>
      <div>
        <h2>Devices</h2>
        <div className="analytics-card">
          {analytics.map((device) => {
            return (
              <div key={device.id} className="device-box">
                <h4>{device.name} </h4>
                <p className="room-name">{device.room_name}</p>
                <p>Active time today: {device.active_time}</p>
                <p>
                  Last interaction:{" "}
                  {device.last_interaction ? device.last_interaction : "-"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Analytics;
