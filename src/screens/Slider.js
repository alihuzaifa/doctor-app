import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';

const Slider = () => {
  
  const SliderItem = ({item, index}) => {
    const {width} = Dimensions();

    return (
      <View style={[styles.itemContainer, {width}]}>
        <Image source={item.src} style={styles.itemImage} />
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    );
  };
  return (
    <FlatList
      data={images}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => <SliderItem item={item} index={index} />}
      keyExtractor={item => {
        item?.id;
      }}
    />
  );
};

export default Slider;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
});
