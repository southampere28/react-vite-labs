import { NavLink, Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const RootLayout = () => {
    return (
        <div>
            {/* 1. Navbar Navigasi dengan NavLink */}
            <nav style={{
                display: "flex",
                gap: "1rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: "#f0f0f0"
            }}>
                <NavLink
                    to="/"
                    style={({ isActive }) => ({
                        color: isActive ? '#38bdf8' : '#cbd5e1',
                        textDecoration: 'none',
                        fontWeight: isActive ? 'bold' : 'normal'
                    })}
                >
                    🏠 Beranda & Mahasiswa
                </NavLink>

                <NavLink
                    to="/notes"
                    style={({ isActive }) => ({
                        color: isActive ? '#38bdf8' : '#cbd5e1',
                        textDecoration: 'none',
                        fontWeight: isActive ? 'bold' : 'normal'
                    })}
                >
                    📖 Catatan Belajar
                </NavLink>
            </nav>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};