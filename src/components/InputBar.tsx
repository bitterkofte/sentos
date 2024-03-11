import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSentences } from "../redux/generalSlice";
// import { Keyboard } from "@phosphor-icons/react";
import { PiKeyboard } from "react-icons/pi";

import { KeyboardReact as SimpleKeyboard } from "react-simple-keyboard";
import russianLayout from "simple-keyboard-layouts/build/layouts/russian";
import "react-simple-keyboard/build/css/index.css";

export const InputBar = () => {
  const [isKBOpen, setIsKBOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [layout, setLayout] = useState<"default" | "shift">("default");
  const dispatch = useDispatch();

  const addSentence = () => {
    const currentTime = Date.now();
    const sentence = {
      sentence: inputText,
      createdAt: currentTime,
      fav: false,
    };
    // dispatch(setSentenceText(inputText));
    dispatch(setSentences(sentence));
    setInputText("")
  };

  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addSentence();
  };

  const handleShift = () => setLayout((lay) => (lay === "default" ? "shift" : "default"));
  const handleKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
    else if (button === "{enter}") addSentence();
    else return;
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-5">
        <input
          type="text"
          className="w-80 px-4 py-2 bg-transparent border-4 rounded-2xl outline-none"
          maxLength={200}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={enterHandler}
          placeholder="Your sentence goes here"
        />
        <button
          onClick={() => setIsKBOpen(s => !s)}
          className="p-2 bg-amber-500 rounded-xl text-neutral-800 active:scale-95 smoother"
        >
          <PiKeyboard size={30} />
        </button>
      </div>
      {/* {isKBOpen && ( */}
        <div className={`overflow-hidden transition-all duration-300 ${isKBOpen ? "h-[230px]" : "h-0 invisible"}`}>
          <SimpleKeyboard
            onChange={(e) => setInputText(e)}
            onKeyPress={handleKeyPress}
            layoutName={layout}
            {...russianLayout}
          />
        </div>
      {/* )} */}
    </div>
  );
};
