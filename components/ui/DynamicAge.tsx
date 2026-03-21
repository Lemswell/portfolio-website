import { differenceInYears } from 'date-fns/differenceInYears';

const Age = () => {
  const birthDate = new Date(2000, 4, 25);
  const currentDate = new Date();

  return (
    <span>{differenceInYears(currentDate, birthDate)}</span>
  )
}

export default Age;