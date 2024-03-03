require("../db/associations.js");

const Room = require("../models/roomModel.js");
const Sensor = require("../models/sensorModel.js");
const CurrentValue = require("../models/currentValueModel.js");
const ValueType = require("../models/valueTypeModel.js");

const sendStatus = async (req, res, next) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendStatusUpdate = async () => {
    const sensors = await Sensor.findAll({
      attributes: ["name"],
      include: [
        {
          model: CurrentValue,
          as: "currentvalues",
          attributes: ["value"],
          include: [
            {
              model: ValueType,
              as: "valueType",
              attributes: ["type", "unit"],
            },
          ],
        },
        {
          model: Room,
          as: "room",
          attributes: ["name"],
        },
      ],
    });

    sensors.forEach((sensor) => {
      sensor.currentvalues.forEach((currentValue) => {
        currentValue.value = Math.random();
      });
    });

    res.write(`data: ${JSON.stringify(sensors)}\n\n`);
  };

  await sendStatusUpdate();

  const intervalId = setInterval(sendStatusUpdate, 60000);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
};

module.exports = { sendStatus };
