import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import newsCategoryList from '@/constants/Categories';

type Props = {
    onCategoryChanged: (category: string) => void;
};

const Categories = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectedCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);

        // Measure the position of the selected item
        selected?.measureLayout(scrollRef.current as any, (x, y, width, height) => {
            const scrollViewWidth = 350; // This should be dynamic, but you can set the width of your scrollview
            const padding = 20; // Adjust padding if needed

            // Only scroll if the item is out of the visible area
            if (x + width > scrollViewWidth || x < 0) {
                scrollRef.current?.scrollTo({ x: x - padding, y: 0, animated: true });
            }
        });

        onCategoryChanged(newsCategoryList[index].slug);
    };

    return (
        <View>
            <Text style={styles.Title}>Trending Right Now</Text>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {newsCategoryList.map((item, index) => (
                    <TouchableOpacity
                        ref={(el) => (itemRef.current[index] = el)}
                        key={index}
                        style={[styles.item, activeIndex === index && styles.itemActive]}
                        onPress={() => handleSelectedCategory(index)}
                    >
                        <Text style={[styles.itemText, activeIndex === index && styles.itemTextActive]}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    container: {
        gap: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    Title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    item: {
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    itemActive: {
        backgroundColor: Colors.tint,
        borderColor: Colors.tint,
    },
    itemText: {
        fontSize: 14,
        color: Colors.darkGrey,
        letterSpacing: 0.5,
    },
    itemTextActive: {
        fontWeight: '600',
        color: Colors.white,
    },
});