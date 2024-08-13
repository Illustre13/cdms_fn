import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";

interface DownloadedFileInfo {
  download: () => Promise<void>;
  ref: React.MutableRefObject<HTMLAnchorElement | null>;
  name: string;
  url: string;
  downloading: boolean;
}
interface DownloadFileProps {
  serverLink: string;
  onError?: (error: AxiosError) => void;
  params?: string;
  downloadedFileName?: string;
  module?: ModuleType;
}

type ModuleType = "loan" | "main";
export const getServer = (module: ModuleType) => {
  const servers = {
    loan: process.env.REACT_APP_MIDAS_LOAN_URL,
    main: process.env.REACT_APP_MAIN_API_URL,
  };
  return servers[module] || servers.loan;
};

export const DownloadFile = ({
  onError,
  serverLink,
  params = "",
  downloadedFileName = "cdms_file.pdf",
}: DownloadFileProps): DownloadedFileInfo => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [url, setFileUrl] = useState<string>("");
  const [name, setFileName] = useState<string>("");
  const serverLinkUrl = "http://localhost:4005/api/cdms" + serverLink;
  const download = async () => {
    try {
      setDownloading(true);
      await axios.get(serverLinkUrl + params, {
        headers: { "X-Auth-Token": localStorage.getItem("token") ?? "" },
      });
      setFileUrl(serverLinkUrl + "/download");
      setFileName(new Date().toLocaleDateString() + "_" + downloadedFileName);
      ref.current?.click();
      setDownloading(false);
    } catch (error) {
      setDownloading(false);
      onError?.(error as AxiosError);
    }
  };
  return { download, ref, url, name, downloading };
};
