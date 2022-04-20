import React, { useState, useEffect } from "react";
let timeIntervalId;
export default function Timer({ gameOver, sendTime }) {
  let [time, setTime] = useState(0);

  useEffect(() => {
    function incrementTime() {
        setTimeout(()=>{
            let newtime = time+1;
            setTime(newtime)
        },1000)
    }
    incrementTime()
  }, [time]);

  console.log(timeIntervalId);
  return (
    <div style={{ color: "white", fontSize: 20, background: "maroon" }}>
      <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>
        ⏰
      </span>
      {time}
    </div>
  );
}