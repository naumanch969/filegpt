"use client";

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { SyntheticEvent, useEffect, useState } from "react";
import AuthPage from "@/components/AuthPage";

import axios from "../../../utils/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { baseURL } from "@/constants";

import Image from "next/image";
import passwordSchema from "@/utils/passwordValidator";
import Input from "@/components/client/Form/Input";
import Submit from "@/components/client/Form/Submit";
import GoogleSignIn from "@/components/client/Form/Google";
import HyperLink from "@/components/client/Form/hyperLink";
import FormHeading from "@/components/client/Form/FormHeading";
import Error from "@/components/client/Form/Error";
import Loader from "@/utils/components/Loader";
import { register } from "@/redux/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SnackbarComponent from "@/utils/components/Snackbar";
import { User } from "@/interfaces";
import Cookie from 'js-cookie'

interface ErrorType {
  message?: string;
  location?: "email" | "password" | "top" | "name" | "cpassword";
}

export default function Login() {

  /////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////
  const dispatch = useDispatch()
  const router = useRouter();
  const loggedUser: User | null = Cookie.get('askexpert_profile') ? JSON.parse(Cookie.get('askexpert_profile')) : null

  /////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////////
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<ErrorType>({});
  const [loader, setLoader] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarText, setSnackbarText] = useState<string>('');

  /////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////////
  useEffect(() => {
    if (loggedUser?.name) return router.push('/dashboard')
  }, [])

  /////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const cpassword = e.target.cpassword.value;

    if (!name) return setError({ message: "Please enter your name", location: "name" });
    if (!email) return setError({ message: "Please enter your email", location: "email" });
    if (!password) return setError({ message: "Please enter your password", location: "password" });
    if (!cpassword) return setError({ message: "Please confirm your password", location: "cpassword", });

    // check if email is valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError({ message: "Email is not valid", location: "email" });

    // check if password is minimum 8 characters, has a number and any character, and has a capital letter
    const isPasswordInvalid: any = passwordSchema.validate(password, { details: true, });
    if (isPasswordInvalid.length > 0) return setError({ message: isPasswordInvalid[0].message.replace("string", "password"), location: "password", });
    if (password !== cpassword) return setError({ message: "Password and confirm password must be the same", location: "cpassword" });

    try {
      setLoader(true)
      const { data } = await register({ name, email, password })
      router.push('/auth/verify')
      setOpenSnackbar(true)
      setSnackbarText(data.message)
      setLoader(false)
    }
    catch (err: any) {
      setOpenSnackbar(true)
      setSnackbarText(err?.response?.data?.message || 'Internal Server Error')
      setLoader(false)
    }


  };
  return (
    <AuthPage title="Register" onSubmit={handleSubmit} className="pb-20">

      <SnackbarComponent open={openSnackbar} setOpen={setOpenSnackbar} note={snackbarText} />

      {error.location === "top" && <Error>{error.message}</Error>}
      <FormHeading>Full Name</FormHeading>
      {error.location === "name" && <Error>{error.message}</Error>}
      <Input
        placeholder="Enter your full name"
        type="text"
        name="name"
        onChange={() => setError({})}
        invalid={error.location === "name" && error.message !== ""}
      />

      <FormHeading>Email</FormHeading>
      {error.location === "email" && <Error>{error.message}</Error>}
      <Input
        type="email"
        placeholder="Enter you email"
        onChange={() => setError({})}
        invalid={error.location === "email" && error.message !== ""}
      />

      <FormHeading>Password</FormHeading>
      {error.location === "password" && <Error>{error.message}</Error>}
      <div className="w-full relative mb-3">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter you password"
          isPassword={true}
          onChange={() => setError({})}
          name="password"
          invalid={error.location === "password" && error.message !== ""}
        />

        <div
          className="top-1/2 right-2 -translate-y-1/2 absolute p-1 hover:bg-slate-100 rounded-2xl cursor-pointer transition-all duration-75"
          onClick={handleShowPassword}
        >
          <HiOutlineEye
            className={`text-light-gray ${!showPassword ? "" : "hidden"} `}
            size="1.4em"
          />
          <HiOutlineEyeOff
            className={`text-light-gray  ${showPassword ? "" : "hidden"}`}
            size="1.4em"
          />
        </div>
      </div>
      <FormHeading>Confirm Password</FormHeading>
      {error.location === "cpassword" && <Error>{error.message}</Error>}
      <div className="w-full relative mb-8">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter you password"
          isPassword={true}
          onChange={() => setError({})}
          name="cpassword"
          invalid={error.location === "cpassword" && error.message !== ""}
        />

        <div
          className="top-1/2 right-2 -translate-y-1/2 absolute p-1 hover:bg-slate-100 rounded-2xl cursor-pointer transition-all duration-75"
          onClick={handleShowPassword}
        >
          <HiOutlineEye
            className={`text-light-gray ${!showPassword ? "" : "hidden"} `}
            size="1.4em"
          />
          <HiOutlineEyeOff
            className={`text-light-gray  ${showPassword ? "" : "hidden"}`}
            size="1.4em"
          />
        </div>
      </div>
      <Submit type="submit" placeholder={loader ? "Loading..." : "Create account"} />

      <div className="mt-4 mb-3 text-slate-400 font-light">
        Or using other method
      </div>
      <GoogleSignIn />
      <div className="mt-4 mb-3 text-slate-400 font-light absolute bottom-3">
        Already have an account?{" "}
        <HyperLink href={"/auth/login"} bold={true}>
          Login
        </HyperLink>
      </div>
    </AuthPage>
  );
}
