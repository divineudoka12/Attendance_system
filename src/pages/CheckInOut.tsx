import { useState } from "react";
import { Button } from "../Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../Components/ui/card";

type AttendanceLogEntry = {
  type: "Check-In" | "Check-Out";
  time: string;
};

export default function CheckInOut() {
  const [lastCheckIn, setLastCheckIn] = useState<string>("--:-- --");
  const [lastCheckOut, setLastCheckOut] = useState<string>("--:-- --");
  const [attendanceLog, setAttendanceLog] = useState<AttendanceLogEntry[]>([]);
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);

  const getCurrentTime = (): string => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const handleCheckIn = (): void => {
    const currentTime = getCurrentTime();
    setLastCheckIn(currentTime);
    setIsCheckedIn(true);
    setAttendanceLog((prevLog) => [...prevLog, { type: "Check-In", time: currentTime }]);
  };

  const handleCheckOut = (): void => {
    const currentTime = getCurrentTime();
    setLastCheckOut(currentTime);
    setIsCheckedIn(false);
    setAttendanceLog((prevLog) => [...prevLog, { type: "Check-Out", time: currentTime }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Check In/Out</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold">{getCurrentTime()}</p>
            <p className="text-gray-600">Current Time</p>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Last Check-In: {lastCheckIn}</span>
            <span>Last Check-Out: {lastCheckOut}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {isCheckedIn ? (
            <Button size="lg" className="w-full max-w-xs" onClick={handleCheckOut}>
              Check Out
            </Button>
          ) : (
            <Button size="lg" className="w-full max-w-xs" onClick={handleCheckIn}>
              Check In
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-center">Attendance Log</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {attendanceLog.map((entry, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{entry.type}</span>
                <span>{entry.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}