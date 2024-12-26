import { Button } from "../Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Components/ui/table"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function AttendanceLog() {
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
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(2023, 5, 25 - index).toLocaleDateString()}</TableCell>
                  <TableCell>09:00 AM</TableCell>
                  <TableCell>06:00 PM</TableCell>
                  <TableCell>9 hours</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-between items-center">
            <Button variant="outline" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span>Page 1 of 5</span>
            <Button variant="outline" size="sm">
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}