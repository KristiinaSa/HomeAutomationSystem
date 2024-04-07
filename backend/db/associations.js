const Device = require("../models/deviceModel.js");
const Room = require("../models/roomModel.js");
const SensorAutomation = require("../models/sensorAutomationModel.js");
const SensorHistory = require("../models/sensorHistoryModel.js");
const Sensor = require("../models/sensorModel.js");
const Setting = require("../models/settingModel.js");
const System = require("../models/systemModel.js");
const TimeAutomation = require("../models/timeAutomationModel.js");
const User = require("../models/userModel.js");
const UsageHistory = require("../models/usageHistoryModel.js");
const ValueType = require("../models/valueTypeModel.js");
const CurrentValue = require("../models/currentValueModel.js");
const Language = require("../models/languageModel.js");

Device.belongsTo(System, { foreignKey: "system_id" });
Device.belongsTo(Room, { foreignKey: "room_id" });
Device.hasMany(UsageHistory, { foreignKey: "device_id" });
Device.belongsToMany(TimeAutomation, { through: "timer_controls" });
Device.belongsToMany(SensorAutomation, { through: "sensor_controls" });

Room.belongsTo(System, { foreignKey: "system_id" });
Room.hasMany(Sensor, { foreignKey: "room_id" });
Room.hasMany(Device, { foreignKey: "room_id" });

SensorAutomation.belongsTo(System, { foreignKey: "system_id" });
SensorAutomation.belongsTo(Sensor, { foreignKey: "sensor_id" });
SensorAutomation.belongsToMany(Device, { through: "sensor_controls" });

SensorHistory.belongsTo(Sensor, { foreignKey: "sensor_id" });

Sensor.belongsTo(Room, { foreignKey: "room_id" });
Sensor.belongsTo(System, { foreignKey: "system_id" });
Sensor.hasMany(SensorHistory, { foreignKey: "sensor_id" });
Sensor.hasMany(SensorAutomation, { foreignKey: "sensor_id" });
Sensor.hasMany(CurrentValue, { foreignKey: "sensor_id" });

Sensor.belongsToMany(ValueType, {
  through: CurrentValue,
  foreignKey: "sensor_id",
});
ValueType.belongsToMany(Sensor, {
  through: CurrentValue,
  foreignKey: "value_type_id",
});
CurrentValue.belongsTo(Sensor, { foreignKey: "sensor_id" });
CurrentValue.belongsTo(ValueType, { foreignKey: "value_type_id" });

Setting.belongsTo(User, { foreignKey: "user_id" });
Setting.belongsTo(Language, { foreignKey: "language_id" });

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
System.hasMany(SensorAutomation, { foreignKey: "system_id" });
