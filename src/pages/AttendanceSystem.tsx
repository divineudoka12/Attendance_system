import { Layout } from '../Components/Layout'
import { Button } from '../Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../Components/ui/table'
import { User, Clock, Calendar } from 'lucide-react'

export function AttendanceSystemPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <Layout title="Attendance System">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, John Doe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>{currentDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>{currentTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-500" />
                <span>Employee ID: EMP1001</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                Check In
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Check In:</span>
                  <span className="font-medium">09:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Check Out:</span>
                  <span className="font-medium">--:-- --</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Hours:</span>
                  <span className="font-medium">-- hrs -- mins</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance Log</CardTitle>
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
                    <TableCell>{new Date(2023, 5, 20 - index).toLocaleDateString()}</TableCell>
                    <TableCell>09:00 AM</TableCell>
                    <TableCell>06:00 PM</TableCell>
                    <TableCell>9 hrs 0 mins</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
