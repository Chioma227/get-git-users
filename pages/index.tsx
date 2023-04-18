import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import Loader from "@/component/loader";

type User = {
  bio: string;
  login: string;
  name: string;
  location: string;
  public_repos: number;
  avatar_url: string;
  html_url: string;
};

const Index = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get<User>(
        `https://api.github.com/users/${userName}`
      );
      setUser(response.data);
      console.log(response.data);

      console.log(response.data);

      setIsLoading(false);
      setError("");
      setUserName("");

      inputRef.current?.focus();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "An error occurred. Try again."
        );
      } else {
        setError("An error occurred. Try again.");
      }
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section className="relative ">
      <div className="absolute overflow-hidden bg-[url(../img/GitHub-screen.jpg)] h-screen bg-no-repeat bg-cover bg-center brightness-[.5] blur-[2px]  inset-0"></div>
      <main className="inset-0 absolute md:overflow-auto overflow-scroll h-screen md:px-0 px-[30px]">
        <header className="text-white flex items-center justify-center flex-col md:mt-[6rem] mt-[4rem]">
          <h2 className="font-bold md:text-[30px] text-[20px] uppercase md:mb-6 mb-4">
            Get gitHub user details
          </h2>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                className="outline-none indent-2 rounded-md py-2 md:w-[200px] w-[160px] text-black md:text-lg text-sm focus:border-blue-700 focus:shadow-blue-700  transition border-x-4 border-y-2"
                type="text"
                ref={inputRef}
                onChange={(event) => setUserName(event.target.value)}
                value={userName}
              />
            </label>
            <button
              type="submit"
              className="ml-[9px] bg-blue-700 px-[15px]  md:py-[10px] py-[7px] rounded-md font-semibold"
            >
              Fetch
            </button>
          </form>
        </header>
        <main className="flex items-center justify-center flex-col mt-5">
          {isLoading && <Loader />}
          {error && <span className="text-red-500">{error}</span>}
          {user && (
            <section className="text-slate-200 font-sans">
              <div className="flex flex-col items-center justify-center mb-6">
                {user.avatar_url && (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="rounded-full border-blue-600 border-x-4 border-y-4 w-[30%] h-[30%] "
                  />
                )}
                {user.bio && (
                  <div className="text-center">
                    <p>Bio:</p> <p className="font-bold">{user.bio}</p>
                  </div>
                )}
              </div>
              <div className="md:flex grid grid-cols-2 text-center items-center justify-center md:gap-8 gap-3">
                {user.login && (
                  <div className="w-[100px] h-[120px] bg-opacity-40 bg-black p-[9px] rounded-md">
                    <p>Login:</p>
                    <p className="mt-2 font-bold "> {user.login}</p>
                  </div>
                )}
                {user.name && (
                  <div className="w-[100px] h-[120px] bg-opacity-40 bg-black p-[9px] rounded-md">
                    <p>Name:</p> <p className="mt-2 font-bold">{user.name}</p>
                  </div>
                )}
                {user.location && (
                  <div className="w-[100px] h-[120px] bg-opacity-40 bg-black p-[9px] rounded-md">
                    <p>Location</p>{" "}
                    <p className="mt-2 font-bold">{user.location}</p>
                  </div>
                )}
                {user.public_repos && (
                  <div className="w-[100px] h-[120px] bg-opacity-40 bg-black p-[9px] rounded-md">
                    <p>Public Repos:</p>{" "}
                    <p className="mt-2 font-bold">
                      {user.public_repos < 9
                        ? `00${user.public_repos}`
                        : user.public_repos && user.public_repos < 99
                        ? `0${user.public_repos}`
                        : user.public_repos}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center mt-[2rem] mb-[2rem]">
                <a
                  href={user.html_url}
                  target="_blank"
                  className=" bg-blue-500 px-[15px] py-[7px] rounded-full"
                >
                  github profile
                </a>
              </div>
            </section>
          )}
        </main>
      </main>
    </section>
  );
};

export default Index;
