"use client";

import styles from "./button.module.scss";
import variables from "@/styles/variables.module.scss";

interface ComponentProps {
  id: string
  children: React.ReactNode
  onClick: Function
  textColor?: string
  backgroundColor?: string
  paddingLeft?: number
  paddingRight?: number
  marginLeft?: number
  marginRight?: number
  height?: number
}

export default function ButtonComponent({
  id,
  onClick,
  children,
  backgroundColor,
  textColor,
  paddingLeft,
  paddingRight,
  marginLeft,
  marginRight,
  height
}: ComponentProps) {

  const handleOnClick = () => {
    onClick();
  };

  return (
    <button
      id={id}
      aria-label="Button"
      className={ styles.button }
      style={{
        backgroundColor: backgroundColor || variables.colorTransparent,
        color: textColor || 'black',
        height: height || 35,
        paddingLeft: paddingLeft || 20,
        paddingRight: paddingRight ||20,
        marginLeft: marginLeft || 5,
        marginRight: marginRight || 5,
        borderRadius: 3
      }}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
}
