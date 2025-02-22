import Button from "./button";

const BadCredentials = () => {

    const GotoLoginPage = () => {
        window.location.href = "/login";
    };

    const GotoSigninPage = () => {
        window.location.href = "/register";
    }

    return (
        <div className="flex flex-col justify-center items-center mt-6">
        <div className="m-5 p-5 border-gray-700 bg-gray-800 border-2 rounded-md w-2/4">
            <h1 className="text-red-600">Invalid Credentials</h1>
        </div>

        <div className="flex justify-center items-center mt-6">
            <Button label="Go Back" color="blue" onClick={() => window.history.back()} />
            <Button label="Login Again" color="blue" onClick={GotoLoginPage}/>
            <Button label="Register here" color="blue" onClick={GotoSigninPage}/>
        </div>
        </div>
    );
};

export default BadCredentials;