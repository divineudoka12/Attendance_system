import { Layout } from '../Components/Layout'
import { Button } from '../Components/ui/button'

export function AttendancePage() {
  return (
    <Layout title="Mark Attendance">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <Button size="lg" className="w-full mb-6">
            Authenticate Face & Mark Attendance
          </Button>
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Recent Attendance Log</h2>
            <ul className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <li key={index} className="bg-white p-3 rounded shadow-sm">
                  <span className="font-medium">John Doe</span>
                  <span className="text-gray-500 ml-2">
                    {new Date().toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

