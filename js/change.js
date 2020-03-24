'use strict';

const table = [...'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'];
const s = [11, 10, 3, 8, 4, 6];
const xor = 177451812;
const add = 8728348608;

let flag = false;
let ans;

function av2bv(av) {
	if (!av.substr(2).match(/^[1-9]\d*$/)) {
		document.getElementById("info").innerHTML = "oh，你的输入好像有点问题";
		flag = false;
		return '';
	};
	let num = parseInt(av.substr(2));
	num = (num ^ xor) + add;
	let result = [...'BV1  4 1 7  '];
	for (let i = 0; i < 6; i++) {
		result[s[i]] = table[Math.floor(num / 58 ** i) % 58];
	}
	document.getElementById("info").innerHTML = "已成功将av号转为bv号";
	flag = true;
	return result.join('');
};

function bv2av(bv){
	let str = bv;
	if (!str.match(/[Bb][Vv][fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF]{10}/gu)) {
		document.getElementById("info").innerHTML = "oh，你的输入好像有点问题";
		flag = false;
		return '';
	};
	let result = 0;
	for (let i = 0; i < 6; i++) {
		result += table.indexOf(str[s[i]]) * 58 ** i;
	};
	document.getElementById("info").innerHTML = "已成功将bv号转为av号";
	flag = true;
	return "av" + (result - add ^ xor);
};

function change() {
	let vid = document.getElementById("videoid").value;
	document.getElementById("changeid").value = "";
	let head = vid.substr(0, 2);

	if (head == "av" || head == "AV" || head == "aV" || head == "Av") {
		ans = av2bv(vid);
		document.getElementById("changeid").value = ans;
	} else if (head == "bv" || head == "BV" || head == "bV" || head == "Bv") {
		ans = bv2av(vid);
		document.getElementById("changeid").value = ans;
	} else {
		document.getElementById("info").innerHTML = "oh，你的输入好像有点问题QAQ";
		flag = false;
	}
}

function jump() {
	change();
	if (flag) {
		window.open("https://www.bilibili.com/video/" + ans);
	}
	else {
		document.getElementById("info").innerHTML = "这个编号有些问题，所以不能打开QAQ";
	}
}