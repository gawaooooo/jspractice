//4.1
//
//�A���`�p�^�[��
var add = new Function('a', 'b', 'return a + b');
add(1, 2); // 3���Ԃ�

// 4.1.1 �p��̐���

// ���O�t���֐���
var add = function add(a, b) {
	return a + b;
};

// �����֐�
var add = function(a, b) {
	return a + b;
};

// 4.1.2 �錾�Ǝ��F���O�Ɗ����グ
// ����͊֐���
callMe(function() {
});

// ���O�t���֐���
callMe(function me() {
});

// ������֐���
var myObject = {
	say: function() {
	}
};

// �O���[�o���X�R�[�v
function foo() {};

function local() {
	// ���[�J���X�R�[�v
	function bar() {}
	return bar;
}

// 4.1.3 �֐���name�v���p�e�B
function foo() {}// �֐��錾
var bar = function() {}; // (���O�Ȃ�)�֐���
var baz = function baz() {}; // ���O�t���֐���

console.log(foo.name);
console.log(bar.name);
console.log(baz.name);

// 4.1.4 �֐��̊����グ
// �A���`�p�^�[��

// �O���[�o���ϐ�
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

	// �֐��錾
	// �ϐ�foo�Ƃ��̎����������グ����
	function foo() {
		alert('local foo');
	}

	// �֐���
	// �ϐ� bar�����������グ����
	// �����͊����グ���Ȃ�
	var bar = function() {
		alert('local bar');
	};
}
hoistMe();


