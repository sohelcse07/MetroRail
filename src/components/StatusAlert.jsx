import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
} from "lucide-react";

const StatusAlert = ({ statusCode, message }) => {
  const getIcon = () => {
    if (!statusCode) return <Info className="h-5 w-5 text-blue-500" />;
    if (statusCode >= 200 && statusCode < 300)
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (statusCode >= 400 && statusCode < 500)
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    if (statusCode >= 500)
      return <XCircle className="h-5 w-5 text-red-500" />;
    return <Info className="h-5 w-5 text-gray-500" />;
  };

  const getTitle = () => {
    if (!statusCode) return "Info";
    if (statusCode >= 200 && statusCode < 300) return "Success";
    if (statusCode >= 400 && statusCode < 500) return "Warning";
    if (statusCode >= 500) return "Server Error";
    return "Notice";
  };

  return (
    <Alert className="w-full max-w-md mx-auto mt-4">
      {getIcon()}
      <div>
        <AlertTitle>{getTitle()}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
};

export default StatusAlert;
