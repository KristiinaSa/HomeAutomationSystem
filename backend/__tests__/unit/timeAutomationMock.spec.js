const SequelizeMock = require("sequelize-mock");
const TimeAutomation = require("../../models/timeAutomationModel");

const dbMock = new SequelizeMock();

const TimeAutomationMock = dbMock.define("timeAutomation", {
  id: 1,
  name: "Test Time Automation",
  active: true,
  weekdays: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  },
  devices: [],
  time: "12:00",
  type: "timer",
});

describe("TimeAutomation model", () => {
  it("should find a time automation by ID", async () => {
    TimeAutomationMock.$queryInterface.$useHandler(
      async (query, queryParams) => {
        if (query === "findByPk") {
          return {
            id: 1,
            name: "Test Automation",
          };
        }
      }
    );

    const automation = await TimeAutomation.findByPk(1);
    expect(automation.id).toBe(1);
    expect(automation.name).toBe("Test Automation");
  });

  it("should return null when a time automation does not exist", async () => {
    TimeAutomationMock.$queryInterface.$useHandler(
      async (query, queryParams) => {
        if (query === "findByPk") {
          return null;
        }
      }
    );

    const automation = await TimeAutomation.findByPk(999);
    expect(automation).toBeNull();
  });

  it("should create a new time automation", async () => {
    TimeAutomationMock.$queryInterface.$useHandler(
      async (query, queryParams, options) => {
        if (query === "create") {
          return options;
        }
      }
    );

    const newAutomation = await TimeAutomation.create({
      name: "New Automation",
    });

    expect(newAutomation.name).toBe("New Automation");
  });

  it("should delete a time automation", async () => {
    TimeAutomationMock.$queryInterface.$useHandler(
      async (query, queryParams) => {
        if (query === "destroy") {
          return 1;
        }
      }
    );

    const rowsDeleted = await TimeAutomation.destroy({ where: { id: 1 } });
    expect(rowsDeleted).toBe(1);
  });
});
