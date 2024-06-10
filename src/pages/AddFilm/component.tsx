import React from 'react';
import { FormInput } from "../../base-components/Form";
import ImageZoom from "../../base-components/ImageZoom";
import Tippy from "../../base-components/Tippy";
import Lucide from "../../base-components/Lucide";

interface ImageUploaderProps {
    title: string;
  image: string;
  setImage: (image: string) => void;
  setFile: (file: File | null) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({title, image, setImage, setFile, handleFileChange }) => {
  return (
    <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
      <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
        <div className="text-left">
          <div className="flex items-center">
            <div className="font-medium">{title}</div>
            <div
                className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
              Required
            </div>
          </div>
        </div>
      </label>
      <div className="flex-1 w-full mt-3 xl:mt-0">
        <div className="border border-dashed rounded-md border-slate-300/80">
          <div className="grid grid-cols-9 gap-5 px-5 pt-5 sm:grid-cols-10">
            { image && (
                <div
                    className="relative h-24 col-span-3 cursor-pointer md:col-span-2 image-fit zoom-in"
                >
                  <ImageZoom
                      className="rounded-lg"
                      src={image}
                  />
                  <Tippy
                      content="Remove this image?"
                      className="absolute top-0 right-0 w-5 h-5 -mt-2 -mr-2 bg-white rounded-full"
                  >
                    <div
                        className="flex items-center justify-center w-full h-full text-white border rounded-full bg-danger/80 border-danger/50">
                      <button onClick={() => {
                        setImage("");
                        setFile(null);
                      }}>
                        <Lucide
                            icon="X"
                            className="w-4 h-4 stroke-[1.3]"
                        />
                      </button>
                    </div>
                  </Tippy>
                </div>
            )}

          </div>
          <div className="relative flex items-center justify-center px-4 pb-4 mt-5 cursor-pointer">
            <Lucide icon="Image" className="w-4 h-4 mr-2"/>
            <span className="mr-1 text-primary">
              Upload a file
            </span>{" "}
            or drag and drop
            <FormInput
                id="horizontal-form-1"
                type="file"
                onChange={handleFileChange}
                className="absolute top-0 left-0 w-full h-full opacity-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;


