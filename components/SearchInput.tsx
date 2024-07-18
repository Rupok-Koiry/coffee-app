import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { COLORS } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";

type SearchInputProps = {
  searchCoffee: (text: string) => void;
  resetSearchCoffee: () => void;
};

const SearchInput = ({ searchCoffee, resetSearchCoffee }: SearchInputProps) => {
  const [searchText, setSearchText] = useState("");
  return (
    <View className="flex-row m-8 rounded-xl bg-primary-dark-grey items-center">
      <TouchableOpacity
        onPress={() => {
          searchCoffee(searchText);
        }}
      >
        <Ionicons
          style={{ marginHorizontal: 16 }}
          className="m-4"
          name="search"
          size={18}
          color={
            searchText.length > 0
              ? COLORS.primaryOrangeHex
              : COLORS.primaryLightGreyHex
          }
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Find Your Coffee..."
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          searchCoffee(text);
        }}
        placeholderTextColor={COLORS.primaryLightGreyHex}
        className="flex-1 font-poppins-medium text-sm text-primary-white h-12"
        cursorColor={"#FFA451"}
      />
      {searchText.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            setSearchText("");
            resetSearchCoffee();
          }}
        >
          <Ionicons
            style={{ marginHorizontal: 16 }}
            name="close"
            size={16}
            color={COLORS.primaryLightGreyHex}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SearchInput;
