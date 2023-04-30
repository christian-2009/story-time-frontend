import { MessagesReceivedType, MessagesType } from "interfaces";

export function formatDateFromTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function sortMessages(messages: MessagesReceivedType[]) {
  return messages.sort(
    (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
  );
}

/**
 * gets next letter you pass to it or will calculate it based on the messages received array
 * @param messagesReceived
 * @param message
 * @returns
 */
export const getNextLetter = (messagesReceived: MessagesType[]) => {
  const nextLetter = (letter: string) => {
    if (letter == "z") {
      return "a";
    } else if (letter == "Z") {
      return "A";
    } else {
      return String.fromCharCode(letter.charCodeAt(0) + 1);
    }
  };
  if (messagesReceived.length === 0) {
    return "A";
  }
  if (messagesReceived.length > 0) {
    const recentMessage = messagesReceived[messagesReceived.length - 1];

    const firstLetter = recentMessage.message[0];
    return nextLetter(firstLetter).toUpperCase();
  } else {
    return undefined;
  }
};
