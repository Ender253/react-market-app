import { Provider } from "react-redux";
import store from "../store";

export default function ReduxProvider(props) {
  const { children } = props;

  return <Provider store={store}>{children}</Provider>;
}
