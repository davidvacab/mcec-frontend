import { Spinner, VStack, Wrap, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import AudioPlaylist from "../Hymnbook/components/AudioPlaylist";
import HymnCard from "../Hymnbook/components/HymnCard";
import PDFViewer from "../Hymnbook/components/PDFViewer";
import useHymn from "../Hymnbook/hooks/useHymn";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";

const HymnDetailPage = () => {
  const { id } = useParams();
  const { data: hymn, isLoading, error } = useHymn(id!);
  useDocumentTitle(hymn?.title!);
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const toast = useToast();

  if (isLoading) return <Spinner />;

  if (error || !hymn) {
    toast({
      title: t("label.error"),
      description: t("label.error"),
      status: "error",
      position: "top",
      duration: 9000,
      isClosable: true,
    });
    navigate("/", { replace: true });
    return;
  }

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
