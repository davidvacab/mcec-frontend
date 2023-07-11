import React from "react";
import { Box, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useHymns from "../hooks/useHymns";
import HymnCard from "./HymnCard";
import HymnCardSkeleton from "./HymnCardSkeleton";
import HymnCardContainer from "./HymnCardContainer";
import InfiniteScroll from "react-infinite-scroll-component";

const HymnGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useHymns();
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
          w={"100%"}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <HymnCardContainer key={skeleton}>
                <HymnCardSkeleton />
              </HymnCardContainer>
            ))}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((hymn) => (
                <HymnCardContainer key={hymn.id}>
                  <HymnCard hymn={hymn} />
                </HymnCardContainer>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  );
};

export default HymnGrid;
