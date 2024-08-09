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
    trainings: [],
    plan: {title:"", description: "", year: new Date().getFullYear()},
  },
  file: "",
  isAfterFileChanged: false,
};

export const CPBulkImport: React.FC<ICPBulkImport> = ({
  cpBulkSubmit,
  setIsCPBulkSubmit,
  handleBulkImport,
  setBulkData,
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
      reader.onload = (event: any) => {
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
        const cpInfoFormatted001 = mergeDataWithHeaders(JSONDATA?.slice(1, -9)[0] as [], capacityPlansInfo.slice(1)) as trainingInfo[];
        console.log("Formatted_001 ---> ", cpInfoFormatted001);
 debugger;
        setThisState((prev) => ({
          ...prev,
          isAfterFileChanged: true,
          bulkCPData: {
            trainings: cpInfoFormatted001,
            plan: {...initialState?.bulkCPData?.plan, title: capacityPlansTitle[0]},
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
    console.log(cpBulkSubmit, isBulkValid);
if(isBulkValid && cpBulkSubmit){
    setBulkData(thisState.bulkCPData);
    setIsBulkValid(false);
    debugger;
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
                  {thisState.bulkCPData.trainings.length < 1
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
