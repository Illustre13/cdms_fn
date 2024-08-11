import React, { useState, useEffect } from "react";
import moment from "moment";
import { AssessmentStatus, EmployeeTrainingStatus } from "./enum";
import { camelCase } from "lodash";

export class InvalidTokenError extends Error {}

InvalidTokenError.prototype.name = "InvalidTokenError";

interface TimeoutMessageProps {
  initialMessage: string;
  finalMessage: string;
  timeout: number;
}

interface StatusBadgeProps {
  status: allStatus;
}

type allStatus = CapacityPlanStatus | EmployeeTrainingStatus | AssessmentStatus;

interface CurrencyFormatterProps {
  amount: number | string;
  currency?: string;
}

export const clearSessionStorage = (keys: string[]) => {
  keys.forEach((key) => sessionStorage.removeItem(key));
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const TimeoutMessage: React.FC<TimeoutMessageProps> = ({
  initialMessage,
  finalMessage,
  timeout,
}) => {
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(finalMessage);
    }, timeout);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [finalMessage, timeout]);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default TimeoutMessage;

export const convertTimestamp = (timestamp: string) => {
  const parsedTime = moment(timestamp);
  const currentTime = moment();
  if (parsedTime.isSame(currentTime, "day")) {
    const minutes = Math.abs(currentTime.diff(parsedTime, "minutes"));
    if (minutes < 60) {
      if (minutes === 0) {
        return "Today, just now";
      } else {
        return `Today, ${minutes}min ago`;
      }
    } else {
      const hours = Math.abs(currentTime.diff(parsedTime, "hours"));
      return `Today, ${hours}h ${minutes % 60}min ago`;
    }
  } else {
    return parsedTime.format("MMM DD YYYY, h:mm A");
  }
};

const statusColorMap: Record<allStatus, string> = {
  PENDING: "bg-yellow-500",
  // ACTIVE: "bg-green-500",
  // SUSPENDED: "bg-red-500",
  DRAFT: "bg-gray-500",
  SENT: "bg-blue-500",
  UNDER_REVIEW: "bg-purple-500",
  REVIEWED: "bg-indigo-500",
  APPROVED: "bg-teal-500",
  REJECTED: "bg-red-700",
  FINISHED: "bg-green-700",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colorClass = statusColorMap[status] || "bg-gray-300";

  return (
    <span className={`badge px-3 py-1 rounded-full text-white ${colorClass}`}>
      {status}
    </span>
  );
};

export const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({
  amount = 0,
  currency = "RWF",
}) => {

  console.log(amount)
  const amountInt = Number.isNaN(Number(amount)) ? parseInt(cleanNumberString(amount).toString(), 10) : amount;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Number(amountInt));
  return <span>{formattedAmount}</span>;
};

const cleanAndConvertArray = (rawArray: []) => {
  if (!Array.isArray(rawArray) || rawArray.length === 0) {
    throw new TypeError("Input must be a non-empty array of strings.");
  }

  // Join the array into a single string, then remove extra quotes and whitespace
  const cleanedString = rawArray
    .join(", ") // Combine all elements into one string
    .replace(/["[\]]+/g, "") // Remove quotes and brackets
    .trim(); // Remove any leading or trailing whitespace
  return cleanedString;
};
export const arrayToCommaSeparatedString = (array: []) => {
  const cleanArray = cleanAndConvertArray(array);
  return cleanArray;
};

export const cleanNumberString = (numberString: any) =>
  numberString.replace(/,/g, "");
export const formatData = (data: any) => {
  return (data || []).map((d: any) => {
    // return map(data, (d: any) => {
    const result: any = {};

    Object.keys(d).forEach((k: string) => {
      if (k !== "__rowNum__") result[camelCase(k)] = d[k];
    });

    return result;
  });
};

export const mergeDataWithHeaders = (
  headers: string[],
  dataRows: any[]
): any[] => {
  return dataRows.map((row: any) => {
    // Create an object where each key is from headers and each value is from the row
    const result: any = {};
    headers.forEach((header, index) => {
      result[header] = row[index];
    });
    return result;
  });
};

export const useWindowResize = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenWidth;
};

export const downloadFile = (fileName: string) => {
  const link = document.createElement("a");
  link.href = `/src/assets/docs/${fileName}`;
  link.download = fileName;
  link.click();
};
