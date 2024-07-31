
"use server";
import { Student } from "@/models/student.model";
import { fetchPaginatedResources, ResponseData } from "./baseService";
import { getMockedStudentList } from "@/mocks/students.mock";

export const fetchStudents = async (page: number, pageSize: number): Promise<ResponseData<Student[]>> => {
  // return await fetchPaginatedResources<Student>('students', page, pageSize);
  const startAt = (page - 1) * pageSize;
  const endAt = startAt + pageSize;
  return {
    success: true,
    data: getMockedStudentList().slice(startAt, endAt)
  }
};
