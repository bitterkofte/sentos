import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SpeakerHigh, Star, Trash } from "@phosphor-icons/react";
import { deleteSentence, toggleFav } from "../redux/generalSlice";
import { useEffect, useState } from "react";

export const SentenceList = () => {
  const { sentences } = useSelector((state: RootState) => state.general);
  const dispatch = useDispatch();

  const deleteHandler = (createdAt: number) => dispatch(deleteSentence(createdAt))
  const favHandler = (createdAt: number) => dispatch(toggleFav(createdAt))

  const speakText = (txt: string) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = txt;
    utterance.lang = 'ru-RU';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col gap-4 mt-10">
      {sentences.map(s => (
        <div className="px-4 py-3 flex justify-between items-center gap-5 bg-green-800 rounded-xl hover:shadow-md smoother-2" key={s.createdAt}>
          <p className="w-96 overflow-hidden">{ s.sentence }</p>
          <div className="flex items-center gap-3">
            <button onClick={() => speakText(s.sentence)}><SpeakerHigh size={24} className="hover:text-sky-500 hover:drop-shadow-lg smoother-2" /></button>
            <button onClick={() => favHandler(s.createdAt)}><Star size={24} className={`"hover:text-amber-500 hover:drop-shadow-lg smoother-2" ${s.fav && "text-amber-500"}`} /></button>
            <button onClick={() => deleteHandler(s.createdAt)}><Trash size={24} className="hover:text-red-500 hover:drop-shadow-lg smoother-2" /></button>
          </div>
        </div>
      ))}
    </div>
  )
}