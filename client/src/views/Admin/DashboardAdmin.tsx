import MonthlyRevenueChart from "@/components/admin/MonthlyRevenueChart"
import PopularHoursChart from "@/components/admin/PopularHoursChart"
import RecentUsers from "@/components/admin/RecentUsers"
import TopBarbersTable from "@/components/admin/TopBarbersTable"
import TopCustomersTable from "@/components/admin/TopCustomersTable"
import TopServicesChart from "@/components/admin/TopServicesChart"

const DashboardAdmin = () => {

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-auto">
        <MonthlyRevenueChart />
        <TopServicesChart />
        <RecentUsers />
      </div>

      <div className="mt-5 space-y-5">
        <TopBarbersTable />
        <PopularHoursChart />
        <TopCustomersTable />

      </div>

    </>
  )
}

export default DashboardAdmin