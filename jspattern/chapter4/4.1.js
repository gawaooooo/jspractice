//4.1
//
//アンチパターン
var add = new Function('a', 'b', 'return a + b');
add(1, 2); // 3が返る

// 4.1.1 用語の整理

// 名前付き関数式
var add = function add(a, b) {
	return a + b;
};

// 無名関数
var add = function(a, b) {
	return a + b;
};

// 4.1.2 宣言と式：名前と巻き上げ
// これは関数式
callMe(function() {
});

// 名前付き関数式
callMe(function me() {
});

// これも関数式
var myObject = {
	say: function() {
	}
};

// グローバルスコープ
function foo() {};

function local() {
	// ローカルスコープ
	function bar() {}
	return bar;
}

// 4.1.3 関数のnameプロパティ
function foo() {}// 関数宣言
var bar = function() {}; // (名前なし)関数式
var baz = function baz() {}; // 名前付き関数式

console.log(foo.name);
console.log(bar.name);
console.log(baz.name);

// 4.1.4 関数の巻き上げ
// アンチパターン

// グローバル変数
function foo() {
	alert('global foo');
}
function bar() {
	alert('global bar');
}

function hoistMe() {
	console.log(typeof foo); // function
	console.log(typeof bar); // undefined

	foo(); // local foo
	bar(); // typeerror

	// 関数宣言
	// 変数fooとその実装が巻き上げられる
	function foo() {
		alert('local foo');
	}

	// 関数式
	// 変数 barだけが巻き上げられる
	// 実装は巻き上げられない
	var bar = function() {
		alert('local bar');
	};
}
hoistMe();


