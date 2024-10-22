import { addTestimonial } from "@/api/TestimonialApi"
import MessageError from "@/components/MessageError"
import Spinner from "@/components/Spinner"
import { TestimonialForm } from "@/types/index"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Textarea
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { toast } from "sonner"

type TestimonialAddModalProps = {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

// Componente que muestra el modal para añadir un comentario
const TestimonialAddModal = ({ setShowModal, showModal }: TestimonialAddModalProps) => {

    const initialValues: TestimonialForm = {
        title: '',
        message: ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<TestimonialForm>({
        defaultValues: initialValues
    });


    const { mutate, isPending } = useMutation({

        mutationFn: addTestimonial,
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: (data) => {
            toast.success(data)
            setShowModal(false)
            reset()
        }

    })

    const handleSubmitAddTestimonial = (formData: TestimonialForm) => mutate(formData);

    return (
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            size={{ base: 'xs', md: 'lg', lg: 'xl' }}
            isCentered
        >
            <ModalOverlay />

            <ModalContent
                bg={'#1f1f1f'}
                padding={2}
                position={'relative'}
            >

                <ModalHeader
                    color={'white'}
                    className="text-center "
                    fontSize={'md'}
                    gap={2}
                >
                    Déjanos un comentario sobre tu experiencia en <span className="text-Primary-500 block">Mojica's Barbershop</span>
                </ModalHeader>

                <form
                    noValidate
                    className="px-8"
                    onSubmit={handleSubmit(handleSubmitAddTestimonial)}
                >
                    <FormControl>
                        <FormLabel
                            htmlFor="title"
                            fontSize={'small'}
                            color={'white'}
                        >
                            Titulo
                        </FormLabel>

                        <Input
                            fontSize={'small'}
                            type="text"
                            color={'white'}
                            id="title"
                            width={'full'}
                            placeholder="Titulo del Testimonial"
                            focusBorderColor="white"
                            borderColor={'#a6a6a6'}
                            {...register('title', {
                                required: 'El titulo es requerido'
                            })}
                        />

                        {errors.title && <MessageError>{errors.title.message}</MessageError>}
                    </FormControl>

                    <FormControl className="mt-3">
                        <FormLabel
                            htmlFor="message"
                            color={'white'}
                            fontSize={'small'}

                        >
                            Mensaje
                        </FormLabel>

                        <Textarea
                            id="message"
                            fontSize={'small'}
                            color={'white'}
                            resize={'none'}
                            height={'10rem'}
                            placeholder="Deja tu comentario"
                            focusBorderColor="white"
                            borderColor={'#a6a6a6'}
                            {...register('message', {
                                required: 'El mensaje es requerido',
                            })}
                        />
                        {errors.message && <MessageError>{errors.message.message}</MessageError>}

                    </FormControl>

                    <button
                        type="submit"
                        className="text-center text-white bg-Primary-500 hover:bg-primary-400 py-2 px-4 rounded-md text-white-500 text-xs my-5 hover:bg-Primary-600 duration-300"
                    >
                        Publicar
                    </button>

                    {isPending && (
                        <div className="flex justify-between items-center">
                            <Spinner />
                        </div>
                    )}
                </form>
                <ModalCloseButton color={'white'} />
            </ModalContent>
        </Modal>
    )
}

export default TestimonialAddModal