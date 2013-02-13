// 3.1 オブジェクトリテラル	
var empty_object = {};

var stooge = {
	"first-name": "Jerome",
	"last-name": "Howord"
};

var flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2013-02-11 21:15",
		city: "Chiba"
	},
	arrival: {
		IATA: "LAX",
		time: "2013-02-10 20:09",
		city: "Tokyo"
	}
};

// 3.2 値の取得
console.log(stooge["first-name"]);
console.log(flight.departure.IATA);
// 存在しないメンバを取得しようとした場合には、undefinedが返される
console.log(stooge["middle-name"]);
console.log(flight.status);
console.log(stooge["FIRST-NAME"]);

// ||演算子を使ってデフォルト値を設定することができる
var middle = stooge["middle-name"]	|| "(none)";
var status = flight.status || "unknown";

// undefinedに対して、さらにそのプロパティを取得しようとするとTypeError例外が投げられるので、&&演算子を利用することでそうした自体を避ける
console.log(flight.equipment);
// console.log(flight.equipment.model); // type error
console.log(flight.equipment && flight.equipment.model);

// 3.3 値の更新
stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';
flight.equipment = {
	model: 'Boeing 777'
};
flight.status = 'overdue';

// 3.4 参照
// オブジェクトは参照渡しが行われる。コピーされることはない
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;

// a, b, c はそれぞれ異なる空オブジェクトを参照している
var a = {}, b = {}, c = {};
// a, b, c はすべて同じ空オブジェクトを参照している
a = b = c = {};

// 3.5 プロトタイプ
if (typeof Object.create !== 'function') {
	Object.create = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}
var another_stooge = Object.create(stooge);
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

stooge.profession = 'actor';
console.log(another_stooge.profession);

// 3.6 リフレクション
console.log(typeof flight.number);
console.log(typeof flight.status);
console.log(typeof flight.arrival);
console.log(typeof flight.manifest);

console.log(typeof flight.toString);
console.log(typeof flight.constructor);

console.log(flight.hasOwnProperty('number'));
console.log(flight.hasOwnProperty('constructor'));

var name;
for(name in another_stooge) {
	if(typeof another_stooge[name] !== 'function') {
		document.writeln(name + ': ' + another_stooge[name]);
	}
}

var i;
var properties = [
	'first-name',
	'middle-name',
	'last-name',
	'profession'
];
for(i = 0; i < properties.length; i += 1) {
	document.writeln(properties[i] + ': ' + another_stooge[properties[i]]);
}

// プロパティの削除
// delete演算子
console.log(another_stooge.nickname);

// another_stoogeからnicknameプロパテイxが削除され、プロトタイプ上のnicknameプロパティが見えるようになる
delete another_stooge.nickname;
console.log(another_stooge.nickname);

// 3.9 グローバル領域の利用を減らす
// グローバル変数を最低限に利用する
var MYAPP = {};
MYAPP.stooge = {
	'first-name': 'Joe',
	'last-name': 'Howord'
};
MYAPP.flight = {
	airline: 'Oceanic',
	number: 815,
	departure: {
		IATA: 'SYD',
		time: '2013-02-11 22:00',
		city: 'Sydney'
	},
	arrival: {
		IATA: 'LAX',
		time: '2013-02-11 21:00',
		city: 'Los Angeles'
	}
};