let form = document.getElementById('form');
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');


//展示错误信息
function showError(input,message) {
	let formControl = input.parentElement;
	formControl.className = 'form-control error';
	let small = formControl.querySelector('small');
	small.innerText = message
}

//验证正确
function showSuccess(input){
	let formControl = input.parentElement;
	formControl.className = 'form-control success';
}

//验证邮箱
function checkEmail(input){
	let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(reg.test(input.value.trim())){
		showSuccess(input)
	}else{
		showError(input, '邮箱不正确！')
	}
}

// 获取输入框对应的标题
function getFieldName(input) {
  return input.dataset.fieldname;
}

//验证必填字段
function checkRequired(inputArr){
	inputArr.forEach((input) => {
		if(input.value.trim() === ''){
			showError(input, `${getFieldName(input)} 不能为空`)
		}else{
			showSuccess(input)
		}
	})
}

//验证输入的长度
function checkLength(input, min, max){
	if(input.value.length < min){
		showError(input, `${getFieldName(input)}最少${min}个字符`)
	}else if(input.value.length > max){
		showError(input, `${getFieldName(input)}最多${max}个字符`)
	}else{
		showSuccess(input)
	}
}

//再次确认密码
function checkPasswordsMatch(input1, input2){
	if(input1.value !== input2.value){
		showError(input2, '密码不正确！')
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	
	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
	checkEmail(email);
	checkPasswordsMatch(password, password2);
})


