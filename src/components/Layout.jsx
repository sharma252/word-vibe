import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100 w-100">
            <Navbar />

            <main className="flex-grow-1 pb-5">{children}</main>

            <footer className="text-white text-center py-4 mt-auto" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', boxShadow: '0 -4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <div className="container">
                    <p className="mb-0">
                        &copy; 2025 WordVibe. Built with React & Bootstrap
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
