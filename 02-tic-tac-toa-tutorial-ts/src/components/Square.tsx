import React from "react";
import { Player } from "../utils/model";

export type SquareProps = {
  value: Player | null;
  onClick: () => void;
};

export const Square = (props: SquareProps) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);
