import { Layout } from '../components/Layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function AdminDashboardPage() {
  return (
    <Layout title="Admin Dashboard">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <div>
              <Label htmlFor="date">Filter by Date</Label>
              <Input id="date" type="date" />
            </div>
            <div>
              <Label htmlFor="user">Filter by User</Label>
              <Input id="user" type="text" placeholder="Enter user name" />
            </div>
            <div className="flex items-end">
              <Button>Apply Filters</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>John Doe</TableCell>
                  <TableCell>EMP{1000 + index}</TableCell>
                  <TableCell>{new Date().toLocaleDateString()}</TableCell>
                  <TableCell>{new Date().toLocaleTimeString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  )
}

