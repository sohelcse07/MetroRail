import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CheckCircle, XCircle, Download, Cross } from "lucide-react";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();

  // Extracting parameters from the query string
  const status = searchParams.get("status");
  const transactionId = searchParams.get("transaction_id");
  const ticketUuid = searchParams.get("ticket_uuid");
  const fromStation = searchParams.get("from");
  const toStation = searchParams.get("to");
  const ticketNumber = searchParams.get("ticket_number");
  const createdAt = searchParams.get("created_at");
  const validUntil = searchParams.get("valid_until");
  const qrCodeUrl = searchParams.get("qr_code_url");

  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const ticketRef = useRef(null);

  useEffect(() => {
    if (status === "success") {
      setMessage("Payment Successful! Your ticket details are below.");
    } else {
      setMessage("Payment Failed! Please try again.");
    }
  }, [status]);

  const downloadTicket = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("ticket.pdf");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {status === "success" ? (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-green-600 mb-2">{message}</h1>
            <p className="text-gray-600 mb-6">
              Your transaction ID: {transactionId}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-red-600 mb-2">{message}</h1>
          </div>
        )}

        {status === "success" && (
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
              <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl focus:outline-none p-6">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-xl font-bold text-green-600">
                    Your Ticket
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Cross className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <div
                  ref={ticketRef}
                  className="bg-white border border-gray-200 rounded-lg p-6 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-left">
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium">{fromStation}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium">{toStation}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-left">
                      <p className="text-sm text-gray-500">Ticket Number</p>
                      <p className="font-medium">{ticketNumber}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500">Valid Until</p>
                      <p className="font-medium">
                        {new Date(validUntil).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {qrCodeUrl && (
                    <div className="mt-6 flex flex-col items-center">
                      <p className="text-sm font-medium text-purple-600 mb-2">
                        Scan Your Ticket
                      </p>
                      <img
                        crossOrigin="anonymous"
                        src={qrCodeUrl}
                        alt="QR Code"
                        className="w-40 h-40 border-2 border-blue-400 rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={downloadTicket}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download Ticket
                  </button>
                  <Dialog.Close asChild>
                    <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors">
                      Close
                    </button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;