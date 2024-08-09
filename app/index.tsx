import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Button from "@/components/Button";
import { COLORS } from "@/theme/theme";

const SignInScreen = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["40%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Custom backdrop component
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.safeArea}>
          <Link href="/(auth)/sign-in" style={styles.link}>
            Auth
          </Link>
          <Link href="/(tabs)/product" style={styles.link}>
            App
          </Link>
          <View style={styles.container}>
            <Button onPress={handlePresentModalPress}>Press</Button>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              backdropComponent={renderBackdrop}
            >
              <BottomSheetView style={styles.contentContainer}>
                <Text style={styles.modalText}>
                  You need to be signed in to access this feature.
                </Text>
                <Button
                  onPress={() => {
                    // Navigate to the sign-in screen
                    bottomSheetModalRef.current?.dismiss();
                  }}
                  // style={[styles.actionButton, styles.signInButton]}
                >
                  Sign In
                </Button>
                <Button
                  onPress={() => {
                    bottomSheetModalRef.current?.dismiss();
                  }}
                  // style={[styles.actionButton, styles.cancelButton]}
                >
                  Cancel
                </Button>
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  link: {
    fontSize: 24,
    color: COLORS.primaryRedHex,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primaryWhiteHex,
    textAlign: "center",
    marginBottom: 20,
  },
  actionButton: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  signInButton: {
    backgroundColor: COLORS.primaryRedHex,
  },
  cancelButton: {
    backgroundColor: COLORS.primaryLightGreyHex,
  },
});

export default SignInScreen;
