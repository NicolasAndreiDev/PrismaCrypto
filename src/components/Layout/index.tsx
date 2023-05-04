import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{position: 'relative'}}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}