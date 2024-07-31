import styles from "./page.module.css";
import NavbarComponent from "@/components/navbar/navbarComponent";
import TableComponent from "@/components/table/tableComponent";
import { fetchStudents } from "@/services/usersService";

export default async function Home() {
  const { success, data } = await fetchStudents(1, 10);

  return (
    <main className={styles.main}>
      <NavbarComponent/>
      <p>Students found: { data?.length }</p>
      <TableComponent/>
    </main>
  );
}
