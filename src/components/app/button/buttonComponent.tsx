'use client'
import styles from "./button.module.scss";

interface ComponentProps {
  text: string
  backgroundColor: string
  textColor: string
  onClick: Function
}

export default function ButtonComponent({ text, backgroundColor, textColor, onClick }: ComponentProps) {

  const handleOnClick = () => {
    console.log('CLicking App button...')
    onClick();
  };

  return (
    <button
      className={ styles.button }
      style={{
        backgroundColor,
        color: textColor,
        height: 35,
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 3
      }}
      onClick={handleOnClick}
    >
      {text}
    </button>
  );
}
