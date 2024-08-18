import React, { useState } from "react";
import { useColorScheme } from "nativewind";
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  Text,
} from "react-native";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface InputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  secureTextEntry?: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

const Input = <T extends FieldValues>({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  iconName,
  rules,
  ...rest
}: InputProps<T>) => {
  const { colorScheme } = useColorScheme();
  const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);

  return (
    <View className="flex-row rounded-xl bg-primary-dark-grey items-center border border-primary-grey">
      <Ionicons
        style={{ marginHorizontal: 12 }}
        name={iconName}
        size={20}
        color={Colors[colorScheme].primaryOrangeHex}
      />
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors[colorScheme].accentTextHex}
            className="flex-1 font-poppins-medium text-sm text-primary-white py-3"
            cursorColor={Colors[colorScheme].primaryOrangeHex}
            secureTextEntry={isPasswordVisible}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setPasswordVisible((prev) => !prev)}>
          <Ionicons
            style={{ marginHorizontal: 16 }}
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={20}
            color={Colors[colorScheme].accentTextHex}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
