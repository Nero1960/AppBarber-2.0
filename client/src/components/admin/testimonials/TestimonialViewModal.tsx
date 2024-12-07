import { getTestimonialById, updateTestimonialStatus } from '@/api/TestimonialApi';
import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { statusTranslationTestimonials } from '@/lib/StatusTranslate';
import { Testimonial } from '@/types/index';
import { formatDate } from '@/utils/formatDate';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CalendarIcon, MessageSquare } from 'lucide-react';
import { IoStarSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from 'sonner';

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending': return 'bg-yellow-500 hover:bg-yellow-600'
        case 'rejected': return 'bg-red-500 hover:bg-red-600'
        case 'approved': return 'bg-green-500 hover:bg-green-600'
        default: return 'bg-gray-500 hover:bg-gray-600'
    }
}

const TestimonialViewModal = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const testimonialId = +queryParams.get('testimonial')!;


    const { data } = useQuery({
        queryKey: ['testimonialAdmin', testimonialId],
        queryFn: () => getTestimonialById(testimonialId),
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!testimonialId, // Mostrar el modal solo si hay un testimonialID
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateTestimonialStatus,
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ['testimonialAdmin']})
            navigate(location.pathname, {replace: true})
        }
    })

    const handleChangeTestimonialStatus = (status : Testimonial['status']) => {
        const data = {
            testimonialId,
            status
        }
        mutate(data);
    }

    const navigate = useNavigate();

    const showModal = testimonialId ? true : false;

    if (data) return (
        <Modal size={'lg'} onClose={() => navigate(location.pathname, { replace: true })} isOpen={showModal} isCentered>
            <ModalOverlay />
            <ModalContent bg="#1f1f1f" color={'#f7f7f7'} padding={5}>
                <ModalHeader className='text-white-600'></ModalHeader>
                <ModalCloseButton border={'none'} />
                <ModalBody>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={`${import.meta.env.VITE_IMAGE_URL}/${data.user.image}`} alt='image user' />
                                <AvatarFallback className="bg-[#D6A354] text-[#0F0F0F]">JD</AvatarFallback>
                            </Avatar>
                            <div className='flex justify-between items-center w-full'>
                                <div>
                                    <h3 className="text-xl font-semibold">{data.user.name} {data.user.lastname}</h3>
                                    <Badge className={`${getStatusColor(data.status)} text-white-500`}>{statusTranslationTestimonials[data.status]}</Badge>
                                </div>

                                <div className='flex flex-col gap-y-2'>
                                    <label htmlFor='status' className='text-sm'>Cambiar Estado a:</label>
                                    <select
                                        className={`bg-brown-400 px-4 py-1 text-xs font-bold rounded-3xl`}
                                        name="status"
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => handleChangeTestimonialStatus(e.target.value as Testimonial['status'])}
                                        
                                    >
                                        <option value="pending">Pendiente</option>
                                        <option value="approved">Aprobado</option>
                                        <option value="rejected">Rechazado</option>
                                    </select>

                                </div>


                            </div>
                        </div>
                        <div className='space-y-3'>
                            <div className='flex flex-col space-y-3'>
                                <div className='icons flex gap-x-0'>
                                    <IoStarSharp className="h-5 w-5  text-[#D6A354]" />
                                    <IoStarSharp className="h-5 w-5  text-[#D6A354]" />
                                    <IoStarSharp className="h-5 w-5  text-[#D6A354]" />
                                    <IoStarSharp className="h-5 w-5  text-[#D6A354]" />
                                    <IoStarSharp className="h-5 w-5  text-[#D6A354]" />
                                </div>

                                <h1>{data.title}</h1>
                            </div>
                            <p className="text-sm opacity-70 flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-2 text-[#D6A354]" />
                                {formatDate(data.date)}
                            </p>
                        </div>
                        <div className="p-4 rounded-md">
                            <p className="text-[#F7F7F7] italic flex">
                                <MessageSquare className="h-5 w-5 mr-2 text-[#D6A354] flex-shrink-0" />
                                `"{data.message}"`
                            </p>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => navigate(location.pathname, { replace: true })} bg={'#d6a354'} _hover={{ bg: '#c1872e' }} color={'#f7f7f7'}>Cerrar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default TestimonialViewModal