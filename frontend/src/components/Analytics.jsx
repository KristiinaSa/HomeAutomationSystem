import "./Analytics.css";
import { getAllAnalytics } from "../services/accessoryServices";
import { useEffect, useState } from "react";
import { Duration } from "luxon";
import { useLanguage } from "../context/LanguageContext";

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [message, setMessage] = useState("");
  const { t, formatDateTime } = useLanguage();

  const formatDuration = (duration) => {
    const totalMinutes = duration.as("minutes");
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    return `${hours}${t("hour", { count: hours })} ${minutes}${t("minute", {
      count: minutes,
    })}`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.log(error);
        setMessage(
          "Uh-oh! We ran into a snag pulling up your analytics. Could you try again later?"
        );
      }
    }
    fetchData();
  }, []);

  return (
    <div className="analytics-container">
      <h1>{t("analytics")}</h1>
      <div>
        <h2>{t("devices")}</h2>
        <div className="analytics-card">
          {analytics.map((device) => {
            const activeTimeDuration = Duration.fromObject({
              minutes: device.active_time,
            });
            const formattedActiveTime = formatDuration(activeTimeDuration);

            let formattedLastInteraction = "-";
            if (device.last_interaction && device.last_interaction.date) {
              const formattedLastInteractionDate = formatDateTime(
                device.last_interaction.date
              );
              formattedLastInteraction = `${formattedLastInteractionDate} by ${device.last_interaction.user}`;
            }

            return (
              <div key={device.id} className="device-box">
                <h4>{device.name} </h4>
                <p className="room-name">{device.room_name}</p>
                <p>
                  {t("active time today")}: {formattedActiveTime}
                </p>
                <p>
                  {t("last interaction")}: {formattedLastInteraction}
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
