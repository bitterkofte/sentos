import { useState } from 'react'
import { InputBar } from './components/InputBar'
import { SentenceList } from './components/SentenceList'
import { SentencesType } from './redux/generalSlice';
import { Settings } from './components/Settings';

function App() {
  const [sentenceModal, setSentenceModal] = useState<boolean>(false);
  const [selectedSentence, setSelectedSentence] = useState<SentencesType>();
  const toggleModal = () => setSentenceModal(m => !m)
  return (
    <div className='min-h-lvh flex flex-col justify-center items-center gap-5 bg-slate-800 text-slate-200'>
      <p className='font-bold'>sentos</p>
      <InputBar />
      <SentenceList picker={setSelectedSentence} toggleModal={toggleModal} />
      <Settings />

      <div onClick={toggleModal} className={`fixed w-full h-full flex justify-center items-center backdrop-blur-smCANCEL bg-half-black smoother-3 ${sentenceModal ? "visible" : "invisible opacity-0 delay-200"}`}>
        <div onClick={() => setSentenceModal(false)} className={`p-5 rounded-lg bg-amber-800 smoother-3 ${sentenceModal ? "scale-100" : "scale-0"}`}>
          <p>{ selectedSentence?.sentence }</p>
        </div>
      </div>
    </div>
  )
}

export default App
