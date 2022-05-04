function BestTime(props) {
  return (
    <div className="best-time">
      <span>Best Time </span>
      {props.minutes > 9 ? props.minutes : `0${props.minutes}`}:
      {props.seconds > 9 ? props.seconds : `0${props.seconds}`}
    </div>
  );
}

export default BestTime;
