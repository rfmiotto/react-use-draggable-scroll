import * as React from "react";

type CardPros = {
  onClick: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Card = ({ onClick, ...rest }: CardPros): JSX.Element => {
  return (
    <button
      className="flex-none w-52 h-32 bg-red-200 rounded-xl"
      onClick={onClick}
      type="button"
      aria-label="Fire an event"
      {...rest}
    />
  );
};
export default Card;
