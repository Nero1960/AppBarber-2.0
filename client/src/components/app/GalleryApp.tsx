import { Grid, GridItem, Image } from "@chakra-ui/react"
import AnimationApp from "./AnimationApp"

const GalleryApp = () => {
    return (
        <AnimationApp>
            <div id="gallery" className="px-8 lg:px-0 py-20 max-w-4xl mx-auto">
                <div className="service-info space-y-3 text-white-500 text-center">
                    <h2 className="text-white font-heading text-4xl">Galería de cortes</h2>
                    <p className="text-xs leading-5 lg:w-[25rem] mx-auto">Descubre los cortes que definen nuestro estilo. Cada imagen, una inspiración</p>
                </div>

                <Grid
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(8, 1fr)'
                    gap={4}
                    marginTop={'2rem'}
                >

                    <GridItem rowSpan={2} colSpan={3}> <video src={'/videos/video1.mp4'} autoPlay muted loop className="h-full object-cover"></video> </GridItem>


                    <GridItem colSpan={2} colStart={4} colEnd={6}><Image loading="lazy" objectFit={'cover'} height={'100%'} src={'/imagen3.webp'} /></GridItem>

                    <GridItem colSpan={2} colStart={6} colEnd={10}><Image loading="lazy" objectFit={'cover'} height={'100%'} src={'/imagen4.webp'} /></GridItem>

                
                    <GridItem rowSpan={2} colStart={4} colEnd={10}><Image loading="lazy" objectFit={'cover'} height={'100%'} src={'/citas.webp'} /></GridItem>
                </Grid>
            </div>
        </AnimationApp>
    )
}

export default GalleryApp