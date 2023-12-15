import React, { useEffect , useState} from "react";

export default function Timer({ time, action }) {
    const [times, setTimes] = useState(0)

  useEffect(() => {
    console.log('11111111');
    // setTimes(time / 1000)
    // const interValId = setInterval(function () {
    //     console.log('111111');
    //     setTimes(time => time - 1)
    // }, 1000);

    // return () => {
    //   clearInterval(interValId);
    // };
  }, []);

  return <div>Timer: {times}</div>;
}
