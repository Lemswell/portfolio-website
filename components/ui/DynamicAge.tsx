'use client';

import { differenceInYears } from 'date-fns/differenceInYears';

const Age = () => {
  const birthDate = new Date("2000-4-25");
  const currentDate = new Date();
  const age = differenceInYears(currentDate, birthDate);

  return (
    <span>{age}</span>
  )
}

export default Age;