import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UseMutateFunction } from "@tanstack/react-query";

type ConfirmProps = {
  title: string;
  mutate: UseMutateFunction<string | undefined, Error, number, unknown>;
  id: number;
  showModal: boolean
};

const Confirm = ({ title, mutate, id , showModal}: ConfirmProps) => {
  const navigate = useNavigate();
  return (
    <Modal
      size={"lg"}
      onClose={() => navigate(location.pathname, { replace: true })}
      isOpen={showModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg="#1f1f1f" color={"#f7f7f7"} padding={5}>
        <ModalHeader className="font-heading text-white-500">
          {title}
        </ModalHeader>
        <ModalCloseButton border={"none"} />
        <ModalBody>
          <p>¿Estas Seguro de Eliminar este registro?</p>
        </ModalBody>
        <ModalFooter className="flex gap-x-3">
          <button
            type="button"
            className="bg-Primary-500 px-4 py-2 rounded-md text-white-500 text-sm hover:bg-Primary-600 duration-300"
            onClick={() => mutate(id)}
          >
            Confirmar
          </button>

          <button
            type="button"
            className="bg-Primary-500 px-4 py-2 rounded-md text-white-500 text-sm hover:bg-Primary-600 duration-300"
            onClick={() => navigate(location.pathname, { replace: true })}
          >
            Cancelar
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Confirm;
