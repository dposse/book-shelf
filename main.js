var books = [];

var fetch = function(query) {

  var queryUrl = "https://www.googleapis.com/books/v1/volumes?q=" + query.replace(' ','%20');

  $.ajax({
    method: "GET",
    url: queryUrl,
    dataType: "json",
    success: function(data) {
      console.log(data);
      addBooks(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });

};

var addBooks = function(data) {

  data.items.forEach( book => {
    books.push(book);
  });

  renderBooks();

};

var renderBooks = function() {

  $('.books').empty();

  for (var i=0; i<books.length; i++) {

    let bookInfo = books[i].volumeInfo;
    let image;

    if (bookInfo.imageLinks !== undefined)
      image = bookInfo.imageLinks.smallThumbnail;

    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template( {
      title: bookInfo.title,
      author: bookInfo.authors,
      pageCount: bookInfo.pageCount,
      isbn: bookInfo.industryIdentifiers[0].identifier,
      imageURL: image
    } );

    $('.books').append(newHTML);

  }

};

renderBooks();

$('.search').on('click', function() {
  var search = $('#search-query').val();

  fetch(search);
});