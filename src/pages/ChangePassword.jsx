import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../graphql/mutations";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import lock from "../assets/lock.svg";

function VerifyReset() {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const { token } = useParams();
  const navigate = useNavigate();

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async () => {
    try {
      if (passwords.password !== passwords.confirmPassword) {
        console.log("Passwords do not match");
        return;
      }

      await resetPassword({
        variables: {
          token: token,
          newPassword: passwords.password,
        },
      }).then((res) => {
        console.log(res);
        navigate("/auth/login");
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(token);

  return (
    <div className="flex h-screen">
      <div className="m-auto ">
        <div className="max-w-xs mx-auto p-8 border bg-white ">
          <img src={lock} className="ml-1 w-76" alt="Lock icon" />
          {token ? (
            <form onSubmit={handleResetPassword}>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={passwords.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 border rounded-sm"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={passwords.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 border rounded-sm"
              />
              <button
                type="submit"
                className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Change Password
              </button>
            </form>
          ) : null}
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

export default VerifyReset;
