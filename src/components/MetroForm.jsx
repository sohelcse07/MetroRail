import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../hooks/useAxiosSecure";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check, Info, Send } from "lucide-react";
import { useUser } from "../context/UserContext";

const MetroForm = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useUser();

  const places = [
    "Uttara North",
    "Uttara Center",
    "Uttara South",
    "Pallabi",
    "Mirpur 11",
    "Mirpur 10",
    "Kazi Para",
    "ShewraPara",
    "Agargaon",
    "Bijoy Sharani",
    "Farmgate",
    "Kawran Bazar",
    "Shahbagh",
    "Dhaka University",
    "Bangladesh Secretariat",
    "Motijheel",
  ];

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [teleNumber, setTeleNumber] = useState(
    user?.phone_number?.slice(2) || ""
  );
  const [ticketCount, setTicketCount] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    error: "",
    isError: false,
  });

  const showDialog = (title, message, isError = false) => {
    setDialogContent({ title, message, isError });
    setDialogOpen(true);
  };
  useEffect(() => {
    if (user?.phone_number) {
      setTeleNumber(user.phone_number.slice(2));
    }
  }, [user]);

  const handleTicketForm = (e) => {
    e.preventDefault();
    if (!from || !to || !teleNumber || !ticketCount) {
      showDialog("Error", "You must fill all the fields", true);
      return;
    }

    const ticketInfo = {
      from,
      to,
      ticket_number: ticketCount,
      telegram_number: teleNumber,
    };

    axiosSecure
      .post("/single-journey/payment/initiate", ticketInfo)
      .then((res) => {
        if (res.data.payment_url) {
          window.open(res.data.payment_url, "_blank");
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        showDialog(
          "Payment Error",
          "Invalid phone number. Please enter a valid Bangladeshi phone number.",
          true
        );
      });
  };

  return (
    <div className="w-full lg:w-96 mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-sm md:text-2xl font-bold text-gray-800 mb-6 text-center">
        Metro Ticket Booking
      </h2>

      <form onSubmit={handleTicketForm} className="space-y-4">
        {/* From Field */}
        <div className="space-y-2 relative">
          <label className="block text-sm font-medium text-gray-700">
            From
          </label>
          <Select.Root value={from} onValueChange={setFrom}>
            <Select.Trigger className="inline-flex items-center justify-between w-full px-4 py-2 text-sm bg-gray-50 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100">
              <Select.Value placeholder="Select starting point" />
              <Select.Icon className="text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="absolute z-50 min-w-[var(--radix-select-trigger-width)] bg-white rounded-md shadow-lg border border-gray-200"
                position="popper"
                sideOffset={4}
              >
                <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-500 cursor-default">
                  <ChevronUp className="h-4 w-4" />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-1 max-h-[200px]">
                  {places
                    .filter((place) => place !== to)
                    .map((place, idx) => (
                      <Select.Item
                        key={idx}
                        value={place}
                        className="relative flex items-center px-7 py-2 text-sm text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-900 focus:bg-teal-50 focus:text-teal-900 outline-none cursor-pointer"
                      >
                        <Select.ItemText>{place}</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                          <Check className="h-4 w-4 text-teal-600" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-500 cursor-default">
                  <ChevronDown className="h-4 w-4" />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* To Field */}
        <div className="space-y-2 relative">
          <label className="block text-sm font-medium text-gray-700">To</label>
          <Select.Root value={to} onValueChange={setTo}>
            <Select.Trigger className="inline-flex items-center justify-between w-full px-4 py-2 text-sm bg-gray-50 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100">
              <Select.Value placeholder="Select destination" />
              <Select.Icon className="text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="absolute z-50 min-w-[var(--radix-select-trigger-width)] bg-white rounded-md shadow-lg border border-gray-200"
                position="popper"
                sideOffset={4}
              >
                <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-500 cursor-default">
                  <ChevronUp className="h-4 w-4" />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-1 max-h-[200px]">
                  {places
                    .filter((place) => place !== from)
                    .map((place, idx) => (
                      <Select.Item
                        key={idx}
                        value={place}
                        className="relative flex items-center px-7 py-2 text-sm text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-900 focus:bg-teal-50 focus:text-teal-900 outline-none cursor-pointer"
                      >
                        <Select.ItemText>{place}</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                          <Check className="h-4 w-4 text-teal-600" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-500 cursor-default">
                  <ChevronDown className="h-4 w-4" />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
        {/* Ticket Type */}
          <div className="flex items-start gap-2 p-[6px] md:p-3 bg-blue-50 border border-blue-100 rounded-lg mb-4">
      <Info className="flex-shrink-0 h-4 w-4 text-blue-600 mt-0.5" />
      <div className="flex-1">
        <p className="text-xs text-blue-800 leading-relaxed">
          <span className="font-medium">First-time users:</span> Start the{' '}
          <span className="inline-flex items-center gap-1 text-blue-600 font-medium">
            <Send className="h-3 w-3" /> Telegram bot
          </span>
          , tap &quot;Share Contact&quot;, then enter your Telegram number to book a ticket.
        </p>
      </div>
    </div>


        {/* Telegram Number Field */}
        <div className="space-y-2">
          <label
            htmlFor="telegram"
            className="block text-sm font-medium text-gray-700"
          >
            Telegram Number
          </label>
          <input
            id="telegram"
            type="text"
            value={teleNumber}
            onChange={(e) => setTeleNumber(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            placeholder="ex:- 01834567890"
            required
          />
        </div>
    
        {/* Ticket Count */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Number of Tickets
          </label>
          <div className="flex rounded-md overflow-hidden border border-gray-300 w-fit">
            <button
              type="button"
              className="px-3 py-1 bg-teal-500 text-white font-bold hover:bg-teal-600 focus:outline-none"
              onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
            >
              -
            </button>
            <div className="px-4 py-1 bg-gray-50 text-center w-16 border-x border-gray-300">
              {ticketCount}
            </div>
            <button
              type="button"
              className="px-3 py-1 bg-teal-500 text-white font-bold hover:bg-teal-600 focus:outline-none"
              onClick={() => setTicketCount(Math.min(5, ticketCount + 1))}
            >
              +
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
        >
          Proceed to Payment
        </button>
      </form>

      {/* Radix Dialog for messages */}
      <Dialog.Root
        className="z-50"
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-white rounded-lg shadow-lg focus:outline-none">
            <Dialog.Title
              className={`text-lg font-semibold ${
                dialogContent.isError ? "text-red-600" : "text-teal-600"
              }`}
            >
              {dialogContent.title}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-600">
              {dialogContent.message}
            </Dialog.Description>
            <div className="mt-4 flex justify-end">
              <Dialog.Close asChild>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    dialogContent.isError
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-teal-100 text-teal-700 hover:bg-teal-200"
                  }`}
                >
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default MetroForm;
