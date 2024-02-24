import Device from "../models/deviceModel.js";
import Room from "../models/roomModel.js";
import SensorAutomation from "../models/sensorAutomationModel.js";
import SensorHistory from "../models/sensorHistoryModel.js";
import Sensor from "../models/sensorModel.js";
import Setting from "../models/settingModel.js";
import System from "../models/systemModel.js";
import TimeAutomation from "../models/timeAutomationModel.js";
import User from "../models/userModel.js";
import UsageHistory from "../models/usageHistoryModel.js";

Device.belongsTo(System, { foreignKey: "system_id" });
Device.belongsTo(Room, { foreignKey: "room_id" });
Device.belongsToMany(UsageHistory, { through: "device_usage_history" });
Device.belongsToMany(TimeAutomation, { through: "timer_controls" });
Device.belongsToMany(SensorAutomation, { through: "sensor_controls" });

Room.belongsTo(System, { foreignKey: "system_id" });

SensorAutomation.belongsTo(Sensor, { foreignKey: "sensor_id" });
SensorAutomation.belongsToMany(Device, { through: "sensor_controls" });

SensorHistory.belongsToMany(Sensor, { through: "sensor_history_log" });

Sensor.belongsTo(Room, { foreignKey: "room_id" });
Sensor.belongsTo(System, { foreignKey: "system_id" });
Sensor.belongsToMany(SensorHistory, { through: "sensor_history_log" });

Setting.belongsTo(User, { foreignKey: "user_id" });

TimeAutomation.belongsToMany(Device, { through: "timer_controls" });

UsageHistory.belongsToMany(Device, { through: "device_usage_history" });
UsageHistory.belongsToMany(User, { through: "user_usage_history" });

User.belongsTo(System, { foreignKey: "system_id" });
User.belongsToMany(UsageHistory, { through: "user_usage_history" });

System.hasMany(Room, { foreignKey: "system_id" });
