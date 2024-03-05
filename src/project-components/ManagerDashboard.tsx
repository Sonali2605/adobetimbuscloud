import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AnalysisGrid = styled.div`
  margin: 50px 50px 0;
`;

const CardsData = styled.div`
  margin-top: 50px;
`;

const TableData = styled.div`
  margin: 50px 0;
  border: 2px solid #0000000d;
  box-shadow: 0px 3px 6px #0000000d;
  border-radius: 1rem;
  text-align: center;
`;

const States = [
  {
    state: "North Carolina",
    percent: "60",
  },
  {
    state: "South Carolina",
    percent: "30",
  },
  {
    state: "Georgia",
    percent: "70",
  },
  {
    state: "Tennessee",
    percent: "70",
  },
  {
    state: "West Virginia",
    percent: "45",
  },
];

const tabledata = [
  {
    name: "Olivia Clarke",
    booking: "$55000",
    quarter: "$15000",
    tcs: "3 course pending",
    status: "pending",
  },
  {
    name: "Brandon Yu",
    booking: "$35000",
    quarter: "$5000",
    tcs: "3 course pending",
    status: "pending",
  },
  {
    name: "Amit Sehgal",
    booking: "$40000",
    quarter: "$12000",
    tcs: "5 course pending",
    status: "pending",
  },
  {
    name: "Shane Donaughan",
    booking: "$50000",
    quarter: "$12000",
    tcs: "No new course",
    status: "notStarted",
  },
  {
    name: "Rebecca Wild",
    booking: "$60000",
    quarter: "$30000",
    tcs: "No new course",
    status: "notStarted",
  },
  {
    name: "Jo Chen",
    booking: "$42000",
    quarter: "$12000",
    tcs: "1 course pending",
    status: "pending",
  },
  {
    name: "Samuel Portier",
    booking: "$28000",
    quarter: "$13000",
    tcs: "Course completed",
    status: "completed",
  },
  {
    name: "David Rush",
    booking: "$40000",
    quarter: "$10000",
    tcs: "1 course pending",
    status: "pending",
  },
];

const details = [
  {
    cardtitle: "Growth Associates",
    cardData: "13",
  },
  {
    cardtitle: "New Insuarance Premium in 2023",
    cardData: "$4.6M",
  },
  {
    cardtitle: "Attained",
    cardData: "30.43%",
  },
  {
    cardtitle: "Compliance training pending",
    cardData: "40%",
  },
];

const textBlue = {
  color: "#0975CC",
};

const pending = {
  color: "#EB4444",
};

const notStarted = {
  color: "#A0A0A0",
};

const completed = {
  color: "#44982A",
};

const ManagerDashboard = () => {
  return (
    <>
      <AnalysisGrid>
        <div className="grid gap-4 grid-cols-2">
          <Card className="">
            <CardContent>
              <div>
                <img src="" alt="Manager Dashboard" />
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardContent>
              {States.map((state) => (
                // <table>
                //   <tbody>
                //     <tr className="flex items-center space-x-4">
                //       {/* <div className="flex items-center space-x-4"> */}
                //       <td>
                //         <span className="text-sm font-medium text-gray-700">
                //           {state.state}
                //         </span>
                //       </td>
                //       <td className="flex-auto m-4 bg-gray-200 rounded-full h-4 overflow-hidden">
                //         {/* <div > */}
                //         <div
                //           className="bg-blue-500 h-4 rounded-full"
                //           style={{ width: `${state.percent}%` }}
                //         ></div>
                //         {/* </div> */}
                //       </td>
                //       <td>
                //         <span className="text-sm font-medium text-gray-700">
                //           {state.percent}%
                //         </span>
                //       </td>
                //       {/* </div> */}
                //     </tr>
                //   </tbody>
                // </table>

                // <div className="">
                <div className="grid grid-cols-3 gap-4 flex items-center space-x-4">
                  <div className="flex-none">
                    <span className="text-sm font-medium text-gray-700">
                      {state.state}
                    </span>
                  </div>

                  <div className="flex-auto m-4 bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{ width: `${state.percent}%` }}
                    ></div>
                  </div>
                  <div className="flex-none">
                    <span className="text-sm font-medium text-gray-700">
                      {state.percent}%
                    </span>
                  </div>
                </div>
                // </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <CardsData>
          <div className="grid gap-4 grid-cols-4">
            {details.map((detail) => (
              <Card>
                <CardHeader className="p-5 border-b border-gray border-opacity-13">
                  <CardTitle>
                    {detail.cardtitle}{" "}
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      className="text-green-500 text-right"
                      style={{ float: "inline-end" }}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center items-center justify-center p-6">
                  <span className="text-4xl font-semibold" style={textBlue}>
                    {detail.cardData}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardsData>
        <TableData>
          <table className="w-full mx-auto text-lg rounded-lg shadow-custom">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2 border-b">Growth Associate</th>
                <th className="px-3 py-2 border-b">Booking YTD</th>
                <th className="px-3 py-2 border-b">Current Quarter</th>
                <th className="px-3 py-2 border-b">
                  Training Compliance Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tabledata.map((data) => (
                <tr className="text-center">
                  <td className="border-b px-3 py-2">{data.name}</td>
                  <td className="border-b px-3 py-2">{data.booking}</td>
                  <td className="border-b px-3 py-2">{data.quarter}</td>

                  <td className="border-b px-3 py-2">{data.tcs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableData>
      </AnalysisGrid>
    </>
  );
};

export default ManagerDashboard;
