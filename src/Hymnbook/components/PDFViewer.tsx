import {
  Box,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { cardBgColor, cardBorderColor } from "../../theme";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface Props {
  pdfURL: string;
}

const PDFViewer = ({ pdfURL }: Props) => {
  const baseURL = "http://127.0.0.1:8000";
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState(1);

  const responsiveWidth = useBreakpointValue({
    base: 320,
    md: 500,
    lg: 550,
    xl: 650,
  });

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: PDFDocumentProxy) => {
    setNumPages(nextNumPages);
  };
  const onNextPage = () => {
    pageNumber < numPages && setPageNumber(pageNumber + 1);
  };

  const onPreviousPage = () => {
    pageNumber > 1 && setPageNumber(pageNumber - 1);
  };

  return (
    <Box
      borderRadius={10}
      borderWidth={1}
      borderColor={cardBorderColor()}
      bg={cardBgColor()}
    >
      <HStack spacing={5} justifyContent={"center"} my={3}>
        <IconButton
          variant="ghost"
          icon={<BsFillArrowLeftSquareFill size={"30px"} />}
          size={"md"}
          onClick={onPreviousPage}
          aria-label="Previous Page"
        />
        <Text>
          Page {pageNumber} of {numPages}
        </Text>
        <IconButton
          variant="ghost"
          icon={<BsFillArrowRightSquareFill size={"30px"} />}
          size={"md"}
          onClick={onNextPage}
          aria-label={"Next Page"}
        />
      </HStack>
      <Document
        file={{ url: baseURL + decodeURI(pdfURL) }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} width={responsiveWidth} />
      </Document>
    </Box>
  );
};

export default PDFViewer;
