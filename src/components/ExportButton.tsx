import { SentencesType } from "../redux/generalSlice";

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
  const tarih = new Date();
  const jsonString = JSON.stringify(data);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download =  `My_Notes_At_${tarih.getHours()}.${tarih.getMinutes()}.${tarih.getSeconds()}-${new Intl.DateTimeFormat("tr-tr").format(tarih)}`;
  link.click();

  // Release object URL after download
  window.URL.revokeObjectURL(url);
};

// const consoleDate = () => {
//   const tarih = new Date();
//   const myDate = `My_Notes_At_${tarih.getHours()}.${tarih.getMinutes()}.${tarih.getSeconds()}-${new Intl.DateTimeFormat("tr-tr").format(tarih)}` 
  
//   console.log('myDate: ', myDate)
// }


export const ExportButton = () => {
  return (
    <button className="p-3 bg-sky-800 rounded-lg" onClick={() => downloadJSON()}>Export your notes as JSON</button>
    // <button className="p-3 bg-sky-800 rounded-lg" onClick={consoleDate}>Export your notes as JSON</button>
  );
};
