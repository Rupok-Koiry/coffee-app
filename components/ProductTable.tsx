import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/theme/theme";
import CoffeeData from "@/data/CoffeeData";
import Tag from "./Tag";
import { Link } from "expo-router";
import Button from "./Button";
import { useProducts } from "@/api/products/useProducts";
import { SUPABASE_URL } from "@/services/supabase";
import { Enums } from "@/constants/types";
import Toast from "react-native-toast-message";
import { useDeleteProduct } from "@/api/products/useDeleteProduct";

type ProductTableProps = {
  type: Enums<"product_type_enum"> | "";
};

const ProductTable = ({ type }: ProductTableProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const { products, fetchNextPage, hasNextPage } = useProducts({
    type,
  });
  const { deleteProduct } = useDeleteProduct();

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
  return (
    <ScrollView horizontal className="flex-1">
      <View className="flex-1 border-2 border-primary-grey rounded-2xl overflow-hidden">
        <View className="flex-row border-b border-primary-grey p-3 space-x-5">
          <View style={{ width: 120 }}>
            <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
              Product ID
            </Text>
          </View>
          <View style={{ width: 200 }}>
            <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
              Name
            </Text>
          </View>
          <View style={{ width: 120 }}>
            <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
              Type
            </Text>
          </View>
          <View style={{ width: 120 }}>
            <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
              Roasted
            </Text>
          </View>
          <View style={{ width: 150 }}>
            <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
              Price
            </Text>
          </View>
          <View>
            <View className="flex-row items-center space-x-2">
              <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
                Actions
              </Text>
              <Link href={`/(tabs)/product/add-update-product`}>
                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color={COLORS.primaryLightGreyHex}
                />
              </Link>
            </View>
          </View>
        </View>
        <LinearGradient
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          start={[0, 0]}
          end={[1, 1]}
          className="pb-12"
        >
          <FlatList
            ListEmptyComponent={
              <Text className="font-poppins-semibold text-primary-light-grey text-lg text-center my-2">
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
                  <Text className="text-primary-white font-poppins-regular text-base">
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
                    <Text className="text-secondary-light-grey font-poppins-regular">
                      {item.name}
                    </Text>
                  </View>
                </View>
                <View className="p-3" style={{ width: 120 }}>
                  <Tag
                    containerClassName={`bg-primary-orange`}
                    textClassName={`text-primary-white`}
                  >
                    {item.type}
                  </Tag>
                </View>
                <View className="p-3" style={{ width: 120 }}>
                  <Text className="text-primary-white font-poppins-regular">
                    {item.roasted}
                  </Text>
                </View>
                <View className="p-3" style={{ width: 150 }}>
                  {item.prices.map((price, index) => (
                    <Text
                      key={index}
                      className="text-primary-white font-poppins-regular"
                    >
                      <Text className="font-poppins-semibold text-primary-orange">
                        {price.size}
                      </Text>
                      {` : $${price.price}`}
                    </Text>
                  ))}
                </View>
                <View className="flex-row space-x-3 p-3">
                  <Link href={`/(tabs)/product/${item.id}`}>
                    <Ionicons
                      name="eye"
                      size={20}
                      color={COLORS.primaryLightGreyHex}
                    />
                  </Link>
                  <Link
                    href={`/(tabs)/product/add-update-product?productId=${item.id}`}
                  >
                    <Ionicons
                      name="pencil"
                      size={20}
                      color={COLORS.primaryLightGreyHex}
                    />
                  </Link>
                  <TouchableOpacity onPress={() => openModal(item.id)}>
                    <Ionicons
                      name="trash"
                      size={20}
                      color={COLORS.primaryLightGreyHex}
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
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-primary-black-rgba px-5">
          <LinearGradient
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            start={[0, 0]}
            end={[1, 1]}
            className="bg-primary-grey px-5 py-8 rounded-lg w-full"
          >
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="absolute top-5 right-5 z-20"
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-xl font-poppins-semibold my-5 text-primary-white">
              Are you sure you want to delete this product?
            </Text>

            <View
              className="flex-row justify-end items-center"
              style={{ gap: 12 }}
            >
              <Button
                onPress={() => setIsModalVisible(false)}
                containerClassName="px-3 py-2 rounded"
                textClassName="text-xs font-poppins-medium"
              >
                Cancel
              </Button>
              <Button
                containerClassName="px-3 py-2 rounded"
                textClassName="text-xs font-poppins-medium"
                onPress={handleDelete}
              >
                Delete
              </Button>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProductTable;
