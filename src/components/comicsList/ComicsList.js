import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner1";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllComics(offset).then(onComicsListLoaded)
    
  };

  const onComicsListLoaded = (newComicsList) => {
    if (comicsList === null) {
        // Обработка случая, когда comicsList равен null
        console.log("comicsList is null");
        return;
      }
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList([...comicsList, ...newComicsList]);
    setNewItemsLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  };

  const renderItems = (arr) => {
    const items = arr.map((item) => {
      return (
        <li className="comics__item" key={item.id}>
          <Link to ={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt="ultimate war"
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  };

  const items = renderItems(comicsList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = newItemsLoading || loading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        disabled={newItemsLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

// const ComicsList = () => {
//     return (
//         <div className="comics__list">
//             <ul className="comics__grid">
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//             </ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

export default ComicsList;
