import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { cardStyles } from "../../theme/theme";
import { useTranslation } from "react-i18next";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface Props {
  pdfURL: string;
}

const PDFViewer = ({ pdfURL }: Props) => {
  const { t } = useTranslation("hymnbook");
  const ref = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current?.clientWidth || !ref.current?.clientHeight) {
      return;
    }
    setWidth(ref?.current?.clientWidth - 5);
  }, []);

  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState(1);

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
      width={"100%"}
      maxWidth={580}
      minH={{
        base: 452,
        md: 812,
        lg: 877,
      }}
      flexShrink={"1 0 auto"}
      {...cardStyles}
      ref={ref}
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
          {t("page")} {pageNumber} {t("of")} {numPages}
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
        className={"Document"}
        file={{ url: decodeURI(pdfURL) }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page className="Page" pageNumber={pageNumber} width={width} />
      </Document>
    </Box>
  );
};

export default PDFViewer;
