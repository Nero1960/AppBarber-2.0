import AppointmentCancellation from "@/components/admin/appointment/AppointmentCancellation";
import AppointmentsTable from "@/components/admin/appointment/AppointmentTable";
import MonthlyRevenueChart from "@/components/admin/MonthlyRevenueChart";
import PopularHoursChart from "@/components/admin/PopularHoursChart";

const AppointmentAdmin = () => {
  return (
    <div className="space-y-5">
      <AppointmentsTable />
      <AppointmentCancellation />
      <MonthlyRevenueChart/>
      <PopularHoursChart/> 
    </div>
  );
};

export default AppointmentAdmin;
