import AppointmentCancellation from "@/components/admin/appointment/AppointmentCancellation"
import AppointmentsTable from "@/components/admin/appointment/AppointmentTable"

const AppointmentAdmin = () => {
  return (
    <div>
      <AppointmentCancellation/>
      <AppointmentsTable/>
    </div>
  )
}

export default AppointmentAdmin