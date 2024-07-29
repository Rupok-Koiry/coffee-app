export const COLORS = {
  primaryRedHex: "#DC3535",
  primaryOrangeHex: "#D17842",
  primaryBlackHex: "#0C0F14",
  primaryDarkGreyHex: "#141921",
  secondaryDarkGreyHex: "#21262E",
  primaryGreyHex: "#252A32",
  secondaryGreyHex: "#2C3038",
  primaryLightGreyHex: "#52555A",
  secondaryLightGreyHex: "#AEAEAE",
  primaryWhiteHex: "#FFFFFF",
  primaryBlackRGBA: "rgba(12,15,20,0.5)",
  secondaryBlackRGBA: "rgba(0,0,0,0.7)",
};

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/Input";

const AddProductScreen = () => {
  const { control, handleSubmit, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });
  const [imageSquare, setImageSquare] = useState(null);
  const [imagePortrait, setImagePortrait] = useState(null);

  const onSubmit = (data) => {
    const productData = {
      ...data,
      imagelink_square: imageSquare,
      imagelink_portrait: imagePortrait,
    };
    console.log(productData);
    reset();
    setImageSquare(null);
    setImagePortrait(null);
  };

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === "square" ? [1, 1] : [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === "square") {
        setImageSquare(result.assets[0].uri);
      } else {
        setImagePortrait(result.assets[0].uri);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Product</Text>
      <Input
        control={control}
        name="name"
        placeholder="Product Name"
        iconName="pricetag"
        rules={{ required: "Product Name is required" }}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textArea}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Description"
            multiline={true}
            numberOfLines={4}
          />
        )}
      />
      <Input
        control={control}
        name="roasted"
        placeholder="Roast Level"
        iconName="flame"
      />
      <Input
        control={control}
        name="ingredients"
        placeholder="Ingredients"
        iconName="nutrition"
      />
      <Input
        control={control}
        name="special_ingredient"
        placeholder="Special Ingredient"
        iconName="star"
      />

      <Text style={styles.label}>Prices</Text>
      {fields.map((item, index) => (
        <View key={item.id} style={styles.priceContainer}>
          <Controller
            control={control}
            name={`prices[${index}].size`}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.priceInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Size"
              />
            )}
          />
          <Controller
            control={control}
            name={`prices[${index}].price`}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.priceInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Price"
                keyboardType="numeric"
              />
            )}
          />
          <Controller
            control={control}
            name={`prices[${index}].currency`}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.priceInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Currency"
              />
            )}
          />
          <TouchableOpacity onPress={() => remove(index)}>
            <Ionicons
              name="remove-circle"
              size={24}
              color={COLORS.primaryOrangeHex}
            />
          </TouchableOpacity>
        </View>
      ))}
      <Button
        title="Add Price"
        onPress={() => append({ size: "", price: "", currency: "" })}
        color={COLORS.primaryOrangeHex}
      />

      <Input control={control} name="type" placeholder="Type" iconName="cafe" />

      <Text style={styles.label}>Square Image</Text>
      <TouchableOpacity
        style={styles.imagePicker}
        onPress={() => pickImage("square")}
      >
        {imageSquare ? (
          <Image source={{ uri: imageSquare }} style={styles.image} />
        ) : (
          <Ionicons name="camera" size={40} color={COLORS.primaryOrangeHex} />
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Portrait Image</Text>
      <TouchableOpacity
        style={styles.imagePicker}
        onPress={() => pickImage("portrait")}
      >
        {imagePortrait ? (
          <Image source={{ uri: imagePortrait }} style={styles.image} />
        ) : (
          <Ionicons name="camera" size={40} color={COLORS.primaryOrangeHex} />
        )}
      </TouchableOpacity>

      <Button
        title="Add Product"
        onPress={handleSubmit(onSubmit)}
        color={COLORS.primaryOrangeHex}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.secondaryDarkGreyHex,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primaryWhiteHex,
    marginBottom: 16,
    textAlign: "center",
  },
  textArea: {
    borderColor: COLORS.secondaryGreyHex,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
    backgroundColor: COLORS.primaryDarkGreyHex,
    color: COLORS.primaryWhiteHex,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primaryWhiteHex,
    marginVertical: 8,
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    backgroundColor: COLORS.primaryLightGreyHex,
    marginVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.secondaryLightGreyHex,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  priceInput: {
    flex: 1,
    borderColor: COLORS.secondaryGreyHex,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
    backgroundColor: COLORS.primaryDarkGreyHex,
    color: COLORS.primaryWhiteHex,
  },
});

export default AddProductScreen;
