// import { useDispatch, useSelector } from "react-redux"
// import { increment, decrement } from "./redux/counterSlice"
import lock from "../assets/lock.svg";
import email from "../assets/sms.svg";
import Google from "../assets/google-icon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { add } from "../redux/tokenSlice";

function Login() {
  const [Mode, setMode] = useState("light");
  const users = useSelector((state) => state.user);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(users);

  useEffect(() => {
    if (localStorage.getItem("mode")) {
      setMode(localStorage.getItem("mode"));
    }
  }, []);

  function validate() {
    if (!emailRef.current.value) {
      alert("Email is null");
      return false;
    }
    if (!passwordRef.current.value) {
      alert("Password is null");
      return false;
    }

    return true;
  }

  function handleClick(e) {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      let user = users.find((el) => {
        return (
          el.email == emailRef.current.value &&
          el.password == passwordRef.current.value
        );
      });

      if (user) {
        dispatch(add(user.email));
      } else {
        alert("email yoki password notog'ri");
      }
      navigate("/");

      emailRef.current.value = null;
      passwordRef.current.value = null;
    }
  }

  function handleMode(e) {
    e.preventDefault();
    if (Mode == "light") {
      localStorage.setItem("mode", "dark");
      return setMode("dark");
    } else if (Mode == "dark") {
      localStorage.setItem("mode", "light");
      return setMode("light");
    }
  }
  // const counter = useSelector(state => state.counter.value)
  // const dispatch = useDispatch()
  // function handleADD() {
  //   dispatch(increment(5))
  // }
  // function handleREMOVE() {
  //   dispatch(decrement(5))
  // }

  return (
    <div
      className={`w-full py-[100px] h-screen transition-all ${
        Mode == "light"
          ? "bg-[#999999] duration-300"
          : "bg-[#151515] duration-300"
      }`}
    >
      <div
        className={`w-[498px] transition-all ${
          Mode == "light"
            ? "bg-white duration-300"
            : "bg-[#181818] duration-300"
        } rounded-[10px] pt-10 mx-auto`}
      >
        <h1
          className={`text-[27.9px] mb-[30px] transition-all font-bold ${
            Mode == "dark"
              ? "text-[#D8D8D8] duration-300"
              : "text-black duration-300"
          } text-center leading-[33.76px]`}
        >
          Welcome back!
        </h1>
        <form className="w-[418.43px] flex flex-col mx-auto">
          <div className="relative">
            <img className="absolute mt-[40px] ml-[10px]" src={email} alt="" />
            <h3
              className={`text-[16px] mb-[10px] transition-all ${
                Mode == "dark"
                  ? "text-[#D8D8D8] duration-300"
                  : "text-black duration-300"
              } leading-[19.29px]`}
            >
              Email
            </h3>
            <input
              ref={emailRef}
              className={`w-[418.43px] bg-transparent transition-all border ${
                Mode == "light"
                  ? "border-[#D1D1D1] duration-300"
                  : "border-[#797979] text-[#D8D8D8] duration-300"
              } pl-[49px] h-[50px] rounded-[10px] mb-[20px] focus:outline-none placeholder:text-[#797979]`}
              type="text"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <img className="absolute mt-[40px] ml-[10px]" src={lock} alt="" />
            <h3
              className={`text-[16px] mb-[10px] transition-all ${
                Mode == "dark"
                  ? "text-[#D8D8D8] duration-300"
                  : "text-black duration-300"
              } leading-[19.29px]`}
            >
              Password
            </h3>
            <input
              ref={passwordRef}
              className={`w-[418.43px] bg-transparent transition-all border ${
                Mode == "light"
                  ? "border-[#D1D1D1] duration-300"
                  : "border-[#797979] text-[#D8D8D8] duration-300"
              } pl-[49px] h-[50px] rounded-[10px] mb-[20px] focus:outline-none placeholder:text-[#797979]`}
              type="password"
              placeholder="Enter password"
            />
          </div>
          <button
            onClick={handleClick}
            className="px-[179px] mb-[15px] py-[15px] text-[16px] leading-[19.29px] text-white font-semibold bg-gradient-to-r rounded-[10px] from-[#FFA7A7] to-[#FF014E]  duration-300"
          >
            Log In
          </button>

          <button
            onClick={handleMode}
            className={`px-[179px] mb-[15px] py-[15px] text-[16px] leading-[19.29px] ${
              Mode == "light" ? "bg-black text-white" : "bg-white text-black"
            } font-semibold bg-gradient-to-r rounded-[10px]  duration-300`}
          >
            {Mode == "light" ? "Dark" : "Light"}
          </button>

          <h3
            onClick={() => navigate("/register")}
            className={`text-[15.94px] leading-[19.29px] text-center cursor-pointer transition-all mb-[30px] ${
              Mode == "light"
                ? "text-black duration-300"
                : "text-[#D8D8D8] duration-300"
            }`}
          >
            dont have your account
          </h3>
        </form>
      </div>
    </div>
  );
}

export default Login;
