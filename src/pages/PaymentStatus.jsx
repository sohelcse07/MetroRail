import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "react-modal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Define custom styles for the modal
const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.7)"
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        background: "#f0f8ff",
        border: "2px solid #007bff",
        borderRadius: "10px",
        padding: "20px",
        maxWidth: "500px",
        width: "90%"
    }
};

// Set the app element for accessibility (assuming your root element has id="root")
Modal.setAppElement("#root");

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
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const ticketRef = useRef(null);

    useEffect(() => {
        if (status === "success") {
            setMessage("Payment Successful! Your ticket details are below.");
        } else {
            setMessage("Payment Failed! Please try again.");
        }
    }, [status]);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // This function captures the ticket view and generates a PDF download
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
        <div
            style={{
                textAlign: "center",
                padding: "20px",
                background: "#e0f7fa",
                minHeight: "100vh"
            }}
        >
            <h1 style={{ color: "#007bff" }}>{message}</h1>

            {status === "success" && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Ticket Modal"
                >
                    <div
                        ref={ticketRef}
                        style={{
                            padding: "20px",
                            background: "#ffffff",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                        }}
                    >
                        <h2 style={{ color: "#28a745", textAlign: "center" }}>Your Ticket</h2>


                        <p>
                            <strong>From:</strong> {fromStation}
                        </p>
                        <p>
                            <strong>To:</strong> {toStation}
                        </p>
                        <p>
                            <strong>Ticket Number:</strong> {ticketNumber}
                        </p>

                        <p>
                            <strong>Valid Until:</strong> {new Date(validUntil).toLocaleString()}
                        </p>

                        {qrCodeUrl && (
                            <div style={{ marginTop: "20px", textAlign: "center" }}>
                                <h3 style={{ color: "#6f42c1" }}>Scan Your Ticket:</h3>
                                <img
                                    crossOrigin="anonymous"
                                    src={qrCodeUrl}
                                    alt="QR Code"
                                    width="150"
                                    style={{
                                        border: "2px solid #007bff",
                                        borderRadius: "5px"
                                    }}
                                />

                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            marginTop: "20px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <button
                            onClick={downloadTicket}
                            style={{
                                padding: "10px 20px",
                                background: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Download Ticket
                        </button>
                        <button
                            onClick={closeModal}
                            style={{
                                padding: "10px 20px",
                                background: "#dc3545",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default PaymentStatus;
