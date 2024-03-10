import { toast } from "sonner";
import { SentencesType } from "../redux/generalSlice";
import { useAppSelector } from "../redux/hooks";

// const downloadJSON = (data: any, fileName: string) => {
//   const dataStr = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
//   const link = document.createElement('a');
//   link.href = dataStr;
//   link.download = fileName;
//   link.click();
//   // Optional: Clean up the element
//   link.remove();
// };

const downloadJSON = (data: SentencesType[]) => {
  if (data.length === 0) {
    toast("There is nothing to be exported", {duration: 2000})
    return
  }
  const tarih = new Date();
  const jsonString = JSON.stringify(data);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `My_Notes_At_${tarih.getHours()}.${tarih.getMinutes()}.${tarih.getSeconds()}-${new Intl.DateTimeFormat("tr-tr").format(tarih)}.json`;
  link.click();

  // Release object URL after download
  window.URL.revokeObjectURL(url);
};


export const ExportButton = () => {
  const { sentences } = useAppSelector(s => s.general)
  return (
    <button className="p-3 bg-sky-800 rounded-lg" onClick={() => downloadJSON(sentences)}>Export</button>
  );
};
