import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import { ImportButton } from './ImportButton'
import { ExportButton } from './ExportButton'
import { useState } from 'react';

export const Settings = () => {
  const [isSettings, setIsSettings] = useState<boolean>(false);
  return (
    <div className='fixed right-3 bottom-3'>
    <Cog8ToothIcon className='w-3' />
    {isSettings && (
      <div className=' flex flex-col gap-3'>
        <ImportButton />
        <ExportButton />
      </div>
    )}
    </div>
  )
}