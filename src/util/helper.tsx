import React, { useState, useEffect } from 'react';

export class InvalidTokenError extends Error {}

InvalidTokenError.prototype.name = "InvalidTokenError";

interface TimeoutMessageProps {
	initialMessage: string;
	finalMessage: string;
	timeout: number;
  }

  
export const clearSessionStorage = (keys: string[]) => {
	keys.forEach((key) => sessionStorage.removeItem(key));
};

export const isAuthenticated = () => {
	const token = localStorage.getItem("token");
	return !!token;
};


export const TimeoutMessage: React.FC<TimeoutMessageProps> = ({ initialMessage, finalMessage, timeout }) => {
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
