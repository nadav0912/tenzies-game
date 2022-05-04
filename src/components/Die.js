function Die(props) {
  return (
    <div
      className={`die ${props.isHeld && "die-held"}`}
      onClick={props.toggleIsHeld}
    >
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}

export default Die;
