import {
  Spinner,
  VStack,
  Wrap,
  useColorModeValue
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AudioPlaylist from "../Hymnbook/components/AudioPlaylist";
import HymnCard from "../Hymnbook/components/HymnCard";
import PDFViewer from "../Hymnbook/components/PDFViewer";
import useHymn from "../Hymnbook/hooks/useHymn";
import useDocumentTitle from "../hooks/useDocumentTitle";

const HymnDetailPage = () => {
  const { id } = useParams();
  const { data: hymn, isLoading, error } = useHymn(id!);
  useDocumentTitle(hymn?.title!);

  if (isLoading) return <Spinner />;

  if (error || !hymn) throw error;

  return (
    <Wrap
      spacing={5}
      padding={5}
      justify={"center"}
      align={"center"}
      width={"100%"}
      minH={"100vh"}
      bg={useColorModeValue("white", "gray.900")}
    >
      <VStack maxWidth={"400px"} w={"100%"} alignContent={"center"}>
        <HymnCard hymn={hymn} />
        <AudioPlaylist audios={hymn.audio_set} />
      </VStack>
      <PDFViewer pdfURL={hymn.pdf_file} />
    </Wrap>
  );
};

export default HymnDetailPage;
