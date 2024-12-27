import { Button } from "../Components/ui/button";
import { Layout } from "../Components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Clock, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Layout title="">
      <div className="min-h-screen bg-gray-100 py-8 px-4 lg:px-2">
        <h1 className="text-3xl font-bold mb-8">Welcome, John Doe</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2" /> Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">
                {new Date().toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2" /> Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
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
          <Button size="lg" className="mr-4" onClick={() => navigate("/checkinout")}>
            Check In/Out
          </Button>
          {/* <Button size="lg" variant="outline" onClick={() => navigate("/attendanceLog")}>
            View Attendance Log
          </Button> */}
        </div>
      </div>
    </Layout>
  );
}
