document.addEventListener("DOMContentLoaded", function () {//listener untuk menjalankan kode DOM

    const submitForm = document.getElementById("inputBook");//mengambil elemen dengan id=inputBook
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();//mencegah behaviour asli agar tidak dijalankan
        addBook();//memaanggil fungsi
    });
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});

const submitSearch = document.getElementById("searchBook")
submitSearch.addEventListener("submit", function (event) {
    event.preventDefault()
    searchBooks()
})