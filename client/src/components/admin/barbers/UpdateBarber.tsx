import { useLocation, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { FaUserPen } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBarberById } from "@/api/BarberApi";
import { BarberForm as BarberFormType } from "@/types/index";
import { useForm } from "react-hook-form";
import { updateBarber } from "@/api/BarberApi";
import { toast } from "sonner";
import { useBarbersStore } from "@/store/barberStore";
import BarberForm from "./BarberForm";
import { useEffect } from "react";

const UpdateBarber = () => {
  const updateBarberStore = useBarbersStore((state) => state.updateBarberStore);
  const navigate = useNavigate();

  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const barberId = +queryParam.get("barberId")!;


  const { data } = useQuery({
    queryKey: ["barber", barberId],
    queryFn: () => getBarberById(barberId),
    enabled: !!barberId,
    retry: false,
  });


  const initialValues: BarberFormType = {
    name: "",
    lastname: "",
    email: "",
    phone: "",
    specialty: "",
    image: "",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<BarberFormType>({ defaultValues: initialValues });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        image: data.image,
        phone: data.phone,
        specialty: data.specialty
      });
    } else {
      reset();
    }
    // eslint-disable-next-line
  }, [data, reset]);

  const handleSubmitUpdateBarber = (formData: BarberFormType) => {
    const updateFormData = new FormData();

    updateFormData.append("name", formData.name);
    updateFormData.append("lastname", formData.lastname);
    updateFormData.append("phone", formData.phone);
    updateFormData.append("email", formData.email);
    updateFormData.append("specialty", formData.specialty);

    //Si se subió una imagen agregamos al formData
    if (formData.image[0]) {
      updateFormData.append("image", formData.image[0]);
    }

    const data = {
      barberId,
      formData: updateFormData,
    };

    mutate(data);
  };

  const { mutate } = useMutation({
    mutationFn: updateBarber,
    onError: (error) => {
      toast.error(error.message);
    },

    onSuccess: (data) => {
      if (data) {
        updateBarberStore(data);
      }
      toast.success("Barbero Actualizado con éxito");
      navigate(location.pathname, { replace: true })

    },
  });

  const showModal = barberId ? true : false;

  return (
    <Modal
      onClose={() => navigate(location.pathname, { replace: true })}
      isOpen={showModal}
      size={{ base: "xs", md: "lg", lg: "xl" }}
    >
      <ModalOverlay />

      <ModalContent bg={"#1f1f1f"} padding={2} position={"relative"}>
        <div className="absolute top-0 left-[95%] -mt-5">
          <FaUserPen className="text-4xl text-Primary-500" />
        </div>
        <ModalHeader
          color={"white"}
          className="flex items-center"
          fontSize={"md"}
          gap={2}
        >
          <FaUserPen /> Actualizar Barbero
        </ModalHeader>

        <ModalCloseButton />

        <form noValidate onSubmit={handleSubmit(handleSubmitUpdateBarber)}>
          <BarberForm register={register} errors={errors} />
          <ModalFooter>
            <Button
              type="submit"
              bg={"#d6a354"}
              _hover={{ bg: "#d6a354" }}
              color={"white"}
              fontSize={"small"}
              mr={3}
            >
              Actualizar
            </Button>

            <Button
              bg={"transparent"}
              _hover={{ bg: "#d6a354" }}
              color={"white"}
              fontSize={"small"}
              onClick={() => navigate(location.pathname, { replace: true })}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateBarber;
