import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  X,
} from "lucide-react";

const StatusAlert = ({ statusCode, message, className = "" }) => {
  const [visible, setVisible] = useState(true);
  console.log(statusCode)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const getIcon = () => {
    if (!statusCode) return <Info className="h-6 w-6 text-blue-500" />;
    if (statusCode >= 200 && statusCode < 300)
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    if ([301, 401, 403, 404].includes(statusCode))
      return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    if (statusCode >= 500)
      return <XCircle className="h-6 w-6 text-red-500" />;
    return <Info className="h-6 w-6 text-gray-500" />;
  };

  const getTitle = () => {
    switch (statusCode) {
      case 301: return "Moved Permanently";
      case 401: return "Unauthorized";
      case 403: return "Forbidden";
      case 404: return "Not Found";
      case 503: return "Service Unavailable";
      default:
        if (!statusCode) return "Info";
        if (statusCode >= 200 && statusCode < 300) return "Success";
        if (statusCode >= 400 && statusCode < 500) return "Warning";
        if (statusCode >= 500) return "Server Error";
        return "Notice";
    }
  };

  const getColor = (type) => {
    if (!statusCode) return type === "bg" ? "blue-50" : type === "text" ? "blue-800" : "blue-700";
    if (statusCode >= 200 && statusCode < 300) return type === "bg" ? "green-50" : type === "text" ? "green-800" : "green-700";
    if ([301, 401, 403, 404].includes(statusCode)) return type === "bg" ? "yellow-50" : type === "text" ? "yellow-800" : "yellow-700";
    if (statusCode >= 500) return type === "bg" ? "red-50" : type === "text" ? "red-800" : "red-700";
    return type === "bg" ? "gray-50" : type === "text" ? "gray-800" : "gray-700";
  };

  if (!message || !visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div
        className={`relative max-w-md w-full mx-4 p-6 border rounded-lg bg-${getColor("bg")} border-${getColor("bg")} shadow-lg ${className} animate-fade-in`}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="ml-4">
            <h3 className={`text-lg font-semibold text-${getColor("text")}`}>
              {getTitle()}
            </h3>
            <p className={`mt-1 text-sm text-${getColor("sub") || getColor("text")}`}>
              {message}
              {statusCode && (
                <span className="ml-1 text-xs opacity-70">(Status: {statusCode})</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusAlert;
