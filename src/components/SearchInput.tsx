import { useColorScheme } from "nativewind";
import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

type SearchInputProps = {
  onSearch: (text: string) => void;
};

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const { search } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (search) setSearchText(search as string);
  }, [search]);

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View className="flex-row mb-5 rounded-xl bg-secondary-background items-center border border-primary-grey">
      <TouchableOpacity onPress={handleSearch}>
        <Ionicons
          style={{ marginHorizontal: 12 }}
          name="search"
          size={16}
          color={
            searchText.length > 0
              ? Colors[colorScheme].primaryOrangeHex
              : Colors[colorScheme].accentTextHex
          }
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Find Your Coffee..."
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
        }}
        placeholderTextColor={Colors[colorScheme].accentTextHex}
        className="flex-1 font-poppins-medium text-sm text-primary-text py-3"
        cursorColor={Colors[colorScheme].primaryOrangeHex}
        onSubmitEditing={handleSearch}
      />
      {searchText.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            setSearchText("");
          }}
        >
          <Ionicons
            style={{ marginHorizontal: 12 }}
            name="close"
            size={16}
            color={Colors[colorScheme].accentTextHex}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;
