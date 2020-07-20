let main = document.querySelector('main');
let voicesSelect = document.getElementById('voices');
let textarea = document.getElementById('text');
let readBtn = document.getElementById('read');
let toggleBtn = document.getElementById('toggle');
let closeBtn = document.getElementById('close');

let data = [
	{
	  image: './img/drink.jpg',
	  text: "I'm Thirsty"
	},
	{
	  image: './img/food.jpg',
	  text: "I'm Hungry"
	},
	{
	  image: './img/tired.jpg',
	  text: "I'm Tired"
	},
	{
	  image: './img/hurt.jpg',
	  text: "I'm Hurt"
	},
	{
	  image: './img/happy.jpg',
	  text: "I'm Happy"
	},
	{
	  image: './img/angry.jpg',
	  text: "I'm Angry"
	},
	{
	  image: './img/sad.jpg',
	  text: "I'm Sad"
	},
	{
	  image: './img/scared.jpg',
	  text: "I'm Scared"
	},
	{
	  image: './img/outside.jpg',
	  text: 'I Want To Go Outside'
	},
	{
	  image: './img/home.jpg',
	  text: 'I Want To Go Home'
	},
	{
	  image: './img/school.jpg',
	  text: 'I Want To Go To School'
	},
	{
	  image: './img/grandma.jpg',
	  text: 'I Want To Go To Grandmas'
	}
];

data.forEach(createBox)
//
function createBox(item){
	let box = document.createElement('div');
	let {image, text} = item;
	
	box.classList.add('box');
	box.innerHTML = `
	<img src="${image}" alt="${text}" />
	<p class="info">${text}</p>
	`;
	
	box.addEventListener('click', () => {
		setTextMessage(text);
		speakText();
		
		box.classList.add('active');
		setTimeout(() => {
			box.classList.remove('active')
		}, 800)
	})
	
	main.appendChild(box)
}

//HTML5语音合成API
/* 
text – 要合成的文字内容，字符串。
lang – 使用的语言，字符串， 例如："zh-cn"
voiceURI – 指定希望使用的声音和服务，字符串。
volume – 声音的音量，区间范围是0到1，默认是1。
rate – 语速，数值，默认值是1，范围是0.1到10，表示语速的倍数，例如2表示正常语速的两倍。
pitch – 表示说话的音高，数值，范围从0（最小）到2（最大）。默认值为1
*/
let message = new SpeechSynthesisUtterance()

let voices = [];

function getVoices(){
	//当由SpeechSynthesis.getVoices()方法返回的SpeechSynthesisVoice列表改变时触发。
	//网页语音 API 的SpeechSynthesis 接口是语音服务的控制接口；它可以用于获取设备上关于可用的合成声音的信息，开始、暂停语音，或除此之外的其他命令
	voices = speechSynthesis.getVoices();
	
	//设置语言 --- lang
	voices.forEach(voice => {
		let option = document.createElement('option');
		option.value = voice.name;
		option.innerText = `${voice.name} ${voice.lang}`;
		
		voicesSelect.appendChild(option)
	})
}

//设置读的文本
function setTextMessage(text){
	message.text = text
}

//读
function speakText(){
	// console.log(message)
	speechSynthesis.speak(message);
}

//设置选择读的语言
function setVoice(e){
	message.voice = voices.find(voice => voice.name === e.target.value)
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () => {
	document.getElementById('text-box').classList.toggle('show');
})

closeBtn.addEventListener('click', () => {
	document.getElementById('text-box').classList.remove('show');
})

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
	setTextMessage(textarea.value);
	speakText()
})


getVoices()



