interface DrawTextProps {
  fontSize: number;
  fontFamily: string;
  color: string;
  text: string;
}

const DrawText = (props: DrawTextProps) => {
  const {
    text = "-",
    color = "#333",
    fontSize = 20,
    fontFamily = "songti",
  } = props;
  return (
    <div
      style={{
        color,
        fontSize,
        fontFamily,
        display: "inline-block",
      }}
    >
      {text}
    </div>
  );
};

export default DrawText;
