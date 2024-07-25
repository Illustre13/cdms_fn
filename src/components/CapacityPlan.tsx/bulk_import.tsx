import React, { useState, useCallback, useEffect } from "react";
import { read, utils } from "xlsx";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import IconDownload from "../Icon/IconDownload";
import { useDropzone } from "react-dropzone";
import { downloadFile, formatData, mergeDataWithHeaders } from "../../util/helper";
import { bulkCreateCapacityPlan } from "../../redux/action/capacityPlanAction";
import { IRootState } from "../../redux/store";
import IconFolderMinus from "../Icon/IconFolderMinus";
import { useWindowResize } from "../../util/helper";

const initialState: ICPBulkImportData = {
  bulkCPData: {
    info: [],
    title: "",
  },
  file: "",
  isAfterFileChanged: false,
};

export const CPBulkImport: React.FC<ICPBulkImport> = ({
  cpBulkSubmit,
  setIsCPBulkSubmit,
  handleBulkImport,
}) => {
  const dispatch = useAppDispatch();

  const screenWidth = useWindowResize();

  const cpBulkCreateState = useSelector(
    (state: IRootState) => state.capacityPlan.bulkCreateState
  );
  const [thisState, setThisState] = useState(initialState);
  const [isBulkValid, setIsBulkValid] = useState(false);

  console.log("", cpBulkCreateState?.data?.data);
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataExcel = new Uint8Array(event.target.result);
        const workbook = read(dataExcel, { type: "array", cellDates: true });
        const JSONDATA = utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]],
          {
            header: 1,
            blankrows: false,
          }
        );
        const capacityPlansInfo: string[] = JSONDATA?.slice(1, -9) as string[];
        const capacityPlansTitle = JSONDATA[0] as string[];
        const cpInfoFormatted001 = mergeDataWithHeaders(JSONDATA?.slice(1, -9)[0] as [], capacityPlansInfo.slice(1)) as capacityplanInfo[];
        console.log("Formatted_001 ---> ", cpInfoFormatted001);
 
        setThisState((prev) => ({
          ...prev,
          isAfterFileChanged: true,
          bulkCPData: {
            info: cpInfoFormatted001,
            title: capacityPlansTitle[0],
          },
          file,
        }));
        if (cpInfoFormatted001.length > 0) {
          setIsBulkValid(true);
        }
      };
      reader.readAsArrayBuffer(file);
    },
    []
  );

  useEffect(() => {
if(setIsCPBulkSubmit) {
    setIsCPBulkSubmit(true);
}
  }, [isBulkValid]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    onDrop,
  });

  const fileLabel = thisState.file ? thisState.file.name : "";

  useEffect(() => {
if(isBulkValid && handleBulkImport){
    console.log(cpBulkSubmit, isBulkValid);
    console.log("State Here 22222222222 --> ", thisState);
    dispatch(bulkCreateCapacityPlan(thisState.bulkCPData));
    setIsBulkValid(false);
}
  }, [handleBulkImport, isBulkValid, thisState, dispatch]);

  return (
    <div className="flex flex-col">
      <div className="flex-1 mb-4">
        <button type="button" className="btn btn-primary" onClick={() => downloadFile('capacity_plan_bulk_import_006.xlsx')}>
          <IconDownload className="ltr:mr-2 rtl:ml-2" />
          Download Template
        </button>




      </div>

      <div className="flex-1">
        <section className="border-2 border-dashed border-blue-200 rounded-lg h-36 flex justify-center items-center bg-cdms_primary bg-opacity-5 hover:bg-opacity-10">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here ...</p>
            ) : (
              <>
                <div
                  id={
                    screenWidth <= 575.98
                      ? "responsiveness_bulk_employee_text"
                      : undefined
                  }
                  className={`flex gap-2 ${
                    thisState.isAfterFileChanged
                      ? "mt-12 font-bold text-gray-400"
                      : "text-gray-700"
                  } ${thisState.isAfterFileChanged ? "" : "leading-[50px]"}`}
                >
                  {fileLabel ? (
                    <>
                      <p>File to upload : {fileLabel}</p>
                      <IconFolderMinus />
                    </>
                  ) : (
                    <p className="text-gray-500 text-sm font-normal leading-[150px] cursor-pointer">
                      Drag & Drop or Choose an{" "}
                      <span
                        aria-label="open"
                        className="text-orange-500 text-sm font-normal leading-7"
                      >
                        excel file{" "}
                      </span>
                      to upload
                    </p>
                  )}
                </div>
                <span
                  className={`text-red-500 text-xs font-semibold ${
                    thisState.isAfterFileChanged ? "block" : "hidden"
                  }`}
                >
                  {thisState.bulkCPData.info.length < 1
                    ? "Your document is empty, click to upload a new document"
                    : ""}
                </span>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

// export default CPBulkImport;
//   return (
//     <div className="flex flex-col">
//       <div className="flex-1 mb-4">
//         <button
//           //   onClick={onSubmit}
//           type="button"
//           className="btn btn-primary "
//         >
//           <IconDownload className="ltr:mr-2 rtl:ml-2" />
//           Download Template
//         </button>
//       </div>

//       <div className="flex-1">
//         {/* <div className="h-screen font-sans text-gray-900 bg-gray-300 border-box">
//           <div className="flex justify-center w-full mx-auto sm:max-w-lg">
//             <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
//               <div className="mt-10 mb-10 text-center">
//                 <h2 className="text-2xl font-semibold mb-2">
//                   Upload your files
//                 </h2>
//                 <p className="text-xs text-gray-500">
//                   File should be of format .pdf, .xlsx
//                 </p>
//               </div>
//               <form
//                 action="#"
//                 className="relative w-4/5 h-32 max-w-xs mb-10 bg-white bg-gray-100 rounded-lg shadow-inner"
//               >
//                 <input type="file" id="file-upload" className="hidden" />
//                 <label
//                   htmlFor="file-upload"
//                   className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
//                 >
//                   <p className="z-10 text-xs font-light text-center text-gray-500">
//                     Drag & Drop your files here
//                   </p>
//                   <svg
//                     className="z-10 w-8 h-8 text-indigo-400"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
//                   </svg>
//                 </label>
//               </form>
//             </div>
//           </div>
//         </div> */}

//         <section className="border-2 border-dashed border-blue-200 rounded-lg h-36 flex justify-center items-center bg-cdms_primary bg-opacity-5 hover:bg-opacity-10">
//           <div {...getRootProps()}>
//             <input {...getInputProps()} />
//             {isDragActive ? (
//               <p>Drop the file here ...</p>
//             ) : (
//               <>
//                 <div
//                   id={
//                     screenWidth <= 575.98
//                       ? "responsiveness_bulk_employee_text"
//                       : undefined
//                   }
//                   className={`flex gap-2 ${
//                     thisState.isAfterFileChanged
//                       ? "mt-12 font-bold text-gray-400"
//                       : "text-gray-700"
//                   } ${thisState.isAfterFileChanged ? "" : "leading-[50px]"}`}
//                 >
//                   {fileLabel ? (
//                     <>
//                       <p>File to upload : {fileLabel}</p>
//                       {/* <IconButton
//                 aria-label='delete'
//                 sx={{ background: '#ff7034' }}
//               > */}
//                       <IconFolderMinus className="" />
//                       {/* </IconButton> */}
//                     </>
//                   ) : (
//                     <p className="text-gray-500 text-sm font-normal leading-[150px] cursor-pointer">
//                       Drag & Drop or Choose an{" "}
//                       <span
//                         aria-label="open"
//                         className="text-orange-500 text-sm font-normal leading-7"
//                       >
//                         excel file{" "}
//                       </span>
//                       to upload
//                     </p>
//                   )}
//                 </div>
//                 <span
//                   className={`text-red-500 text-xs font-semibold ${
//                     thisState.isAfterFileChanged ? "block" : "hidden"
//                   }`}
//                 >
//                   {thisState.bulkCPData.length < 1
//                     ? "Your document is empty, click to upload new document"
//                     : ""}
//                 </span>
//               </>
//             )}
//           </div>
//         </section>
//       </div>
//       {/* <p>Hello</p> */}
//     </div>
//   );
// };

// export default CPBulkImport;
