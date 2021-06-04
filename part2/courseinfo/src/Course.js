const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, part) => (
    sum + part.exercises
  ), 0)
  return (
    <b>total of {sum} exercises</b>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  const contents = course.parts.map((part, i) => <Part key={i} part={part} />)
  return (
    <div>
      {contents}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
