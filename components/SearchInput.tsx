import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";

type SearchInputProps = {
  onSearch: (text: string) => void;
};

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchText, setSearchText] = useState("");

  return (
    <View className="flex-row my-5 rounded-xl bg-primary-dark-grey items-center border border-primary-grey">
      <TouchableOpacity onPress={() => onSearch(searchText)}>
        <Ionicons
          style={{ marginHorizontal: 12 }}
          name="search"
          size={16}
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
        }}
        placeholderTextColor={COLORS.primaryLightGreyHex}
        className="flex-1 font-poppins-medium text-sm text-primary-white py-3"
        cursorColor={COLORS.primaryOrangeHex}
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
            color={COLORS.primaryLightGreyHex}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;
