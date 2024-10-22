import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { FaShoppingCart } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

const MenuHam = () => {
    return (
        <div>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<IoMdMenu className="text-brown-200 text-4xl" />}
                    variant={'ghost'}
                    _hover={{ bg: 'transparent' }}
                    _active={{ bg: 'transparent' }} 
                    _focus={{ boxShadow: 'none' }}
                />
                <MenuList

                    bg="#1f1f1f" 
                    color="white" 
                    border="none" 
                    _focusVisible={{ boxShadow: 'none' }} 
                    _focus={{ boxShadow: 'none' }}>
                    <MenuItem
                        className="flex justify-center"
                        bg="#1f1f1f"
                        _hover={{ bg: "#333333" }}
                    >
                        <Link to={'/app'} className="text-white-500 text-sm">Inicio</Link>
                    </MenuItem>
                    <MenuItem 
                        className="flex justify-center"
                        bg="#1f1f1f"
                        _hover={{ bg: "#333333" }} >
                        <Link to={'/app/about'} className="text-white-500 text-sm">Nosotros</Link>
                    </MenuItem>
                    <MenuItem 
                        className="flex justify-center"
                        bg="#1f1f1f"
                        _hover={{ bg: "#333333" }} >
                        <Link to={'/app/products'} className="text-white-500 text-sm">Productos</Link>
                    </MenuItem>
                    <MenuItem 
                        className="flex justify-center"
                        bg="#1f1f1f"
                        _hover={{ bg: "#333333" }}>
                        <Link to={'/app/my-appointment'} className="text-white-500 text-sm">Mis Citas</Link>
                    </MenuItem>
                    <MenuItem 
                        className="flex justify-center"
                        bg="#1f1f1f"
                        _hover={{ bg: "#333333" }}>
                        <Link to={'/app/shop'} className="text-Primary-500 text-md">
                            <FaShoppingCart />
                        </Link>
                    </MenuItem>
                    <div className="px-3 my-3 flex justify-center">
                        <ProfileMenu />
                    </div>
                    <MenuItem 
                        className="flex justify-center"
                        bg="#1f1f1f"
                        _hover={{ bg: "#333333" }}>
                        <Link to={'/app/appointment'} className="text-white-500 px-4 py-2 rounded-lg bg-Primary-500 hover:bg-Primary-600 duration-300 w-full justify-center flex gap-x-2 items-center text-sm ">
                            Haz Tu cita
                        </Link>
                    </MenuItem>
                </MenuList>
            </Menu>

        </div>

    )
}

export default MenuHam