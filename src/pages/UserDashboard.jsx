import React, { useState } from "react";
import * as Radix from "@radix-ui/react-primitives";
import {
  Card,
  Flex,
  Grid,
  Box,
  Text,
  Heading,
  Avatar,
  Button,
  Table,
  Badge,
  IconButton,
  ScrollArea
} from "@radix-ui/themes";
import {
  CoinIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  CalendarIcon,
  PersonIcon,
  IdCardIcon,
  QRCodeIcon,
  GearIcon,
  QuestionMarkCircledIcon,
  ArrowRightIcon,
  DownloadIcon
} from "@radix-ui/react-icons";

const UserDashboard = () => {
  const [showFeatures, setShowFeatures] = useState(false);

  const profileData = [
    { title: "Balance", value: "1.33 BDT", icon: <CoinIcon width={24} height={24} /> },
    { title: "E-mail", value: "john@gmail.com", icon: <EnvelopeClosedIcon width={24} height={24} /> },
    { title: "Telegram Number", value: "01888885555", icon: <MobileIcon width={24} height={24} /> },
    { title: "Date Of Birth", value: "02-01-2024", icon: <CalendarIcon width={24} height={24} /> },
    { title: "Gender", value: "Male", icon: <PersonIcon width={24} height={24} /> },
    { title: "Permanent Ticket", value: "View", icon: <QRCodeIcon width={24} height={24} /> },
  ];

  const features = [
    { label: "Recharge", icon: <CoinIcon width={32} height={32} />, color: "red" },
    { label: "Balance Transfer", icon: <ArrowRightIcon width={32} height={32} />, color: "cyan" },
    { label: "Settings", icon: <GearIcon width={32} height={32} />, color: "pink" },
    { label: "Help", icon: <QuestionMarkCircledIcon width={32} height={32} />, color: "blue" },
  ];

  const travelHistory = [
    {
      source: "Mirpur 11",
      destination: "Mirpur 10",
      seats: "5",
      price: "90.00",
      date: "Jan 5, 2022",
      time: "8:35 a.m.",
      status: "Cancelled",
      ticketStatus: "Refunded",
      qr: "-",
      ticket: "Download Ticket",
    },
    {
      source: "Mirpur 11",
      destination: "Mirpur 10",
      seats: "10",
      price: "225.00",
      date: "Jan 10, 2022",
      time: "8:35 a.m.",
      status: "Confirmed",
      ticketStatus: "Paid",
      qr: "/path/to/qr-code.jpg",
      ticket: "Download Ticket",
    },
  ];

  return (
    <Radix.Root className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      {/* Layout Container */}
      <Flex>
        {/* Left Side Panel would go here */}
        
        {/* Main Content */}
        <Box className="w-full p-4 md:p-8">
          {/* Profile Section */}
          <Card className="bg-slate-800/80 backdrop-blur-md mb-8">
            <Flex direction="column" align="center" gap="6" className="p-6">
              <Avatar
                size="8"
                src="../assets/ProfilePicture.jpeg"
                fallback="JD"
                className="border-4 border-teal-500/80 shadow-lg"
              />
              
              <Heading size="7" className="text-teal-200">
                John Doe
              </Heading>
              
              <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="4" width="100%">
                {profileData.map((item, idx) => (
                  <Card key={idx} className="bg-slate-700/50 hover:bg-slate-700/70 transition-all">
                    <Flex gap="4" align="center" p="4">
                      <Box className={`text-teal-400 p-2 rounded-md bg-slate-800/50`}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Text as="div" size="2" weight="bold" className="text-slate-300">
                          {item.title}
                        </Text>
                        <Text as="div" size="2" className="text-teal-100">
                          {item.value}
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                ))}
              </Grid>
              
              <IconButton
                size="4"
                variant="soft"
                color="teal"
                onClick={() => setShowFeatures(!showFeatures)}
                className="transition-transform hover:scale-110"
              >
                <GearIcon width={24} height={24} />
              </IconButton>
            </Flex>
          </Card>

          {/* Features Panel */}
          {showFeatures && (
            <Card className="bg-slate-800/60 backdrop-blur-md mb-8 animate-fadeIn">
              <Grid columns={{ initial: '2', sm: '4' }} gap="4" p="6">
                {features.map((feature, index) => (
                  <Button
                    key={index}
                    variant="soft"
                    color={feature.color}
                    size="3"
                    className="h-24 flex flex-col gap-2 hover:scale-105 transition-transform"
                  >
                    {feature.icon}
                    <Text>{feature.label}</Text>
                  </Button>
                ))}
              </Grid>
            </Card>
          )}

          {/* Travel History Section */}
          <Card className="bg-slate-800/80 backdrop-blur-md">
            <Box p="6">
              <Heading size="6" mb="6">Travel History</Heading>
              
              <ScrollArea type="always" scrollbars="horizontal" style={{ maxWidth: '100%' }}>
                <Table.Root variant="surface" className="min-w-full">
                  <Table.Header>
                    <Table.Row className="bg-slate-700">
                      <Table.ColumnHeaderCell>Source</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Destination</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Seats</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Ticket Status</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>QR</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Ticket</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {travelHistory.map((entry, idx) => (
                      <Table.Row key={idx} className={idx % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-700/50'}>
                        <Table.Cell>{entry.source}</Table.Cell>
                        <Table.Cell>{entry.destination}</Table.Cell>
                        <Table.Cell>{entry.seats}</Table.Cell>
                        <Table.Cell>{entry.price} BDT</Table.Cell>
                        <Table.Cell>{entry.date}</Table.Cell>
                        <Table.Cell>{entry.time}</Table.Cell>
                        <Table.Cell>
                          <Badge color={entry.status === "Cancelled" ? "red" : "green"}>
                            {entry.status}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge color={entry.ticketStatus === "Refunded" ? "amber" : "green"}>
                            {entry.ticketStatus}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>
                          {entry.qr !== "-" ? (
                            <QRCodeIcon width={24} height={24} />
                          ) : (
                            "-"
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <Button variant="ghost" size="1">
                            <DownloadIcon width={16} height={16} />
                            Download
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </ScrollArea>
            </Box>
          </Card>
        </Box>
      </Flex>
    </Radix.Root>
  );
};

export default UserDashboard;