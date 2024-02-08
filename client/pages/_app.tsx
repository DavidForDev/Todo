import "../styles/globals.css";
import type { AppProps } from "next/app";

// =========== Redux Provider
import { Provider } from "react-redux";
import store from "../redux/store";

// =========== Context Provider
import ModalContextWrapper from "../context/modal.context";
import ErrorContextWrapper from "../context/errors.context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorContextWrapper>
        <ModalContextWrapper>
          <Component {...pageProps} />
        </ModalContextWrapper>
      </ErrorContextWrapper>
    </Provider>
  );
}
