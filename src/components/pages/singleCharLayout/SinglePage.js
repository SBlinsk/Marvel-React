import AppBanner from "../../appBanner/AppBanner";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMarvelService from "../../../services/MarvelService";
import { ErrorMessage } from "formik";
import Spinner from "../../spinner/Spinner1";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { getCharacter, clearError, error, loading, getComic } =
    useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();

    switch (dataType) {
      case "comic":
        getComic(id).then(onDataLoaded);

        break;
      case "character":
        getCharacter(id).then(onDataLoaded);
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? (
    <Component data={data} />
  ) : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;
