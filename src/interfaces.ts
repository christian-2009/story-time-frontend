export interface UsernameContextType {
  username?: string;
  setUsername?: React.Dispatch<React.SetStateAction<string | undefined>>;
  room?: string;
  setRoom?: React.Dispatch<React.SetStateAction<string | undefined>>;
}
