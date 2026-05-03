const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text}: {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine
        text="average"
        value={
          good + neutral + bad === 0 ? 0 : (good - bad) / (good + neutral + bad)
        }
      />
      <StatisticLine
        text="positive"
        value={
          good + neutral + bad === 0
            ? 0
            : (good / (good + neutral + bad)) * 100 + " %"
        }
      />
    </div>
  );
};

export default Statistics;
