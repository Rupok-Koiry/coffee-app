import React, { useEffect } from "react";
import {
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  StatusBar,
} from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/Input";
import { COLORS } from "@/theme/theme";
import Button from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import GradientIcon from "@/components/GradientIcon";

const AddProductScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ size: "", price: "", currency: "" });
    }
  }, [fields, append]);

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  const pickImage = async (type: "square" | "portrait") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === "square" ? [1, 1] : [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (type === "square") {
        setValue("imagelink_square", uri);
      } else {
        setValue("imagelink_portrait", uri);
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Add Product" />

        <View className="flex-1 p-5" style={{ gap: 20 }}>
          <View>
            <Input
              control={control}
              name="name"
              placeholder="Product Name"
              iconName="pricetag"
              rules={{ required: "Product Name is required" }}
            />
            {errors.name && (
              <Text className="text-xs text-primary-red my-0.5 mx-2">
                {errors.name.message}
              </Text>
            )}
          </View>
          <View>
            <Input
              control={control}
              name="description"
              placeholder="Product Description"
              iconName="document-text"
              rules={{ required: "Product Description is required" }}
              multiline
              numberOfLines={4}
            />
            {errors.description && (
              <Text className="text-xs text-primary-red my-0.5 mx-2">
                {errors.description.message}
              </Text>
            )}
          </View>
          <View>
            <Input
              control={control}
              name="ingredients"
              placeholder="Ingredients"
              iconName="nutrition"
              rules={{ required: "Ingredients is required" }}
            />
            {errors.ingredients && (
              <Text className="text-xs text-primary-red my-0.5 mx-2">
                {errors.ingredients.message}
              </Text>
            )}
          </View>

          <View>
            <Input
              control={control}
              name="special_ingredient"
              placeholder="Special Ingredient"
              iconName="star"
              rules={{ required: "Special Ingredient is required" }}
            />
            {errors.special_ingredient && (
              <Text className="text-xs text-primary-red my-0.5 mx-2">
                {errors.special_ingredient.message}
              </Text>
            )}
          </View>

          <View>
            <Input
              control={control}
              name="type"
              placeholder="Type 'coffee' OR 'bean'"
              iconName="cafe"
              rules={{ required: "Type is required" }}
            />
            {errors.type && (
              <Text className="text-xs text-primary-red my-0.5 mx-2">
                {errors.type.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-lg font-bold text-white my-2">Prices</Text>
            {fields.map((item, index) => (
              <View
                key={item.id}
                className="flex-row items-center mb-3 justify-between"
                style={{ gap: 12 }}
              >
                <Controller
                  control={control}
                  name={`prices[${index}].size`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 font-poppins-medium text-sm text-primary-white px-3 py-2
                      flex-row rounded-xl bg-primary-dark-grey items-center border border-primary-grey"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Size"
                      placeholderTextColor={COLORS.primaryLightGreyHex}
                      cursorColor={COLORS.primaryOrangeHex}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`prices[${index}].price`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 font-poppins-medium text-sm text-primary-white px-3 py-2
                      flex-row rounded-xl bg-primary-dark-grey items-center border border-primary-grey"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Price"
                      placeholderTextColor={COLORS.primaryLightGreyHex}
                      cursorColor={COLORS.primaryOrangeHex}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`prices[${index}].currency`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 font-poppins-medium text-sm text-primary-white px-3 py-2
                      flex-row rounded-xl bg-primary-dark-grey items-center border border-primary-grey"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Currency"
                      placeholderTextColor={COLORS.primaryLightGreyHex}
                      cursorColor={COLORS.primaryOrangeHex}
                    />
                  )}
                />
                <GradientIcon
                  name="remove"
                  iconSet="Ionicons"
                  color={COLORS.primaryOrangeHex}
                  onPress={() => remove(index)}
                />
              </View>
            ))}
            <Button
              onPress={() => append({ size: "", price: "", currency: "" })}
            >
              Add Price
            </Button>
          </View>

          <View>
            <Text className="text-base font-poppins-semibold text-white mb-2">
              Square Image
            </Text>
            <TouchableOpacity
              className="items-center justify-center h-32 bg-primary-dark-grey rounded-2xl  border-2 border-primary-grey overflow-hidden"
              onPress={() => pickImage("square")}
            >
              <Controller
                control={control}
                name="imagelink_square"
                rules={{ required: "Square Image is required" }}
                render={({ field: { value } }) =>
                  value ? (
                    <Image
                      source={{ uri: value }}
                      className="w-full h-full rounded"
                    />
                  ) : (
                    <View className="justify-center items-center">
                      <Ionicons
                        name="cloud-upload"
                        size={42}
                        color={COLORS.primaryOrangeHex}
                      />
                      <Text className="text-secondary-light-grey font-poppins-medium">
                        Choose a file
                      </Text>
                    </View>
                  )
                }
              />
            </TouchableOpacity>
            {errors.imagelink_square && (
              <Text className="text-xs text-primary-red my-0.5 mx-2">
                {errors.imagelink_square.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-base font-poppins-semibold text-white mb-2">
              Portrait Image
            </Text>
            <TouchableOpacity
              className="items-center justify-center h-32 bg-primary-dark-grey rounded-2xl  border-2 border-primary-grey overflow-hidden"
              onPress={() => pickImage("portrait")}
            >
              <Controller
                control={control}
                name="imagelink_portrait"
                rules={{ required: "Portrait Image is required" }}
                render={({ field: { value } }) =>
                  value ? (
                    <Image
                      source={{ uri: value }}
                      className="w-full h-full rounded"
                    />
                  ) : (
                    <View className="justify-center items-center">
                      <Ionicons
                        name="cloud-upload"
                        size={42}
                        color={COLORS.primaryOrangeHex}
                      />
                      <Text className="text-secondary-light-grey font-poppins-medium">
                        Choose a file
                      </Text>
                    </View>
                  )
                }
              />
            </TouchableOpacity>
            {errors.imagelink_portrait && (
              <Text className="text-xs text-primary-red my-0.5 mx-2">
                {errors.imagelink_portrait.message}
              </Text>
            )}
          </View>

          <Button onPress={handleSubmit(onSubmit)}>Add Product</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProductScreen;
