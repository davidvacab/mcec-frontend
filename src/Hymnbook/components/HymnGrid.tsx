import React from "react";
import { Box, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useHymns from "../hooks/useHymns";
import HymnCardRow from "./HymnCardRow";
import HymnCardRowSkeleton from "./HymnCardRowSkeleton";
import HymnCardRowContainer from "./HymnCardRowContainer";
import InfiniteScroll from "react-infinite-scroll-component";

const HymnGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useHymns();
  const skeletons = [1, 2, 3, 4, 5];

  const fetchHymnsCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <Box>
      {error && <Text>{error.message}</Text>}
      <InfiniteScroll
        dataLength={fetchHymnsCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <SimpleGrid
          //columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={5}
          p={8}
          w={"100%"}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <HymnCardRowContainer key={skeleton}>
                <HymnCardRowSkeleton />
              </HymnCardRowContainer>
            ))}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((hymn) => (
                <HymnCardRowContainer key={hymn.slug}>
                  <HymnCardRow hymn={hymn} />
                </HymnCardRowContainer>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  );
};

export default HymnGrid;
