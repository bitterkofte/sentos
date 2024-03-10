// import { useAppSelector } from "../redux/hooks"
import { toast } from "sonner";
import { SentencesType, makeSentences } from "../redux/generalSlice";
import { useAppDispatch } from "../redux/hooks";
import { useRef } from "react";


export const ImportButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const { sentences } = useAppSelector(s => s.general)
  const dispatch = useAppDispatch();

  const validateData = (data: SentencesType[]) => {
    const objectConditions = (item: SentencesType) => (
      typeof item === 'object' &&
      Object.keys(item).length === 3 &&
      'sentence' in item &&
      'createdAt' in item &&
      'fav' in item &&
      item.sentence.length < 200 &&
      typeof item.sentence === 'string' &&
      typeof item.createdAt === 'number' &&
      typeof item.fav === 'boolean'
    )
    if (data.every(objectConditions)) {
      dispatch(makeSentences(data))
      toast.success("Progress imported")
      fileInputRef.current!.value = '';
    } else {
      toast.error("Incompatible data format")
      fileInputRef.current!.value = '';
    }
  };
  
  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        const data = JSON.parse(text);
        if (Array.isArray(data) && data.length > 0) validateData(data);
        else {
          toast.error("Incompatible data format")
          fileInputRef.current!.value = '';
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
        toast.error("Import failed")
        fileInputRef.current!.value = '';
      }
    };
    reader.readAsText(file);
  };  

  const importJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) readFile(file);
  }

  return (
    <label className="p-3 bg-sky-800 rounded-lg cursor-pointer" htmlFor="fileInput">
      <input className="hidden" type="file" id="fileInput" accept=".json" onChange={importJSON} ref={fileInputRef} />
      Import
    </label>
  )
}