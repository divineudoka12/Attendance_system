import { Button } from "../Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../Components/ui/card"

export default function CheckInOut() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Check In/Out</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold">09:30 AM</p>
            <p className="text-gray-600">Current Time</p>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Last Check-In: 09:00 AM</span>
            <span>Last Check-Out: --:-- --</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg" className="w-full max-w-xs">
            Check In
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

