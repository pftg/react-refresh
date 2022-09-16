import { RecoilRoot, atom, useRecoilState, useRecoilValue } from "recoil";

import "./styles.css";

import Game from "./Game";

const fontSizeState = atom({
  key: "fontSizeState",
  default: 14
});

function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);

  function handleEnlargeLcick() {
    setFontSize((size) => size + 1);
  }

  return (
    <button onClick={handleEnlargeLcick} style={{ fontSize }}>
      Click to Enlarge
    </button>
  );
}

function Text() {
  const fontSize = useRecoilValue(fontSizeState);
  return <p style={{ fontSize }}>This text will increase in size too.</p>;
}

// ========================================

export default function App() {
  return (
    <RecoilRoot>
      <div>
        <FontButton />
        <Text />
      </div>
      <div className="App">
        <Game />
      </div>
    </RecoilRoot>
  );
}
