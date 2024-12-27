import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Components/ui/table";

export default function AttendanceLog() {
  const dummyLog = [
    { date: "June 25, 2023", checkIn: "09:00 AM", checkOut: "06:00 PM", totalHours: "9 hours" },
    { date: "June 24, 2023", checkIn: "08:45 AM", checkOut: "05:30 PM", totalHours: "8 hours 45 minutes" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Attendance Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Total Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyLog.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.checkIn}</TableCell>
                  <TableCell>{entry.checkOut}</TableCell>
                  <TableCell>{entry.totalHours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
