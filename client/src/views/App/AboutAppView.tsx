import { Box, Card, CardBody, CardHeader, Heading, Image, Stack, StackDivider, Text } from "@chakra-ui/react"

const AboutAppView = () => {
    return (
        <main className="py-10 px-8 lg:px-0 max-w-4xl mx-auto animate-fade-up animation-delay-1000">
            <div className="grid lg:grid-cols-2 gap-10">

                <div className="title">
                    <h1 className="text-3xl text-white-500 text-center lg:text-left font-heading leading-normal">Descubre la Esencia de Nuestra Barbería. Calidad, Estilo y Pasión.</h1>
                </div>

                <div></div>

                <div className="image">
                    <Image src={'/background.jpg'} alt="imagen grid" />
                </div>

                <Card bg={'#0f0f0f'}>
                    <CardHeader>
                        <Heading color={'#f7f7f7'} size='md'>Sobre Nosotros</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase' color={'#f7f7f7'}>
                                    Misión
                                </Heading>
                                <Text pt='2' fontSize='sm' color={'#a6a6a6'}>
                                    En Mojica's Barbershop, nuestra misión es ofrecer una experiencia de barbería excepcional que combine la tradición con la modernidad. Nos dedicamos a brindar servicios personalizados que reflejen la individualidad de cada cliente, asegurando un trato profesional y cálido en cada visita.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase' color={'#f7f7f7'}>
                                    Visión
                                </Heading>
                                <Text pt='2' fontSize='sm' color={'#a6a6a6'}>
                                    Nuestro objetivo es ser reconocidos como líderes en la industria de la barbería, proporcionando una calidad de servicio inigualable y creando un ambiente acogedor y sofisticado.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase' color={'#f7f7f7'}>
                                    Valores
                                </Heading>
                                <Text pt='2' fontSize='sm' color={'#a6a6a6'}>
                                    Valoramos la excelencia, la honestidad y la dedicación. Creemos en construir relaciones duraderas con nuestros clientes basadas en confianza y respeto. Nuestra pasión por el detalle y el compromiso con la satisfacción del cliente son el núcleo de nuestro trabajo diario.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase' color={'#f7f7f7'}>
                                    Nuestro Equipo
                                </Heading>
                                <Text pt='2' fontSize='sm' color={'#a6a6a6'}>
                                    Contamos con un equipo de barberos altamente capacitados y apasionados por su oficio. Cada miembro de nuestro equipo aporta su experiencia y creatividad para garantizar que cada cliente reciba un servicio personalizado y de alta calidad.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase' color={'#f7f7f7'}>
                                    Historia
                                </Heading>
                                <Text pt='2' fontSize='sm' color={'#a6a6a6'}>
                                    Fundada en el año {new Date().getFullYear() - 5}, Mojica's Barbershop ha crecido y evolucionado desde sus humildes comienzos. Nuestro compromiso con la calidad y la atención al cliente ha sido la clave de nuestro éxito.
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
            </div>
        </main>
    )
}

export default AboutAppView