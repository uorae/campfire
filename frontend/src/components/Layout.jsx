import NavBar from './NavBar'

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    )
}