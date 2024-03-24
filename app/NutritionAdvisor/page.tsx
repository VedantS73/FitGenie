"use client";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { generateAnswer } from "nutrition-ai";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Compressor from "compressorjs";

export default function Home() {
  const [base64String, setBase64String] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleGenerateAnswer = async (
    imageBase64: string,
    fileType: string
  ) => {
    setIsGenerating(true);
    try {
      const answer = await generateAnswer({
        fileBase64: imageBase64,
        fileMimeType: fileType as "image/jpeg" | "image/png",
        googleKey: "AIzaSyBDejQiXYSSOZZT9oKtryesOOWqAObwtiw",
      });
      setGeneratedText(answer);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      setBase64String(base64);
      handleGenerateAnswer(base64.split(",")[1], file.type);
    };

    new Compressor(file, {
      quality: 0.7,
      success: (compressedFile) => {
        reader.readAsDataURL(compressedFile);
      },
      error: (_error) => {
        setIsError(true);
      },
    });
  }, []);

  const { getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop,
  });

  return (
    <main className="min-h-screen pb-10 mt-12 px-5 md:px-2">

      <div className="text-center text-violet-600">
        <h1 className="font-sans text-4xl text-violet-600 font-bold">Nutrition Advisor</h1>
        <p className="max-w-96 mx-auto font-sans text-violet-600 text-center mt-3">
          Upload a clear food image to receive expert nutritional analysis.
        </p>
      </div>

      <div className="mx-auto flex justify-center mt-10">
        {base64String ? (
          <div className="flex flex-col items-end">
            <Image
              className="w-full h-full object-contain max-w-2xl"
              src={base64String}
              width={320}
              height={320}
              alt="preview"
            />
            {!isGenerating && (generatedText || isError) && (
              <button
                type="button"
                className="text-white mt-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => {
                  setBase64String(null);
                  setGeneratedText(null);
                  setIsGenerating(false);
                  setIsError(false);
                }}
              >
                Reset
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full max-w-lg">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG or JPG
                </p>
              </div>
              <input {...getInputProps()} />
            </label>
          </div>
        )}
      </div>

      {isGenerating && (
        <div className="flex justify-center my-16">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}

      {!isGenerating && !generatedText && isError && (
        <p className="max-w-2xl mx-auto text-gray-700 mt-10">
          We apologize, but it seems an error has occurred. Kindly attempt to
          re-upload the image, ensuring that its size is below 2 MB. Thank you
          for your understanding.
        </p>
      )}

      {generatedText && (
        <p className="max-w-2xl mx-auto text-gray-700 mt-10">
          <Markdown className="prose">{generatedText}</Markdown>
        </p>
      )}
    </main>
  );
}
