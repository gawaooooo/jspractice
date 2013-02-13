// 4.2 関数リテラル

// addという変数を定義し、2つの値を加算する関数を格納する
var add = function(a, b) {
	return a + b;
};

// 4.3.1 メソッドの呼び出しパターン
var myObject = {
	value: 0,
	increment: function(inc) {
		this.value += typeof inc === 'number' ? inc : 1;
	}
};