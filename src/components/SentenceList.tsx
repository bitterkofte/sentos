import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SpeakerHigh, Star, Trash } from "@phosphor-icons/react";

export const SentenceList = () => {
  const { sentenceText, sentences } = useSelector((state: RootState) => state.general);

  return (
    <div className="flex flex-col gap-4 mt-10">
      {sentences.map(s => (
        <div className="px-4 py-3 flex justify-between items-center gap-5 bg-green-800 rounded-xl hover:shadow-md smoother-2" key={s.createdAt}>
          <p className="w-96 overflow-hidden">{ s.sentence }</p>
          <div className="flex items-center gap-3">
            <button><SpeakerHigh size={24} className="hover:text-sky-500 hover:drop-shadow-lg smoother-2" /></button>
            <button><Star size={24} className="hover:text-amber-500 hover:drop-shadow-lg smoother-2" /></button>
            <button><Trash size={24} className="hover:text-red-500 hover:drop-shadow-lg smoother-2" /></button>
          </div>
        </div>
      ))}
    </div>
  )
}