import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content content={course} />
    </>
  );
};

export default Course;
