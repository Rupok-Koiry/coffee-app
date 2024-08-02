import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PaymentFooter from "@/components/PaymentFooter";
import ImageBackgroundInfo from "@/components/ImageBackgroundInfo";
import { COLORS } from "@/theme/theme";
import { useProduct } from "@/api/products/useProduct";
import Loader from "@/components/loader/Loader";
import { Tables } from "@/constants/types";
import NotFound from "@/components/loader/NotFound";
import { useCreateWishlist } from "@/api/wishlist/useCreateWishlist";
import GradientIcon from "@/components/GradientIcon";
import { useDeleteWishlist } from "@/api/wishlist/useDeleteWishlist";

const DetailsScreen: React.FC = () => {
  const { product, isLoading } = useProduct();
  const [fullDesc, setFullDesc] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<Tables<"prices"> | null>(
    null
  );
  const [isFavorite, setIsFavorite] = useState(false);

  const { createWishlist } = useCreateWishlist();
  const { deleteWishlist } = useDeleteWishlist();

  useEffect(() => {
    if (product) {
      setIsFavorite(product.is_favorite);
      if (product.prices.length > 0) {
        setSelectedPrice(product.prices[0]);
      }
    }
  }, [product]);

  if (isLoading) return <Loader />;
  if (!product)
    return (
      <NotFound message="Product not found!" redirectTo="/(tabs)/product" />
    );

  const toggleFavorite = async () => {
    if (isFavorite) {
      console.log("Hello");
      await deleteWishlist(product.id);
    } else {
      await createWishlist({
        product_id: product.id,
        user_id: "2c0cea61-c686-4f7a-b6d2-16983584e121",
      });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackgroundInfo
          enableBackHandler={true}
          image_portrait={product.image_portrait}
          type={product.type}
          id={product.id}
          isFavorite={isFavorite}
          name={product.name}
          special_ingredient={product.special_ingredient}
          ingredients={product.ingredients}
          average_rating={product.average_rating}
          ratings_count={product.ratings_count}
          roasted={product.roasted}
          backHandler={() => {}}
          toggleFavorite={toggleFavorite}
        />

        <View className="p-5">
          <Text className="font-poppins-semibold text-secondary-light-grey text-base mb-3">
            Description
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setFullDesc((prev) => !prev);
            }}
          >
            <Text
              numberOfLines={fullDesc ? undefined : 3}
              className="font-poppins-regular text-sm mb-8 text-primary-white tracking-wider"
            >
              {product.description}
            </Text>
          </TouchableWithoutFeedback>
          <Text className="font-poppins-semibold  text-secondary-light-grey text-base mb-3">
            Size
          </Text>
          <View className="flex-row  justify-between" style={{ gap: 20 }}>
            {product.prices.map((price) => (
              <TouchableOpacity
                key={price.size}
                onPress={() => {
                  setSelectedPrice(price);
                }}
                className={`flex-1 bg-primary-dark-grey items-center justify-center  rounded-xl h-12
                border-2
                ${
                  price.size === selectedPrice?.size
                    ? "border-primary-orange"
                    : "border-primary-dark-grey"
                }
                `}
              >
                <Text
                  className={`font-poppins-medium
                  ${
                    price.size === selectedPrice?.size
                      ? "text-primary-orange"
                      : "text-secondary-light-grey"
                  }

                  ${product.type === "BEAN" ? "text-sm" : "text-base"}
                  `}
                >
                  {price.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={selectedPrice?.price || 0}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
