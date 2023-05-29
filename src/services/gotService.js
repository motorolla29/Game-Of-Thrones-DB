class GotService {
  constructor() {
    this._apiBase = 'https://anapioficeandfire.com/api';
  }

  getResourse = async (url) => {
    const res = await fetch(this._apiBase + url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getCharacter = async (id) => {
    const character = await this.getResourse(`/characters/${id}`);
    return this._transformCharacter(character);
  };

  getAllCharacters = async () => {
    const res = await this.getResourse(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter);
  };

  getBooks = async (id) => {
    const book = await this.getResourse(`/books/${id}`);
    return this._transformBook(book);
  };

  getAllBooks = async () => {
    const res = await this.getResourse(`/books`);
    return res.map(this._transformBook);
  };

  getHouses = async (id) => {
    const house = await this.getResourse(`/houses/${id}`);
    return this._transformHouse(house);
  };

  getAllHouses = async () => {
    const res = await this.getResourse(`/houses`);
    return res.map(this._transformHouse);
  };

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  };

  _transformCharacter = (char) => {
    return {
      id: this._extractId(char),
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture,
    };
  };

  _transformBook = (book) => {
    return {
      id: this._extractId(book),
      name: book.name,
      region: book.region,
      words: book.words,
      titles: book.titles,
      overlord: book.overlord,
      ancestralWeapons: book.ancestralWeapons,
    };
  };

  _transformHouse = (house) => {
    return {
      id: this._extractId(house),
      name: house.name,
      numberOfPages: house.numberOfPages,
      publiser: house.publiser,
      released: house.released,
    };
  };
}

export default GotService;
