// import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { ImportButton } from './ImportButton'
import { ExportButton } from './ExportButton'
import { useRef, useState } from 'react';
import { useClickOutside } from "../hooks/useClickOutside";

export const Settings = () => {
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: settingsRef,
    handler: () => setIsSettings(false)
  });

  const toggleSettings = () => setIsSettings(s => !s)
  return (
    <div ref={settingsRef} className='fixed right-3 bottom-3 flex flex-col gap-3 items-end'>
      <div className={`flex flex-col gap-3 rounded-lg overflow-hidden smoother-3 ease-in-out ${isSettings ? "max-h-32" : "max-h-0"}`}>
        <ImportButton />
        <ExportButton />
      </div>
      <div className='p-2 squircle cursor-pointer' onClick={toggleSettings}>
        <HiOutlineCog8Tooth size={30} className={`z-10 smoother-3 ease-in-out ${isSettings ? "rotate-90" : "rotate-0"}`} />
      </div>
    </div>
  )
}