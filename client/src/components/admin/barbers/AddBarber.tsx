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
import { FaUserPlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { BarberForm as BarberFormType } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { newBarber } from "@/api/BarberApi";
import { toast } from "sonner";
import { useBarbersStore } from "@/store/barberStore";
import BarberForm from "./BarberForm";

const AddBarber = () => {
  const addBarberStore = useBarbersStore((state) => state.addBarberStore);

  //Leer el params de la URL
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const addBarber = queryParam.has("addBarber");

  const navigate = useNavigate();

  //Si existe el param mostrar el modal
  const showModal = addBarber ? true : false;

  //react hook form
  const initialValues: BarberFormType = {
    name: "",
    lastname: "",
    phone: "",
    email: "",
    specialty: "",
    image: "",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<BarberFormType>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: newBarber,
    onSuccess: (data) => {
      if (data) {
        addBarberStore(data);
      }
      toast.success("Barbero agregado correctamente");
      reset();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmitAddBarber = (formData: BarberFormType) => {
    const addFormData = new FormData();

    addFormData.append("name", formData.name);
    addFormData.append("lastname", formData.lastname);
    addFormData.append("phone", formData.phone);
    addFormData.append("email", formData.email);
    addFormData.append("specialty", formData.specialty);

    //Si se subió una imagen agregamos al formData
    if (formData.image[0]) {
      addFormData.append("image", formData.image[0]);
    }

    mutate(addFormData);
  };

  return (
    <Modal
      onClose={() => navigate(location.pathname, { replace: true })}
      isOpen={showModal}
      size={{ base: "xs", md: "lg", lg: "xl" }}
    >
      <ModalOverlay />

      <ModalContent bg={"#1f1f1f"} padding={2} position={"relative"}>
        <div className="absolute top-0 left-[95%] -mt-5">
          <FaUserPlus className="text-4xl text-Primary-500" />
        </div>
        <ModalHeader
          color={"white"}
          className="flex items-center"
          fontSize={"md"}
          gap={2}
        >
          <FaUserPlus /> Agregar Barbero
        </ModalHeader>

        <ModalCloseButton />

        <form noValidate onSubmit={handleSubmit(handleSubmitAddBarber)}>

          <BarberForm register={register} errors={errors}/>
         
          <ModalFooter>
            <Button
              type="submit"
              bg={"#d6a354"}
              _hover={{ bg: "#d6a354" }}
              color={"white"}
              fontSize={"small"}
              mr={3}
            >
              Agregar
            </Button>

            <Button
              bg={"transparent"}
              _hover={{ bg: "#d6a354" }}
              color={"white"}
              fontSize={"small"}
              onClick={() => navigate(location.pathname, { replace: true })}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddBarber;
