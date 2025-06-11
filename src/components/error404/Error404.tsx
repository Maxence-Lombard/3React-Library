import Lottie from "lottie-react";
import {useNavigate} from "react-router";
import defaultClass from "./Error404.module.css";
import errorAnimation from "@assets/lottie/404.json";

function Error404() {
    const navigate = useNavigate();
    return(
        <div className={defaultClass.container}>
            <Lottie animationData={errorAnimation} />
            <div className={defaultClass.subcontainer}>
                <div>
                    <h1 className={defaultClass.error}> 404 </h1>
                    <p className={defaultClass.subtitle}>Something went wrong</p>
                </div>
                <p className="text-center mt-4"> We couldn’t find the page you were looking for. </p>
                <button className={defaultClass.button}
                    onClick={() => navigate('/')}>
                    GO BACK HOME
                </button>
            </div>

        </div>
    );
}

export default Error404;