const carrito = document.querySelector('#cartZone');
const tienda = document.querySelector('#storeZone');
const items = tienda.querySelectorAll('.item');
const botonReset = document.querySelector('#btnReset');
const total = document.querySelector('#total');
let dragItem;

// items Listener
items.forEach((item, i) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
  item.dataset.id = i;
});

/* for( let i; items.length < i; i++){
  items[i].addEventListener("dragstart", dragStart);
  items[i].addEventListener("dragend", dragEnd);
  items.dataset.id 
} */

botonReset.addEventListener('click', reset);

carrito.addEventListener("dragover", dragOver);
carrito.addEventListener("dragenter", dragEnter);
carrito.addEventListener("dragleave", dragLeave);
carrito.addEventListener("drop", dropCart);


tienda.addEventListener("dragover", dragOver);
tienda.addEventListener("dragenter", dragEnter);
tienda.addEventListener("dragleave", dragLeave);
tienda.addEventListener("drop", dropStore);

function dragStart(e) {
  dragItem = this;
  const parent = this.parentElement;

  if (parent == tienda) {
    if (!carrito.classList.contains('dragOver'))
    carrito.className += ' dragOver';
  } else {
    if (!tienda.classList.contains('dragOver'))
      tienda.className += ' dragOver';
  }

  const item = dragItem.outerHTML;
  const id = dragItem.dataset.id;
  const price = dragItem.querySelector('.product').dataset.price;
  e.dataTransfer.setData('item', item);
  e.dataTransfer.setData('id', id);
  e.dataTransfer.setData('price',price);
}

function dragEnd() {

  const parent = this.parentElement;
  if (parent == tienda) {
    carrito.classList.remove('dragOver');
  } else {
    tienda.classList.remove('dragOver');
  }
}

function dragEnter(e) {
  e.preventDefault();
}

function dragOver(e) {
  e.preventDefault();
  if (this != dragItem.parentElement && !this.classList.contains('dragOver'))
    this.className += ' dragOver';

    
}

function dragLeave() {

  this.classList.remove('dragOver');
}

function dropCart(e) {
  
  if (dragItem.parentElement != carrito) {
    this.classList.remove('dragOver');

    const data = e.dataTransfer.getData('item');

    if (!this.querySelector('hide')) {
      this.querySelector('span').className += ' hide';
    }


    dragItem.setAttribute('draggable', false);
    dragItem.className += ' hide';

  
    this.innerHTML += data;


    const itemsCart = carrito.querySelectorAll('.item');

    if (itemsCart.length > 0) {
      this.querySelectorAll('span')[1].classList.remove('hide');
    }

    itemsCart.forEach(item => {
      item.addEventListener("dragstart", dragStart);
      item.addEventListener("dragend", dragEnd);
    });


    const totalCart = parseFloat(total.innerHTML) + parseFloat(e.dataTransfer.getData('price'));
    resultTotal(totalCart);
  }
};


function dropStore(e) {

  if (dragItem.parentElement != tienda) {
    this.classList.remove('dragOver');

    const id = e.dataTransfer.getData('id');
    const item = tienda.querySelector(`[data-id="${id}"]`);
    item.classList.remove("hide");
    item.setAttribute('draggable', true);
    carrito.removeChild(dragItem);

    const totalCart = parseFloat(total.innerHTML) - parseFloat(e.dataTransfer.getData('price'));
    total.innerHTML = (totalCart.toFixed(2) > 0) ? totalCart.toFixed(2) + "€": "0 €";

 
    if (carrito.querySelectorAll('.item').length == 0) {
      carrito.querySelectorAll('span')[0].classList.remove('hide');
      carrito.querySelectorAll('span')[1].className += ' hide';
    }
  }
}


function reset() {
  let txt = carrito.querySelector('span');
  while (carrito.lastChild != txt) {
    carrito.lastChild.remove();
  }

  txt.classList.remove('hide');

  items.forEach(item => {
    item.setAttribute('draggable', true);
    item.classList.remove('hide');
  });

  total.innerHTML = 0;
};

function resultTotal(totalCart) {
  total.innerHTML = (totalCart.toFixed(2) > 0) ? totalCart.toFixed(2) + "€" : "0 €";
}