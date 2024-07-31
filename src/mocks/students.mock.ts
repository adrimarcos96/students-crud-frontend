import { faker } from '@faker-js/faker';
import { Student } from "@/models/student.model";

export const getMockedStudentList = (totalStudents?: number): Student[] => {
  const mockedStudentList: Student[] = [];
  const length = typeof totalStudents === 'undefined' ? 80 : totalStudents;

  for (let i = 0; i < length; i++) {
    mockedStudentList.push({
      id: i.toString(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 7, max: 12}),
      email: faker.internet.email(),
      grade: faker.number.int({ min: 1, max: 6}).toString()
    });
  }

  return mockedStudentList;
}
