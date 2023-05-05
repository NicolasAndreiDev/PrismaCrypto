import Layout from "@/components/Layout";
import Tabelas from "@/components/Tabelas";
import PrivateRoute from "@/utils/PrivateRoute";

export default function Home() {
  return (
    <PrivateRoute>
      <Layout>
        <Tabelas />
      </Layout>
    </PrivateRoute>
  );
}
