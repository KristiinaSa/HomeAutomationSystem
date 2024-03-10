const ActionType = ({ action, setAction }) => {
  return (
    <label>
      Action:
      <select value={action} onChange={(e) => setAction(e.target.value)}>
        <option value="">Select an action</option>
        <option value="Turn On">Turn On</option>
        <option value="Turn Off">Turn Off</option>
      </select>
    </label>
  );
};

export default ActionType;
