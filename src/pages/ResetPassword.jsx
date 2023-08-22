import { useMutation } from "@apollo/client";
import { useState } from "react";
import lock from "../assets/lock.svg";
import { Link, useNavigate } from "react-router-dom";
import { SEND_RESET_EMAIL } from "../graphql/mutations";

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const [sendResetEmail, { loading, error }] = useMutation(SEND_RESET_EMAIL);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      await sendResetEmail({
        variables: {
          email: formData.email,
        },
      }).then((res) => {
        navigate("/auth/login");
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formData.email);
  return (
    <div className="flex h-screen">
      <div className="m-auto ">
        <div className="max-w-xs mx-auto p-8 border bg-white ">
          <img src={lock} className="ml-1 w-76" alt="Lock icon" />
          <form onSubmit={handleSendEmail}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded-sm"
            />
            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Send login link
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
          <div className="text-center mt-4">
            <Link to="/auth/register" className="text-blue-500 hover:underline">
              Create new account
            </Link>
          </div>
          <div className="mt-6 border-t pt-4 text-center">
            <p>
              <Link
                to="/auth/login"
                className="text-black font-bold hover:text-gray-400 ml-2"
              >
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
