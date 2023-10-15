import { baseURL } from '@/constants'

import axios from "../utils/axios";
export const routeHandler = async (router: any) => {
  try {
    const user = await axios.get(`${baseURL}/user`, { withCredentials: true, });
    if (user.status >= 400) {
      router.push("/auth/login");
      return false;
    }
    const data = user.data;
    if (!data.verified) {
      if (router.pathname !== "/auth/verify") {
        router.push("/auth/verify");
        return false;
      }
      return user;
    } else if (!data.category) {
      if (router.pathname !== "/auth/category") {
        router.push("/auth/category");
        return false;
      }
      return user;
    } else {
      if (router.pathname !== "/") {
        router.push("/dashboard");
        return false;
      }
      return user;
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      router.push("/auth/login");
      return false;
    }
  }
};
