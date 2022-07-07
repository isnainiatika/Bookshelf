const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList"
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList"
const BOOK_ITEMID = "itemId"
function addBook(){
    const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID)
    const textBookTitle = document.getElementById("inputBookTitle").value;
    const textBookAuthor = document.getElementById("inputBookAuthor").value;
    const textBookYear = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById("inputBookIsComplete").checked;
    const book = makeBooks(textBookTitle,textBookAuthor,textBookYear, isCompleted);
    const bookObject = composeBookObject(textBookTitle,textBookAuthor,textBookYear,isCompleted);
   
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    if (isCompleted) {
        completedBookList.append(book);
    } else {
        uncompletedBookList.append(book);
    }
    updateDataStorage();
}
function makeBooks(title, author, year, isCompleted){
    const textBookTitle = document.createElement("h3")
    textBookTitle.innerText = title 

    const textBookAuthor = document.createElement('p')
    textBookAuthor.innerHTML = "Penulis : "+ author 

    const textBookYear = document.createElement('p')
    textBookYear.innerHTML = "Tahun : "+ year 

    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("action")

    const article = document.createElement("article")
    article.classList.add("book_item")
    article.append(textBookTitle, textBookAuthor, textBookYear)
    if (isCompleted) {
        buttonContainer.append(
            createUndoButton(),
            createEraseButton()
        );
        article.append(buttonContainer)
    }else {
        buttonContainer.append(
            createFinishButton(),
            createEraseButton()
        );
        article.append(buttonContainer)
    }
    return article
}
function createButton(buttonTypeClass, eventListener, text){
    const button = document.createElement("button");
    button.classList.add('button', buttonTypeClass);
    button.innerText = text
    button.addEventListener("click", function(event){
        eventListener(event);
    });
    return button;
}
function createFinishButton() {
    return createButton("finish-button", function (event) {
        addBookToComplete(event.target.parentElement.parentElement)
    }, "Sudah Dibaca")
}
function createEraseButton(){
    return createButton("erase-button", function(event){
        document.getElementById('idModal').style.display = 'block'
        removeTaskFormCompleted(event.target.parentElement.parentElement)
    }, "Hapus Buku")
}
function removeTaskFormCompleted(taskElement){
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);

    document.getElementById('deleteBtn').addEventListener("click",function(){
        books.splice(bookPosition, 1);
        taskElement.remove();
        updateDataStorage();
    })
}
function addBookToComplete(taskElement){
    const textBookTitle = taskElement.querySelector(".book_item > h3").innerText
    const textBookAuthor = taskElement.querySelectorAll(".book_item >p")[0].innerText.replace('Penulis : ', '')
    const textBookYear = taskElement.querySelectorAll(".book_item > p")[1].innerText.replace('Tahun : ', '')

    const newBook = makeBooks(textBookTitle,textBookAuthor, textBookYear, true)

    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID)
    const book = findBook(taskElement[BOOK_ITEMID])
    book.isCompleted = true
    newBook[BOOK_ITEMID] = book.id

    listCompleted.insertBefore(newBook, listCompleted.firstElementChild)
    taskElement.remove()
    updateDataStorage()
}
function undoBookfromCompleted(taskElement){
    const textBookTitle = taskElement.querySelector(".book_item > h3").innerText
    const textBookAuthor = taskElement.querySelectorAll(".book_item >p")[0].innerText.replace('Penulis : ', '')
    const textBookYear = taskElement.querySelectorAll(".book_item > p")[1].innerText.replace('Tahun : ', '')

    const newBook = makeBooks(textBookTitle, textBookAuthor, textBookYear, false)
    const unlistCompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID)
    const book = findBook(taskElement[BOOK_ITEMID])
    book.isCompleted = false
    newBook[BOOK_ITEMID] = book.id

    unlistCompleted.appendChild(newBook)
    taskElement.remove()
    updateDataStorage()
}
function createUndoButton(){
    return createButton("finish-button", function(event){
        undoBookfromCompleted(event.target.parentElement.parentElement)
    }, "belum selesai dibaca")
}
//fungsi untuk mencari buku
function searchBook(){
    const textSearchBook = document.getElementById("searchBookTitle").value
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID)
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID)

    let take = books.filter((book)=>{
        return book.title.includes(textSearchBook)
    })
    const sumCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID).childElementCount
    const sumUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID).childElementCount

    console.log(take)
    let i=0
    while (i<sumCompleted){
        listCompleted.removeChild(listCompleted.listElementChild)
        i++
    }
    i=0;
    while(i< sumUncompleted){
        listUncompleted.removeChild(listUncompleted.lastElementChild)
        i++
    }
    for (book of take){
        const newBook = makeBooks(book.title, book.author, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;
        if (book.isCompleted){
            listCompleted.append(newBook);
            console.log("completed : ", newBook)
        }
        if (book.isCompleted == false){
            listUncompleted.append(newBook);
            console.log("uncompleted : ", newBook)
        }
    }
}


