import { deleteCustomer } from "@/api/CustomerApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Confirm from "../Confirm";

export default function CustomerConfirm() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const userId = +queryParam.get("userId")!;

  const showModal = userId ? true : false;

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteCustomer,
    onError: (error) => {
      toast.error(error.message);
    },

    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["customers", "recentUsers"] });
      navigate(location.pathname, { replace: true });
    },
  });

  return (
    <Confirm
      id={userId}
      mutate={mutate}
      showModal={showModal}
      title="Eliminar usuario"
    />
  );
}
