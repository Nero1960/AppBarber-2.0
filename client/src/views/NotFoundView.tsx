import { Link } from "react-router-dom"


const NotFoundView = () => {
    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-3xl font-semibold text-white-500">404</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-white-500 sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-brown-200">Lo sentimos, estas intentando acceder a una pagina inexistente.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to={'/'}
                        className="rounded-md bg-white-100 px-3.5 py-2.5 text-sm font-semibold  shadow-sm hover:bg-white-500 duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                    >
                        Ir a Inicio
                    </Link>
                    
                </div>
            </div>
        </main>
    )
}

export default NotFoundView