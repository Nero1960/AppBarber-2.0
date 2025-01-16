import MessageError from "@/components/MessageError";
import { BarberForm as BarberFormType } from "@/types/index";
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  ModalBody,
  Textarea,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type BarberFormProps = {
  register: UseFormRegister<BarberFormType>;
  errors: FieldErrors<BarberFormType>;
};

const BarberForm = ({ register, errors }: BarberFormProps) => {
  return (
    <ModalBody pb={6}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={6}
      >
        <FormControl>
          <FormLabel htmlFor="name" fontSize={"sm"} color={"#a6a6a6"}>
            Nombre
          </FormLabel>
          <Input
            type="name"
            id="name"
            color={"white"}
            borderColor={"#636363"}
            fontSize={"sm"}
            focusBorderColor="#a6a6a6"
            placeholder="nombre del barbero"
            {...register("name", {
              required: "Este campo es obligatorio",
            })}
          />
          {errors.name && <MessageError>{errors.name.message}</MessageError>}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="lastname" fontSize={"sm"} color={"#a6a6a6"}>
            Apellido
          </FormLabel>
          <Input
            type="lastname"
            id="lastname"
            color={"white"}
            borderColor={"#636363"}
            fontSize={"sm"}
            focusBorderColor="#a6a6a6"
            placeholder="apellido del barbero"
            {...register("lastname", {
              required: "Este campo es obligatorio",
            })}
          />
          {errors.lastname && (
            <MessageError>{errors.lastname.message}</MessageError>
          )}
        </FormControl>
      </Grid>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={6}
        marginTop={4}
      >
        <FormControl>
          <FormLabel htmlFor="phone" fontSize={"sm"} color={"#a6a6a6"}>
            Teléfono
          </FormLabel>

          <Input
            type="phone"
            fontSize={"sm"}
            id="phone"
            color={"white"}
            borderColor={"#636363"}
            focusBorderColor="#a6a6a6"
            placeholder="número de teléfono"
            {...register("phone", {
              required: "Este campo es obligatorio",
            })}
          />
          {errors.phone && <MessageError>{errors.phone.message}</MessageError>}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email" fontSize={"sm"} color={"#a6a6a6"}>
            Email
          </FormLabel>
          <Input
            fontSize={"sm"}
            type="email"
            id="email"
            color={"white"}
            borderColor={"#636363"}
            focusBorderColor="#a6a6a6"
            placeholder="Ej: correo@correo.com"
            {...register("email", {
              required: "Tu correo es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Ingresa un correo válido",
              },
            })}
          />
          {errors.email && <MessageError>{errors.email.message}</MessageError>}
        </FormControl>
      </Grid>

      <FormControl marginTop={5}>
        <FormLabel htmlFor="address" fontSize={"sm"} color={"#a6a6a6"}>
          Especialidad
        </FormLabel>
        <Textarea
          resize={"none"}
          fontSize={"sm"}
          id="address"
          color={"white"}
          borderColor={"#636363"}
          focusBorderColor="#a6a6a6"
          {...register("specialty", {
            required: "Este campo es requerido",
          })}
        />
        {errors.specialty && (
          <MessageError>{errors.specialty.message}</MessageError>
        )}
      </FormControl>

      <label
        className="block mt-5 mb-2 text-sm text-brown-200"
        htmlFor="imagen"
      >
        Imagen de Perfil (opcional)
      </label>
      <input
        className="block w-full text-sm border rounded cursor-pointer border-white-800 focus:outline-none file:bg-Primary-500 file:text-white-500 file:border-none file:py-2 text-white-500"
        id="image"
        type="file"
        {...register("image")}
      />
    </ModalBody>
  );
};

export default BarberForm;
