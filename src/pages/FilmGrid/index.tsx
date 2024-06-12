import Lucide from '../../base-components/Lucide';
import { Dialog, Popover } from '../../base-components/Headless';
import Pagination from '../../base-components/Pagination';
import {FormCheck, FormInput, FormSelect} from '../../base-components/Form';
import Button from '../../base-components/Button';
import { useAppDispatch } from '../../stores/hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TypeCommon } from '../../types/common';
import { movieListThunk } from '../../stores/movie/movie.slice';
import { MovieList, MovieShortInfo, PageCursor } from '../../types';
import { Link } from 'react-router-dom';
import { Preview } from '../../base-components/PreviewComponent';

function Main() {
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState<MovieShortInfo[]>([]);
  const [order, setOrder] = useState<string>('desc');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState<PageCursor>();
  const [status, setStatus] = useState<string>('');
  const [cursor, setCursor] = useState<string>('');
  const [deleteModalPreview, setDeleteModalPreview] = useState(false);
  const deleteButtonRef = useRef(null);

  const fetchMovies: () => Promise<MovieList> = useCallback(async () => {
    try {
      const res: TypeCommon = await dispatch(
        movieListThunk({ status, limit, order, cursor})
      );
      return res.payload || [];
    } catch (error: TypeCommon) {
      console.error('🚀 ~ fetchMovies ~ error:', error);
      return [];
    }
  }, [dispatch, status, limit, cursor, order]);

  useEffect(() => {
    fetchMovies().then((result) => {
      setMovies(result.data);
      setPage(result.pagination);
    });
  }, [dispatch, status, limit, cursor, order]);

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            Films
          </div>
          <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            <Link
              to="/add-film"
              className="px-2 py-2 group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent inline-flex items-center justify-center"
            >
              <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2" />
              Add New Film
            </Link>
          </div>
        </div>
        <div className="mt-3.5">
          <div className="flex flex-col box box--stacked">
            <div className="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
              <div>
                <div className="relative">
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                  />
                  <FormInput
                    type="text"
                    placeholder="Search film..."
                    className="pl-9 sm:w-64 rounded-[0.5rem]"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
                <div className="flex flex-col mt-2 sm:flex-row">
                  <FormCheck className="mr-2">
                    <FormCheck.Input
                        id="radio-switch-4"
                        type="radio"
                        name="horizontal_radio_button"
                        value="asc"
                        checked={order === "asc"}
                        onChange={(e) => setOrder(e.target.value)}
                    />
                    <FormCheck.Label htmlFor="radio-switch-4">
                      Oldest
                    </FormCheck.Label>
                  </FormCheck>
                  <FormCheck className="mt-2 mr-2 sm:mt-0">
                    <FormCheck.Input
                        id="radio-switch-5"
                        type="radio"
                        name="horizontal_radio_button"
                        value="desc"
                        checked={order === "desc"}
                        onChange={(e) => setOrder(e.target.value)}
                    />
                    <FormCheck.Label htmlFor="radio-switch-5">
                      Newest
                    </FormCheck.Label>
                  </FormCheck>
                </div>
                <Popover className="inline-block">
                  {({close}) => (
                      <>
                        <Popover.Button
                            as={Button}
                            variant="outline-secondary"
                            className="w-full sm:w-auto"
                        >
                          <Lucide
                              icon="ArrowDownWideNarrow"
                              className="stroke-[1.3] w-4 h-4 mr-2"
                          />
                          Filter
                        </Popover.Button>
                        <Popover.Panel placement="bottom-end">
                          <div className="p-2">
                            <div>
                              <div className="text-left text-slate-500">
                                Status
                              </div>
                              <FormSelect
                                  className="flex-1 mt-2"
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="">All</option>
                                <option value="ONGOING">Ongoing</option>
                                <option value="UPCOMING">Coming</option>
                                <option value="ENDED">Ended</option>
                              </FormSelect>
                            </div>
                            <div className="flex items-center mt-4">
                              <Button
                                  variant="secondary"
                                  onClick={() => {
                                    close();
                                  }}
                                  className="w-32 ml-auto"
                              >
                                Close
                              </Button>
                            </div>
                          </div>
                        </Popover.Panel>
                      </>
                  )}
                </Popover>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="grid grid-cols-12 px-5 -mx-5 border-dashed border-y">
                {movies?.map((movie, key) => (
                    <div
                        key={key}
                        className="col-span-12 sm:col-span-6 xl:col-span-3 border-dashed border-slate-300/80 [&:nth-child(4n)]:border-r-0 px-5 py-5 [&:nth-last-child(-n+4)]:border-b-0 border-r border-b flex flex-col"
                    >
                      <div
                          className="overflow-hidden rounded-lg h-[30rem] image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-slate-900/90 before:to-black/20">

                        <img
                            className="rounded-md"
                            src={movie.thumbnail}
                            alt={movie.name}
                        />
                        <span
                            className={`absolute top-0 z-10 px-2.5 py-1 m-5 text-xs text-white rounded-lg font-medium border-white/20 border ${
                          movie.status === 'ONGOING'
                            ? 'bg-green-500'
                            : movie.status === 'UPCOMING'
                            ? 'bg-yellow-500'
                            : movie.status === 'ENDED'
                            ? 'bg-red-500'
                            : ''
                        }`}
                      >
                        {movie.status}
                      </span>
                      <div className="absolute bottom-0 z-10 w-full px-5 pb-6 text-white">
                        <Link
                            className="block text-lg font-medium truncate"
                            to={`/film/${movie.id}`}
                        >
                          {movie.name}
                        </Link>
                        {movie.movie_length !== 0 ? (
                          <span className="mt-3 text-xs text-white/80">
                            {movie.movie_length} minutes
                          </span>
                        ) : (
                          <span className="mt-3 text-xs text-white/80">
                            &nbsp;
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="pt-5">
                      <div className="flex flex-col gap-3.5 mb-5 pb-5 mt-auto border-b border-dashed border-slate-300/70">
                        <div className="flex items-center">
                          <div className="text-slate-500">Codes:</div>
                          <div className="ml-auto">
                            <div className="flex items-center text-xs font-medium rounded-md text-success bg-success/10 border border-success/10 px-1.5 py-px">
                              <span className="-mt-px">
                                {movie.codes
                                  .map((code) => code.replace('CODE_', ''))
                                  .join(', ')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-slate-500">Rated:</div>
                          <div className="ml-auto">
                            <div className="flex items-center">
                              <div className="ml-1 text-xs text-slate-500">
                                {movie.rating_code === 'RATING_UNSPECIFIED'
                                  ? 'UND'
                                  : movie.rating_code === 'NC17'
                                  ? 'NC-17'
                                  : movie.rating_code === 'PG13'
                                  ? 'PG-13'
                                  : movie.rating_code}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-slate-500">Release Date:</div>
                          <div className="ml-auto">
                            <div className="text-xs text-slate-500">
                              {new Date(
                                movie.release_date
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Link
                          className="flex items-center mr-auto text-primary"
                          to={`/film/${movie.id}`}
                        >
                          <Lucide
                            icon="KanbanSquare"
                            className="w-4 h-4 stroke-[1.3] mr-1.5"
                          />{' '}
                          View
                        </Link>
                        <Link
                            className="flex mr-5 text-primary"
                            to={`/update-film/${movie.id}`}
                        >
                          <Lucide
                              icon="CheckSquare"
                              className="w-4 h-4 stroke-[1.3] mr-1.5"
                          />
                          Edit
                        </Link>
                        <Preview>
                          <button
                            className="flex items-center text-danger"
                            onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                              setDeleteModalPreview(true);
                            }}
                          >
                            <Lucide
                              icon="Trash2"
                              className="w-4 h-4 stroke-[1.3] mr-1.5"
                            />{' '}
                            Delete
                          </button>
                          <Dialog
                            open={deleteModalPreview}
                            onClose={() => {
                              setDeleteModalPreview(false);
                            }}
                            initialFocus={deleteButtonRef}
                          >
                            <Dialog.Panel>
                              <div className="p-5 text-center">
                                <Lucide
                                  icon="XCircle"
                                  className="w-16 h-16 mx-auto mt-3 text-danger"
                                />
                                <div className="mt-5 text-3xl">
                                  Are you sure?
                                </div>
                                <div className="mt-2 text-slate-500">
                                  Do you really want to delete these records?{' '}
                                  <br />
                                  This process cannot be undone.
                                </div>
                              </div>
                              <div className="px-5 pb-8 text-center">
                                <Button
                                  type="button"
                                  variant="outline-secondary"
                                  onClick={() => {
                                    setDeleteModalPreview(false);
                                  }}
                                  className="w-24 mr-2"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="button"
                                  variant="danger"
                                  className="w-24 ml-2"
                                  ref={deleteButtonRef}
                                >
                                  Delete
                                </Button>
                              </div>
                            </Dialog.Panel>
                          </Dialog>
                        </Preview>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col-reverse flex-wrap items-center p-5 flex-reverse gap-y-2 sm:flex-row">
              <Pagination className="flex-1 w-full mr-auto sm:w-auto">
                <Pagination.Link>
                  <button
                    onClick={() => setCursor(page?.prevCursor || '')}
                    disabled={!page?.prevCursor || page.prevCursor === ''}
                  >
                    <Lucide
                      icon="ChevronLeft"
                      size={100}
                      color={
                        !page?.prevCursor || page.prevCursor === ''
                          ? 'grey'
                          : 'red'
                      }
                    />
                  </button>
                </Pagination.Link>
                <Pagination.Link>
                  <button
                    onClick={() => setCursor(page?.nextCursor || '')}
                    disabled={!page?.nextCursor || page.nextCursor === ''}
                  >
                    <Lucide
                      icon="ChevronRight"
                      size={100}
                      color={
                        !page?.nextCursor || page.nextCursor === ''
                          ? 'grey'
                          : 'red'
                      }
                    />
                  </button>
                </Pagination.Link>
              </Pagination>
              <FormSelect
                className="sm:w-20 rounded-[0.5rem]"
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value));
                  setCursor('');
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
              </FormSelect>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
