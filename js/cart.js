const ProductComponent = () => {

    // Dumy product list
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 8,
    },
    {
      id: 2,
      name: "Product 2",
      price: 8,
    },
    {
      id: 3,
      name: "Product 3",
      price: 8,
    },
    {
      id: 4,
      name: "Product 4",
      price: 8,
    },
    {
      id: 5,
      name: "Product 5",
      price: 8,
    },
  ];

  let cart = {
    items: [],
    total: 0,
    discount: 0,
  };

  // set product listing after dom inititalize
  const setProductsIntoDom = () => {
    let html = "";
    for (const product of products) {
      html += `<div class="col-md-4 mb-5">
                <h2>${product.name} - $${product.price}</h2>
                <button data-id="${product.id}" class="add-to-cart">Add to cart</button>
            </div>`;
    }
    document.querySelector(".product_list").innerHTML = html;
  };

  
  // check the cart items for group base discount 
  const checkRecItems = (items,ids) =>{
    let ids2 = [];
    let newItems = [];
    for(let i in items){
        if(items[i].qty > 1){
            ids2.push(items[i].id);
            const data = {...items[i],qty:items[i].qty-1};
            newItems.push(data);
        }
    }
    if(ids2.length > 0){
        ids.push(ids2);
    }
    /*if(newItems.length > 0){
        checkRecItems(newItems,ids)
    }*/
    return ids;
  };

  // apply discount base on cart items and group
  const applyDiscount = (items) => {
      let ids = [];
      const groups = checkRecItems(items,ids);
      if(groups.length > 0){
          let discount = 0;
          if(items.length == 5){
            discount = ((items.length * 8) * 0.25);
          }else if(items.length == 4){
            discount = ((items.length * 8) * 0.20);
          }else if(items.length == 3){
            discount = ((items.length * 8) * 0.10);
          }else if(items.length == 2){
            discount = ((items.length * 8) * 0.05);
          }
          if(groups[0].length == 5){
            discount = discount + ((groups[0].length * 8) * 0.25);
          }else if(groups[0].length == 4){
            discount = discount + ((groups[0].length * 8) * 0.20);
          }else if(groups[0].length == 3){
            discount = discount + ((groups[0].length * 8) * 0.10);
          }else if(groups[0].length == 2){
            discount = discount + ((groups[0].length * 8) * 0.05);
          }
          cart.discount = discount.toFixed(2);
      }else{
          if(items.length >= 5){
            cart.discount = (cart.total * 0.25).toFixed(2);
          }else if(items.length == 4){
            cart.discount = (cart.total * 0.20).toFixed(2);
          }else if(items.length == 3){
            cart.discount = (cart.total * 0.10).toFixed(2);
          }else if(items.length == 2){
            cart.discount = (cart.total * 0.05).toFixed(2);
          }
      }

  }

  // display cart
  const _renderCart = () => {
    let html = "";
    cart.total = 0;
    for (const product of cart.items) {
      const itemTotal = product.qty * product.price;
      cart.total = cart.total + itemTotal;
      html += `<li class="list-group-item cart-item">
            <div class="row">
                <div class="col-md-4">
                    <h6>${product.name}</h6>
                    <span>$${product.price}</span>
                </div>
                <div class="col-md-4">${product.qty}</div>
                <div class="col-md-4">$${itemTotal.toFixed(2)}</div>
            </div>
            </li>`;
    }
    const items = [...cart.items];
    const discount = applyDiscount(items);
    document.querySelector(".cart-items").innerHTML = html;
    document.querySelector(".discount-total").innerHTML = `$${cart.discount}`;
    document.querySelector(".cart-total").innerHTML = `$${ (cart.total - cart.discount)}`;
  };

  // Find array of index
  const _findArrayIndex = (elements, id) => {
    return elements.findIndex((element) => element.id == id);
  };

  // get product from id
  const findProductFromId = (id) => {
    const currentIndex = _findArrayIndex(products, id);
    return products[currentIndex];
  };

  // check product on cart
  const checkProductInCart = (id) => {
    const currentIndex = _findArrayIndex(cart.items, id);
    return currentIndex;
  };

  // Add to cart button event
  const onAddtoCartHandler = (event) => {
    const product_id = event.target.getAttribute("data-id");
    const product = findProductFromId(+product_id);

    const isOnCart = checkProductInCart(+product_id);
    const cartProduct = cart.items[isOnCart];
    if (cartProduct) {
        cart.items[isOnCart].qty +=1; 
    } else {
      const product_data = {
        ...product,
        qty: 1,
      };
      cart.items.push(product_data);
    }
    _renderCart();
  };

  //bind the add to cart button event
  const initializeEvents = () => {
    document.querySelectorAll(".add-to-cart").forEach((element) => {
      element.addEventListener("click", onAddtoCartHandler);
    });
  };

  // initialize all objects
  const init = () => {
    setProductsIntoDom();
    initializeEvents();
  };
  init();
};
document.addEventListener("DOMContentLoaded", ProductComponent);
