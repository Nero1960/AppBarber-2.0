import { User, UserUpdate } from "@/types/index";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    Grid,
    Textarea,
    Spinner,
} from "@chakra-ui/react";
import { FaUserPen } from "react-icons/fa6";
import { useForm } from 'react-hook-form'
import MessageError from "../MessageError";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/api/ProfileApi";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";


type UpdateDrawerProfileAppProps = {
    user: User,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}


const UpdateModalProfileApp = ({ user, showModal, setShowModal }: UpdateDrawerProfileAppProps) => {

    //Función que actualiza el estado global de usuario
    const userUpdate = useAuthStore(state => state.updateUser);


    //valores iniciales del useForm
    const initialValues: UserUpdate = {
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        address: user.address || null,
        email: user.email,
        image: user.image
    }

    //uso del useForm para validar y manejar los datos del formulario
    const { register, formState: { errors }, handleSubmit } = useForm<UserUpdate>(
        { defaultValues: initialValues }
    );


    //mutamos la actualización
    const { mutate , isPending } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: (data) => {
            toast.success('Perfil actualizado correctamente');
            setShowModal(false);

            if(data){
                //Actualizar el estado global de usuario
                userUpdate(data)
            }
        }

    })

    //Actualizar el formulario
    const handleSubmitUpdateProfile = (formData: UserUpdate) => {
        
        //Utilizamos formData para enviar archivos desde el formulario
        const updateFormData = new FormData();

        updateFormData.append('name', formData.name);
        updateFormData.append('lastname', formData.lastname);
        updateFormData.append('phone', formData.phone);
        updateFormData.append('address', formData.address ? formData.address : '');
        updateFormData.append('email', formData.email);

        //Si se subió una imagen agregamos al formData
        if(formData.image[0]){
            updateFormData.append('image', formData.image[0]);
        }

        //Creamos los datos a pasar al mutate
        const data = {
            userId : user.userId,
            formData: updateFormData
        }

        //mutamos los datos
        mutate(data)
    }

    //cerrar el modal
    const Close = () => setShowModal(false);

    return (
        <>

            <Modal
                isOpen={showModal}
                onClose={Close}
                size={{ base: 'xs', md:'lg', lg: 'xl' }}
            >
                <ModalOverlay />

                <ModalContent
                    bg={'#1f1f1f'}
                    padding={2}
                    position={'relative'}
                >
                    <div
                        className="absolute top-0 left-[95%] -mt-5">
                        <FaUserPen className="text-4xl text-Primary-500" />
                    </div>
                    <ModalHeader
                        color={'white'}
                        className="flex items-center"
                        fontSize={'md'}
                        gap={2}
                    >
                        <FaUserPen /> Actualiza tu perfil
                    </ModalHeader>

                    <ModalCloseButton />

                    <form
                        noValidate
                        onSubmit={handleSubmit(handleSubmitUpdateProfile)}
                    >
                        <ModalBody pb={6}>
                            <Grid
                                templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
                                gap={6}
                            >
                                <FormControl>
                                    <FormLabel
                                        htmlFor="name"
                                        fontSize={'sm'}
                                        color={'#a6a6a6'}
                                    >
                                        Nombre
                                    </FormLabel>
                                    <Input
                                        type="name"
                                        id="name"
                                        color={'white'}
                                        borderColor={'#636363'}
                                        fontSize={'sm'}
                                        focusBorderColor="#a6a6a6"
                                        {...register('name', {
                                            required: 'El nombre es requerido'
                                        })}
                                    />
                                    {errors.name && <MessageError>{errors.name.message}</MessageError>}
                                </FormControl>

                                <FormControl>
                                    <FormLabel
                                        htmlFor="lastname"
                                        fontSize={'sm'}
                                        color={'#a6a6a6'}
                                    >
                                        Apellido
                                    </FormLabel>
                                    <Input
                                        type="lastname"
                                        id="lastname"
                                        color={'white'}
                                        borderColor={'#636363'}
                                        fontSize={'sm'}
                                        focusBorderColor="#a6a6a6"
                                        {...register('lastname', {
                                            required: 'El apellido es requerido'
                                        })}
                                    />
                                    {errors.lastname && <MessageError>{errors.lastname.message}</MessageError>}
                                </FormControl>
                            </Grid>

                            <Grid
                                templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
                                gap={6}
                                marginTop={4}
                            >
                                <FormControl>
                                    <FormLabel
                                        htmlFor="phone"
                                        fontSize={'sm'}
                                        color={'#a6a6a6'}
                                    >
                                        Teléfono
                                    </FormLabel>

                                    <Input
                                        type="phone"
                                        fontSize={'sm'}
                                        id="phone"
                                        color={'white'}
                                        borderColor={'#636363'}
                                        focusBorderColor="#a6a6a6"
                                        {...register('phone', {
                                            required: 'Tu numero es requerido'
                                        })}
                                    />
                                    {errors.phone && <MessageError>{errors.phone.message}</MessageError>}
                                </FormControl>

                                <FormControl>
                                    <FormLabel
                                        htmlFor="email"
                                        fontSize={'sm'}
                                        color={'#a6a6a6'}
                                    >
                                        Email
                                    </FormLabel>
                                    <Input
                                        fontSize={'sm'}
                                        type="email"
                                        id="email"
                                        color={'white'}
                                        borderColor={'#636363'}
                                        focusBorderColor="#a6a6a6"
                                        {...register('email', {
                                            required: 'Tu correo es requerido',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Ingresa un correo válido'
                                            }
                                        })}
                                    />
                                    {errors.email && <MessageError>{errors.email.message}</MessageError>}
                                </FormControl>
                            </Grid>

                            <FormControl
                                marginTop={5}
                            >
                                <FormLabel
                                    htmlFor="address"
                                    fontSize={'sm'}
                                    color={'#a6a6a6'}
                                >
                                    Dirección (opcional)
                                </FormLabel>
                                <Textarea
                                    resize={"none"}
                                    fontSize={'sm'}
                                    id="address"
                                    color={'white'}
                                    borderColor={'#636363'}
                                    focusBorderColor="#a6a6a6"
                                    {...register('address')}
                                />
                            </FormControl>

                            <label
                                className="block mb-2 text-sm text-brown-200 mt-5"
                                htmlFor="imagen"
                            >
                                Imagen de Perfil (opcional)
                            </label>
                            <input
                                className="block w-full text-sm border border-white-800 rounded cursor-pointer focus:outline-none file:bg-Primary-500 file:text-white-500 file:border-none file:py-2 text-white-500"
                                id="image"
                                type="file"
                                {...register('image')}
                            />
                        </ModalBody>

                        {isPending && (
                            <div className="flex justify-center items-center">
                                <Spinner/>
                            </div>
                        )}

                        <ModalFooter>
                            <Button
                                type="submit"
                                bg={'#d6a354'}
                                _hover={{ bg: '#d6a354' }}
                                color={'white'}
                                fontSize={'small'}
                                mr={3}
                            >
                                Actualizar Perfil
                            </Button>

                            <Button
                                bg={'transparent'}
                                _hover={{ bg: '#d6a354' }}
                                color={'white'}
                                fontSize={'small'}
                                onClick={Close}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>


        </>
    )
}

export default UpdateModalProfileApp