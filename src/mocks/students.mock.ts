import { faker } from '@faker-js/faker';
import { Student } from "@/models/student.model";

export const getMockedStudentList = (totalStudents?: number): Student[] => {
  const mockedStudentList: Student[] = [];
  const length = typeof totalStudents === 'undefined' ? 100 : totalStudents;

  for (let i = 0; i < length; i++) {
    mockedStudentList.push({
      id: i.toString(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 7, max: 12}),
      email: faker.internet.email(),
      grade: generateGrade()
    });
  }

  return mockedStudentList;
};

const generateGrade = (): string => {
  const num: number = faker.number.int({ min: 1, max: 6});
  const suffix = getNumberSuffix(num);

  return `${num}${suffix}`;
};

const getNumberSuffix = (n: number): string =>{
  let ord = 'th';

  if (n % 10 == 1 && n % 100 != 11) {
    ord = 'st';
  } else if (n % 10 == 2 && n % 100 != 12) {
    ord = 'nd';
  } else if (n % 10 == 3 && n % 100 != 13) {
    ord = 'rd';
  }

  return ord;
};
