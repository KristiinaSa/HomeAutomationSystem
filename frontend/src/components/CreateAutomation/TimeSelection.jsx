export const TimeSelection = ({ time, setTime }) => (
  <label>
    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
  </label>
);
