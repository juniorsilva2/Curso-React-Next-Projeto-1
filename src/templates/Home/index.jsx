import { Component } from 'react';
import './styles.css';

import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../components/Posts';
import { PostButton } from '../../components/PostButton';
import { SearchInput } from '../../components/SearchInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 4,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state; 
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts : postsAndPhotos.slice(page, postsPerPage),
      allPosts : postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
  }

  handleSearchChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });

  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => { return post.title.toLowerCase().includes(searchValue.toLowerCase())})
    :
    posts;

    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
            <h1>Search value: {searchValue} </h1>
          )}
          
          <SearchInput searchValue={searchValue} onChange={this.handleSearchChange}/>
          
          {filteredPosts.length === 0 && (
            <p>Nenhum post encontrado</p>
          )}        
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}
        
        
        <div className='button-container'>
          {!searchValue && (
            <PostButton 
            text="Load more post"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    )
  }
};

export default Home;
