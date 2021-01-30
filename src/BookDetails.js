import React, { Component } from 'react'
import PropTypes from 'prop-types'


class BookDetails extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }
  clearQuery = () => {
    this.updateQuery('')
  }

  changeShelfOfBook(shelf) {
    this.props.changeShelf(this.props.book, shelf)
  }

  render() {
    const { book } = this.props
    //console.log('Rendering')
    //console.log(book)

    return (
            <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ height: 192, width: 128, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail: ''})` }}></div>
            <div className="book-shelf-changer">
            <select value={book.shelf!==undefined ? book.shelf : 'none'} onChange={(e) => this.changeShelfOfBook(e.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title} </div>
          <div className="book-authors">{book.authors}</div>
        </div>
    )
  }
}

export default BookDetails