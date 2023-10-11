import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import logo from "../assets/logo.png";
import { AiFillFacebook } from "react-icons/ai";

function Login() {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [login, { data, loading, error }] = useMutation(LOGIN);

  useEffect(() => {
    if (data) {
      console.log(data);
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("user", JSON.stringify(data.login.user));
      setUser(data.login.user);
      navigate("/");
    }
  }, [data, setUser, navigate]);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      login({
        variables: {
          identifier: formData.identifier,
          password: formData.password,
        },
      });
    } catch (error) {
      console.error("@login", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto ">
        <div className="max-w-xs mx-auto p-8 border bg-white ">
          <img src={logo} className="ml-8" />
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="identifier"
              placeholder="Username or Email"
              value={formData.identifier}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 border rounded-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded-sm"
            />
            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Log In
            </button>
          </form>
          <div className="flex flex-row items-center justify-center">
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-200" />
              <span className="absolute px-3 font-bold text-xs font-small text-gray-500 -translate-x-1/2 bg-white left-1/2 ">
                OR
              </span>
            </div>
          </div>
          <button
            type="submit"
            className=" flex flex-row w-full  text-blue-900 font-bold py-2 rounded-lg  mt-4 items-center justify-center"
          >
            <AiFillFacebook className="ml-2 mr-2 object-fill" />
            Log in with Facebook
          </button>
          <div className="text-center mt-4">
            <Link to="/auth/reset" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="mt-6 border-t pt-4 text-center">
            <p>
              {"Don't have an account?"}
              <Link
                to="/auth/register"
                className="text-blue-500 hover:underline ml-2"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
