$(document).ready(function() {
	
/*	
	1. Use the URL provided to research how to retrieve data
	2. Use an API to retrieve JSON data via Ajax
	3. Parse the resultant string, if needed, to JSON
	4. console.log the data to ensure it's a proper object
	5. Use (basic) HTML to construct a template for an entry
	6. Use a for loop and DOM manipulation to display each entry from the API on the page using your template
	7. Bonus: Add a click event to delete the entry
*/

	var $list = $('#list');
	var $read = $('#read');
	var baseUrl = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
	var authorSearch = "+inauthor:";
	
	$('#bookSearch').on('submit', function(e) {
		e.preventDefault();
		var title = $('#title').val();
		var author = $('#author').val();

		//concats url for send
		var searchUrl = baseUrl + title + authorSearch + author;		

		$.ajax({
			type: "GET",
			url: searchUrl,
			dataType: "JSON",
			success: function(data) {
				// calls the display function
				displayResults(data.items);
			},
			error: function(jqXHR, textStatus) {
            	console.log("Request failed: " + textStatus);
        	}
		});
	});

	// Function to display posts
	function displayResults(content) {
		// removes old posts if they exist
		$('#list .book').remove();
		for(var i = 0; i < content.length; i++) {
			// html markup for new books, appends table row
			var book = 	'<tr class="book">' +
							'<td><a href="' + content[i].volumeInfo.previewLink + '">' + content[i].volumeInfo.title + '</a></td>' +
							'<td>' + (content[i].volumeInfo.authors ? fixAuthor(content[i].volumeInfo.authors) : "No Author Found") + '</td>' + 
							'<td>' + (content[i].volumeInfo.publishedDate ? content[i].volumeInfo.publishedDate : "No Date") + '</td>' +
							'<td><button class="add">Add</button></td>' + 
						'</tr>';
			$list.append(book);

			// call event listener to add to list
			addToList();
		}
	}

	// fix authors, adds space
	function fixAuthor(array) {
		return array.join(', ');
	}

	// add event listener to books
	function addToList() {
		console.log('added');
		$('.book .add').on('click', function(e) {
			e.preventDefault();
			var $par = $(this).parent().parent();

			// switch classes
			$(this).html('Delete');
			$(this).removeClass('add');
			$(this).addClass('delete');

			$read.append($par);

			// add new class to target in next event
			$par.addClass('read-item');
			// call event listener to remove from list
			removeFromList();
		});
	}

	function removeFromList() {
		$('.read-item .delete').on('click', function(e) {
			e.preventDefault();
			var $par = $(this).parent().parent();
			$par.remove();
		});
	}




});


