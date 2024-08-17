import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PaymentFooter from "@/components/PaymentFooter";
import ImageBackgroundInfo from "@/components/ImageBackgroundInfo";
import { COLORS } from "@/theme/theme";
import { useProduct } from "@/hooks/products/useProduct";
import Loader from "@/components/loaders/Loader";
import { Tables } from "@/constants/types";
import NotFound from "@/components/loaders/NotFound";
import { useCreateWishlist } from "@/hooks/wishlist/useCreateWishlist";
import { useDeleteWishlist } from "@/hooks/wishlist/useDeleteWishlist";
import { useWishlistStatus } from "@/hooks/wishlist/useWishlistStatus";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/features/cartSlice";
import { useUser } from "@/hooks/auth/useUser";
import SignInModal from "@/components/modals/SignInModal";

interface PriceOptionProps {
  price: Tables<"prices">;
  isSelected: boolean;
  onPress: () => void;
  productType: string;
}

const PriceOption: React.FC<PriceOptionProps> = ({
  price,
  isSelected,
  onPress,
  productType,
}) => (
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
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const { createWishlist } = useCreateWishlist();
  const { deleteWishlist } = useDeleteWishlist();
  const { wishlistId } = useWishlistStatus();
  const { user } = useUser();

  useEffect(() => {
    setIsFavorite(!!wishlistId);
    if (product?.prices.length) {
      setSelectedPrice(product.prices[0]);
    }
  }, [product, wishlistId]);

  const toggleFavorite = useCallback(() => {
    if (!product) return;
    if (!user) return setModalVisible(true);

    if (isFavorite && wishlistId) {
      deleteWishlist(wishlistId);
    } else {
      createWishlist({
        product_id: product.id,
        user_id: user.id,
      });
    }
    setIsFavorite((prev) => !prev);
  }, [product, user, isFavorite, wishlistId, deleteWishlist, createWishlist]);

  const handleAddToCart = useCallback(() => {
    if (product && selectedPrice) {
      dispatch(
        addItemToCart({
          product: product,
          prices: [
            {
              size: selectedPrice.size,
              price: selectedPrice.price,
              quantity: 1,
              total_price: selectedPrice.price,
            },
          ],
        })
      );
    }
  }, [dispatch, product, selectedPrice]);

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
            onPress={() => setFullDesc((prev) => !prev)}
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
          price={selectedPrice?.price || 0}
          buttonTitle="Add to Cart"
          buttonPressHandler={handleAddToCart}
        />
        <SignInModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title="You need to sign in to add this product to wishlist."
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
