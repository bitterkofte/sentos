// import { useAppSelector } from "../redux/hooks"

import { toast } from "sonner";
import { makeSentences, setSentences } from "../redux/generalSlice";
import { useAppDispatch } from "../redux/hooks";


export const ImportButton = () => {
  // const { sentences } = useAppSelector(s => s.general)
  const dispatch = useAppDispatch();

  const validateData = (data: any) => {
    // Define your expected data structure using Typescript interfaces or types
    // interface ProgressData {
    //   // Define properties and their types
    // }
    // console.log("asa:", Array.isArray(data))
    const isArr = Array.isArray(data);
  
    // Check if data has all required properties and types match
    // const isValid = Object.keys(data).every((key) => {
    //   console.log('key: ', key)
    //   // Implement validation logic based on your data structure
    //   // return (/* validation logic */);
    //   return true
    // });
  
    if (isArr) {
      dispatch(makeSentences(data))
    } else {
      toast("Incompatible data format")
    }
  };
  

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        const data = JSON.parse(text);
        console.log('data: ', data)
        validateData(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        // Show user error message: "Invalid JSON format"
      }
    };
    reader.readAsText(file);
  };  

  const importJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) readFile(file);
  }

  return (
    <button className="p-3 bg-sky-800 rounded-lg">
      <input className="hidden" type="file" id="fileInput" accept=".json" onChange={importJSON} />
      <label className="cursor-pointer" htmlFor="fileInput">Import</label>
    </button>
  )
}