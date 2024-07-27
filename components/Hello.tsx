import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";

const OrderProgress = ({ orderStatus }) => {
  const statuses = ["Placed", "Processed", "On The Way", "Delivered"];
  const statusIndex = statuses.indexOf(orderStatus);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: statusIndex,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [statusIndex]);

  return (
    <View style={styles.container}>
      {statuses.map((status, index) => {
        const isCompleted = index <= statusIndex;
        return (
          <View key={index} style={styles.stepContainer}>
            <View
              style={[styles.circle, isCompleted && styles.completedCircle]}
            >
              <Text style={[styles.text, isCompleted && styles.completedText]}>
                {status}
              </Text>
            </View>
            {index < statuses.length - 1 && (
              <Animated.View
                style={[
                  styles.line,
                  {
                    backgroundColor: animation.interpolate({
                      inputRange: [index, index + 1],
                      outputRange: ["gray", "blue"],
                      extrapolate: "clamp",
                    }),
                  },
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  circle: {
    backgroundColor: "red",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  completedCircle: {
    backgroundColor: "blue",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  completedText: {
    color: "yellow",
  },
  line: {
    height: 4,
    flex: 1,
    backgroundColor: "gray",
  },
});

export default OrderProgress;
