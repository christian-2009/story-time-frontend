import { MessagesReceivedType } from "interfaces";

export function formatDateFromTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function sortMessages(messages: MessagesReceivedType[]) {
  return messages.sort(
    (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
  );
}
