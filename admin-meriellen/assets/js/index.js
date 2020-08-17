//PICSUM PHOTOS API

// Create the type of element you pass in the parameters
function createNode(element) {
	return document.createElement(element);
}

// Append the second parameter(element) to the first one
function append(parent, el) {
	return parent.appendChild(el);
}

const wrap = document.getElementById('js-images__list'); // Get the list where we will place our pictures
const url = 'https://picsum.photos/v2/list?limit=4'; // Get 4 pictures

fetch(url)
	.then((resp) => resp.json())
	.then(function (data) {
		let pictures = data;
		return pictures.map(function (photo) {
			let figure = createNode('figure'),
				img = createNode('img'),
				figcaption = createNode('figcaption');
			const img_url = photo.download_url;
			const parser = new URL(url);
			parser.href = img_url;

			const pathname = parser.pathname;
			const pathname2 = pathname.split("/");

			let path_id = pathname2[2];
			let path_width = pathname2[3];
			let path_height = pathname2[4];

			path_width = 420;
			path_height = 227;

			img.src = `${parser.protocol}//${parser.host}/id/${path_id}/${path_width}/${path_height}`;

			figcaption.innerHTML = `${photo.author}`;
			append(figure, img);
			append(figure, figcaption);
			append(wrap, figure);
		})
	})
	.catch(function (error) {
		console.log(error);
	}); 