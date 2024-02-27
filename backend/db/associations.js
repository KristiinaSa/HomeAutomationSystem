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
import ValueType from "../models/valueTypeModel.js";

Device.belongsTo(System, { foreignKey: "system_id" });
Device.belongsTo(Room, { foreignKey: "room_id" });
Device.hasMany(UsageHistory, { foreignKey: "device_id" });
Device.belongsToMany(TimeAutomation, { through: "timer_controls" });
Device.belongsToMany(SensorAutomation, { through: "sensor_controls" });

Room.belongsTo(System, { foreignKey: "system_id" });
Room.hasMany(Sensor, { foreignKey: "room_id" });
Room.hasMany(Device, { foreignKey: "room_id" });

SensorAutomation.belongsTo(Sensor, { foreignKey: "sensor_id" });
SensorAutomation.belongsToMany(Device, { through: "sensor_controls" });

SensorHistory.belongsTo(Sensor, { foreignKey: "sensor_id" });

Sensor.belongsTo(Room, { foreignKey: "room_id" });
Sensor.belongsTo(System, { foreignKey: "system_id" });
Sensor.hasMany(SensorHistory, { foreignKey: "sensor_id" });
Sensor.hasMany(SensorAutomation, { foreignKey: "sensor_id" });
Sensor.belongsToMany(ValueType, { through: "sensor_value_type" });

Setting.belongsTo(User, { foreignKey: "user_id" });

TimeAutomation.belongsToMany(Device, { through: "timer_controls" });
TimeAutomation.belongsTo(System, { foreignKey: "system_id" });

UsageHistory.belongsTo(Device, { foreignKey: "device_id" });
UsageHistory.belongsTo(User, { foreignKey: "user_id" });

User.belongsTo(System, { foreignKey: "system_id" });
User.hasMany(UsageHistory, { foreignKey: "user_id" });
User.hasOne(Setting, { foreignKey: "user_id" });

System.hasMany(Room, { foreignKey: "system_id" });
System.hasMany(Sensor, { foreignKey: "system_id" });
System.hasMany(Device, { foreignKey: "system_id" });
System.hasMany(User, { foreignKey: "system_id" });
System.hasMany(TimeAutomation, { foreignKey: "system_id" });

ValueType.belongsToMany(Sensor, { through: "sensor_value_type" });
