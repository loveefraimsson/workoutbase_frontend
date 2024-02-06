export function addToCart(product) {
    
    let productsInCart = JSON.parse(localStorage.getItem("cart"));   
    let newId = Math.floor(Math.random() * (1000000 - 0) + 1);

    product.id = newId;

    let findProduct = productsInCart.find((productsInCart) => productsInCart.id === newId);

    if (findProduct === undefined) {
        productsInCart.push(product);
        localStorage.setItem("cart",  JSON.stringify(productsInCart))
    }
    else {
        console.log("Produkt hittad, sätter nytt id");
        let newId2 = Math.floor(Math.random() * (10000 - 0) + 1);
        product.id = newId2;
        productsInCart.push(product);
        localStorage.setItem("cart",  JSON.stringify(productsInCart))
    }
}