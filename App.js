import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_DATA } from './data';
import { useMemo, useState } from 'react';
import { Icon, Input } from 'react-native-elements';

export default function App() {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query) return MOCK_DATA

    return MOCK_DATA.filter(item => item.name.toLowerCase().includes(query.toLowerCase()) || item.code.toLowerCase().includes(query.toLowerCase()))
  }, [query, MOCK_DATA])

  const handleInputChange = (value) => {
    setQuery(value)
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Input
          placeholder="Search by name or symbol"
          value={query}
          leftIcon={{ type: 'font-awesome', name: 'search', size: 18, iconStyle: {margin: 12} }}
          onChangeText={handleInputChange}
          inputContainerStyle={styles.input}
          inputStyle={{
            fontSize: 14
          }}
        />
        <ScrollView style={styles.listContainer}>
          {
            filteredItems.map(item => (
              <TouchableOpacity key={item.id}>
                <View style={styles.item}>
                  <View style={{
                    flex: "10%"
                  }}>
                    <Icon
                      type='font-awesome'
                      name="wordpress"
                    />
                  </View>
                  <View style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    flex: "50%",
                    marginLeft: 8
                  }}>
                    <View>
                      <Text style={{
                        fontWeight: 700
                      }}>
                        {item.code}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ opacity: 0.6 }}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                  <View style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    flex: "10%"
                  }}>
                    <View>
                      <Text style={{
                        fontWeight: 700,
                        fontSize: 18
                      }}>
                        ${item.price}
                      </Text>
                    </View>
                    <View>
                      <Text style={{
                        color: item.variation < 0 ? "red" : "green",
                        fontWeight: 600
                      }}>
                        ${item.variation} {`(${(item.variationPercentage * 100).toFixed(2)}%)`}
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: "10%", justifyContent: "flex-end", alignItems: "flex-end"}}>
                    <Icon type="font-awesome" name="chevron-right" size={12} color="gray" />
                  </View>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100vw",
    height: "100%",
    margin: 5
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    padding: 10
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    width: "90%",
    margin: 15,
    borderRadius: 5,
    fontSize: 12
  },
  listContainer: {
    gap: 10,
    width: "100%",
    paddingHorizontal: 15
  }
});
