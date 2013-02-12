// 4.2 コールバックパターン

function writeCode(callback) {
	// 何か処理する
	callback();
}

function introduceBugs() {
	// バグを作る
}

writeCode(introduceBugs);

// 4.2.1 コールバックの例
var findNodes = function() {
	var i = 100000, // 果てしないループ
		nodes = [], // ここに結果を格納
		found; // 次のノード
	while(i) {
		i -= 1;
		// 複雑なロジック
		nodes.push(found);
	}
	return nodes;
}

var hide = function(nodes) {
	var i = 0, max = nodes.length;
	for(; i < max; i += 1) {
		nodes[i].style.display = "none";
	}
};

// この関数を実行
hide(findNodes());

// コールバックを受け付けるようにfindNodes()をリファクタリング
var findNodes = function(callback) {
	var i = 100000,
		nodes = [],
		found;

	// callbackが呼び出しできるか検査
	if(typeof callback !== "function") {
		callback = false;
	}
	while(i) {
		i -= 1;
		// 複雑なロジック・・・

		// ここでコールバック
		if(callback) {
			callback(found);
		}

		nodes.push(found);
	}
	return nodes;
};

// コールバック関数
var hide = funcion(node) {
	node.style.display = "none";
};

// ノードを見つけたら隠す
findNodes(hide);


// 無名コールバックを渡す
findNodes(function(node) {
	node.style.display = "block";
});


// 4.2.2 コールバックとスコープ
var myapp = {};
myapp.color = "green";
myapp.paint = function(node) {
	node.style.color = this.color;
};

var findNodes = function(callback) {
	if(typeof callback === "function") {
		callback(found);
	}
};

