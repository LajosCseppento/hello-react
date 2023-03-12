import React from 'react';
import {Player} from '../utils/model';

type Props = {
  value: Player | null;
  onClick: () => void;
};

const Square = (props: Props) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);

export default Square;
