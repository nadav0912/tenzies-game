function Timer(props) {
  return (
    <div className="timer">
      <span className="timer--minutes">
        {props.minutes > 9 ? props.minutes : `0${props.minutes}`}
      </span>
      :
      <span className="timer--seconds">
        {props.seconds > 9 ? props.seconds : `0${props.seconds}`}
      </span>
    </div>
  );
}

export default Timer;
