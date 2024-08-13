import React, { useState, useCallback, useEffect } from "react";
import { read, utils } from "xlsx";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { useDropzone } from "react-dropzone";
import {
  downloadFile,
  formatData,
  mergeDataWithHeaders,
} from "../../util/helper";
import { IRootState } from "../../redux/store";
import { useWindowResize } from "../../util/helper";
import IconDownload from "../../components/Icon/IconDownload";
import IconFolderMinus from "../../components/Icon/IconFolderMinus";
import { createEmployeeInfo, createUserInfo } from "./employeeFormSchema";

const initialState: IEmployeeBulkImportData = {
  bulkCPData: {
    data: createUserInfo(),
  },
  file: "",
  isAfterFileChanged: false,
};

export const EmployeeBulkImport: React.FC<IEmployeeBulkImport> = ({
  employeeBulkSubmit,
  setIsEmployeeBulkSubmit,
  handleBulkImport,
  setBulkData,
}) => {
  const dispatch = useAppDispatch();

  const screenWidth = useWindowResize();

  const employeeBulkCreateState = useSelector(
    (state: IRootState) => state.employee.bulkCreateEmployeeState
  );
  const [thisState, setThisState] = useState(initialState);
  const [isBulkValid, setIsBulkValid] = useState(false);

  const onDrop = useCallback((acceptedFiles: any) => {
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
      const employeesInfo: IEmployeeBulk[] = JSONDATA?.slice(
        1
      ) as IEmployeeBulk[];
      const cpInfoFormatted001 = mergeDataWithHeaders(
        JSONDATA?.slice(1)[0] as [],
        employeesInfo.slice(1)
      ) as any;
      setThisState((prev) => ({
        ...prev,
        isAfterFileChanged: true,
        bulkCPData: {
          data: cpInfoFormatted001,
        },
        file,
      }));
      if (cpInfoFormatted001) {
        setIsBulkValid(true);
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  useEffect(() => {
    if (setIsEmployeeBulkSubmit) {
      setIsEmployeeBulkSubmit(true);
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
    if (isBulkValid && employeeBulkSubmit) {
      setBulkData(thisState.bulkCPData);
      setIsBulkValid(false);
    }
  }, [handleBulkImport, isBulkValid, thisState, dispatch]);

  return (
    <div className="flex flex-col">
      <div className="flex-1 mb-4">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => downloadFile("employee_bulk_import_009.xlsx")}
        >
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
                  {!thisState.bulkCPData.data
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
