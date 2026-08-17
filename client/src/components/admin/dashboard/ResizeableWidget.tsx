import { Box, Heading } from "@chakra-ui/react";
import { useResizeDetector } from "react-resize-detector";


interface Props {
    title: string;
    children: (
        width: number,
        height: number
    ) => React.ReactNode;
}


const ResizeableWidget = ({
    title,
    children
}: Props) => {


    const {
        width,
        height,
        ref
    } = useResizeDetector<HTMLDivElement>({
        refreshMode: "debounce",
        refreshRate: 50
    });


    return (
        <Box
            ref={ref}
            bg="brown.600"
            borderRadius="xl"
            p={4}
            resize="both"
            overflow="hidden"
            minW="350px"
            minH="350px"
            height="450px"
        >

            <Heading
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="wide"
                color="Primary.500"
                mb={4}
            >
                {title}
            </Heading>


            <Box
                width="100%"
                height="calc(100% - 35px)"
            >

                {
                    width && height &&
                    children(
                        width,
                        height - 40
                    )
                }

            </Box>

        </Box>
    );
};


export default ResizeableWidget;