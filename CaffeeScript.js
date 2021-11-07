
/*Создаем пункт меню*/
function MenuElement(item) {
  this.item = item;
}

/**
 * Узнаем позицию меню
 * @returns {Object} позиция меню
 * */
MenuElement.prototype.getItem = function() {
  console.log('ths', this.item)
  return this.item;
};


/*Создаем напиток*/
function Drink(type) {
  MenuElement.call(this, type);
}
Object.defineProperties(
  Drink,
  {
    COLA:{
      value: {
      name: 'Coca-cola', 
      price: 50, 
      calories: 40 },
      writable: false,
      enumerable: true,
      configurable: false,
    },
    COFFEE:{
      value: { 
        name: 'Coffee', 
        price: 80, 
        calories: 20 
      },
      writable: false,
      enumerable: true,
      configurable: false,
    }
  }
)
Drink.prototype = Object.create(MenuElement.prototype);

/**Узнаем цену напитка
* @returns {number} Цена в тугриках
 */
Drink.prototype.getPrice = function() {
  return this.getItem().price;
};

/**Узнаем калорийность напитка
* @returns {number} Калорийность в калориях
 */
Drink.prototype.getCalories = function() {
  return this.getItem().calories;
};

/*Создаем гамбургер с различными размерами и начинками*/

function Hamburger(size, stuffingName) {
  MenuElement.call(this, size);
  let stuffing = {};
  stuffing[stuffingName] = 1;
  this.stuffing = stuffing;
}
Object.defineProperties(
  Hamburger,
  {
    SIZE_SMALL:{
    value: {
      name: 'small hamburger', 
      price: 50, 
      calories: 20 
    },
    writable: false,
    enumerable: true,
    configurable: false,
  },
  SIZE_BIG:{
    value: {
      name: 'big hamburger', 
      price: 100, 
      calories: 40 
    },
    writable: false,
    enumerable: true,
    configurable: false,
  },
  STUFFING_CHEESE:{
    value: {
      name: 'cheese', 
      price: 10, 
      calories: 20 
    },
    writable: false,
    enumerable: true,
    configurable: false,
  },
  STUFFING_SALAD:{
    value: {
      name: 'salad', 
      price: 20, 
      calories: 5 
    },
    writable: false,
    enumerable: true,
    configurable: false,
  },
  STUFFING_POTATOES:{
    value: {
      name: 'salad', 
      price: 20, 
      calories: 5 
    },
    writable: false,
    enumerable: true,
    configurable: false,
  },
})
/*Создаем объект начинок*/
let stuffingList = {
  cheese: Hamburger.STUFFING_CHEESE,
  salad: Hamburger.STUFFING_SALAD,
  potatoes: Hamburger.STUFFING_POTATOES
};
Hamburger.prototype = Object.create(MenuElement.prototype);

/*Узнаем начинку гамбургера*/
Hamburger.prototype.getStuffing = function() {
  return this.stuffing;
};

/**
 * Изменяем начинку в гамбурегере или добавляем новую
 * @param name  начинка
 * @param amount количество начинки
 */
Hamburger.prototype.changeStuffing = function(name, amount) {
  let stuffing = this.getStuffing();
  if (amount < 1 || countStuffings(stuffing) < 1) {
   return 'Add stuffing'
  } else {
    stuffing[name] = amount || 1;
  }
};

/**  Узнаем цену гамбургера
 * @returns {number} Цена в тугриках
 */
Hamburger.prototype.getPrice = function() {
  let sumPrice = this.getItem().price;
  let stuffing = this.getStuffing();

  for (let key in stuffing) {
    let stuffingItem = getStuffingByName(key);
    sumPrice += stuffingItem.price * stuffing[key];
  }
  return sumPrice;
};


/** Узнаем калорийность гамбургера
 * @returns {number} Калорийность в калориях
 */
Hamburger.prototype.getCalories = function() {
  let sumCalories = this.getItem().calories;
  let stuffing = this.getStuffing();

  for (let key in stuffing) {
    let stuffingItem = getStuffingByName(key);
    sumCalories += stuffingItem.calories * stuffing[key];
  }
  return sumCalories;
};

/**
 * Получаем название начинки из списка начинок
 * @param {*} name - название начинки
 * @returns начинку
 */

function getStuffingByName(name) {
  return stuffingList[name];
}
/**
 * Считаем количество начинки
 * @param {*} stuffing начинка
 * @returns {Number} sumStuffing - количество начинки
 */
function countStuffings(stuffing) {
  let sumStuffing = 0;
  for (let key in stuffing) {
    sumStuffing += stuffing[key];
  }
  return sumStuffing;
}

/*Создаем салат*/
function Salad(type, weight) {
  MenuElement.call(this, type);
  this.weight = weight;
}
Object.defineProperties(
  Salad,
  { CAESAR:{
    value:{
      name: 'caesar', 
      price: 100, 
      calories: 20 
    },
    writable: false,
    enumerable: true,
    configurable: false
  },
    OLIVIE:{
      value: {
        name: 'olivie', 
        price: 50, 
        calories: 80 
      },
      writable: false,
      enumerable: true,
      configurable: false
    }
}
)
Salad.prototype = Object.create(MenuElement.prototype);


/**
 * Получаем вес салата
 * @returns {Number}вес салата в граммах
 */
Salad.prototype.getSaladWeight = function() {
  return this.weight;
};

/**
 * Изменяем вес салата
 * @param {number} weight  - новый вес салата в граммах
 */
Salad.prototype.changeSaladWeight = function(weight) {
  if (weight > 100) {
    this.weight = weight
  } else {
    return 'Minimal weight is 100g'
  }
};

/**
 * Узнаем цену салата за 100г.
 * @returns {number} Цена в тугриках 
 */
Salad.prototype.getPrice = function() {
  let thisType = this.getItem();
  let priceGramms = thisType.price / 100;

  return priceGramms * this.getSaladWeight();
};

/**
 * Узнаем калорийность салата в 100г.
 * @returns {number} Калрийность салата
 */
Salad.prototype.getCalories = function() {
  let thisType = this.getItem();
  let caloriesGramms = thisType.calories / 100;

  return caloriesGramms * this.getSaladWeight();
};
/*Создаем заказ*/
function Order() {
  this.mealsList = [];
  this.payment = false;
}

/**
 * Узнаем оплачен ли заказ
 *@returns {Boolean} оплачен заказ (true/false)
 */
Order.prototype.getPayment = function() {
  return this.payment;
};

/**
 * Получаем список блюд в заказе
 * @returns {Object} с списком блюд
 */
Order.prototype.getMealsList = function() {
  return this.mealsList;
};

/**
 * Добавляем новое блюдо в заказ
 * @param item Блюдо
 */
Order.prototype.addOrder = function(item) {
  if (!this.getPayment()) {
    this.mealsList.push(item);
  } 
};

/**
 * Удаляем блюдо из заказа по номеру позиции
 * @param item Индекс блюда
 */
Order.prototype.deleteMeal = function(item) {
  if (!this.getPayment()) {
    let mealIndex = item - 1;
    this.getMealsList().splice(mealIndex, 1);
  } 
};

/**
 * Узнаем полную стоимость заказа
 * @returns {number} Цена в тугриках
 */
Order.prototype.getOrderPrice = function() {
  let totalOrder = this.getMealsList();
  if (totalOrder.length > 0) {
    let orderPrice = 0;
    for (let i = 0; i < totalOrder.length; i++) {
      orderPrice += totalOrder[i].getPrice();
    }
    return orderPrice;
  }
};

/**
 * Узнем калорийность заказа
 * @returns {number} Калорийность заказа
 */
Order.prototype.getOrderCalories = function() {
  let totalOrder = this.getMealsList();
  if (totalOrder.length > 0) {
    let totalCalories = 0;
    for (let i = 0; i < totalOrder.length; i++) {
      totalCalories += totalOrder[i].getCalories();
    }
    return totalCalories;
  } 
};

/**
 * Оплачиваем заказ и замораживаем объект
 */
Order.prototype.payOrder = function() {
  this.payment = true;
  Object.freeze(this.mealsList);
};


/*ПРИМЕР ЗАКАЗА*/
//создаем заказ
let order = new Order();
//создаем большой гамбургер с сыром
let bigHamburger = new Hamburger(Hamburger.SIZE_BIG, 'cheese');
//добавляем в гамбургер салат
bigHamburger.changeStuffing('salad', 100);
//добавляем гамбургер в наш заказ
order.addOrder(bigHamburger);
//создаем колу
let cola = new Drink(Drink.COLA);
//добавляем колу в заказ
order.addOrder(cola);
//создаем салат на 100 гр
let salad = new Salad(Salad.CAESAR, 100);
//меняем вес салата на 200 гр
salad.changeSaladWeight(200);
//добавляем салат в заказ
order.addOrder(salad);
//выводим в консоль наш заказ
console.log(order.getMealsList());
//выводим в консоль стоимость заказа
console.log(order.getOrderPrice());
//выводим в консоль калорийность заказа
console.log(order.getOrderCalories());
//оплачиваем заказ
order.payOrder();

