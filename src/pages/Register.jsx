import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/usersSlice";
import lock from "../assets/lock.svg";
import email from "../assets/sms.svg";
import user from "../assets/user.svg";
import age from "../assets/Calendar.svg";
import Google from "../assets/google-icon.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [Mode, setMode] = useState("light");
  const users = useSelector((state) => state.user);
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const emailRef = useRef(null);
  const RePasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  console.log(21, users.length);

  useEffect(() => {
    if (localStorage.getItem("mode")) {
      setMode(localStorage.getItem("mode"));
    }
  }, []);

  function validate() {
    if (!nameRef.current.value) {
      alert("Name is null");
      return false;
    }

    if (ageRef.current.value == 0) {
      alert("Age is null");
      return false;
    }

    if (ageRef.current.value < 5 || ageRef.current.value > 150) {
      alert("Age should be less than 5 not more than 150");
      return false;
    }

    if (!emailRef.current.value) {
      alert("Email is null");
      return false;
    }

    if (!passwordRef.current.value) {
      alert("Password is null");
      return false;
    }

    if (!RePasswordRef.current.value) {
      alert("RePassword is null");
      return false;
    }

    if (passwordRef.current.value != RePasswordRef.current.value) {
      alert("Password does not match");
      return false;
    }

    return true;
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
  // const counter = useSelector(state => state.user.value)
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      if (users.length > 0) {
        let user = users.find((el) => {
          return el.email == emailRef.current.value;
        });
        if (user) {
          alert("Bunday email mavjud");
        } else {
          dispatch(
            register({
              name: nameRef.current.value,
              age: ageRef.current.value,
              email: emailRef.current.value,
              password: passwordRef.current.value,
            })
          );
          console.log(95);
          navigate("/login");
          nameRef.current.value = null;
          ageRef.current.value = null;
          emailRef.current.value = null;
          passwordRef.current.value = null;
          RePasswordRef.current.value = null;
        }
      } else {
        const userData = {
          name: nameRef.current.value,
          age: ageRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        };

        console.log(108, userData);
        dispatch(register(userData));
        navigate("/login");
        nameRef.current.value = null;
        ageRef.current.value = null;
        emailRef.current.value = null;
        passwordRef.current.value = null;
        RePasswordRef.current.value = null;
      }
    }
  }

  return (
    <div
      className={`w-full py-[100px] h-full transition-all ${
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
          Register
        </h1>
        <form className="w-[418.43px] flex flex-col mx-auto">
          <div className="relative">
            <img className="absolute mt-[40px] ml-[10px] " src={user} alt="" />
            <h3
              className={`text-[16px] mb-[10px] transition-all ${
                Mode == "dark"
                  ? "text-[#D8D8D8] duration-300"
                  : "text-black duration-300"
              } leading-[19.29px]`}
            >
              Name
            </h3>
            <input
              ref={nameRef}
              className={`w-[418.43px] bg-transparent transition-all border ${
                Mode == "light"
                  ? "border-[#D1D1D1] duration-300"
                  : "border-[#797979] text-[#D8D8D8] duration-300"
              } pl-[49px] h-[50px] rounded-[10px] mb-[20px] focus:outline-none placeholder:text-[#797979]`}
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="relative">
            <img
              className="absolute mt-[40px] ml-[10px]"
              src={age}
              width={23.91}
              height={23.91}
              alt=""
            />
            <h3
              className={`text-[16px] mb-[10px] ${
                Mode == "dark"
                  ? "text-[#D8D8D8] duration-300"
                  : "text-black duration-300"
              } leading-[19.29px]`}
            >
              Age
            </h3>
            <input
              ref={ageRef}
              className={`w-[418.43px] bg-transparent transition-all border ${
                Mode == "light"
                  ? "border-[#D1D1D1] duration-300"
                  : "border-[#797979] text-[#D8D8D8] duration-300"
              } pl-[49px] h-[50px] rounded-[10px] mb-[20px] focus:outline-none placeholder:text-[#797979]`}
              type="number"
              placeholder="Enter your age"
            />
          </div>
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
              Choose Password
            </h3>
            <input
              ref={RePasswordRef}
              className={`w-[418.43px] bg-transparent transition-all border ${
                Mode == "light"
                  ? "border-[#D1D1D1] duration-300"
                  : "border-[#797979] text-[#D8D8D8] duration-300"
              } pl-[49px] h-[50px] rounded-[10px] mb-[20px] focus:outline-none placeholder:text-[#797979]`}
              type="password"
              placeholder="Minimum 8 characters"
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
            className="px-[179px] mb-[15px] py-[15px] text-[16px] leading-[19.29px] text-white font-semibold bg-gradient-to-r rounded-[10px] from-[#FFA7A7] to-[#FF014E] duration-300"
          >
            Sign Up
          </button>

          <button
            onClick={handleMode}
            className={`px-[179px] mb-[15px] py-[15px] text-[16px] leading-[19.29px] ${
              Mode == "light" ? "bg-black text-white" : "bg-white text-black"
            } font-semibold bg-gradient-to-r rounded-[10px] transition  duration-300`}
          >
            {Mode == "light" ? "Dark" : "Light"}
          </button>

          <h3
            onClick={() => navigate("/login")}
            className={`text-[15.94px] leading-[19.29px] text-center cursor-pointer transition-all mb-[30px] ${
              Mode == "light"
                ? "text-black duration-300"
                : "text-[#D8D8D8] duration-300"
            }`}
          >
            do you have account?
          </h3>
        </form>
      </div>
    </div>
  );
}

export default Register;
