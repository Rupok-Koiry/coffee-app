import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import Button from "@/components/Button";
import { COLORS } from "@/theme/theme";

interface SignInBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const SignInBottomSheet: React.FC<SignInBottomSheetProps> = ({
  isVisible,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["28%"], []);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isVisible]);

  const handleCancelPress = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    onClose();
  }, [onClose]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: COLORS.primaryGreyHex }}
      handleIndicatorStyle={{ backgroundColor: COLORS.primaryWhiteHex }}
      enablePanDownToClose
      onDismiss={onClose}
    >
      <View className="p-5">
        <Image
          source={require("@/assets/app_images/lock.png")}
          className="w-16 h-16 mx-auto"
        />
        <Text className="text-xl font-poppins-semibold text-primary-white text-center my-4">
          You need to be signed in to access this feature.
        </Text>
        <Button href="/(auth)/sign-in" containerClassName="mb-4">
          Sign In
        </Button>
        <Button onPress={handleCancelPress} outline>
          Cancel
        </Button>
      </View>
    </BottomSheetModal>
  );
};

export default SignInBottomSheet;
