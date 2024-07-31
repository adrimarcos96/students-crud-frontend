
"use server";
import { Student } from "@/models/student.model";
import { fetchPaginatedResources, ResponseData } from "./baseService";
import { sleep } from "@/utils";
import { mockedStudentList } from "@/mocks/students.mock";

export const fetchStudents = async (page: number, pageSize: number): Promise<ResponseData<Student[]>> => {
  await sleep(2000);
  // await fetchPaginatedResources<Student[]>('students', page, pageSize);
  return {
    success: true,
    data: mockedStudentList
  }
};