import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    Avatar,
    Divider
} from '@chakra-ui/react'
import { FaUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { MdPrivacyTip } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore';
import { RiLockPasswordFill } from "react-icons/ri";


const ProfileMenu = () => {


    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const clearUser = useAuthStore((state) => state.clearUser);

    const handleClickLogOut = () => {

        //eliminamos el JWT
        localStorage.removeItem('AUTH_TOKEN');

        //borramos el usuario de la store
        clearUser();

        //ir al login
        navigate('/');
    }


    if (user) return (
        <div className='cursor-pointer'>
            <Menu>
                <MenuButton as={Avatar} size={'sm'} src={`${import.meta.env.VITE_IMAGE_URL}/${user.image}`} />
                <MenuList
                    bg="#1f1f1f"
                    color="#a6a6a6"
                    border="none"
                    _focusVisible={{ boxShadow: 'none' }}
                    _focus={{ boxShadow: 'none' }}
                >
                    <MenuGroup title={`${user.admin ? `${user.name} ${user.lastname} (Admin)` : `${user.name} ${user.lastname}`}`} color="white" className='font-bold text-xl'>
                        
                        
                        <MenuItem bg="#1f1f1f" _hover={{ color: "white" }} >
                            <Link to={`${user.admin ? '/admin/profile' : `/app/profile`}`} className='flex items-center text-sm gap-x-2'>
                                <FaUser /> Mi Perfil
                            </Link>
                        </MenuItem>

                        <MenuItem bg="#1f1f1f" _hover={{ color: "white" }} >
                            <Link to={`${user.admin ? `/admin/change-password/${user.userId}` : `/app/profile/change-password/${user.userId}`}`} className='flex items-center text-sm gap-x-2'>
                                <RiLockPasswordFill /> Cambiar Contraseña
                            </Link>
                        </MenuItem>

                        <MenuItem
                            bg="#1f1f1f"
                            _hover={{ color: 'white' }}
                            className='flex items-center text-sm gap-x-2'
                            onClick={handleClickLogOut}
                        >
                            <IoLogOut /> Log Out
                        </MenuItem>
                    </MenuGroup>


                    {!user.admin && (
                        <>
                            <Divider />
                            <MenuGroup title={`Ayuda`} color="white" className='font-bold text-xl'>
                                <MenuItem bg="#1f1f1f" _hover={{ color: "white" }} >
                                    <Link to={`/app/policy`} className='flex items-center text-sm gap-x-2'>
                                        <MdPrivacyTip /> Política de citas
                                    </Link>
                                </MenuItem>
                            </MenuGroup>
                        </>

                    )}


                </MenuList>
            </Menu>

        </div>

    )
}

export default ProfileMenu