import { Button } from "../Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card"
import { Clock, Calendar, User } from 'lucide-react'
import { Link } from "react-router-dom"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, John Doe</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" /> Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">June 25, 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" /> Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">09:30 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2" /> Employee ID
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">EMP1001</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 flex justify-center">
        <Link to="/checkinout"><Button size="lg" className="mr-4">Check In/Out</Button></Link>
        <Link to="/attendanceLog"><Button size="lg" variant="outline">View Attendance Log</Button></Link>
      </div>
    </div>
  )
}

