import { useState, useEffect, useReducer } from "react";
import FormattedDate from "./FormattedDate";

import { atom, useRecoilState } from "recoil";

const initialState = { epoch: 0 };

const initialStateV2 = atom({
  key: "initialStateV2",
  default: { epoch: 0 }
});

function reducer(state, action) {
  switch (action.type) {
    case "tick":
      return { epoch: (state.epoch + 1) % 10 };
    default:
      throw new Error();
  }
}

export default function (props) {
  const [date, setDate] = useState(new Date());
  const [running, setRunning] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateV2, setStateV2] = useRecoilState(initialStateV2);

  useEffect(() => {
    if (running) {
      this.timerID = setInterval(() => dispatch({ type: "tick" }), 1000);
    }

    this.timeID = setInterval(() => setDate(new Date()), 1000);

    return () => {
      clearInterval(this.timerID);
      clearInterval(this.timeID);
    };
  }, [running]);

  const handleStart = (event) => {
    event.preventDefault();

    if (this.timerID) {
      clearInterval(this.timerID);
    }

    setRunning(!running);
  };

  const testRecoil = (event) => {
    event.preventDefault();

    // setStateV2((epoch) => (epoch + 1) % 10);
  };

  return (
    <div>
      <FormattedDate date={date} />
      <div>{state.epoch}</div>
      <div>{stateV2.epoch}</div>
      <div>
        <form onSubmit={handleStart}>
          <button type="submit">Start/Stop</button>
          <button onClick={testRecoil}> Test Recoil </button>
        </form>
      </div>
    </div>
  );
}
