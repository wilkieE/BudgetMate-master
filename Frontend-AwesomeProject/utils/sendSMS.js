import * as SMS from "expo-sms";

export const sendSMS = async (messageArray) => {
  const phoneNumbers = ["+15747014393"];
  const message = JSON.stringify(messageArray);
  try {
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      console.log("SMS is not available on this device");
      return;
    }

    const { result } = await SMS.sendSMSAsync(phoneNumbers, message);

    // if (result === SMS.SentStatus.DELIVERED) {
    //   console.log("SMS message successfully delivered");
    // } else {
    //   console.log("Failed to send SMS message");
    // }
  } catch (error) {
    console.error("Error sending SMS message", error);
  }
};
