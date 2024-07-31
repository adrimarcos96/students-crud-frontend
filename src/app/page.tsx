'use server'
import styles from "./page.module.css";
import NavbarComponent from "@/components/app/navbar/navbarComponent";
import StudentsTableComponent from "@/components/students/studentsTableComponent";
import { fetchStudents } from "@/services/usersService";
import { StudentsContextProvider } from "@/context/studentsStore";

export default async function Home() {
  const { data } = await fetchStudents(1, 10);

  return (
    <main className={styles.main}>
      <StudentsContextProvider>
        <NavbarComponent/>

        <StudentsTableComponent initialData={data || []} />
      </StudentsContextProvider>
    </main>
  );
}
