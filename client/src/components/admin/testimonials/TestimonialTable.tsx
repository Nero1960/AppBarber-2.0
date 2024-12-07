import { Testimonial, Testimonials } from "@/types/index"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Trash2 } from 'lucide-react'
import { formatDate } from "@/utils/formatDate"
import { Badge } from "@/components/ui/badge"
import { statusTranslationTestimonials } from "@/lib/StatusTranslate"
import TestimonialViewModal from "./TestimonialViewModal"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTestimonial } from "@/api/TestimonialApi"
import { toast } from "sonner"

type TestimonialTableType = {
    testimonials: Testimonials
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending': return 'bg-yellow-500 hover:bg-yellow-600'
        case 'rejected': return 'bg-red-500 hover:bg-red-600'
        case 'approved': return 'bg-green-500 hover:bg-green-600'
        default: return 'bg-gray-500 hover:bg-gray-600'
    }
}
const TestimonialTable = ({ testimonials }: TestimonialTableType) => {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteTestimonial,
        onError: (error) => {
            toast.error(error.message);
        },

        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['testimonialAdmin'] });
        }
    })

    const handleClickDeleteTestimonial = (testimonialId: Testimonial['testimonialId']) => {
        const confirmDeleteTestimonial = confirm('Quieres eliminar este testimonial?')

        if (confirmDeleteTestimonial) {
            mutate(testimonialId)
        }
    }

    return (
        <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#D6A354] mb-6">Testimoniales</h2>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-[#2A2A2A] transition-colors">
                            <TableHead className="text-[#D6A354]">Cliente</TableHead>
                            <TableHead className="text-[#D6A354]">Título</TableHead>
                            <TableHead className="text-[#D6A354]">Fecha de publicación</TableHead>
                            <TableHead className="text-[#D6A354]">Estado Actual</TableHead>
                            <TableHead className="text-[#D6A354]">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.map((testimonial) => (
                            <TableRow key={testimonial.testimonialId} className="hover:bg-[#2A2A2A] transition-colors">
                                <TableCell className="text-[#F7F7F7]">
                                    <div className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarImage src={`${import.meta.env.VITE_IMAGE_URL}/${testimonial.user.image}`} alt={`${testimonial.user.name} ${testimonial.user.lastname}`} />
                                            <AvatarFallback>{testimonial.user.name[0]}{testimonial.user.lastname[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-bold">{testimonial.user.name}</div>
                                            <div className="text-sm opacity-50">{testimonial.user.lastname}</div>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell className="text-[#F7F7F7]">{testimonial.title}</TableCell>
                                <TableCell className="text-[#F7F7F7]">{formatDate(testimonial.date)}</TableCell>
                                <TableCell>
                                    <Badge className={`${getStatusColor(testimonial.status)} text-white-500`}>
                                        {statusTranslationTestimonials[testimonial.status]}
                                    </Badge>

                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="bg-Primary-500 border-none text-[#0F0F0F] hover:bg-[#B88A45] hover:text-[#F7F7F7]"
                                            onClick={() => navigate(location.pathname + `?testimonial=${testimonial.testimonialId}`)}

                                        >
                                            <Eye className="h-4 w-4 text-white-500" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="bg-red-500 text-white hover:bg-red-600 border-none"
                                            onClick={() => handleClickDeleteTestimonial(testimonial.testimonialId)}
                                        >
                                            <Trash2 className="h-4 w-4 text-white-50" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TestimonialViewModal />
            </div>
        </div>
    )
}

export default TestimonialTable