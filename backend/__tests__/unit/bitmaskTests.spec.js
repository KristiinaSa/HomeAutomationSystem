const {
  weekdaysToBitmask,
  bitmaskToWeekdays,
} = require("../../controllers/helpers.js");

describe("weekdaysToBitmask", () => {
  it("should return correct bitmask for given weekdays", () => {
    const weekdays = {
      monday: true,
      tuesday: false,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: false,
      sunday: true,
    };
    const expectedBitmask = 0b1010101;
    expect(weekdaysToBitmask(weekdays)).toBe(expectedBitmask);
  });

  describe("weekdaysToBitmask", () => {
    it("should return correct bitmask for given weekdays", () => {
      const weekdays = {
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: false,
        sunday: true,
      };
      const expectedBitmask = 0b1010101;
      expect(weekdaysToBitmask(weekdays)).toBe(expectedBitmask);
    });
  });

  describe("bitmaskToWeekdays", () => {
    it("should return correct weekdays for given bitmask", () => {
      const bitmask = 0b1010101;
      const expectedWeekdays = {
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: false,
        sunday: true,
      };
      expect(bitmaskToWeekdays(bitmask)).toEqual(expectedWeekdays);
    });
  });
});

describe("bitmaskToWeekdays", () => {
  it("should return correct weekdays for given bitmask", () => {
    const bitmask = 0b1010101;
    const expectedWeekdays = {
      monday: true,
      tuesday: false,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: false,
      sunday: true,
    };
    expect(bitmaskToWeekdays(bitmask)).toEqual(expectedWeekdays);
  });

  it("should return correct weekdays when bitmask is 0", () => {
    const bitmask = 0b0;
    const expectedWeekdays = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    };
    expect(bitmaskToWeekdays(bitmask)).toEqual(expectedWeekdays);
  });

  it("should return correct weekdays when bitmask is 127", () => {
    const bitmask = 0b1111111;
    const expectedWeekdays = {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    };
    expect(bitmaskToWeekdays(bitmask)).toEqual(expectedWeekdays);
  });
});
