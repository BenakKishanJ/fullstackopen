import Header from "./Header";
import Part from "./Part";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div key={course.id}>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
