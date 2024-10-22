import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { HiMiniArchiveBoxXMark } from "react-icons/hi2";
import { CiMenuKebab } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { AppointmentService } from '@/types/index';

type AppointmentListItemProps = {
    appointment: AppointmentService,
};

const AppointmentListItemMenu = ({ appointment }: AppointmentListItemProps) => {

    const navigate = useNavigate();

    return (
        <div className="mt-5 lg:mt-0">
            <Menu>
                <MenuButton as={'button'}>
                    <CiMenuKebab className="text-white-500 font-bold text-4xl" />
                </MenuButton>
                <MenuList bg={'#1f1f1f'}>
                    <MenuItem
                        bg={'#1f1f1f'}
                        color={'white'}
                        _hover={{ color: '#d6a354' }}
                        transitionProperty={'color'}
                        transitionDuration={'200ms'}
                        fontSize={'smaller'}
                        onClick={() => navigate(location.pathname + `?ViewAppointment=${appointment.appointmentId}`)}
                    >
                        <IoEyeSharp className="me-2" />
                        Ver Cita
                    </MenuItem>

                    {appointment.status === 'pending' && (
                        <>
                            <MenuItem
                                bg={'#1f1f1f'}
                                color={'white'}
                                _hover={{ color: '#d6a354' }}
                                fontSize={'smaller'}
                                transitionProperty={'color'}
                                transitionDuration={'200ms'}
                                onClick={() => navigate(location.pathname + `/update/${appointment.appointmentId}`)}
                            >
                                <FaPen className="me-2" />
                                Editar
                            </MenuItem>

                            <MenuItem
                                bg={'#1f1f1f'}
                                color={'white'}
                                _hover={{ color: '#d6a354' }}
                                fontSize={'smaller'}
                                transitionProperty={'color'}
                                transitionDuration={'200ms'}
                                onClick={() => navigate(location.pathname + `?CancelAppointment=${appointment.appointmentId}`)}
                            >
                                <HiMiniArchiveBoxXMark className="me-2" />
                                Cancelar
                            </MenuItem>
                        </>

                    )}


                </MenuList>
            </Menu>
        </div>
    )
}

export default AppointmentListItemMenu