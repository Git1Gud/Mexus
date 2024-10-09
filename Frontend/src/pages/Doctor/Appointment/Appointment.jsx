import AppSidebar from "./AppSideBar";
import PatientInfo from "./AppRight/PatientInfo";
import AppSchedule from "./AppRight/AppSchedule";
import AppHistory from "./AppRight/AppHistory";
import DocumentAgreements from "./AppRight/DocumentAgreements";
import Card from "./AppRight/Card";

function Appointment() {
  return (
    <div className="flex gap-4 p-4 bg-primary">
      <AppSidebar />
      <div className="flex flex-col w-full gap-4">
        <div className="flex gap-4">
            <PatientInfo/>
            <AppSchedule/>
            <div className=" w-1/3 flex flex-col gap-4">
                <Card/>
                <Card/>
            </div>
        </div>
        <div className="flex gap-4 mb-8">
        <AppHistory/>
        <DocumentAgreements/>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
