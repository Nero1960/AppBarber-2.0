import { useAuthStore } from "@/store/authStore"
import {
    Avatar,
    Textarea
} from "@chakra-ui/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import UpdateModalProfileApp from "@/components/app/UpdateModalProfileApp";


const ProfileAppView = () => {


    const user = useAuthStore(store => store.user);

    const [showModal, setShowModal] = useState(false);

    const handleClickShowModal = () => setShowModal(true);

    if (user) return (
        <main className="my-20 px-8 lg:px-0 max-w-4xl mx-auto w-full animate-fade-up animation-delay-1000">

            <form className="rounded-md shadow-2xl bg-brown-500">
                <legend
                    className="flex flex-col justify-center items-center text-xl font-bold gap-y-2 text-white-500"
                >
                    <Avatar marginTop={'-4rem'} size={'2xl'} src={`${import.meta.env.VITE_IMAGE_URL}/${user?.image}`} />

                    {user.name} {" "}{user.lastname}
                </legend>


                <div className="info px-5 lg:px-36 py-10">
                    <h3 className="text-white-500 mb-2">Información de perfil</h3>

                    <div className="grid lg:grid-cols-2 gap-5">

                        <div>
                            <Label className="text-brown-200">Nombre</Label>
                            <Input
                                readOnly
                                type="name"
                                id="name"
                                className="bg-transparent border-white-800 text-white-500 placeholder:text-brown-200"
                                placeholder="Tu Nombre"
                                value={user.name}
                            />

                        </div>


                        <div>
                            <Label className="text-brown-200">Apellido</Label>
                            <Input
                                readOnly
                                type="lastname"
                                id="lastname"
                                className="bg-transparent border-white-800 text-white-500 placeholder:text-brown-200"
                                placeholder="Tu Nombre"
                                value={user.lastname}
                            />

                        </div>


                    </div>


                    <div className="grid lg:grid-cols-2 gap-5 mt-5">

                        <div>
                            <Label className="text-brown-200">Teléfono</Label>
                            <Input
                                readOnly
                                type="phone"
                                id="phone"
                                className="bg-transparent border-white-800 text-white-500 placeholder:text-brown-200"
                                placeholder=""
                                value={user.phone}
                            />

                        </div>


                        <div>
                            <Label className="text-brown-200">Email</Label>
                            <Input
                                readOnly
                                type="email"
                                id="email"
                                className="bg-transparent border-white-800 text-white-500 placeholder:text-brown-200"
                                placeholder="Tu Nombre"
                                value={user.email}
                            />

                        </div>


                    </div>

                    <div className="mt-5">
                        <Label className="text-brown-200">Dirección</Label>
                        <Textarea
                            readOnly
                            id="address"
                            fontSize={'small'}
                            color={'white'}
                            borderColor={' #636363'}
                            _hover={{borderColor: '#636363'}}
                            _focus={{borderColor: 'white', borderWidth:'2px'}}
                            resize={'none'}
                            value={user.address ? user.address : ""}
                        />


                    </div>

                    <Input
                        type="button"
                        value={'Editar Perfil'}
                        className="mt-8 bg-Primary-500 hover:cursor-pointer hover:bg-Primary-600 duration-300 border-none text-white-400"
                        onClick={handleClickShowModal}
                    />


                </div>

                {showModal && <UpdateModalProfileApp showModal={showModal} setShowModal={setShowModal} user={user} />}
            </form>
        </main>
    )
}

export default ProfileAppView