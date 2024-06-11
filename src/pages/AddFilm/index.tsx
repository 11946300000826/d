import Lucide from '../../base-components/Lucide';
import TomSelect from '../../base-components/TomSelect';
import { FormInput, FormSelect} from '../../base-components/Form';
import Button from '../../base-components/Button';
import React, {useEffect, useState} from 'react';
import Litepicker from '../../base-components/Litepicker';
import {uploadFile} from '../../services/upload/upload.services';
import ImageUploader from './component';
import {addMovieThunk} from '../../stores/movie/movie.slice';
import {useAppDispatch} from '../../stores/hooks';

const statusValue = ['ONGOING', 'UPCOMING'];

const vietnameseGenreMap = {
    'Hành Động': 'ACTION',
    'Phiêu Lưu': 'ADVENTURE',
    'Hoạt Hình': 'ANIMATION',
    Hài: 'COMEDY',
    'Tội Phạm': 'CRIME',
    'Chính Kịch': 'DRAMA',
    'Gia Đình': 'FAMILY',
    'Giả Tưởng': 'FANTASY',
    'Lịch Sử': 'HISTORY',
    'Kinh Dị': 'HORROR',
    'Âm Nhạc': 'MUSIC',
    'Bí Ẩn': 'MYSTERY',
    'Lãng Mạn': 'ROMANCE',
    'Khoa Học Viễn Tưởng': 'SCIENCE_FICTION',
    'Chương Trình Thực Tế': 'SHOW_TOUR',
    'Giật Gân': 'THRILLER',
    'Chiến Tranh': 'WAR',
    'Viễn Tây': 'WESTERN',
};

const codeMap = {
    '2D': 'CODE_2D',
    '3D': 'CODE_3D',
    IMAX: 'CODE_IMAX',
};

const ratingCodeMap = {
    'G': 'G',
    'PG': 'PG',
    'PG-13': 'PG13',
    'R': 'R',
    'NC-17': 'NC17',
};

const langOptions = ["Phụ đề Việt", "Lồng tiếng Việt"];

const genreOptions = Object.entries(vietnameseGenreMap).map(([key, value]) => ({
    label: key,
    value: value,
}));

const codeOptions = Object.entries(codeMap).map(([key, value]) => ({
    label: key,
    value: value,
}));

const ratingCodeOptions = Object.entries(ratingCodeMap).map(([key, value]) => ({
    label: key,
    value: value,
}));

function Main() {
    const [movieName, setMovieName] = useState<string>('');
    const [trailer, setTrailer] = useState<string>('');
    const [tmdb, setTmdb] = useState<string>('');
    const [status, setStatus] = useState<string>('ONGOING');
    const [genres, setGenres] = useState(['0']);
    const [codes, setCodes] = useState<string[]>([]);
    const [ratingCode, setRatingCode] = useState<string>("G");
    const [length, setLength] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [poster, setPoster] = useState<string>('');
    const [posterFile, setPosterFile] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<string>('');
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [lang, setLang] = useState<string>('');
    const [editorData, setEditorData] = useState('');
    const [director, setDirector] = useState<string>('');
    const [actor, setActor] = useState<string>('');
    const [originalLang, setOriginalLang] = useState<string>('');
    const [vLang, setVLang] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
        setImage: React.Dispatch<React.SetStateAction<string>>
    ) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setFile(file);
            setImage('');
            try {
                const imageUrl = await handleFileUpload(file);
                setImage(imageUrl);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleDirectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDirector(event.target.value);
    };

    const handleActorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActor(event.target.value);
    };

    const directors = director.split(', ').map((word, index) => (
        <span key={index} className="border px-2 py-2 mr-1">
      {word}
    </span>
    ));

    const actors = actor.split(', ').map((word, index) => (
        <span key={index} className="border px-2 py-2 mr-1">
      {word}
    </span>
    ));

    useEffect(() => {
        let newLang = vLang.map(lang => `${originalLang} - ${lang}`);
        setLang(newLang.join(";"));
    }, [originalLang, vLang]);

    const handlePosterFileChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        handleFileChange(event, setPosterFile, setPoster);

    const handleThumbnailFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => handleFileChange(event, setThumbnailFile, setThumbnail);

    const handleFileUpload = async (file: File) => {
        try {
            return await uploadFile(file);
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };
    const handleAddMovie = async () => {
        try {
            const actorsPayload = actor.split(',');
            const formatDate = new Date(date);
            const isoDate = formatDate.toISOString();
            const payload = {
                name: movieName,
                trailer,
                tmdb: Number(tmdb),
                status,
                genres: genres,
                codes,
                release_date: isoDate.split('.')[0] + 'Z',
                poster,
                thumbnail,
                language: lang,
                description: editorData,
                director,
                actors: actorsPayload,
                rating_code: ratingCode,
                length,
            };
            const res = await dispatch(addMovieThunk(payload));
        } catch (error) {
            return Promise.reject(error);
        }
    };
    return (
        <div className="grid grid-cols-12 gap-y-10 gap-x-6">
            <div className="col-span-12">
                <div className="flex flex-col mt-4 md:mt-0 md:h-10 gap-y-3 md:items-center md:flex-row">
                    <div className="text-base font-medium group-[.mode--light]:text-white">
                        Add Film
                    </div>
                </div>
                <div className="mt-3.5 grid grid-cols-12 xl:grid-cols-10 gap-y-7 lg:gap-y-10 gap-x-6">
                    <div className="relative flex flex-col col-span-12 lg:col-span-9 xl:col-span-8 gap-y-7">
                        <div className="flex flex-col p-5 box box--stacked">
                            <div className="p-5 border rounded-[0.6rem] border-slate-200/60 dark:border-darkmode-400">
                                <div
                                    className="flex items-center pb-5 text-[0.94rem] font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                                    <Lucide
                                        icon="ChevronDown"
                                        className="w-5 h-5 stroke-[1.3] mr-2"
                                    />
                                    Film Information
                                </div>
                              <div className="mt-5">
                                <div
                                    className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                  <label
                                      className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                    <div className="text-left">
                                      <div className="flex items-center">
                                        <div className="font-medium">Movie Name</div>
                                        <div
                                            className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                          Required
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                  <div className="flex-1 w-full mt-3 xl:mt-0">
                                    <FormInput
                                        type="text"
                                        placeholder="Movie name"
                                        value={movieName}
                                        onChange={(e) => {
                                          setMovieName(e.target.value);
                                        }}
                                    />
                                  </div>
                                </div>
                                <div
                                    className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                  <label
                                      className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                    <div className="text-left">
                                      <div className="flex items-center">
                                        <div className="font-medium">Movie Length</div>
                                        <div
                                            className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                          Required
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                  <div className="flex-1 w-full mt-3 xl:mt-0">
                                    <FormInput
                                        type="number"
                                        placeholder="Movie name"
                                        value={length}
                                        onChange={(e) => {
                                          setLength(parseInt(e.target.value) );
                                        }}
                                    />
                                  </div>
                                </div>
                                <div
                                    className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                  <label
                                      className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                    <div className="text-left">
                                      <div className="flex items-center">
                                        <div className="font-medium">Trailer</div>
                                      </div>
                                    </div>
                                  </label>
                                  <div className="flex-1 w-full mt-3 xl:mt-0">
                                    <FormInput
                                        type="text"
                                        placeholder="Example: https://www.youtube.com/watch?v=Yug8gbDd5EQ"
                                        value={trailer}
                                        onChange={(e) => {
                                          setTrailer(e.target.value);
                                        }}
                                    />
                                  </div>
                                </div>
                                <div
                                    className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                  <label
                                      className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                    <div className="text-left">
                                      <div className="flex items-center">
                                        <div className="font-medium">TMDB</div>
                                      </div>
                                    </div>
                                  </label>
                                  <div className="flex-1 w-full mt-3 xl:mt-0">
                                    <FormInput
                                        type="text"
                                        placeholder="Example: 1148677 [https://www.themoviedb.org/movie/1148677]"
                                        value={tmdb}
                                        onChange={(e) => {
                                          setTmdb(e.target.value);
                                        }}
                                    />
                                  </div>
                                </div>
                                <div
                                    className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                  <label
                                      className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                    <div className="text-left">
                                      <div className="flex items-center">
                                        <div className="font-medium">Status</div>
                                        <div
                                            className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                          Required
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                  <div className="flex-1 w-full mt-3 xl:mt-0">
                                    <FormSelect
                                        id="category"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                      {statusValue.map((s) => (
                                          <option key={s} value={s}>
                                            {s}
                                          </option>
                                      ))}
                                    </FormSelect>
                                  </div>
                                </div>
                                <div
                                    className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                  <label
                                      className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                    <div className="text-left">
                                      <div className="flex items-center">
                                        <div className="font-medium">Genres</div>
                                        <div
                                            className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                          Required
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                  <div className="flex-1 w-full mt-3 xl:mt-0">
                                    <TomSelect
                                        value={genres}
                                        onChange={setGenres}
                                        options={{
                                          placeholder: '',
                                        }}
                                        className="w-full"
                                        multiple
                                    >
                                      {genreOptions.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                      ))}
                                    </TomSelect>
                                  </div>
                                </div>
                                <div
                                    className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                  <label
                                      className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                    <div className="text-left">
                                      <div className="flex items-center">
                                        <div className="font-medium">Codes</div>
                                        <div
                                            className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                          Required
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                  <div className="flex-1 w-full mt-3 xl:mt-0">
                                    <TomSelect
                                        value={codes}
                                        onChange={setCodes}
                                        options={{
                                          placeholder: '',
                                        }}
                                        className="w-full"
                                        multiple
                                    >
                                      {codeOptions.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                      ))}
                                    </TomSelect>
                                  </div>
                                </div>
                                <div
                                    className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                  <label
                                      className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                    <div className="text-left">
                                      <div className="flex items-center">
                                        <div className="font-medium">Rating Code</div>
                                        <div
                                            className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                          Required
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                  <div className="flex-1 w-full mt-3 xl:mt-0">
                                    <TomSelect
                                        value={ratingCode}
                                        onChange={setRatingCode}
                                        options={{
                                          placeholder: '',
                                        }}
                                        className="w-full"
                                        multiple={false}
                                    >
                                      {ratingCodeOptions.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                      ))}
                                    </TomSelect>
                                  </div>
                                </div>
                                <div
                                    className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                  <label
                                      className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                    <div className="text-left">
                                      <div className="flex items-center">
                                        <div className="font-medium">Release Date</div>
                                        <div
                                            className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                          Required
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                  <div className="flex-1 w-full mt-3 xl:mt-0">
                                    <Litepicker
                                        value={date}
                                        onChange={(e) => {
                                          setDate(e);
                                        }}
                                        options={{
                                          autoApply: false,
                                          showWeekNumbers: true,
                                          dropdowns: {
                                            minYear: new Date().getFullYear(),
                                            maxYear: null,
                                            months: true,
                                            years: true,
                                          },
                                        }}
                                        className="w-full"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                      <div
                          id="uploadImageSection"
                          className="flex flex-col p-5 box box--stacked"
                      >
                        <div className="p-5 border rounded-[0.6rem] border-slate-200/80 dark:border-darkmode-400">
                          <div
                              className="flex items-center pb-5 text-[0.94rem] font-medium border-b border-slate-200/80 dark:border-darkmode-400">
                            <Lucide
                                icon="ChevronDown"
                                className="w-5 h-5 stroke-[1.3] mr-2"
                            />{' '}
                            Upload Image
                          </div>
                          <div className="mt-5">
                            <ImageUploader
                                title={'Poster'}
                                image={poster}
                                setImage={setPoster}
                                setFile={setPosterFile}
                                handleFileChange={handlePosterFileChange}
                            />
                            <ImageUploader
                                title={'Thumbnail'}
                                image={thumbnail}
                                setImage={setThumbnail}
                                setFile={setThumbnailFile}
                                handleFileChange={handleThumbnailFileChange}
                            />
                          </div>
                            </div>
                        </div>
                        <div className="flex flex-col p-5 box box--stacked">
                            <div className="p-5 border rounded-[0.6rem] border-slate-200/60 dark:border-darkmode-400">
                                <div
                                    className="flex items-center pb-5 text-[0.94rem] font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                                    <Lucide
                                        icon="ChevronDown"
                                        className="w-5 h-5 stroke-[1.3] mr-2"
                                    />
                                    More Information
                                </div>
                                <div className="mt-5">
                                    <div
                                        className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                        <label
                                            className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Language</div>
                                                    <div
                                                        className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <div className="grid-cols-2 gap-2 sm:grid">
                                                <FormInput
                                                    type="text"
                                                    id="olang"
                                                    className="mt-2 sm:mt-0"
                                                    placeholder="Original Language"
                                                    value={originalLang}
                                                    onChange={(e) => setOriginalLang(e.target.value)}
                                                />
                                            <TomSelect
                                                value={vLang}
                                                onChange={setVLang}
                                                options={{
                                                    placeholder: '',
                                                }}
                                                className="w-full"
                                                multiple
                                            >
                                                {langOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </TomSelect>
                                        </div>

                                        </div>
                                    </div>
                                    <div
                                        className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                        <label
                                            className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Film Description</div>
                                                    <div
                                                        className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                           <textarea
                                               value={editorData}
                                               onChange={(e) => {
                                                   setEditorData(e.target.value);
                                               }}
                                               className="h-44 sm py-1.5 px-2 transition duration-200 ease-in-out w-full text-sm border-slate-300/60 shadow-sm rounded-md placeholder:text-slate-500 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-300"
                                           />
                                        </div>
                                    </div>
                                    <div
                                        className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                        <label
                                            className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Director(s)</div>
                                                    <div
                                                        className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                type="text"
                                                placeholder=""
                                                value={director}
                                                onChange={handleDirectorChange}
                                            />
                                            {director != '' && (
                                                <div className="mt-2 py-2">{directors}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                        <label
                                            className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Actor(s)</div>
                                                    <div
                                                        className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                type="text"
                                                placeholder=""
                                                value={actor}
                                                onChange={handleActorChange}
                                            />
                                            {actor != '' && <div className="mt-2 py-2">{actors}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end gap-3 mt-1 md:flex-row">
                            <Button
                                variant="outline-secondary"
                                className="w-full border-slate-300/80 bg-white/80 md:w-56 py-2.5 rounded-[0.5rem]"
                            >
                                <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2"/>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="w-full md:w-56 py-2.5 rounded-[0.5rem]"
                                onClick={handleAddMovie}
                            >
                                <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2"/>
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
