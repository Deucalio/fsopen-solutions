import Header from "./Header";
import Content from "./Content";

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {/* <Header text={course.name} />
      <Content content={course} /> */}
      {courses.map((c) => (
        <div key={c.id}>
          <Header text={c.name} />
          <Content content={c.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
