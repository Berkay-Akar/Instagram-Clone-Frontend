import { useEffect, useState } from "react";
import { userContext } from "../App";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/mutations";
import logo from "../assets/logo.png";
import { AiFillFacebook } from "react-icons/ai";
function Register() {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const [register, { data, loading, error }] = useMutation(REGISTER);
  if (loading) return "Submittig...";
  if (error) `Submission error! ${error.message}`;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      register({
        variables: {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      }).then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.register.token);
        localStorage.setItem("user", res.data.register.user);
        setUser(res.data.register.user);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="max-w-xs mx-auto p-8 border bg-white">
          <img className="pl-8" src={logo}></img>
          <p className="text-gray-600 font-bold pl-4 ">
            Sign up to see photos and videos from your friends.{" "}
          </p>
          <button
            type="submit"
            className=" flex flex-row w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-600 mt-4 items-center justify-center"
          >
            <AiFillFacebook className="ml-2 mr-2 object-fill" />
            Log in With Facebook
          </button>
          <div className="flex flex-row items-center justify-center">
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-200" />
              <span className="absolute px-3 font-bold text-xs font-small text-gray-500 -translate-x-1/2 bg-white left-1/2 ">
                OR
              </span>
            </div>
          </div>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.identifier}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 border rounded-sm"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.identifier}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 border rounded-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
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
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4"></div>
          <div className="mt-6 border-t pt-4 text-center">
            <p>
              {"Have an Account?"}
              <Link
                to="/auth/login"
                className="text-blue-500 hover:underline ml-2"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
