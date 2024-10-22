import MonthlyRevenueChart from "@/components/admin/MonthlyRevenueChart"
import TopServicesChart from "@/components/admin/TopServicesChart"

const DashboardAdmin = () => {

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-4 gap-4">
        <MonthlyRevenueChart />
        <TopServicesChart />

      </div>

    </>
  )
}

export default DashboardAdmin