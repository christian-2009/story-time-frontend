export interface UsernameContextType {
  username?: string;
  setUsername?: React.Dispatch<React.SetStateAction<string | undefined>>;
  room?: string;
  setRoom?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface MessagesReceivedType {
  message: string;
  username: string;
  __createdtime__: string;
  __updatedtime__: string;
}

export interface MessagesType {
  message: string;
  username: string;
  __createdtime__: string;
}

const testMessages = [
  {
    message: "hiya",
    username: "christian",
    currentTime: new Date().toLocaleDateString(),
  },
  {
    message: "how are you doing",
    username: "Hannah",
    currentTime: new Date().toLocaleDateString(),
  },
  {
    message:
      "Very good thank you very much. I hope you are having a great day sir",
    username: "christian",
    currentTime: new Date().toLocaleDateString(),
  },
  {
    message:
      "Very good thank you very much. I hope you are having a great day sir",
    username: "Hannah",
    currentTime: new Date().toLocaleDateString(),
  },
  {
    message:
      "Very good thank you very much. I hope you are having a great day sir. I wish to make a reservation with Yoda who is a great friend of mine",
    username: "christian",
    currentTime: new Date().toLocaleDateString(),
  },
];
