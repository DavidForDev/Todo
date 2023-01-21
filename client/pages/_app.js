import "../public/styles/globals.css";

// ========== Layout ========== \\
import AppLayout from "../layout/app.layout";

// ========== Context ========== \\
import AccountServerWrapper from "../contexts/account.context";
import ToolsWrapper from "../contexts/tools.context";

export default function App({ Component, pageProps }) {
  if (Component.appLayout) {
    return Component.appLayout(
      <AccountServerWrapper>
        <ToolsWrapper>
          <Component {...pageProps} />
        </ToolsWrapper>
      </AccountServerWrapper>
    );
  }
  return (
    <AccountServerWrapper>
      <AppLayout>
        <ToolsWrapper>
          <Component {...pageProps} />
        </ToolsWrapper>
      </AppLayout>
    </AccountServerWrapper>
  );
}
