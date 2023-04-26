import React from "react";

import { View, StyleSheet } from "react-native";
import ProgressBar from "react-native-progress/Bar";

const ProgressIndicator = ({ totalQuestions, currentQuestion }) => {
  return (
    <View style={styles.progressBarContainer}>
      {/* <Text style={styles.textContainer}>
        {currentQuestion + 1} of {totalQuestions}
      </Text> */}
      <ProgressBar
        progress={(currentQuestion + 1) / totalQuestions}
        width={null}
        height={20}
        borderRadius={5}
        color="#007AFF"
        borderColor="#007AFF"
        animated={true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  progressBarContainer: {
    // marginBottom: 10,
  },
});

export default ProgressIndicator;
