import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTestimonial } from "@/api/TestimonialApi";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import Confirm from "../Confirm";

const TestimonialConfirm = () => {
  //Obtener el ID de la URL
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const testimonialId = +queryParam.get("testimonialId")!;

  const navigate = useNavigate();

  //Realizar la mutación de eliminar testimonial
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTestimonial,
    onError: (error) => {
      toast.error(error.message);
    },

    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["testimonialAdmin"] });
      navigate(location.pathname , {replace: true})
      
    },
  });

  const showModal = testimonialId ? true : false;

  return (
    <Confirm
      id={testimonialId}
      mutate={mutate}
      title="Eliminar Testimonial"
      showModal={showModal}
    />
  );
};

export default TestimonialConfirm;
