import QueryProvider from "./query-provider";
import ReduxProvider from "./redux";

export default function Providers(props) {
  const { children } = props;

  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
}
