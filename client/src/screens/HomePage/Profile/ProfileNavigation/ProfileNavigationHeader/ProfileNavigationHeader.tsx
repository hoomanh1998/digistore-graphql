import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER_DETAILS } from "../../../../../graphQL";
import { CurrentUserDetails } from "../../../../../ts/types";
import UserProfileImage from "../../../../../assets/images/user-profile.jpg";

export function ProfileNavigationHeader() {
  const [imageLoading, setImageLoading] = useState(true);
  const { loading, data } = useQuery<CurrentUserDetails>(
    GET_CURRENT_USER_DETAILS
  );

  return (
    <div className="flex flex-col w-full">
      <div className="h-28 bg-gradient-to-r from-blue-500 to-purple-500" />
      <div className="relative flex flex-col items-center p-5 pb-0">
        <div className="absolute -top-14 md:-top-12 rounded-full overflow-hidden w-28 h-28 md:w-24 md:h-24 ring-1 ring-gray-300 dark:ring-gray-700 shadow-lg">
          {loading && (
            <div className="bg-gray-200 dark:bg-gray-400 w-28 h-28 md:w-24 md:h-24 rounded-full">
              <div className="animate-pulse-fast w-full h-full rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>
          )}
          <img
            src={UserProfileImage}
            alt="user-profile"
            className="object-cover"
            onLoad={() => setImageLoading(false)}
          />
        </div>
        <div className=" w-full flex flex-col items-center text-center mt-14">
          {imageLoading ? (
            <div className="animate-pulse-fast flex flex-col items-center w-full space-y-2 mb-3 px-3">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md w-2/3" />
              <div className="h-5 bg-gray-400 dark:bg-gray-700 rounded-md w-4/5" />
            </div>
          ) : (
            <div className="text-gray-800 dark:text-white mb-3 px-3">
              <div className="font-bold text-xl">
                {data &&
                  data.currentUser.firstName + " " + data.currentUser.lastName}
              </div>
              <div className="font-semibold text-gray-500 dark:text-gray-400 break-all">
                {data && data.currentUser.email}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
