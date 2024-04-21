import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const users = useSelector((state) => state.user);
  const token = useSelector((state) => state.token.value);
  const [Mode, setMode] = useState("light");
  console.log(7, token);
  console.log(8, users);
  useEffect(() => {
    if (localStorage.getItem("mode")) {
      setMode(localStorage.getItem("mode"));
    }
  }, []);

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

  return (
    <div
      className={`w-full h-screen ${
        Mode == "dark" ? "bg-[#252525]" : "bg-white"
      }`}
    >
      <div className="">
        <div
          className={`w-[500px] mx-auto pt-60 text-center flex flex-col items-center`}
        >
          <Link
            className={`w-[380px] mb-[15px] py-[15px] text-[16px] ${
              Mode == "light"
                ? "bg-[#252525] text-white"
                : "bg-white text-[#252525]"
            } font-semibold bg-gradient-to-r rounded-[10px] transition hover:opacity-75 duration-300`}
            to="/login"
          >
            Log out
          </Link>
          <button
            onClick={handleMode}
            className={`w-[380px] mb-[15px] py-[15px] text-[16px] ${
              Mode == "light"
                ? "bg-[#252525] text-white"
                : "bg-white text-[#252525]"
            } font-semibold bg-gradient-to-r rounded-[10px] transition hover:opacity-75 duration-300`}
          >
            {Mode == "light" ? "Dark" : "Light"}
          </button>

          {users.map((el, index) => {
            if (token == el.email) {
              return (
                //   <div
                //     className={`${Mode == "dark" ? "text-white" : "text-black"}`}
                //     key={index}
                //   >
                //     <h1>{el.name}</h1>
                //     <h1>{el.email}</h1>
                //     <h1>{el.age}</h1>
                //   </div>

                <div
                  key={index}
                  className={`${Mode == "dark" ? "text-white" : "text-black"}`}
                >
                  <div
                    className={`w-[380px] mb-[15px] py-[15px] text-[16px] ${
                      Mode == "light"
                        ? "bg-[#252525] text-white"
                        : "bg-white text-[#252525]"
                    } font-semibold bg-gradient-to-r rounded-[10px] duration-300`}
                  >
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight">
                        {el.name}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal ">{el.email}</p>
                    <p className="mb-3 font-normal ">{el.age}</p>
                  </div>
                </div>
              );
            }
            return;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
