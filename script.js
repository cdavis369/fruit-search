const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Eggplant', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Raspberry', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Ugli', 'Voavanga', 'Watermelon', 'Yuzu', 'Zebra Melon'];

function search(str) {
	const re = new RegExp(str, "i");
	// make new array with all fruits containing substring of search
	return fruit.reduce((arr, val) => {
		if (str.length && val.match(re)) 
			arr.push(val);
		return arr;
	}, [])
}

function searchHandler(e) {
	const searchInput = input.value;
	const suggestions = search(searchInput);
	showSuggestions(suggestions, searchInput);
}

// create p element for each fruit suggestion and add to suggestions div
function showSuggestions(results, inputVal) {
	// clear suggestions div for each keystroke
	suggestions.innerHTML = "";
	results.forEach((val) => {
			const suggest = document.createElement("p");
			suggest.setAttribute("class", "suggestions");
			// bold suggested text which matches search input
			suggest.innerHTML = boldText(val, inputVal);
			suggest.value = val;
			suggestions.append(suggest);
	});
}

function useSuggestion(e) {
	input.value = e.target.innerText;
	suggestions.innerHTML = "";
}

// find starting index of searchInput in suggestion
// Iterate over suggestion, create new string for suggestion
// place <b> in string at found index
// place </b> when the length of chars in new string is as long as search input
function boldText(suggestion, searchInput) {
	const re = new RegExp(searchInput, 'i');
	const matchIndex = suggestion.search(re);
	const suggestionArr = Array.from(suggestion);
	let bolded = "";
	if (searchInput.length === 1) {
		suggestionArr.forEach((letter, index) => {
			if (index === matchIndex)
				bolded += `<b>${letter}</b>`;
			else 
				bolded += letter;
		});
	}
	else {
		suggestionArr.forEach((letter, index) => {
			if (index === matchIndex)
				bolded += `<b>${letter}`;
			else if (index - matchIndex === searchInput.length - 1)
				bolded += `${letter}</b>`;
			else
				bolded += letter;
		});
	}
	return bolded;
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
