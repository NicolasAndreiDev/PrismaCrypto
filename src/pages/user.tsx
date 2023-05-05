import InfoUser from "@/components/InfoUser";
import Layout from "@/components/Layout";
import PrivateRoute from "@/utils/PrivateRoute";

export default function User() {
    return (
        <PrivateRoute>
            <Layout>
                <InfoUser />
            </Layout>
        </PrivateRoute>
    )
}