import React, { Component } from "react";
import { scroller } from "react-scroll";
import Button from "./../../components/Button/Button";

import Card from "./../../components/Card/Card";
import { Link } from "react-router-dom";

import spinner from "./../../assets/loading.gif";
import headerLogo from "./../../assets/logo-header-rijksmuseum-amsterdam.jpeg"
import "./Search.page.css";

import { connect } from "react-redux";
import { result } from "./../../redux/actions/result.action";
import { loading } from "./../../redux/actions/loading.action";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: "",
      lang: "en",
      noData: false,
    };
  }

  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.setState({noData: false});
  };

  //for the accessibility
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  scrollToSection = () => {
    scroller.scrollTo("myScrollToElement", {
      duration: 500,
      delay: 0,
      smooth: true
    });
  };

  search = () => {
    const { lang, inputSearch } = this.state;
    const { result, loading } = this.props;
    loading(true);

    fetch(
      `https://www.rijksmuseum.nl/api/${lang}/collection?key=rWQmpXqJ&involvedMaker=${inputSearch}`
    )
      .then((response) => response.json())
      .then((data) => {      
        const pages = Object.values(data.artObjects);
        result(pages);
        loading(false);
        if(pages.length === 0) {
          this.setState({noData: true});
        } else {
          this.setState({noData: false}); 
        }
        this.scrollToSection();
      })
      .catch((error) => console.log("Error", error));
  };
  
  componentDidUpdate(prevProps, prevState) {
    const { lang, inputSearch } = this.state;
    const { results } = this.props;
    if (lang !== prevState.lang && results.length > 0 && inputSearch !== '') {
      this.search();
    }
  } 

  render() {
    const { inputSearch, lang, noData } = this.state; 
    const { results, isLoading } = this.props;
    return (
      <>
      <div className="container">
        <header>
          <div>
            <img src={headerLogo} alt="Logo header Rijks Museum" width="200" height="auto"/>  
          </div>
          <div className="language">
            <label htmlFor="lang">Change language: </label>
            <select name="lang" value={lang} onChange={this.handleChange}>
              <option value="en">EN</option>
              <option value="nl">NL</option>
            </select>
          </div>
        </header>

        <div className="search-container">     
          <h1>Rijks Museum</h1>
          <h2 className="subtitle-header">Explore the collection.</h2>

          <input
            type="text"
            name="inputSearch"
            id="search-bar"
            value={inputSearch}
            placeholder="Type here..."
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <Button
            classNameButton="search-btn"
            id="button-search"
            label="Search"
            disabled={isLoading}
            onClick={inputSearch ? this.search : null}
          /> 
          
          {noData ? <p className="messageResult">No results found</p> : null}
        </div>
      </div>

      

      <section id="results-box" className="myScrollToElement">
        <div className="wrapper">
        {isLoading ? (
          <img src={spinner} alt="spinner" className="spinner"/>
        ) : ( 
          results.map((value, i) => (
            <Card
              key={i}
              image={value.webImage?.url}
              title={value.title}
              subtitle={
                typeof value.principalOrFirstMaker === "string" &&
                value.principalOrFirstMaker.replace(/<[^>]*>|&quot;/g, "")
              }
              button={
                <Link to={{ pathname: `/${value.objectNumber}`, state: { lang } }} style={{ textDecoration: 'none', color: 'white' }}>
                  Read more
                </Link>
              }
            />
          ))
        )}
        </div>
      </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.result,
    isLoading: state.loading,
  };
};

const mapDispatchToProps = {
  result,
  loading,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SearchPage);
