import { Grid, GridItem, Image } from "@chakra-ui/react"
import gallery1 from '@/public/galeria1.jpg'
import gallery2 from '@/public/galeria2.jpg'
import gallery3 from '@/public/galeria3.jpg'
import gallery4 from '@/public/citas.jpg'
import video from '@/public/videos/video1.mp4'
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

                    <GridItem rowSpan={2} colSpan={2}> <video src={video} autoPlay muted loop className="h-full object-cover"></video> </GridItem>


                    <GridItem colSpan={2} colStart={3} colEnd={5}><Image loading="lazy" objectFit={'cover'} height={'100%'} src={gallery3} /></GridItem>

                    <GridItem colSpan={2} colStart={5} colEnd={7}><Image loading="lazy" objectFit={'cover'} height={'100%'} src={gallery2} /></GridItem>

                    <GridItem colSpan={2} colStart={7} colEnd={9}><Image loading="lazy" objectFit={'cover'} height={'100%'} src={gallery1} /></GridItem>


                    <GridItem colStart={3} colEnd={9}><Image loading="lazy" objectFit={'cover'} height={'100%'} src={gallery4} /></GridItem>
                </Grid>
            </div>
        </AnimationApp>
    )
}

export default GalleryApp