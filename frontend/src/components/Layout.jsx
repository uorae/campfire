import NavBar from './NavBar'

export default function Layout({ children }) {
    return (
        <div className="flex flex-col items-center h-screen">
            <NavBar />
            {children}
        </div>
    )
}