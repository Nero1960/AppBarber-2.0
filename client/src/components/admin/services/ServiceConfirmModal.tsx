import { deleteServiceById } from "@/api/ServiceApi";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Confirm from "../Confirm";
import { useServicesStore } from "@/store/serviceStore";

const ServiceConfirmModal = () => {
  const deleteService = useServicesStore((state) => state.deleteService);
  //Obtener el servicio a eliminar
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const serviceId = +queryParam.get("serviceDeleteId")!;

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: deleteServiceById,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      deleteService(serviceId)
      navigate(location.pathname, {replace: true})
    },
  });

  const showModal = serviceId ? true : false;
  return (
    <Confirm
      id={serviceId}
      mutate={mutate}
      showModal={showModal}
      title="Eliminar Servicio"
    />
  );
};

export default ServiceConfirmModal;
