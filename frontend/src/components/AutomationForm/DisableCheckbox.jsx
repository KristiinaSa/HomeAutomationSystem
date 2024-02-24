export const DisableCheckbox = ({
  automation,
  isDisabled,
  handleCheckboxChange,
}) => {
  return (
    automation && (
      <label>
        Disabled:
        <input
          type="checkbox"
          checked={isDisabled}
          onChange={handleCheckboxChange}
        />
      </label>
    )
  );
};
