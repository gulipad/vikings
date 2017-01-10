window.onload = function () {

	$.ajax({
		type: "GET",
		url: "data/friends.json",
		success: function (data) {
			console.log(data)
			makeCall()
		},
		error: handleError
	})

	function handleError(jqXHR, textStatus, error) {
		console.log(error)
	}

	function makeCall () {
		$.ajax({
				type: "GET",
				url: 'data/friends.json',
				success: function (data) {
					console.log(data)
				},
				error: handleError
			})
	}

	// var fruits = ['apple','melon','banana','cherry']

	// fruits.forEach( function (fruit) {
	// 	console.log(fruit)
	// })

	// $.get("data/friends.json", function (data) {
	// 	console.log(data)
	// })

	
	// var http = new XMLHttpRequest();
	// http.open("GET", "data/friends.json", true);

	// http.onreadystatechange = getResponse
	// http.send();

	// function getResponse () {
	// 	if (http.readyState == 3) {
	// 		console.log('Loading...')
	// 	}

	// 	if (http.readyState == 4 && http.status == 200) {
	// 		var res = JSON.parse(http.response)
	// 		console.log('Loaded')
	// 		alert(res.Friends[0].name)
	// 		console.log(http.readyState)
	// 	}
	// }


};	
