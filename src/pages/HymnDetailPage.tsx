import { Spinner, VStack, Wrap } from "@chakra-ui/react";
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
      minH={"calc(100vh - 20)"}
    >
      <VStack maxWidth={"380px"} w={"100%"} alignContent={"center"}>
        <HymnCard hymn={hymn} />
        {hymn.audio_files.length !== 0 && (
          <AudioPlaylist audios={hymn.audio_files} />
        )}
      </VStack>
      <PDFViewer pdfURL={hymn.pdf_file} />
    </Wrap>
  );
};

export default HymnDetailPage;
