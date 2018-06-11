/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA 
 * @param {*} objB 
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(objA, objB) {
    var stringObject = "object";
    // /* Ваше решение */
    if (isNaN(objA) && isNaN(objB) && String(objA) === "NaN" && String(objA) === "NaN") {
        return true;
    }
    if (Array.isArray(objA) && Array.isArray(objB)) {
        return Array(objA).join('') === Array(objB).join('');
    }
    if (typeof (objA) === stringObject && typeof (objB) === stringObject) {
        return compareObjects(objA, objB);
    }
    else {
        return objA === objB;
    }
}

function isDoubleRecurceLinkForObjects(objA, objB) {
    for (let i in objA) {
        if (objA[i] === objA) {
            for (let j in objB) {
                if (objB[j] === objB) {
                    return true;
                }
            }
        }
    }
    return false;
}

function getObjectWithoutRecurceLink(object) {
    for (let i in object) {
        if (object[i] === object) {
            delete object[i];
            return object;
        }
    }
}

function compareObjects(objA, objB) {
    var resultArray = [];
    var firstArrayKeys = Object.keys(objA);
    var secondArrayKeys = Object.keys(objB);
    var firstArrayValues = Object.values(objA);
    var secondArrayValues = Object.values(objB);
    if (isDoubleRecurceLinkForObjects(objA, objB)) {
        return isDeepEqual(getObjectWithoutRecurceLink(objA), getObjectWithoutRecurceLink(objB));
    } else {
        for (var i = 0; i < firstArrayKeys.length; i++) {
            if (secondArrayKeys.some(elem => elem === firstArrayKeys[i])) {
                resultArray.push(isDeepEqual(firstArrayValues[i], secondArrayValues[secondArrayKeys.indexOf(firstArrayKeys[i])]))
            } else {
                resultArray.push(false);
            }
        }
        return resultArray.every(elem => elem === true);
    }
}

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
const bind = (func, context) => {
    return function () {
        return func.apply(context, arguments);
    };
}

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */

Function.prototype.myBind = function (context) {
    var self = this;
    return function () {
        return self.apply(context, arguments);
    };
};

/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/
var o = {
    magicProperty: null,
    func: function () {
        var myDate = new Date();
        var time = `${myDate.getHours()} : ${myDate.getMinutes()} : ${myDate.getSeconds()}`;
        return console.log(`${this.magicProperty}   ${time}`);
    },
};

const checkmagicProperty = (() => {
    var oldValue = o.magicProperty;
    setInterval(function () {
        if (oldValue !== o.magicProperty) {
            o.func();
            oldValue = o.magicProperty;
        }
    }, 1000);
})();

/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function U() {
    this.askName = function () {
        this.name = prompt('How are you name?');
        return this;
    };
    this.askAge = function () {
        this.age = prompt('How are you old?');
        return this;
    };
    this.showAgeInConsole = function () {
        console.log(this.age);
        return this;
    }
    this.showNameInAlert = function () {
        alert(this.name);
        return this;
    }
}
var u = new U();
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */

function calculate(operator) {
    /* put your code here */
    return function (valueOne) {
        return function (valueTwo) {
            switch (operator) {
                case '+':
                    return valueOne + valueTwo;
                case '-':
                    return valueOne - valueTwo;
                case '*':
                    return valueOne * valueTwo;
                case '/':
                    return valueOne / valueTwo;
            }
        }
    }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
var Singleton = (function () {
    var instance;
    function Singleton() {
        if (instance) return instance;
        instance = this;
    }
    return Singleton;
})();

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */

function ForceContructor(a, b, c) {
    if (!(this instanceof ForceContructor)) return new ForceContructor(a, b, c);
    this.a = a;
    this.b = b;
    this.c = c;
}

/**
 * Написать фукнцию сумматор, которая будет работать 
 * var s = sum();
 * log(s); // 0
 * log(s(1)); // 1
 * log(s(1)(2)); //3
 * log(s(3)(4)(5)); // 12
 * Число вызовов может быть неограниченым
 */

function sum(a) {
    var currentSum = a ? a : 0;

    function s(b) {
        currentSum += b ? b : 0;
        return s;
    }

    s.toString = function () {
        return currentSum;
    };

    return s;
}

function log(x) {
    console.log(+x);
}

/**
 * Написать каррирующую функцию и покрыть ее тестами
 * Функция должна поддерживать каррирование функций с 2,3,4,5 параметрами
 * пример работы  функции
 * 
 * function target1(a,b,c,d) { return a + b + c + d }
 * function target2(a,b) { return a + b }
 * curry(target1)(1)(2)(3)(4) // 10
 * curry(target2)(5)(8) // 13
 * 
 * Примеры тестов смотреть в файле тестов
 * 
 * Читать
 * http://prgssr.ru/development/vvedenie-v-karrirovanie-v-javascript.html
 * @param {*} func 
 */
function curry(func) { }

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
/* Тут ваш код */
// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true

/*
Создать веб страницу. Добавить на нее форму с полями 
- имя (строкое поле), 
- родной город (Выпадающий список), 
- Комментарий (многострочное поле), пол (radiobutton). 
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой, 
после чего поля очистить.
*/

/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/


