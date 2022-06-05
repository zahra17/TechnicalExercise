import React, { FC } from "react";
import { Provider } from "react-redux";
import store from "../store";

interface Props {
  children: any;
}

const JestProvider: FC<Props> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default JestProvider;
