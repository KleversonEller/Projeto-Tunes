import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      saveList: [],
    };
    this.getList = this.getList.bind(this);
  }

  componentDidMount() {
    this.getList();
  }

  async getList() {
    this.setState({
      loading: true,
    });
    const list = await getFavoriteSongs();
    this.setState({
      saveList: list,
      loading: false,
    });
  }

  render() {
    const { loading, saveList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading
          ? <Loading />
          : <MusicCard listaMusic={ saveList } />}
      </div>
    );
  }
}

export default Favorites;
