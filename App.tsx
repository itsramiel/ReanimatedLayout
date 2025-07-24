import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

function App() {
  const [data, setData] = useState(() => [1]);

  const onPress = () => {
    const firstItem = data[0];
    setData(prev => [firstItem - 1, ...prev]);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Button title="press me" onPress={onPress} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
      />
    </SafeAreaView>
  );
}

function renderItem(props: ListRenderItemInfo<number>) {
  return <ListItem {...props} />;
}

function ListItem({ item }: ListRenderItemInfo<number>) {
  const [displayTrailingView, setDisplayTrailingView] = useState(false);

  useEffect(() => {
    if (!displayTrailingView) return;

    const timerId = setTimeout(() => {
      setDisplayTrailingView(false);
    }, 5000);

    return () => clearTimeout(timerId);
  }, [displayTrailingView]);

  return (
    <View style={styles.listItem}>
      <View style={styles.listLeading}>
        <Text>{item}</Text>
        <Button title="press me" onPress={() => setDisplayTrailingView(true)} />
      </View>
      {displayTrailingView ? (
        <Animated.View
          entering={FadeIn.duration(2000)}
          exiting={FadeOut.duration(2000)}
          style={styles.listTrailing}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 12,
  },
  listItem: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listLeading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listTrailing: {
    backgroundColor: 'red',
    width: 25,
    height: 25,
  },
  text: {
    fontSize: 16,
  },
});

export default App;
