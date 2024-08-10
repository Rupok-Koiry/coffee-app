import React, { useCallback, useEffect, useState, useMemo } from "react";
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
import { useWishlistStatus } from "@/api/wishlist/useWishlistStatus";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/features/cartSlice";
import { useUser } from "@/api/auth/useUser";
import SignInBottomSheet from "@/components/SignInBottomSheet";

const PriceOption: React.FC<{
  price: Tables<"prices">;
  isSelected: boolean;
  onPress: () => void;
  productType: string;
}> = ({ price, isSelected, onPress, productType }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 bg-primary-dark-grey items-center justify-center rounded-xl h-12 border-2 ${
      isSelected ? "border-primary-orange" : "border-primary-dark-grey"
    }`}
    accessibilityRole="button"
    accessibilityLabel={`Size ${price.size}`}
    accessibilityState={{ selected: isSelected }}
  >
    <Text
      className={`font-poppins-medium ${
        isSelected ? "text-primary-orange" : "text-secondary-light-grey"
      } ${productType === "BEAN" ? "text-sm" : "text-base"}`}
    >
      {price.size}
    </Text>
  </TouchableOpacity>
);

const DetailsScreen: React.FC = () => {
  const { product, isLoading } = useProduct();
  const [fullDesc, setFullDesc] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<Tables<"prices"> | null>(
    null
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const { createWishlist } = useCreateWishlist();
  const { deleteWishlist } = useDeleteWishlist();
  const { wishlistId } = useWishlistStatus();
  const { user } = useUser();

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handlePresentModalPress = useCallback(() => {
    setIsBottomSheetVisible(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetVisible(false);
  }, []);

  useEffect(() => {
    if (product) {
      setIsFavorite(!!wishlistId);
      if (product.prices.length > 0) {
        setSelectedPrice(product.prices[0]);
      }
    }
  }, [product, wishlistId]);

  const toggleFavorite = () => {
    if (!user) {
      setIsBottomSheetVisible(true);
      return;
    }
    if (!product) return;

    if (isFavorite && wishlistId) {
      deleteWishlist(wishlistId);
    } else {
      createWishlist({
        product_id: product.id,
        user_id: user.id,
      });
    }
    setIsFavorite((prev) => !prev);
  };

  const selectedPriceMemo = useMemo(
    () => selectedPrice?.price || 0,
    [selectedPrice]
  );

  if (isLoading) return <Loader />;
  if (!product)
    return (
      <NotFound message="Product not found!" redirectTo="/(tabs)/product" />
    );

  return (
    <SafeAreaView className="flex-1 bg-primary-black">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackgroundInfo
          product={product}
          isFavorite={isFavorite}
          backHandler={() => {}}
          enableBackHandler={true}
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
          <Text className="font-poppins-semibold text-secondary-light-grey text-base mb-3">
            Size
          </Text>
          <View className="flex-row justify-between" style={{ gap: 20 }}>
            {product.prices.map((price) => (
              <PriceOption
                key={price.size}
                price={price}
                isSelected={price.size === selectedPrice?.size}
                onPress={() => setSelectedPrice(price)}
                productType={product.type}
              />
            ))}
          </View>
        </View>
        <PaymentFooter
          price={selectedPriceMemo}
          buttonTitle="Add to Cart"
          buttonPressHandler={() =>
            dispatch(
              addItemToCart({
                product: product,
                prices: [
                  {
                    size: selectedPrice?.size || "",
                    price: selectedPriceMemo,
                    quantity: 1,
                    total_price: selectedPriceMemo,
                  },
                ],
              })
            )
          }
        />
        <SignInBottomSheet
          isVisible={isBottomSheetVisible}
          onClose={handleCloseBottomSheet}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
