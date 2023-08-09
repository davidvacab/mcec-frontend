import {
  Box,
  Heading,
  IconButton,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import { cardOpaqueStyles } from "../theme/theme";
import { useTranslation } from "react-i18next";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Carousel = () => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState<Slider | null>(null);
  const { t } = useTranslation("home");
  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "95%", md: "87%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  const height = "750px";

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: t("carousel.1.title"),
      text: t("carousel.1.des"),
      image: "assets/cover.jpg",
    },
    {
      title: t("carousel.2.title"),
      text: t("carousel.2.des"),
      image: "assets/cover2.jpg",
    },
    {
      title: t("carousel.3.title"),
      text: t("carousel.3.des"),
      image: "assets/cover3.jpg",
    },
  ];

  return (
    <Box
      position={"relative"}
      height={height}
      width={"full"}
      overflow={"hidden"}
    >
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <IconButton
        borderRadius={20}
        {...cardOpaqueStyles}
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
        icon={<BiLeftArrowAlt size="40px" />}
      />
      <IconButton
        borderRadius={20}
        {...cardOpaqueStyles}
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
        icon={<BiRightArrowAlt size="40px" />}
      />
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={"6xl"}
            position="relative"
            overflow={"contain"}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            <Box height={height} px={1}>
              <VStack
                borderRadius={10}
                mx={{ md: 24 }}
                {...cardOpaqueStyles}
                spacing={6}
                p={5}
                position="relative"
                top={{ base: "80%", md: "86%" }}
                transform="translate(0, -50%)"
              >
                <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                  {card.title}
                </Heading>
                <Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                  {card.text}
                </Text>
              </VStack>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
