export function sumItemCart(product, items) {
  const cartsItems = items;
  const fnd = cartsItems.find((a) => a.id === product.id);
  const index = cartsItems.indexOf(fnd);
  if (product.stock <= cartsItems[index].qt) {
    let invalid = false;
    return invalid;
  }
  cartsItems[index].price =
    cartsItems[index].price + cartsItems[index].price / cartsItems[index].qt;
  cartsItems[index].original_price =
    cartsItems[index].original_price +
    cartsItems[index].original_price / cartsItems[index].qt;
  cartsItems[index].qt++;
  return cartsItems;
}

export function setItemCart(product, items) {
  if (items) {
    const cartsItems = items;
    if (product) {
      const filtered = cartsItems?.filter((a) => a.id === product.id);
      if (filtered.length === 1) {
        return sumItemCart(product, items);
      }
      const newItem = cartsItems.concat(product);
      return newItem;
    }
    return;
  }
  return [product];
}

export function removeOrderItem(item, items) {
  if (item) {
    if (items) {
      const cartsItems = items;
      const fnd = cartsItems.find((a) => a.id === item.id);
      const index = cartsItems.indexOf(fnd);
      if (cartsItems[index]) {
        cartsItems.splice(index, 1);
      }
      return cartsItems;
    }
  }
}
