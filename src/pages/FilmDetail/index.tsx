import {
  Preview,
} from "../../base-components/PreviewComponent";
import {FormInput} from "../../base-components/Form";
import ImageZoom from "../../base-components/ImageZoom";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../stores/hooks";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {MovieDetail,} from "../../types";
import {TypeCommon} from "../../types/common";
import {movieDetailThunk} from "../../stores/movie/movie.slice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHourglassEnd, faTriangleExclamation, faTv, faVrCardboard} from "@fortawesome/free-solid-svg-icons";
import {InfoItem, CreditCard} from "./component";
import {genreNames, ratingDescriptions} from "../../constants/movie.constants";
import Notification, {NotificationElement} from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import products from "../../fakers/products";


function Main() {
  const id = useParams().id;
  const dispatch = useAppDispatch();
  const [movie, setMovie] = useState<MovieDetail>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const bNotification = useRef<NotificationElement>();

  const fetchMovieByID = useCallback(async () => {
    try {
      console.log("🚀 ~ get movie detail ~ id:", id);
      const res: TypeCommon = await dispatch(movieDetailThunk(id || ""));
      if (res.error) {
        return Promise.reject(res.error);
      }
      return res.payload || [];
    } catch (error) {
      return Promise.reject(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMovieByID()
        .then((result) => {
          setMovie(result);
        })
        .catch((error) => {
            console.error("🚀 ~ get movie detail ~ error:", error);
            setErrorMessage(error.message);
            bNotification.current?.showToast();
        });
  }, [dispatch]);


  if (!movie) {
    return (
        <div className="flex h-[40rem] p-5 box box--stacked max-h-[500px]">
          <Notification
              getRef={(el) => {
                bNotification.current = el;
              }}
              className="flex"
          >
            <FontAwesomeIcon icon={faTriangleExclamation} className="text-danger" size="2x"/>
            <div className="ml-4 mr-4">
              <div className="mt-1">
                Error: {errorMessage}
              </div>
            </div>
          </Notification>
        </div>
    );
  }

  return (
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
          <div className="flex items-center h-10">
            <div className="text-lg font-medium group-[.mode--light]:text-white">
              {movie?.id}
            </div>
          </div>
          <div className="mt-3.5 grid grid-cols-12 xl:grid-cols-10 gap-y-7 lg:gap-y-10 gap-x-6">
            <div className="relative flex flex-col col-span-12 lg:col-span-9 xl:col-span-8 gap-y-7">
              <div className="flex flex-col p-5 box box--stacked">
                <div
                    className="flex flex-col pb-5 mb-5 border-b border-dashed sm:items-center sm:flex-row border-slate-300/70">
                  <h2 className="mt-3 text-3xl font-medium leading-none text-slate-600 dark:text-slate-500">
                    {movie?.name}
                  </h2>
                </div>
                <div className="flex">
                  <div className="flex-3">
                    <div className="w-80">
                      <ImageZoom
                          src={movie?.thumbnail}
                          alt={movie?.name}
                          className="rounded-md py-2"
                      />
                    </div>
                    <div className="py-3">
                      <span
                          className="items-center px-3 py-2 mr-1 border-2 rounded-full text-lg font-bold border-success text-success dark:border-success">
                        <FontAwesomeIcon icon={faVrCardboard}/> {movie?.codes
                          .map((code) => code.replace("CODE_", ""))
                          .join(", ")}
                      </span>
                    </div>
                    {movie?.movie_length != 0 && (
                        <div className="py-3">
                      <span
                          className="items-center px-3 py-2 mr-1 border-2 rounded-full text-lg font-bold border-success text-success dark:border-success">
                          <FontAwesomeIcon icon={faHourglassEnd}/> {movie?.movie_length} minutes
                      </span>
                        </div>
                    )}
                    {movie?.tmdb != 0 && (
                        <div className="py-3">
                      <span
                          className="items-center px-3 py-2 mr-1 border-2 rounded-full text-lg font-bold border-success text-success dark:border-success hover:text-blue-500"
                          onClick={() => window.open(`https://www.themoviedb.org/movie/${movie?.tmdb}`, "_blank")}
                      >
                          <FontAwesomeIcon icon={faTv}/> {movie?.tmdb}
                      </span>
                        </div>
                    )}
                  </div>
                  <div className="w-full px-8">
                    <div
                        className="border rounded-[0.6rem] dark:border-darkmode-400 relative mt-7 mb-4 border-slate-200/80">
                      <div className="absolute left-0 px-3 ml-4 -mt-2 text-xs uppercase bg-white text-slate-500">
                        <div className="-mt-px">Description</div>
                      </div>
                      <div className="px-5 py-2 mt-4 flex flex-col gap-3.5">
                        <Preview>
                          <h4 className="mt-3 text-xl font-medium leading-none">
                            {movie?.description}
                          </h4>
                        </Preview>
                      </div>
                    </div>
                    <div className="w-full border-t border-dashed border-slate-200/60 dark:border-darkmode-400"></div>
                    <InfoItem title="Status" placeholder={movie?.status || ''} id="regular-form-5"/>
                    <InfoItem title="Rating Code"
                              placeholder={`${movie?.rating_code} - ${movie?.rating_code ? ratingDescriptions[movie?.rating_code] : ''}`}
                              id="regular-form-6"/>
                    <InfoItem title="Genres"
                              placeholder={`${movie?.genres?.map((genre) => genreNames[genre]).join(", ") || ''}`}
                              id="regular-form-7"/>
                    <div className="mt-3">
                      <h3 className="mt-3 text-lg py-3 font-medium leading-none">
                        Language(s)
                      </h3>
                      {movie?.language.split(";").map(
                          (e) => {
                            return (
                                <div className={"py-2"}>
                                  <FormInput id={id} type="text"
                                             style={{fontSize: '18px'}}
                                             placeholder={e} disabled/>
                                </div>
                            );
                          }
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {movie?.poster !== movie?.thumbnail && (
                  <div className="flex flex-col p-5 box box--stacked">
                    <div
                        className="flex flex-col pb-5 mb-5 border-b border-dashed sm:items-center sm:flex-row border-slate-300/70">
                      <div className="text-[0.94rem] font-medium">Poster</div>
                    </div>
                    <div className="flex justify-center">
                      <img
                          className="rounded-md"
                          src={movie?.poster}
                          alt={movie?.name}
                      />
                    </div>
                  </div>
              )}
              {movie?.trailer !== "" && (
                  <div className="flex flex-col p-5 box box--stacked">
                    <div
                        className="flex flex-col pb-5 mb-5 border-b border-dashed sm:items-center sm:flex-row border-slate-300/70">
                      <div className="text-[0.94rem] font-medium">Trailer</div>
                    </div>
                    <div className="flex justify-center">
                      <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/` + movie?.trailer.split("/").pop()}
                          title={movie?.name}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                      />
                    </div>
                  </div>
              )}

              <div className="flex flex-col p-5 box box--stacked">
                <div
                    className="flex flex-col pb-5 mb-5 border-b border-dashed sm:items-center sm:flex-row border-slate-300/70">
                  <div className="text-[0.94rem] font-medium">Credits</div>
                </div>
                <div className="flex">
                  <div className="flex-1">
                    {movie?.director.split(',').map((directorName, index) => (
                        <CreditCard key={index} name={directorName.trim()} image_url="/icons/director.png"
                                    role="Director"/>
                    ))}
                  </div>
                  <div className="flex-1">
                    {movie?.actors.map((actor, index) => (
                        <CreditCard key={index} name={actor.name} image_url={actor.image || "/icons/actor.png"}
                                    role={actor.role ?? "Actor"}/>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Main;
