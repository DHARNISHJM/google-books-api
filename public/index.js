const apiKey = "AIzaSyDgrtvm5FRJe-qKn6VH2PHa9yF5MLTBGEY";
const container = document.querySelector('#cont')
const form = document.querySelector("#searchForm");

async function getBooks(query){
    config = {params : {q : `${query}`, key : apiKey}};
    const res = await axios.get("https://www.googleapis.com/books/v1/volumes", config);
    console.log(res);
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '30%';

    //row
    const rowDiv = document.createElement('div');
    rowDiv.className = "row";
    card.append(rowDiv);

    //img
    const imgDiv = document.createElement('div');
    imgDiv.className = "col-md-4";
    const img = document.createElement('img');
      img.src = res.data.items[0].volumeInfo.imageLinks.smallThumbnail;
      img.className = 'card-img-top';
      img.alt = 'Card image';
      imgDiv.append(img)
      rowDiv.append(imgDiv);

    //body
    const textDiv = document.createElement('div');
    textDiv.className = "col-md-6";
    textDiv.classList.add("text");
    const title = document.createElement('h5');
    title.innerText = res.data.items[0].volumeInfo.title;
    textDiv.append(title);
    rowDiv.append(textDiv);
      container.append(card);

        //add the list
        const list = document.createElement('ul');
        list.classList.add('smallFont');
        list.className = "list-group";
        const authors = document.createElement('li');
        authors.className = "list-group-item";
        authors.append("Author: ");
        if (res.data.items[0].volumeInfo.authors.length > 1){
            for (let author of res.data.items[0].volumeInfo.authors){
                authors.append(`${author}, `);
            };
        }
        else{
            authors.append(res.data.items[0].volumeInfo.authors[0]);
        }
        const year = document.createElement('li');
        year.className = "list-group-item";
        year.append("Released Year : ");
        year.append(res.data.items[0].volumeInfo.publishedDate.slice(0,4));
        list.append(authors);
        list.append(year);
        textDiv.append(list);

        const booksRedirect = document.createElement('button');
        booksRedirect.innerText = "Google Books";
        booksRedirect.addEventListener('click', () => {
            window.open(res.data.items[0].volumeInfo.canonicalVolumeLink);
        })
        textDiv.append(booksRedirect);

        const moreDetails = document.createElement('a');
        moreDetails.innerText = 'More Details';
        moreDetails.href = "/details";
        textDiv.append(moreDetails);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = form.elements.searchBox.value;
    getBooks(query);
    form.elements.searchBox.value="";
})



