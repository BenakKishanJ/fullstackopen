const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);
  return <h3>total of {total} exercises</h3>;
};

export default Total;
