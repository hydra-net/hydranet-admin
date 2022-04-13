import { ToastPosition, ToastTransition } from "react-toastify/dist/types";

import icons from "./components/Icon";

export interface IStyleableProps {
  style?: any;
  className?: string;
}

export type IconKeys = keyof typeof icons;

export type NotificationType = {
  position: ToastPosition;
  autoClose: number | false;
  pauseOnHover: boolean;
  transition?: ToastTransition;
  closeOnClick?: boolean;
  hideProgressBar?: boolean;
};
