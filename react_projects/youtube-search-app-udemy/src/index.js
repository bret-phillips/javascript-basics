import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';

const API_KEY = 'AIzaSyDSxuRvC0g4breHFqGKitMIzVhjPO4VndM';

// create new component. produce html

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term) {

      this.setState({
        videos: get("https://www.googleapis.com/books/v1/volumes?q=" + term),
        selectedVideo: videos[0]
      });
      // this.setState({ videos });


/*



    var url = "";
    var img = "";
    var title = "";
    var author = "";

    $.get("https://www.googleapis.com/books/v1/volumes?q=" + search,function(response){

        for(i=0;i<response.items.length;i++)
        {
         title=$('<h5 class="center-align white-text">' + response.items[i].volumeInfo.title + '</h5>');
         author=$('<h5 class="center-align white-text"> By:' + response.items[i].volumeInfo.authors + '</h5>');
         img = $('<img class="aligning card z-depth-5" id="dynamic"><br><a href=' + response.items[i].volumeInfo.infoLink + '><button id="imagebutton" class="btn red aligning">Read More</button></a>');
         url= response.items[i].volumeInfo.imageLinks.thumbnail;
         img.attr('src', url);
         title.appendTo('#result');
         author.appendTo('#result');
         img.appendTo('#result');
        }
    });

*/


  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// take html and put it on page

ReactDOM.render(<App />, document.querySelector('.container'));
