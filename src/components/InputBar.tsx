import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSentenceText, setSentences } from "../redux/generalSlice";
// import KeyboardReact from "react-simple-keyboard";
import Keyboard from "react-simple-keyboard";
import russianLayout from "simple-keyboard-layouts/build/layouts/russian";
// import chineseLayout from "simple-keyboard-layouts/build/layouts/chinese";
import "react-simple-keyboard/build/css/index.css";


export const InputBar = () => {
  const [inputText, setInputText] = useState<string>("");
  const [layout, setLayout] = useState<"default"|"shift">("default");
  const dispatch = useDispatch();

  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const currentTime = Date.now();
      const sentence = {
        sentence: inputText,
        createdAt: currentTime,
        fav: false
      }
      dispatch(setSentenceText(inputText))
      dispatch(setSentences(sentence))
    }
  }

  const handleShift = () => setLayout(lay => lay === "default" ? "shift" : "default")
  const handleKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
    else return;
  }

  return (
    <div>
      <input
        type="text"
        className="w-80 px-4 py-2 bg-transparent border-4 rounded-2xl outline-none"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={enterHandler}
        placeholder="Your sentence goes here"
      />
      <Keyboard
        className="text-gray-800"
        onChange={(e) => setInputText(e)}
        onKeyPress={handleKeyPress}
        layoutName={layout}
        {...russianLayout}
      />
    </div>
  );
};
