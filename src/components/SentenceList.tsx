import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import { SpeakerHigh, Star, Trash } from "@phosphor-icons/react";
import { PiSpeakerHighThin, PiStar, PiTrash } from "react-icons/pi";
import { SentencesType, deleteSentence, toggleFav } from "../redux/generalSlice";

type SentenceListType = {
  picker: React.Dispatch<React.SetStateAction<SentencesType | undefined>>
  toggleModal: () => void
}

export const SentenceList = ({ picker, toggleModal }: SentenceListType) => {
  const { sentences } = useSelector((state: RootState) => state.general);
  const dispatch = useDispatch();

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, createdAt: number) => {
    e.stopPropagation();
    dispatch(deleteSentence(createdAt))
  }
  const favHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, createdAt: number) => {
    e.stopPropagation();
    dispatch(toggleFav(createdAt))
  }

  const speakText = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, txt: string) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = txt;
    utterance.lang = 'ru-RU';
    // utterance.lang = 'TR';
    window.speechSynthesis.speak(utterance);
  };

  const openModal = (sentence: SentencesType) => {
    picker(sentence)
    toggleModal();
  }

  return (
    <div className="flex flex-col gap-4 mt-10">
      {sentences.map(s => (
        <div onClick={() => openModal(s)} className="px-4 py-3 flex justify-between items-center gap-5 bg-green-800 rounded-xl hover:shadow-md cursor-default smoother-2" key={s.createdAt}>
          <p className="w-96 overflow-hidden">{ s.sentence }</p>
          <div className="flex items-center gap-3">
            <button onClick={(e) => speakText(e, s.sentence)}><PiSpeakerHighThin size={24} className="hover:text-sky-500 hover:drop-shadow-lg smoother-2" /></button>
            <button onClick={(e) => favHandler(e, s.createdAt)}><PiStar size={24} className={`hover:text-amber-500 hover:drop-shadow-lg smoother-2 ${s.fav && "text-amber-500"}`} /></button>
            <button onClick={(e) => deleteHandler(e, s.createdAt)}><PiTrash size={24} className="hover:text-red-500 hover:drop-shadow-lg smoother-2" /></button>
          </div>
        </div>
      ))}
    </div>
  )
}