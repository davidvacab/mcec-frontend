import { Card, CardBody, Divider, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import NavItem from "../../components/NavItem";
import Audio from "../entities/Audio";
import { cardStyles } from "../../theme/theme";
import { useTranslation } from "react-i18next";

interface Props {
  audios: Audio[];
}

const AudioPlaylist = ({ audios }: Props) => {
  const [currentTrack, setTrackIndex] = useState(0);
  const { t } = useTranslation("hymnbook");

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < audios.length - 1 ? currentTrack + 1 : 0
    );
  };

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? currentTrack + (audios.length - 1) : currentTrack - 1
    );
  };

  const handleEnd = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < audios.length - 1 ? currentTrack + 1 : currentTrack
    );
  };

  return (
    <Card w={"100%"} h={"100%"} {...cardStyles}>
      <CardBody
        p={2}
        sx={{
          ".rhap_button-clear,\
            .rhap_time": {
            color: "navy.700",
            _dark: {
              color: "white",
            },
          },
          ".rhap_progress-filled,\
            .rhap_progress-indicator,\
            .rhap_volume-filled,\
            .rhap_volume-indicator": {
            bg: "navy.700",
            _dark: {
              bg: "gray.600",
            },
          },
          ".rhap_download-progress,\
            .rhap_volume-bar": {
            bg: "gray.300",
            _dark: {
              bg: "gray.900",
            },
          },
          ".rhap_container": {
            background: "transparent",
            boxShadow: "none",
            p: 2,
          },
        }}
      >
        <AudioPlayer
          header={
            <Heading size={"md"} textAlign={"center"} my={1}>
              {t(`audio_voice.${audios[currentTrack].voice_type}`)}
            </Heading>
          }
          src={decodeURI(audios[currentTrack].audio_file)}
          showSkipControls={true}
          showJumpControls={false}
          showFilledVolume={true}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrevious}
          onEnded={handleEnd}
        />
        <Divider width={"100%"} />
        <VStack spacing={1} marginTop={5}>
          {audios.map((audio) => (
            <NavItem
              key={audio.id}
              selected={audio.id === audios[currentTrack].id}
              onClick={() =>
                setTrackIndex(
                  audios.findIndex((audioX) => audio.id === audioX.id)
                )
              }
            >
              {t(`audio_voice.${audio.voice_type}`)}
            </NavItem>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AudioPlaylist;
