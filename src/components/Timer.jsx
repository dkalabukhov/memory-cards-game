import { useEffect, useState } from "react"

export default function Timer( { handleTimerEnd, level }) {
  const [time, setTime] = useState(10);
  const [isRunning, setRunning] = useState(true);
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const tick = () => {
      setTime((time) => {
        const value = time - 1;
        if (value <= 0) {
          setRunning(false);
          return 0;
        }
        return value;
      })
    };
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isRunning) {
     handleTimerEnd();
    }
  }, [isRunning])

  useEffect(() => {
    const mapping = {
      6: '10',
      8: '15',
      10: '30',
      12: '45',
      16: '60',
    };

    setTime(mapping[level]);
  }, [level])

  return (
    <div className="timer">
      <span className="timer__time">Seconds Left: {time}</span>
      <button onClick={handleTimerEnd} className="btn btn_secondary">Play Now</button>
    </div>
  )
}