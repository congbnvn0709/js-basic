$(document).ready(function () {
    listPost = [];
    currentPage = 1;
    rowsPerPage = 5;
    perListPosts = [];
    totalElements = 0;
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
            renderPagination();
            renderTable(perListPosts);
        },
        error: function (error) {
            // Xử lý lỗi nếu có
            console.error('Error:', error);
        }
    }
    )
    changePage = (index) => {
        currentPage = index;
        perListPosts = listPosts.slice(
            (currentPage - 1) * rowsPerPage,
            (currentPage - 1) * rowsPerPage + rowsPerPage
        )
        renderTable(perListPosts);
        renderPagination();
    }
    renderPagination = () => {
        $('#pagination').empty();
        totalElements = Math.ceil(listPosts.length / rowsPerPage);
        for (let i = 1; i <= totalElements; i++) {
            $('#pagination').append(`<li onclick="changePage(${i})">${i}</li>`)
            if (currentPage == i) {
                $('#pagination li').removeClass('active');
                $('#pagination li').addClass('active');
            }
        }
        $('#pagination li').not(`:nth-child(${currentPage})`).removeClass('active');

    }

    onDetail = (item) => {
        $('#modal').fadeIn(500);
        $('#title').text(item.title);
        $('#content').text(item.body);
    }
    closeModal = () => {
        $('#modal').fadeOut(500);
    }
})

renderTable = (perListPosts) => {
    $('#post-table').empty();
    if (perListPosts && perListPosts.length) {
        perListPosts.map(item => {
            $('#post-table').append(
                `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.body}</td>
                    <td>
                        <button type="button" class="btn btn-detail" onclick='onDetail(${JSON.stringify(item)})'>Chi tiết</button>
                    </td>
                    <td>
                        <button type="button" class="btn">Sửa</button>
                    </td>
                    <td>  
                        <button type="button" class="btn">Xóa</button>
                    </td>
                </tr>
                `
            )
        })
    }
}
