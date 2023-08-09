const ListCategory = [
    {
        title: 'NEW'
    },
    {
        title: 'FURNITURE'
    },
    {
        title: 'LIGHTING',
    },
    {
        title: 'OUTDOOR'
    },
    {
        title: 'KID & BABY'
    },
    {
        title: 'RUGS'
    },
    {
        title: 'DECOR'
    },
    {
        title: 'KITCHEN & TABLE'
    },
    {
        title: 'TRENDS'
    },
    {
        title: 'SALE'
    },
];
const productList = [
    {
        id: "1",
        name: "Muto",
        image: "https://cdn.shopify.com/s/files/1/0265/0083/files/uultis-pin-71-in-dining-table-view-add01_253x.jpg?v=1684234001",
        description: "Black / Black Cover Lounge Chair With Leather - OPEN BOX",
        price: "10 $",
    },
    {
        id: "2",
        name: "RS BARCELONA",
        image: "https://cdn.shopify.com/s/files/1/0265/0083/products/fourhands-lyla-lounge-chair_170x.jpg?v=1681015723",
        description: "Black / Black Cover Lounge Chair With Leather - OPEN BOX",
        price: "10 $",
    },
    {
        id: "3",
        name: "FOUR HANDS",
        image: "https://cdn.shopify.com/s/files/1/0265/0083/products/artek-childrens-stool-ne60_170x.jpg?v=1680500131",
        description: "Rosedale Nightstand",
        price: "1,999 $",
    },
    {
        id: "4",
        name: "UULTIS",
        image: "https://cdn.shopify.com/s/files/1/0265/0083/products/fourhands-rosedale-nightstand_170x.jpg?v=1680907233",
        description: "Black / Black Cover Lounge Chair With Leather - OPEN BOX",
        price: "10 $",
    },
    {
        id: "5",
        name: "FOUR HANDS",
        image: "https://cdn.shopify.com/s/files/1/0265/0083/products/fourhands-zach-coffee-table_170x.jpg?v=1681154400",
        description: "Zach Coffee Table",
        price: "999 $",
    },
    {
        id: "6",
        name: "STRING FURNITURE",
        image:
            "https://cdn.shopify.com/s/files/1/0265/0083/products/string-furniture-double-wall-cabinet-shelving-unit-view-add01_170x.jpg?v=1682297897",
        description: "Double Wall Cabinet Shelving Unit",
        price: "15 $",
    },
];
const categoryEl = document.getElementsByClassName('wrap-list');
const productEl = document.getElementById('product');
const modal = document.getElementById('modal');
const inputSearch = document.querySelector('.text-search input');
const toggle = document.getElementById('toggle-category');
const links = document.querySelectorAll('.category .wrap-list ul li a');
inputSearch.addEventListener('input', filterProduct);


function filterProduct(e) {
    const productFilter = productList.filter(item => item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
    productEl.innerHTML = generateProduct(productFilter)
}

function generateProduct(products) {
    let html = '<div class="product">';
    products.map((item) => {
        html += `<div class="card"  onclick='showModal(${JSON.stringify(item)})'>`;
        html += '<div class="card-img">';
        html += `<img src=${item.image}" alt=${item.name}/>`;
        html += '</div>';
        html += '<div class="card-text">';
        html += `<span class="title">${item.name}</span>`;
        html += '</div>';
        html += '<div class="card-description">';
        html += `<span class="description">${item.description}</span>`;
        html += '</div>';
        html += '</div>';
    });
    html += '</div>';
    return html;
}


function generateProduct(products) {
    let html = '<div class="product">';
    products.map(item => {
        html += `<div class="card" onclick='showModal(${JSON.stringify(item)})'>`;
        html += '<div class="card-img">';
        html += `<img src=${item.image}" alt=${item.name}/>`;
        html += '</div>';
        html += '<div class="card-text">';
        html += `<span class="title">${item.name}</span>`
        html += '</div>';
        html += '<div class="card-description">';
        html += `<span class="description">${item.description}</span>`
        html += '</div>';
        html += '</div>';
    })
    html += '</div>';
    return html;
}
function showModal(product) {
    console.log(product);
    modal.classList.remove('hide');
    const modalProduct = `
            <div class="card-modal"> 
                <div class="card-img">
                    <img src="${product.image}"/>
                </div>
                <div class="card-content">
                    <div class="card-text">
                        <span>${product.name}</span>
                    </div>
                    <div class="card-description">
                        <span class="description">${product.description}</span>
                    </div>
                    <div class="card-amount">
                        <span>${product.price}</span>
                    </div>
                </div>
                <div class="wrap-btn">
                    <button class="btn-close" onclick="closeModal()">Đóng</button>
                </div>
                <button class="icon" onclick="closeModal()">
                    <i class="fa-solid fa-circle-xmark"></i>
                </button>
        </div>
    `
    modal.innerHTML = modalProduct;
    modal.classList.add('show')

}

// links.forEach((item) =>
//     item.addEventListener('click', (e) => e.preventDefault())
// );
function closeModal() {
    modal.classList.remove('show');
}
toggle.addEventListener('click', () => {
    categoryEl[0].classList.toggle('show');
});
window.onclick = (e) => {
    if (e.target == modal) {
        closeModal()
    }
}
const listProduct = generateProduct(productList);

productEl.innerHTML = listProduct;
