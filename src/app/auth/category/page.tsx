"use client";

import { useRouter } from "next/navigation";
import AuthPage from "@/components/AuthPage";
import { useEffect } from "react";
import { useState } from "react";
import Submit from "@/components/client/Form/Submit";
import Error from "@/components/client/Form/Error";
import { getAllBookCategories } from "@/redux/action/category";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Category, User } from "@/interfaces";
import { setUserCategory } from "@/redux/api";
import { routeHandler } from "@/utils/routeHandler";
import { getUserReducer, setUserCategoryReducer } from "@/redux/reducer/user";
import SnackbarComponent from "@/utils/components/Snackbar";
import Cookie from 'js-cookie'

export default function SelectCategory() {

  ////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////
  const router = useRouter();
  const dispatch = useDispatch();
  const { bookCategories }: { bookCategories: Category[] } = useSelector((state: RootState) => state.category)
  const loggedUser: User | null = Cookie.get('askexpert_profile') ? JSON.parse(Cookie.get('askexpert_profile')) : null

  ////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarText, setSnackbarText] = useState<string>("");

  ////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////
  useEffect(() => {
    if (loggedUser?.category) return router.push('/dashboard')
    dispatch<any>(getAllBookCategories())
  }, []);


  ////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (bookCategories.length === 0) return setError("Please wait while we fetch the bookCategories");
    const category = e.target.bookCategories.value;
    if (category.length == 0) return setError("Please select a category")
    try {
      // setting user category
      setLoader(true)
      const { data }: { data: string } = await setUserCategory(category)
      console.log('{ ...loggedUser, category: category }', { ...loggedUser, category: category })
      Cookie.set('askexpert_profile', JSON.stringify({ ...loggedUser, category: category }))
      console.log(Cookie.get('askexpert_profile'), 'profile')
      router.push('/dashboard')
      setOpenSnackbar(false)
      setSnackbarText(data)
      setLoader(false)
    }
    catch (err: any) {
      setOpenSnackbar(true)
      setSnackbarText(err?.response?.data?.message)
      setLoader(false)
    }
  };





  return (
    <AuthPage onSubmit={handleSubmit} title="Choose Field" customPage="/auth/register" className="pb-28">

      {error && <Error>{error}</Error>}
      <SnackbarComponent open={openSnackbar} setOpen={setOpenSnackbar} note={snackbarText} />

      <label htmlFor="bookCategories" className="block text-sm font-medium text-gray-900 self-start mb-3">
        Choose Your Field
      </label>
      <select
        id="bookCategories"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:focus:ring-blue-500"
        defaultValue={bookCategories[0]?.name}
      >
        <option value={''} >Select Category</option>
        {bookCategories &&
          bookCategories.map((category: any, index: number) => {
            return (
              <option value={category._id} key={index}>
                {category.name}
              </option>
            );
          })}
      </select>
      <div className="absolute bottom-5 w-full px-12">
        <Submit placeholder={loader ? 'Processing...' : "Done!"} type="submit" />
      </div>
    </AuthPage>
  );
}
