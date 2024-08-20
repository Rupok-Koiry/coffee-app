import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import Tag from "./Tag";
import { Link } from "expo-router";
import Button from "./Button";
import { useProducts } from "@/hooks/products/useProducts";
import { SUPABASE_URL } from "@/services/supabase";
import { Enums } from "@/constants/types";
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";
import Loader from "./loaders/Loader";
import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
import ErrorMessage from "./ErrorMessage";

type ProductTableProps = {
  type: Enums<"product_type_enum"> | "";
};

const ProductTable = ({ type }: ProductTableProps) => {
  const { colorScheme } = useColorScheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const { products, fetchNextPage, hasNextPage, isLoading, error } =
    useProducts({
      type,
    });
  const { deleteProduct, isDeleting } = useDeleteProduct();

  const openModal = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedProductId) {
      deleteProduct(selectedProductId, {
        onSuccess: () => {
          setIsModalVisible(false);
        },
      });
    }
  };

  const loadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <ScrollView horizontal style={{ flex: 1 }}>
      <View className="flex-1 border-2 border-primary-grey rounded-2xl overflow-hidden">
        <View className="flex-row border-b border-primary-grey p-3 space-x-5">
          <View style={{ width: 120 }}>
            <Text className="text-secondary-text font-poppins-semibold uppercase">
              Product ID
            </Text>
          </View>
          <View style={{ width: 200 }}>
            <Text className="text-secondary-text font-poppins-semibold uppercase">
              Name
            </Text>
          </View>
          <View style={{ width: 120 }}>
            <Text className="text-secondary-text font-poppins-semibold uppercase">
              Type
            </Text>
          </View>
          <View style={{ width: 120 }}>
            <Text className="text-secondary-text font-poppins-semibold uppercase">
              Roasted
            </Text>
          </View>
          <View style={{ width: 150 }}>
            <Text className="text-secondary-text font-poppins-semibold uppercase">
              Price
            </Text>
          </View>
          <View>
            <View className="flex-row items-center" style={{ gap: 8 }}>
              <Text className="text-secondary-text font-poppins-semibold uppercase">
                Actions
              </Text>
              <Link href={`/(tabs)/product/add-update-product`}>
                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color={Colors[colorScheme].accentTextHex}
                />
              </Link>
            </View>
          </View>
        </View>
        <LinearGradient
          colors={[
            Colors[colorScheme].secondaryGreyHex,
            Colors[colorScheme].primaryBackgroundHex,
          ]}
          start={[0, 0]}
          end={[1, 1]}
          style={{ flex: 1 }}
        >
          <FlatList
            ListEmptyComponent={
              <Text className="font-poppins-semibold text-accent-text text-lg text-center my-2">
                No Product Available
              </Text>
            }
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                key={item.id}
                className="flex-row border-b border-primary-grey space-x-5"
              >
                <View className="p-3" style={{ width: 120 }}>
                  <Text className="text-primary-text font-poppins-regular text-base">
                    {item.id}
                  </Text>
                </View>
                <View className="p-3" style={{ width: 200 }}>
                  <View className="flex-row items-center">
                    <Image
                      source={{
                        uri: `${SUPABASE_URL}/storage/v1/object/public/product-images/square/${item.image_square}`,
                      }}
                      className="w-12 h-12 mr-2 rounded-lg"
                    />
                    <Text className="text-secondary-text font-poppins-regular">
                      {item.name}
                    </Text>
                  </View>
                </View>
                <View className="p-3" style={{ width: 120 }}>
                  <Tag
                    containerClassName={`bg-primary-orange`}
                    textClassName={`text-primary-text`}
                  >
                    {item.type}
                  </Tag>
                </View>
                <View className="p-3" style={{ width: 120 }}>
                  <Text className="text-primary-text font-poppins-regular">
                    {item.roasted}
                  </Text>
                </View>
                <View className="p-3" style={{ width: 150 }}>
                  {item.prices.map((price, index) => (
                    <Text
                      key={index}
                      className="text-primary-text font-poppins-regular"
                    >
                      <Text className="font-poppins-semibold text-primary-orange">
                        {price.size}
                      </Text>
                      {` : $${price.price}`}
                    </Text>
                  ))}
                </View>
                <View className="flex-row p-3" style={{ gap: 12 }}>
                  <Link href={`/(tabs)/product/${item.id}`}>
                    <Ionicons
                      name="eye"
                      size={20}
                      color={Colors[colorScheme].accentTextHex}
                    />
                  </Link>
                  <Link
                    href={`/(tabs)/product/add-update-product?productId=${item.id}`}
                  >
                    <Ionicons
                      name="pencil"
                      size={20}
                      color={Colors[colorScheme].accentTextHex}
                    />
                  </Link>
                  <TouchableOpacity onPress={() => openModal(item.id)}>
                    <Ionicons
                      name="trash"
                      size={20}
                      color={Colors[colorScheme].accentTextHex}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        </LinearGradient>
      </View>
      <ConfirmDeleteModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </ScrollView>
  );
};

export default ProductTable;
