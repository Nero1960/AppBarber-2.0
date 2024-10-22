import { Barber } from '@/types/index'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Avatar
} from '@chakra-ui/react'
import { BiLogoFacebookCircle } from 'react-icons/bi'
import { RiInstagramFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

type ModalBarberProp = {
    barber: Barber,
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalBarber = ({ barber, modal, setModal }: ModalBarberProp) => {

    const onClose = () => {
        setModal(false)
    }


    return (
        <>
            <Modal onClose={onClose} isOpen={modal} isCentered>
                <ModalOverlay />
                <ModalContent bg="#1f1f1f" color={'#f7f7f7'}>
                    <ModalHeader className='font-heading text-Primary-500'>{barber.name} {" "} {barber.lastname}</ModalHeader>
                    <ModalCloseButton border={'none'} />
                    <ModalBody className='flex flex-col items-center justify-center'>
                        <Avatar className='text-center' size={'2xl'} src={`${import.meta.env.VITE_IMAGE_URL}/${barber.image}`}/>
                        <div className='flex items-center justify-center  mt-5 text-2xl text-white-500 font-bold'>
                            <Link to={''}>
                                <BiLogoFacebookCircle />
                            </Link>

                            <Link to={''}>
                                <RiInstagramFill />
                            </Link>
                        </div>
                        <Text marginTop={'5px'} fontSize={'small'} className='lg:w-4/5 mx-auto text-center'>{barber.specialty}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} bg={'#d6a354'} _hover={{ bg: '#c1872e' }} color={'#f7f7f7'}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalBarber