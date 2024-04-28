import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Reddit } from "./api/Reddit";
import { RedditItem } from "./components/RedditItem";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchReddit = async () => {
      const results = await Reddit.get("javascript");
      setItems(results);
    };
    fetchReddit();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <RedditItem item={item} />}
      ></FlatList>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
