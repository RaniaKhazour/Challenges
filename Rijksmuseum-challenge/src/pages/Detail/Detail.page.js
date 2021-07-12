import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import CardDetails from "./../../components/Card/CardDetails";

import spinner from "./../../assets/loading.gif";
import arrowLeft from "./../../assets/arrow-left.png";
import arrowRight from "./../../assets/arrow-right.png";

import "./Detail.page.css";
import { useSelector, useDispatch } from "react-redux";
import { loading } from "./../../redux/actions/loading.action";
import { Link } from "react-router-dom";

const DetailPage = () => {
  const [page, setPage] = useState([]);
  const { objectNumber } = useParams();
  const location = useLocation();

  const results = useSelector((state) => state.result);
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading(true));

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.rijksmuseum.nl/api/${location.state.lang}/collection/${objectNumber}?key=rWQmpXqJ`
        );
        const data = await response.json();
        setPage(data.artObject);
        dispatch(loading(false));
      } catch {
        console.log("FAILURE");
      }
    };

    fetchData();
  }, [objectNumber, location.state.lang, dispatch]);

  let previousPage = null;
  results.forEach((value, i) => {
    if (value.objectNumber === page.objectNumber && results[i - 1]) {
      previousPage = { id: results[i - 1].objectNumber, title: results[i - 1].title };
    }
  });

  let nextPage = null;
  results.forEach((value, i) => {
    if (value.objectNumber === page.objectNumber && results[i + 1]) {
      nextPage = { id: results[i + 1].objectNumber, title: results[i + 1].title };
    }
  });

  return (
    <>
      <div className="container-detail">
        <img src={page.webImage?.url} className="img-detail" alt=""/>

        <Link to="/">
          <button type="button" className="goBack">Go back</button>
        </Link>

        {isLoading ? (
          <img src={spinner} alt="Loading.." className="spinner-detail" />
        ) : (
          page && (
            <>
              <div>
                {nextPage && (
                  <Link
                    to={{
                      pathname: `/${nextPage.id}`,
                      state: { lang: location.state.lang },
                    }}
                  >
                    <div id="next">
                      <img src={arrowRight} alt="Next button" width="45" height="45"/>
                    </div>
                  </Link>
                )}

                {previousPage && (
                  <Link
                    to={{
                      pathname: `/${previousPage.id}`,
                      state: { lang: location.state.lang },
                    }}
                  >
                    <div id="previous">
                      <img src={arrowLeft} alt="Previous button" width="45" height="45"/>
                    </div>
                  </Link>
                )}
              </div>

              <CardDetails 
                key={page.objectNumber}
                title={page.title}
                subtitle={page.scLabelLine}
                description={page.label?.description}
              />
            </>
          )
        )}
      </div>
    </>
  );
};

export default DetailPage;
