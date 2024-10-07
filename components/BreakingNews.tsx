import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { NewsDataType } from '@/types';
import SliderItem from './SliderItem';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import Pagination from "@/components/Pagination";

type Props = {
  newsList: Array<NewsDataType>;
};

const BreakingNews = ({ newsList }: Props) => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
      // Calculate the index from the scroll position
      const index = Math.floor(e.contentOffset.x / e.layoutMeasurement.width);
      // Update pagination index
      runOnJS(setPaginationIndex)(index);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Breaking News</Text>
      <View style={styles.sideWrapper}>
        <Animated.FlatList
          data={newsList} // Use original newsList
          ref={ref}
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({ item, index }) => (
            <SliderItem slideItem={item} index={index} scrollX={scrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            // Example: Load more data logic
            // setData([...data, ...newsList]); // Avoid modifying the original newsList
          }}
        />
        <Pagination items={newsList} paginationIndex={paginationIndex} scrollX={scrollX} />
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  Title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  sideWrapper: {
    justifyContent: 'center',
  },
});
