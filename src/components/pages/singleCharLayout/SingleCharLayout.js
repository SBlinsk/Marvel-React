import { Helmet } from "react-helmet";
import"../singleCharLayout/singleCharLayout.scss"

const SingleCharLayout = ({ data }) => {
  const { thumbnail, description, name } = data;
  return (
    <div className="single-comic">
      <Helmet>
        <meta
          name="description"
          content={`${name} Character page`}
        />
          <title>{name}</title>
      </Helmet>
      <img src={thumbnail} alt="name" className="single-comic__char-img "></img>
      <div className="single-comic__info">
        <h2 className="single-comic___name">{name}</h2>
        <p className="single-comic____descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharLayout;
