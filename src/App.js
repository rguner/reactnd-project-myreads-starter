import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookDetails from './BookDetails'
import Search from './Search'
import {Route, Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books : []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  changeShelf = (book, shelf) => {
    if (this.state.books) {
      BooksAPI.update(book,shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search
            changeShelf={this.changeShelf}
            booksOnShelf={this.state.books}
          />
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books
                          .filter(book => book.shelf === 'currentlyReading')
                          .map(book => (
                            <BookDetails
                              changeShelf={this.changeShelf}
                              key={book.id} 
                              book={book}
                            />
                          ))
                    }  
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books
                          .filter(book => book.shelf === 'wantToRead')
                          .map(book => (
                            <BookDetails
                              changeShelf={this.changeShelf}
                              key={book.id}  
                              book={book}
                            />
                          ))
                    }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books
                          .filter(book => book.shelf === 'read')
                          .map(book => (
                            <BookDetails
                              changeShelf={this.changeShelf}
                              key={book.id}  
                              book={book}
                            />
                          ))
                    } 
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link 
                to="/search"
                className='open-search-link'
              >Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
