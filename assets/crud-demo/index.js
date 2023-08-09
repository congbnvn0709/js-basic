$(document).ready(function () {
    listPost = [];
    currentPage = 1;
    rowsPerPage = 10;
    totalPages = 0; // tổng số trang
    listRowPerPage = [];
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        type: 'get',
        dataType: 'json', // Dữ liệu trả về là JSON
        success: function (data) {
            // Xử lý dữ liệu từ API ở đây
            listPost = data;
            listRowPerPage = listPost.slice(
                (currentPage - 1) * rowsPerPage,
                currentPage * rowsPerPage
            )
            renderTable(listRowPerPage);
            renderPageNumber(listPost);

        },
        error: function (error) {
            // Xử lý lỗi nếu có
            console.error('Error:', error);
        }
    })

    renderPageNumber = (lisPost) => {
        $('#pagination').empty();
        totalPages = Math.ceil(lisPost.length / rowsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            $('#pagination').append(`<li onclick="changePage(${i})">${i}</li>`);
            if (currentPage === i) {
                $('#pagination li').addClass('active');
            }
        }
        $('#pagination li').not(`:nth-child(${currentPage})`).removeClass('active');
    }
    changePage = (page) => {
        currentPage = page;
        listRowPerPage = listPost.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        )
        renderTable(listRowPerPage);
        renderPageNumber(listPost)
    }
    closeModal = () => {
        $('#modal').fadeOut(300);
    }
    onDetail = (item) => {
        $('#modal').fadeIn(300);
        $('#text-title').text(item.title);
        $('#text-content').text(item.body);
    }
    closeModalEdit = () => {
        event.preventDefault();
        $('#modal-edit').fadeOut(300);
    }
    onEdit = (item) => {
        console.log(item);
        $('#modal-edit').fadeIn(300);
        $('#input-title').val(item.title);
        $('#input-content').val(item.body);
    }
})

renderTable = (listPost) => {
    $('#post-table').empty();
    listPost.map(item => {
        $('#post-table').append(
            `
            <tr>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.body}</td>
                <td class="action">
                    <button class="btn" onclick='onDetail(${JSON.stringify(item)})'> Chi tiết</button>
                </td>
                <td class="action">
                  <button class="btn" onclick='onEdit(${JSON.stringify(item)})'> Chỉnh sửa</button>
                </td>
                <td class="action">
                     <button class="btn"> Xóa</button>
                </td>
            
            </tr>
        `
        )
    })
}

