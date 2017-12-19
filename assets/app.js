$( document ).ready(function()
	{
		$("#submitButton").on("click", function buttonAdder (input)
		{
			let animalInput = $("#searchBox").val().trim();
			console.log("search: ", animalInput);
			function clear (input)
			{
				animalInput.toLowerCase();
				animalInput.replace(" ", "+");
			}
			clear (animalInput);
			var btn = $("<button>");
			btn.addClass("animalButton");
			btn.attr("data-search", animalInput);
			btn.text(animalInput);
			$('#buttonContainer').append(btn);
		});

		$("#buttonContainer").on("click", ".animalButton", function imageFinder (input)
		{
			let searchInput = $(this).text();

			console.log(input);

			console.log("data-search: ", searchInput);

			let APIkey = "sMwc8ewdP9gAt6Mm886EZEWcJ56AYFTZ";
			let limit = 20;
			let queryURL = "http://api.giphy.com/v1/gifs/search?q="+searchInput+"&api_key="+APIkey+"&limit="+limit;

			console.log('queryURL: ',queryURL);
			
			$.ajax({url: queryURL, method: "GET"}).done(function(response) 
			{	
				for (var i = 0; i < response.data.length; i++)
				{
					console.log('response: ',response);
					let imageURL = response.data[i].images.fixed_width_still.url;
					let gifDiv = $("<div class='item'>");
					gifDiv.addClass('smallGif');
					console.log('image URL: ',imageURL);
					let animalImage = $("<img>");
					animalImage.attr("src", imageURL);
		        	animalImage.attr("alt", "animal image");
		        	animalImage.attr('gif', response.data[i].images.original.url);
		        	//$('.gif').pause();
		        	gifDiv.prepend(animalImage);
		        	$('#imageContatiner').prepend(gifDiv);
	        	}
			});
		});

		$(document).on('click', '.smallGif img', function playImage()
		{
			console.log(this);
       		var src = $(this).attr("src");
     		if($(this).hasClass('playing'))
     		{
		        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
		        $(this).removeClass('playing');
    		}
    		else 
    		{
		       $(this).addClass('playing');
		       $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
     		}
		});
})

	



