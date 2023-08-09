$(document).ready(function () {
    $('#modal').hide()
    listPosts = [];
    currentPage = 1;
    rowsPerPage = 5;
    totalElements = 0;
    perListPosts = []; // danh sách post theo phân trang

    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        type: 'GET', // Phương thức GET
        dataType: 'json', // Dữ liệu trả về là JSON
        success: function (data) {
            // Xử lý dữ liệu từ API ở đây
            listPosts = data;
            perListPosts = listPosts.slice(
                (currentPage - 1) * rowsPerPage,
                (currentPage - 1) * rowsPerPage + rowsPerPage
            )
            renderPageNumber();
            renderTable(perListPosts);
        },
        error: function (error) {
            // Xử lý lỗi nếu có
            console.error('Error:', error);
        }
    })

    renderTable(listPosts)

    // renderPageNumber = () => {
    //     $('#pagination').empty(); // Clear any existing content
    //     totalElements = Math.ceil(listPosts.length / rowsPerPage)
    //     for (let i = 1; i <= totalElements; i++) {
    //         $('#pagination').append(`<li onClick="handleChangePage(${i})">${i}</li>`);
    //         if (i === currentPage) {
    //             $('.active').removeClass('active');
    //             $('#pagination li').addClass('active');
    //         }
    //     }
    //     $('#pagination li').not(`:nth-child(${currentPage})`).removeClass('active');
    // }
    renderPageNumber = () => {
        $('#pagination').empty(); // Clear any existing content
        totalElements = Math.ceil(listPosts.length / rowsPerPage);
        const maxPageNumbers = 5; // The maximum number of page buttons to display (excluding first, last, and ellipsis).

        if (totalElements <= maxPageNumbers) {
            for (let i = 1; i <= totalElements; i++) {
                const pageNumberButton = $(`<li onClick="handleChangePage(${i})">${i}</li>`);

                if (i === currentPage) {
                    pageNumberButton.addClass('active');
                }

                $('#pagination').append(pageNumberButton);
            }
        } else {
            // If there are many pages, render the first few pages, then add an ellipsis, and render the last few pages.
            const halfMax = Math.floor(maxPageNumbers / 2);
            let startPage = currentPage - halfMax;
            let endPage = currentPage + halfMax;
            /**
             * Hai dòng này tính toán phạm vi bắt đầu và kết thúc của các nút trang sẽ được hiển thị khi có nhiều trang.
             *  Trang hiện tại (currentPage) nằm ở trung tâm và
             *  chúng tôi sẽ hiển thị các nút trang trước và sau trang hiện tại trong phạm vi trang halfMax.
             */
            // handle trường hợp phạm vi bắt đầu trước trang đầu tiên   
            if (startPage <= 0) {
                // endPage += Math.abs(startPage) + 1;
                endPage = maxPageNumbers;
                startPage = 1;
            }

            if (endPage > totalElements) {
                startPage = totalElements - maxPageNumbers;
                endPage = totalElements;
            }

            if (startPage > 1) {
                $('#pagination').append(`<li onClick="handleChangePage(1)">1</li>`);
                if (startPage > 2) {
                    $('#pagination').append('<li>...</li>');
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                const pageNumberButton = $(`<li onClick="handleChangePage(${i})">${i}</li>`);
                if (i === currentPage) {
                    pageNumberButton.addClass('active');
                }
                $('#pagination').append(pageNumberButton);
            }

            if (endPage < totalElements) {
                if (endPage < totalElements - 1) {
                    $('#pagination').append('<li>...</li>');
                }
                $('#pagination').append(`<li onClick="handleChangePage(${totalElements})">${totalElements}</li>`);
            }
        }
    };


    handleChangePage = (page) => {
        currentPage = page;
        perListPosts = listPosts.slice(
            (currentPage - 1) * rowsPerPage,
            (currentPage - 1) * rowsPerPage + rowsPerPage
        )
        renderTable(perListPosts);
        renderPageNumber();
    }

    closeModal = () => {
        // $('#modal').hide(500);
        $('#modal').fadeOut(500);
    }

    onDetail = (details) => {
        $('#modal').fadeIn(500)

        showModalDetail(details);
    }
})

renderTable = (listPost) => {
    $('#post-table').empty();
    if (listPost.length) {
        listPost.map((element) => {
            $('#post-table').append(`
                    <tr>
                        <td>${element.id}</td>  
                        <td>${element.title}</td>
                        <td>${element.body}</td>
                        <td class="action">
                            <button type="button" class="btn btn-detail" onclick='onDetail(${JSON.stringify(element)})'>Chi tiết</button>                                                               
                        </td>
                        <td class="action">
                            <button type="button" class="btn">Sửa</button>
                        </td>
                        <td class="action">
                            <button type="button" class="btn">Xóa</button>
                        </td>
                    </tr>
                `)
        });
    }
}

showModalDetail = (dataModal) => {
    $('#title-text').text(dataModal.title);
    $('#content').text(dataModal.body);
}