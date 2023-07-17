import ErrorMessage from "../../errorMessage/ErrorMessage"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="404"
                />
                 <title>404-Page</title>
            </Helmet>
            <ErrorMessage/>
            <p>Page doesnt exist</p>
            <Link to="/" >Back to main page</Link>
        </div>
    )
}

export default Page404;