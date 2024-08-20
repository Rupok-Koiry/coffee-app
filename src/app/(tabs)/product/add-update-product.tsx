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
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/Input";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import GradientIcon from "@/components/GradientIcon";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";
import Toast from "react-native-toast-message";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useProduct } from "@/hooks/products/useProduct";
import { SUPABASE_URL } from "@/services/supabase";
import { useUpdateProduct } from "@/hooks/products/useUpdateProduct";
import { InsertTables } from "@/constants/types";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import { useColorScheme } from "nativewind";
import withAuthorization from "@/utils/withAuthorization";

type FormValues = InsertTables<"products"> & {
  prices: InsertTables<"prices">[];
};
const AddUpdateProductScreen: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const { productId } = useLocalSearchParams();
  const { createProduct, isCreating } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();
  const { product } = productId ? useProduct() : { product: null };
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      ingredients: "",
      special_ingredient: "",
      roasted: "",
      type: "COFFEE",
      prices: [{ size: "", price: 0, product_id: 0 }],
      image_square: "",
      image_portrait: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  // Load product data if editing
  useEffect(() => {
    if (productId && product) {
      reset(product);
    }
  }, [productId, product, reset]);

  // Ensure at least one price field is present
  useEffect(() => {
    if (fields.length === 0) {
      append({ size: "", price: 0, product_id: 0 });
    }
  }, [fields, append]);

  const redirect = () => {
    router.push("/(tabs)/product/manage-products");
  };
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (productId) {
      const parsedProductId = Array.isArray(productId)
        ? Number(productId[0])
        : Number(productId);
      updateProduct(
        {
          newProduct: data,
          productId: parsedProductId,
        },
        {
          onSuccess: () => {
            redirect();
          },
        }
      );
    } else {
      createProduct(
        {
          newProduct: data,
        },
        {
          onSuccess: () => {
            redirect();
          },
        }
      );
    }
  };

  const pickImage = async (type: "square" | "portrait") => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: type === "square" ? [1, 1] : [4, 5],
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        const uri = result.assets[0].uri;
        if (type === "square") {
          setValue("image_square", uri);
        } else {
          setValue("image_portrait", uri);
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Image Pick Error",
        text2: "An error occurred while picking the image.",
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[colorScheme].primaryBackgroundHex,
        flex: 1,
      }}
    >
      <StatusBar backgroundColor={Colors[colorScheme].primaryBackgroundHex} />
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
              rules={{ required: "Ingredients are required" }}
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
              name="roasted"
              placeholder="Roasted level"
              iconName="trending-up"
              rules={{ required: "Roasted level is required" }}
            />
            {errors.roasted && (
              <Text className="text-xs text-primary-red my-0.5 mx-2">
                {errors.roasted.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name="type"
              rules={{ required: "Type is required" }}
              render={({ field: { onChange, value } }) => (
                <View className="flex-row rounded-xl bg-secondary-background items-center border border-primary-grey">
                  <Ionicons
                    style={{ marginLeft: 12 }}
                    name={"cafe"}
                    size={20}
                    color={Colors[colorScheme].primaryOrangeHex}
                  />
                  <SelectPicker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={{
                      color: Colors[colorScheme].primaryTextHex,
                      fontWeight: "medium",
                      flex: 1,
                      marginTop: -2.5,
                    }}
                    dropdownIconColor={Colors[colorScheme].secondaryTextHex}
                  >
                    {["COFFEE", "BEAN"].map((status) => (
                      <SelectPicker.Item
                        key={status}
                        label={status}
                        value={status}
                      />
                    ))}
                  </SelectPicker>
                </View>
              )}
            />
            {errors.type && (
              <Text className="text-xs text-primary-red my-0.5 mx-2">
                {errors.type.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-lg font-poppins-bold text-white my-2">
              Prices
            </Text>
            {fields.map((item, index) => (
              <View
                key={item.id}
                className="flex-row items-start mb-3 justify-between"
                style={{ gap: 12 }}
              >
                <View className="flex-1">
                  <Controller
                    control={control}
                    name={`prices.${index}.size` as const}
                    rules={{ required: "Required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="font-poppins-medium text-sm text-primary-text px-3 py-2 flex-row rounded-xl bg-secondary-background items-center border border-primary-grey"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Size"
                        placeholderTextColor={Colors[colorScheme].accentTextHex}
                        cursorColor={Colors[colorScheme].primaryOrangeHex}
                      />
                    )}
                  />
                  {errors.prices?.[index]?.size && (
                    <Text className="text-xs text-primary-red my-0.5 mx-2">
                      {errors.prices[index]?.size?.message}
                    </Text>
                  )}
                </View>
                <View className="flex-1">
                  <Controller
                    control={control}
                    name={`prices.${index}.price` as const}
                    rules={{ required: "Required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="font-poppins-medium text-sm text-primary-text px-3 py-2 flex-row rounded-xl bg-secondary-background items-center border border-primary-grey"
                        onBlur={onBlur}
                        onChangeText={(text) => onChange(Number(text))}
                        value={value.toString()}
                        keyboardType="numeric"
                        placeholder="Price"
                        placeholderTextColor={Colors[colorScheme].accentTextHex}
                        cursorColor={Colors[colorScheme].primaryOrangeHex}
                      />
                    )}
                  />
                  {errors.prices?.[index]?.price && (
                    <Text className="text-xs text-primary-red my-0.5 mx-2">
                      {errors.prices[index]?.price?.message}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => remove(index)}
                  className="py-0.5"
                >
                  <GradientIcon
                    name="remove"
                    iconSet="Ionicons"
                    color={Colors[colorScheme].primaryOrangeHex}
                  />
                </TouchableOpacity>
              </View>
            ))}
            {errors.prices && !errors.prices.length && (
              <Text className="text-xs text-primary-red my-0.5 mx-2">
                At least one price row is required
              </Text>
            )}
            <Button
              onPress={() => append({ size: "", price: 0, product_id: 0 })}
              outline
            >
              Add Price
            </Button>
          </View>

          <View>
            <Text className="text-base font-poppins-semibold text-white mb-2">
              Square Image
            </Text>
            <TouchableOpacity
              className="items-center justify-center h-32 bg-secondary-background rounded-2xl border-2 border-primary-grey overflow-hidden"
              onPress={() => pickImage("square")}
            >
              <Controller
                control={control}
                name="image_square"
                rules={{ required: "Square Image is required" }}
                render={({ field: { value } }) =>
                  value ? (
                    <Image
                      source={{
                        uri: value.startsWith("file")
                          ? value
                          : `${SUPABASE_URL}/storage/v1/object/public/product-images/square/${value}`,
                      }}
                      className="w-full h-full rounded aspect-square"
                    />
                  ) : (
                    <View className="justify-center items-center">
                      <Ionicons
                        name="cloud-upload"
                        size={42}
                        color={Colors[colorScheme].primaryOrangeHex}
                      />
                      <Text className="text-secondary-text font-poppins-medium">
                        Choose a file
                      </Text>
                    </View>
                  )
                }
              />
            </TouchableOpacity>
            {errors.image_square && (
              <Text className="text-xs text-primary-red my-0.5 mx-2">
                {errors.image_square.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-base font-poppins-semibold text-white mb-2">
              Portrait Image
            </Text>
            <TouchableOpacity
              className="items-center justify-center h-32 bg-secondary-background rounded-2xl border-2 border-primary-grey overflow-hidden"
              onPress={() => pickImage("portrait")}
            >
              <Controller
                control={control}
                name="image_portrait"
                rules={{ required: "Portrait Image is required" }}
                render={({ field: { value } }) =>
                  value ? (
                    <Image
                      source={{
                        uri: value.startsWith("file")
                          ? value
                          : `${SUPABASE_URL}/storage/v1/object/public/product-images/portrait/${value}`,
                      }}
                      className="w-full h-full rounded aspect-[4/3]"
                    />
                  ) : (
                    <View className="justify-center items-center">
                      <Ionicons
                        name="cloud-upload"
                        size={42}
                        color={Colors[colorScheme].primaryOrangeHex}
                      />
                      <Text className="text-secondary-text font-poppins-medium">
                        Choose a file
                      </Text>
                    </View>
                  )
                }
              />
            </TouchableOpacity>
            {errors.image_portrait && (
              <Text className="text-xs text-primary-red my-0.5 mx-2">
                {errors.image_portrait.message}
              </Text>
            )}
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isCreating || isUpdating}
            loading={isCreating || isUpdating}
          >
            {productId ? "Update Product" : "Add Product"}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withAuthorization(AddUpdateProductScreen, ["ADMIN"]);
