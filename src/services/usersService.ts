
"use server";
import { Student } from "@/models/student.model";
import { fetchPaginatedResources, ResponseData, PaginatedResponse } from "./baseService";
import { getMockedStudentList } from "@/mocks/students.mock";

export const fetchStudents = async (page: number, pageSize: number): Promise<ResponseData<PaginatedResponse<Student>>> => {
  // return await fetchPaginatedResources<Student>('students', page, pageSize);

  const startAt = (page - 1) * pageSize;
  const endAt = startAt + pageSize;
  const totalItems = 23;
  const students = getMockedStudentList(totalItems).slice(startAt, endAt)

  return {
    success: true,
    data: {
      data: students,
      page,
      totalItems
    }
  }
};
