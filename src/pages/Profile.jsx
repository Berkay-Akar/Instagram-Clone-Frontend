import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_USER_PROFILE } from "../graphql/queries";
import Sidebar from "../components/Sidebar";
import { GET_PROFILE_POSTS } from "../graphql/mutations";
import { useEffect, useState } from "react";

function Profile() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);

  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { username },
  });

  const [profilePosts] = useMutation(GET_PROFILE_POSTS);
  const userProfile = data?.getUserProfile[0];

  const handleProfilePosts = async () => {
    try {
      const response = await profilePosts({
        variables: {
          userId: userProfile.id,
        },
      });
      setPosts(response.data.profilePosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userProfile) {
      handleProfilePosts();
    }
  }, [userProfile]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log(userProfile);

  return (
    <>
      <div className="flex flex-row">
        <div className="border-r border-gray-extraLight">
          <Sidebar />
        </div>
        <div className="flex flex-col justify-center items-center pl-44">
          <div className="sticky top-0 flex flex-col p-4  bg-white w-[630px]">
            <div className="w-[750px] ">
              <div>
                <div className="flex flex-row items-center  justify-around mt-8">
                  <div>
                    <img
                      src={userProfile?.profile_photo}
                      className="border-2 rounded-full w-[150px] h-[150px] object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex flex-row items-start ">
                      <p className="text-2xl">{userProfile?.username}</p>
                    </div>
                    <div className="flex flex-col items-start justify-between">
                      <div className="flex flex-row">
                        <p className="flex flex-row pr-8">
                          <p className="font-bold pr-2">
                            {userProfile?.post_count}
                          </p>{" "}
                          posts
                        </p>
                        <p className="flex flex-row pr-8">
                          <p className="font-bold pr-2">
                            {" "}
                            {userProfile?.followers_count}
                          </p>{" "}
                          followers
                        </p>
                        <p className="flex flex-row pr-8">
                          <p className="font-bold pr-2">
                            {userProfile?.followings_count}
                          </p>{" "}
                          following
                        </p>
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <p className="font-bold">{userProfile?.name}</p>

                        <p>{userProfile?.description}</p>
                        <div>Folowed by</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[935px] h-[200px] border-b-2 border-gray-200 mb-8 "></div>
                <div className="grid gap-1 grid-cols-3 grid-rows-3 w-[935px]">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <div key={post.id}>
                        <img
                          src={post.file}
                          className="w-[309px] h-[309px] object-cover "
                        />
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400 ml-[350px] w-full">
                      THERE IS NOTHING TO SHOW YET
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}

export default Profile;
