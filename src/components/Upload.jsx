import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../graphql/mutations";

function Upload({ isOpen, setIsOpen, posts, setPosts }) {
  const [img, setImg] = useState("");
  const [video, setVideo] = useState(null);
  const [content, setContent] = useState("");
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const cloudinaryApiUrl =
    "https://api.cloudinary.com/v1_1/daa80b8pt/image/upload";

  const handleDrop = (e) => {
    e.preventDefault();
    const fileList = e.dataTransfer.files || e.target.files;

    if (fileList.length > 0) {
      const file = fileList[0];
      setFile(file);

      if (file.type.startsWith("image")) {
        const url = URL.createObjectURL(file);
        setImg(url);
        setVideo(null);
      } else if (file.type.startsWith("video")) {
        setImg("");
        setVideo(file);
      }
    }
  };

  const handleClose = () => {
    setImg("");
    setVideo(null);
    setContent("");
    setStep(1);
    setIsOpen(false);
  };

  const [createPost] = useMutation(CREATE_POST);

  const handleButton = async () => {
    setShowButton(true);
    await handleNext();
    setShowButton(false);
  };

  const handleNext = async () => {
    if (img || video) {
      try {
        setLoading(true);
        const formData = new FormData();
        if (img) {
          formData.append("file", file);
        } else if (video) {
          formData.append("file", file);
        }
        formData.append("upload_preset", "fzt3onew");

        try {
          const response = await fetch(cloudinaryApiUrl, {
            method: "POST",
            body: formData,
          });
          const responseData = await response.json();
          const uploadedUrl = responseData.secure_url;

          const resultPromise = createPost({
            variables: {
              file: uploadedUrl,
              content: content,
            },
          });

          const result = await resultPromise;

          console.log("Mutation Result:", result);

          if (result.data && result.data.createPost) {
            console.log("New Post:", result.data.createPost);
            setPosts((prevPosts) => [result.data.createPost, ...prevPosts]);
            setIsOpen(false);
            setLoading(false);
          } else {
            console.log("Error creating post: ", result.errors);
          }
        } catch (error) {
          console.log("Error uploading image or video", error);
        }
      } catch (error) {
        console.error("Error uploading image or video", error);
      }
    } else {
      console.log("Please select an image or a video first.");
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-row items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create Post</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black opacity-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className=" text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                      <div
                        className="absolute inset-0 bg-black opacity-25"
                        onClick={handleClose}
                      ></div>
                      <div className="z-50 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                        <h3 className="text-3xl font-semibold mb-4">
                          Create Post
                        </h3>
                        {step === 1 && (
                          <div
                            className="w-[300px] h-[300px] mb-4 border-dashed border-2 border-gray-300 flex flex-col items-center justify-center"
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                          >
                            {img || video ? (
                              <div>
                                {img && (
                                  <img
                                    src={img}
                                    alt="Uploaded"
                                    className="max-w-full max-h-full"
                                  />
                                )}
                                {video && (
                                  <video
                                    controls
                                    src={URL.createObjectURL(video)}
                                    className="max-w-full max-h-full"
                                  />
                                )}
                                <button
                                  className="w-full p-3 border-t text-blue font-semibold hover:text-lightBlue mt-4"
                                  onClick={() => setStep(2)}
                                >
                                  NEXT
                                </button>
                              </div>
                            ) : (
                              <p>Please select an image or a video.</p>
                            )}
                          </div>
                        )}

                        {step === 2 && (
                          <div className="w-full mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Enter Content
                            </label>
                            <input
                              type="text"
                              name="content"
                              className="w-full py-2 px-3 rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              onChange={(e) => setContent(e.target.value)}
                            />
                            <button
                              className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                              onClick={handleButton}
                              disabled={showButton}
                            >
                              {loading ? "Loading..." : "Submit"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export default Upload;
