// JSONパーサ

var json_parse = function() {
	// JSONをパースして、JavaScriptのデータ構造を生成する関数
	// これはシンプルな再帰下降パーサ

	// グローバル変数を生成することを避けるため、この関数はほかの関数の中で定義される

	var at, // 現在の文字のインデックス値
		ch, // 現在の文字
		escapee = {
			'"': '"',
			'\\': '\\',
			'/': '/',
			b: 'b',
			f: '\f',
			n: '\n',
			r: '\r',
			t: '\t'
		},
		text, 

		error = function(m) {
			// 何か問題が発生した場合にはerrorが呼び出される
			throw {
				name: 'SyntaxError',
				message: m,
				at: at,
				text: text
			};
		},

		next = function(c) {
			// もしパラメータcが指定されていたら、それが現在の文字にマッチするかを調べる
			if(c && c !== ch) {
				error("Expected '" + c + "' insted of '" + ch + "'");
			}

			// 次の文字を取得する。もしそれ以上文字がなかったら、空文字を返す
			ch = text.charAt(at);
			at += 1;
			return ch;
		},

		number = function() {
			// 数値を解析する
			var number,
				string = '';

			if (ch === '-') {
				string = '-';
				next('-');
			}
			while (ch >= '0' && ch <= '9') {
				string += ch;
				next();
			}
			if (ch === '.') {
				string += '.';
				while (next() && ch >= '0' && ch <= '9') {
					string += ch;
				}
			}
			if (ch === 'e' || ch === 'E') {
				string += ch;
				next();
				if (ch === '-' || ch === '+') {
					string += ch;
					next();
				}
				while (ch >= '0' && ch <= '9') {
					string += ch;
					next();
				}
			}
			number = +string;
			if(isNaN(number)) {
				error("Bad number");
			} else {
				return number;
			}
		},

		string = function() {
			// 文字列を解析する
			var hex,
				i,
				string = '',
				ufff;

			// 文字列を解析している場合には、"と\という文字を探す必要がある
			if(ch === '"') {
				while(next()) {
					if(ch === '"') {
						next();
						return string;
					} else if(ch === '\\') {
						next();
						if(ch === 'u') {
							ufff = 0;
							for(i = 0; i < 4; i += 1) {
								hex = parseInt(next(), 16);
								if(!isFinite(hex)) {
									break;
								}
								ufff = ufff * 16 + hex;
							}
							string += String.fromCharCode(ufff);
						} else if(typeof escapee[ch] === 'string') {
							string += escapee[ch];
						} else {
							break;
						}
					} else {
						string += ch;
					}
				}
			}
			error("Bad string");
		},

		white = function() {
			// ホワイトスペースを虫
			while(ch && ch <= ' ') {
				next();	
			}
		},

		word = function() {
			// true, false, null を処理
			switch(ch) {
				case 't':
					next('t');
					next('r');
					next('u');
					next('e');
					return true;
				case 'f':
					next('f');
					next('a');
					next('l');
					next('s');
					next('e');
					return false;
				case 'n':
					next('n');
					next('u');
					next('l');
					next('l');
					return null;
			}
			error("Unexpected '" + ch + "'");
		},

		value, // value関数の格納場所

		array = function() {
			// 配列を解析する
			var array = [];

			if(ch === '[') {
				next('[');
				white();
				if(ch === ']') {
					next(']');
					return array; // 空の配列
				}
				while(ch) {
					array.push(value());
					white();
					if(ch === ']') {
						next(']');
						return array;
					}
					next(',');
					white();
				}
			}
			error("Bad array");
		},

		object = function() {
			// オブジェクトを解析する
			var key,
				object = {};

			if(ch === '{') {
				next('{');
				white();
				if(ch === '}') {
					next('}');
					return object; // 空のオブジェクト
				}
				while(ch) {
					key = string();
					white();
					next(':');
					object[key] = value();
					white();
					if(ch === '}') {
						next('}');
						return object;
					}
					next(',');
					white();
				}
			}
			error("Bad object");
		};

		value = function() {
			// JSONの値を解析する。その値は、オブジェクト、配列、文字列、数値、もしくは単語である
			white();
			switch(ch) {
				case '{':
					return object();
				case '[':
					return array();
				case '"':
					return string();
				case '-':
					return number();
				default: 
					return ch >= '0' && ch <= '9' ? number() : word();
			}
		};
		// json_parse関数を返す。これは上記のすべての関数と変数にアクセスできる
		return function(source, reviver) {
			var result;

			text = source;
			at = 0;
			ch = ' ';
			result = value();
			white();
			if(ch) {
				error("Syntax error");
			}

			// reviver関数が存在したら、新しい構造を再帰的に処理して
			// すべての名前と値のペアをreviver関数に渡して、変換処理を行う。
			// 処理は結果を空のキーとして保存しているテンポラリオブジェクトから開始される。
			// もしreviver関数がない場合は、単にresultを返す
			return typeof reviver === 'function' ? 
				function walk(holder, key) {
					var k, v, value = holder[key];
					if(value && typeof value === 'object') {
						for(k in value) {
							if(Object.hasOwnProperty.call(value, k)) {
								v = walk(value, k);
								if(v !== undefined) {
									value[k] = v;
								} else {
									delete value[k];
								}
							}
						}
					}
					return reviver.call(holder, key, value);
				}({'': result}, '') : result;
		};
}();
