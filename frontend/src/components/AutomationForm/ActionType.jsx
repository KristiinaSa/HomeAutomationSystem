const ActionType = ({ action, setAction }) => {
  return (
    <label>
      Action:
      <select value={action} onChange={(e) => setAction(e.target.value)}>
        <option value="">Select an action</option>
        <option value="Turn on">Turn on</option>
        <option value="Turn off">Turn off</option>
      </select>
    </label>
  );
};

export default ActionType;
