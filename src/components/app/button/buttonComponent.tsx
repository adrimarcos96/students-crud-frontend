'use client'
import styles from "./button.module.scss";

interface ComponentProps {
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
  backgroundColor,
  textColor,
  onClick,
  children,
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
      className={ styles.button }
      style={{
        backgroundColor: backgroundColor || 'transparent',
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
