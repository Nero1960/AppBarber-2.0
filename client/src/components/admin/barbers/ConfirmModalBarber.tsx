import { useBarbersStore } from "@/store/barberStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteBarber } from "@/api/BarberApi";
import Confirm from "../Confirm";

const ConfirmModalBarber = () => {
  const deleteBarberStore = useBarbersStore((state) => state.deleteBarberStore);

  //Obtener el ID de la url
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const barberId = +queryParam.get("barber")!;

  const navigate = useNavigate();
  const showModal = barberId ? true : false;

  //mutate
  const { mutate } = useMutation({
    mutationFn: deleteBarber,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      deleteBarberStore(barberId);
      navigate(location.pathname, { replace: true });
    },
  });

  return <Confirm title="Eliminar Barbero" id={barberId} showModal={showModal} mutate={mutate}/>
};

export default ConfirmModalBarber;
