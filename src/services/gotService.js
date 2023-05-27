class GotService {
  constructor() {
    this._apiBase = 'https://anapioficeandfire.com/api';
  }

  async getResourse(url) {
    const res = await fetch(this._apiBase + url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getCharacter(id) {
    const character = await this.getResourse('/characters/' + id);
    return this._transformCharacter(character);
  }

  async getAllCharacters() {
    const res = await this.getResourse('/characters?page=5&pageSize=10');
    return res.map(this._transformCharacter);
  }

  getBooks(id) {
    return this.getResourse('/books/' + id);
  }

  getAllBooks() {
    return this.getResourse('/books');
  }

  getHouses(id) {
    return this.getResourse('/houses/' + id);
  }

  getAllHouses() {
    return this.getResourse('/houses');
  }

  _transformCharacter(char) {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture,
    };
  }

  _transformBook(book) {
    return {
      name: book.name,
      region: book.region,
      words: book.words,
      titles: book.titles,
      overlord: book.overlord,
      ancestralWeapons: book.ancestralWeapons,
    };
  }

  _transformHouse(house) {
    return {
      name: house.name,
      numberOfPages: house.numberOfPages,
      publiser: house.publiser,
      released: house.released,
    };
  }
}

export default GotService;
