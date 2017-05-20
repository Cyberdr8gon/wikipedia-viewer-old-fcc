var destination = document.querySelector("#container");

var SearchResults = React.createClass({
  render: function searchResultsRenderer() {
    let results = this.props.results;
            

    function createResult(item) {
      return  <a href={"http://en.wikipedia.org/?curid=" + item.key} target="_blank"><li key={item.key}>{item.title}</li></a> ;
   
    }
            
    let resultsList = results.map(createResult);
                
    return (
      <ul className="theResults">
        {resultsList}
      </ul>
                                        
    );
  }
});

var SearchBox = React.createClass({
  getInitialState: function searchBoxInitializer() {
    return {
      results: []
    };
  },
  submitQuery: function runSearch(e) {
    let cleanedQuery = this._inputElement.value;
    cleanedQuery = cleanedQuery.replace(/\s/g, "+");
    self = this;
                    
    function stripSearchResult(item) {
      let newItem = {};
      newItem.title = item.title;
      newItem.key = item.pageid;
      return newItem;
                                              
    }
                    
    console.log('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+cleanedQuery+ "&origin=*");
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+cleanedQuery+ "&origin=*",
      datatype: "jsonp",
      success: function(data){
        console.log(data);
        let stateArray = data.query.pages;
        let newState = [];
                                                        
        for (var key in stateArray) {
          newState.push({
            title: stateArray[key].title,
            key: stateArray[key].pageid
            
          });
                                                          
        }
                                                        
        
        self.setState({
          results: newState,
        });
        console.log(self.state);
                                                            
      }

    });
                        
    e.preventDefault();
                          
  },
  render: function searchBoxRenderer() {
        
    return (
      <div className="searchBoxMain">
        <form onSubmit={this.submitQuery}>
          <input ref= { (a) => this._inputElement = a } placeholder="Search Wikipedia..."></input>
          <button type="submit">Go</button>
        </form>
      <br/>
      <SearchResults results={this.state.results}/>
    </div>
                                                                            
    );
      
  }

});

ReactDOM.render(
  <div>
    <SearchBox/>
      <div className="random">
        <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">Random Article</a>
      </div>
    </div>,
 destination

);
