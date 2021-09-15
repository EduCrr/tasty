/*==================== modal ====================*/
let btnModal = document.querySelector("#openModal");
let overlay = document.querySelector(".overlay");
let modal = document.querySelector(".modal");
let closeModalEL = document.querySelector(".close-modal");
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  modal.style.display = "flex";
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modal.style.display = "none";
}

btnModal.addEventListener("click", openModal);
closeModalEL.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

let input = document.querySelector("nav");

function subirTela() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
function addSroll() {
  if (window.scrollY === 0) {
    document.querySelector(".scrolltop").style.display = "none";
  } else if (window.scrollY >= 550) {
    document.querySelector(".scrolltop").style.display = "block";
  }
}

function navBar() {
  if (window.scrollY === 0) {
    input.classList.remove("show-nav");
  } else if (window.scrollY > 1) {
    input.classList.add("show-nav");
  }
}
window.addEventListener("scroll", addSroll);
window.addEventListener("scroll", navBar);

/*==================== SCROLL REVEAL ====================*/
const sr = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 2000,
  reset: true,
});

sr.reveal(
  `.home, .home-img,
            .sobre, .home-about,
            .ofertas, .carts, .app,
            .app.img, .contato,
            .contato.botao, footer`,
  {
    interval: 200,
  }
);

/*==================== DARK MODE ====================*/

let content = document.querySelector("body");
let dark = document.querySelector("#dark-change");
let moon = document.querySelector("label i");
let sun = "fa-sun";
moon.addEventListener("click", () => {
  moon.classList.toggle(sun);
});

dark.addEventListener("click", () => {
  dark.classList.toggle("active");
  content.classList.toggle("night");
});

/*==================== Carrinho ====================*/

let modalQt = 1;
let modalKey = 0;
let cart = [];
let products;
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

comidaJson.map((item, index) => {
  let comidaItem = c(".especial .fundo ").cloneNode(true);
  comidaItem.setAttribute("data-key", index);
  comidaItem.querySelector(".title").innerHTML = item.name;
  comidaItem.querySelector(".prato img").src = item.img;
  comidaItem.querySelector(".price").innerHTML = `R$ ${item.price
    .toFixed(2)
    .replace(".", ",")}`;
  comidaItem.querySelector(".description").innerHTML = item.description;

  comidaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    let key = e.target.closest(".fundo").getAttribute("data-key");
    modalKey = key;

    let identifier = `${modalKey}@${modalQt}`;
    let key2 = cart.findIndex((item) => {
      return item.identifier == identifier;
    });

    //retorna true
    if (key2 > -1) {
      alert("Produto já adicionado");
    } else {
      cart.push({
        identifier,
        id: comidaJson[modalKey].id,
        qt: modalQt,
      });
    }
    updadeCart();
  });
  c(".carts").appendChild(comidaItem);
});
c(".menu-closer").addEventListener("click", () => {
  c("aside").classList.remove("show");
});
c(".nav-item .menu-openner").addEventListener("click", () => {
  if (cart.length > 0) {
    c("aside").classList.add("show");
  } else {
    alert("Carrinho vazio!!!");
  }
});
function updadeCart() {
  c(".menu-openner span").innerHTML = cart.length;
  if (cart.length > 0) {
    c("aside").classList.add("show");
    c(".cart").innerHTML = "";
    let subtotal = 0;
    let desconto = 0;
    let total = 0;
    for (let i in cart) {
      let comidaItem = comidaJson.find((item) => {
        return item.id == cart[i].id;
      });
      subtotal += comidaItem.price * cart[i].qt;
      let cartItem = c(".cart--item").cloneNode(true);

      cartItem.querySelector("img").src = comidaItem.img;
      cartItem.querySelector(".cart--item-nome").innerHTML = comidaItem.name;
      cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].qt;
      cartItem
        .querySelector(".cart--item-qtmenos")
        .addEventListener("click", () => {
          if (cart[i].qt > 1) {
            cart[i].qt--;
          } else {
            cart.splice(i, 1);
          }
          updadeCart();
        });
      cartItem
        .querySelector(".cart--item-qtmais")
        .addEventListener("click", () => {
          cart[i].qt++;
          updadeCart();
        });
      c(".cart").appendChild(cartItem);
    }
    desconto = subtotal * 0.1;
    total = subtotal - desconto;
    c(".subtotal span:last-child").innerHTML = `R$ ${subtotal
      .toFixed(2)
      .replace(".", ",")}`;
    c(".desconto span:last-child").innerHTML = `R$ ${desconto
      .toFixed(2)
      .replace(".", ",")}`;
    c(".total span:last-child").innerHTML = `R$ ${total
      .toFixed(2)
      .replace(".", ",")}`;
  } else {
    c("aside").classList.remove("show");
  }
}
