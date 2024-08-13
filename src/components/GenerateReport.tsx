import { DownloadFile } from "../redux/hooks/downloadFiles";
import IconDownload from "./Icon/IconDownload";

interface ButtonProps {
  link: string;
  className: string;
  buttonText: any;
  icon: any;
  params: string;
}
export const GenerateReport = ({
  className,
  buttonText,
  link,
  params,
  icon,
}: ButtonProps) => {
  const { download, downloading, name, ref, url } = DownloadFile({
    serverLink: link,
    params,
    // onError: (error: any) => {
    //   const message =
    //     error.response?.data?.error ||
    //     error.message ||
    //     "Error downloading file";
    //   notifier.error(message);
    // },
  });
  return (
    <>
      {name && <a href={url} download={name} ref={ref} />}
      <button
        onClick={() => download()}
        className={className}
        disabled={downloading}
      >
        <span className="flex flex-row items-center justify-center lg:whitespace-normal lg:text-xs xl:text-sm lg:justify-center text-white">
          {downloading ? (
            <div className="flex items-center justify-center">
              <div className="">Loading...</div>
            </div>
          ) : (
            <div className="flex gap-2">
           <IconDownload />
              <span>{buttonText}</span>   
            </ div>
          )}
        </span>
      </button>
    </>
  );
};
