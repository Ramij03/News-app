import { StyleSheet, View } from 'react-native';
import React from 'react';
import { NewsDataType } from '@/types';
import Animated, { SharedValue } from 'react-native-reanimated';

type Props = {
  items: NewsDataType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const Pagination = ({ items, paginationIndex }: Props) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        const isActive = paginationIndex === index;
        return (
          <Animated.View
            style={[styles.dot, isActive && styles.activeDot]}
            key={index}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 2,
    backgroundColor: 'gray', // Inactive color
  },
  activeDot: {
    backgroundColor: 'black', // Active color
  },
});
