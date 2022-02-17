//"use strict"
let attr = document.getElementsByTagName("attr");
let qoute = document.getElementsByTagName("qoute");
let comment = document.getElementsByTagName("comment");
let defined = document.getElementsByTagName("define")
let _js = document.getElementsByTagName("js");
let _css = document.getElementsByTagName("css");
let _reg = document.getElementsByTagName("regex");
let bracket = document.getElementsByTagName("bracket");
let not = document.getElementsByTagName("not");
let _value = document.getElementsByTagName("value");
function highlight(inputX, inputX_1, options) {
 let modeArray = ["plain/css", "plain/javascript", "plain/html"];
 //adding text inside inputX_1
 inputX_1.innerText = inputX.value;
 inputX_1.innerHTML = inputX_1.innerHTML.replace(/(\s)/g, ` `).replace(/<br>/g, `\n`);
 inputX_1.insertAdjacentHTML("beforeend", "\n");
 
 //highlight Sections...

 const tokenjs = {
  comments : {
   html : new RegExp(/(&lt;!--([\w\d\n\W\s]*?)--&gt;|&lt;!--(.*)+)/, "g"),
   css : new RegExp(/(\/\*([\w\s\n\d\W]*?)\*\/|\/\*([\w\s\n\W\d]*)+)/, "g"),
   js : [new RegExp(/(\/\/(.*)(?=\n))/, "g"), new RegExp(/(\/\*([\w\s\d\n\W]*?)\*\/(?!\s.*?\s*?\*\/)|\/\*([\w\d\n\W\s]*?)+)/, "g")]
  },
  modeHtml: {
   attr : new RegExp(/(&lt;[^!](.*?)&gt;|&lt;[^!](.*?)+)/, "g"),
   tag : new RegExp(/(?<=&lt;|&lt;\/)([\w\d\-]+)/, "g"),
   qoute : new RegExp(/("(.*?)"|'(.*?)'|"(.*?)+|'(.*?)+)/, "g"),
   inlineqoute : new RegExp(/((?<=\=)(.*?))(?=["']|\s.*?\/&gt;|\s.*?&gt;|\/&gt;|&gt;)/, "g"),
   doc : new RegExp(/(&lt;!doctype\s.*?&gt;)/, "i"),
   js : new RegExp(/(&lt;script&gt;|&lt;script\s.*?&gt;)([\w\d\s\n\W]*?)(&lt;\/script&gt;)/, "gi"),
   noClosejs : new RegExp(/(&lt;script&gt;|&lt;script\s.*?&gt;)([\w\s\n\d\W]*)/, "g"),
   css : new RegExp(/(&lt;style&gt;)([\w\d\s\n\W]*?)(&lt;\/style&gt;)/, "g"),
   noClosecss : new RegExp(/(&lt;style&gt;)([\w\d\s\n\W]*)/, "g"),
  },
  modeJs : {
   qoute : new RegExp(/("(.*?)"|'(.*?)'|"(.*?)+|'(.*?)+)/, "g"),
   keywords : new RegExp(/(?<!\w|\d|[$_])(constructor|do|while|for|if|else|throw|then|try|function|finally|this|catch|break|continue|switch|case|default|export|import|from|as|of|in|class|new|const|let|var|return|await|async|implements|protected|static|yeild|public|debugger|enum|null|undefined|void|package|super|delete|extends|interface|private|with|get|set)(?!\w|\d|[$_])/, "g"),
   type : new RegExp(/(true|false|undefined|null|event)/, "g"),
   number : new RegExp(/(?<![\w$_])(\d+)(?![\w$_])/, "g"),
   def : new RegExp(/(?<=function\s)(.*?)(?=\(|\n)/, "g"),
   regex : new RegExp(/((?<!["'{}\w<>]\s*?|\/|\\\s*?|\*\s*?|&lt;\s*?)\/(.*)((?<!\\|\\\/|<)\/)[sgmiy]*)(?=[,;]|)/, "g"),
   tic : new RegExp(/(\`([\w\n\s\W\d]*?)\`)/, "gs"),
   cfh: new RegExp(/(\$\{([\w\s\n\W\d]*?)\}|\$\{([\w\s\n\W\d]*)+)/, "g"),
  },
  
  
  modeCss : {
   bracket : new RegExp(/(\{([\w\d\n\W\s]*?[^\{]+\B)\}|\{([\w\s\W\n\d]*)+)/, "g"),
   brValue : new RegExp(/(?<!&gt;)([a-zA-Z\-]*)(?=\:)/, "g"),
   number : new RegExp(/(?<![a-zA-Z])([.+-]?\d+[a-z%.]*)/, "g"),
   at_ : new RegExp(/(@[\w-]+)/, "g"),
   _string_ : new RegExp(/(?<!\w|\d)(\-[\w]+\-)/, "g"),
   value : new RegExp(/(?<=\:)([\w\s\d\n\W]*?)(?=\;|\n+|\})/, "g"),
   closeParam : new RegExp(/(\(|\)|\,)/, "g"),
  },
  fixedBreak : new RegExp(/(<[^br](.*?)>)/, "g"),
 };
 if(options.mode === modeArray[2]) {
 let main = inputX_1.innerHTML;
 main = main.replace(tokenjs.modeHtml.noClosecss, `<attr>$1</attr><css>$2</css>`);
 main = main.replace(tokenjs.modeHtml.css, `<attr>$1</attr><css>$2</css><attr>$3</attr>`);
 main = main.replace(tokenjs.modeHtml.noClosejs, `<attr>$1</attr><js>$2</js>`);
 main = main.replace(tokenjs.modeHtml.js, `<attr>$1</attr><js>$2</js><attr>$3</attr>`);
 main = main.replace(tokenjs.modeHtml.doc, `<build>$1</build>`);
  main = main.replace(tokenjs.modeHtml.attr, `<attr>$1</attr>`);
  main = main.replace(tokenjs.comments.html, `<comment>$1</comment>`);
 inputX_1.innerHTML = main;
 for(let a = 0; a < attr.length; a++) {
  let str1 = attr[a].innerHTML;
  str1 = str1.replace(tokenjs.fixedBreak, ``);
  str1 = str1.replace(tokenjs.modeHtml.tag, `<tag>$1</tag>`);
  str1 = str1.replace(tokenjs.modeHtml.inlineqoute, `<qoute>$1</qoute>`);
   str1 = str1.replace(tokenjs.modeHtml.qoute, `<qoute>$1</qoute>`);
   str1 = str1.replace(/(&lt;\/|&lt;|\/&gt;|&gt;|\=)/g, `<close>$1</close>`);
  attr[a].innerHTML = str1;
 }
  for(let j = 0; j < _js.length; j++) {
   let str4 = _js[j].innerHTML;
   str4 = str4.replace(/(<[^br](.*?)>)/g, ``);
   str4 = str4.replace(tokenjs.modeJs.def, "<define>$1</define>");
   str4 = str4.replace(tokenjs.modeJs.keywords, `<keyword>$1</keyword>`);
   str4 = str4.replace(tokenjs.modeJs.number, `<numberbasic>$1</numberbasic>`);
   str4 = str4.replace(tokenjs.modeJs.qoute, `<qoute>$1</qoute>`);
   str4 = str4.replace(tokenjs.modeJs.tic, `<not>$1</not>`)
   str4 = str4.replace(tokenjs.comments.js[0], `<comment>$1</comment>`);
   str4 = str4.replace(tokenjs.comments.js[1], `<comment>$1</comment>`);
   str4 = str4.replace(tokenjs.modeJs.regex, `<regex>$1</regex>`);
   _js[j].innerHTML = str4;
 }
 for(let c = 0; c < _css.length; c++) {
  let cssStr = _css[c].innerHTML;
  cssStr = cssStr.replace(/<(.*?)>/g, ``);
  cssStr = cssStr.replace(tokenjs.modeCss.bracket, `<bracket>$1</bracket>`);
  cssStr = cssStr.replace(tokenjs.modeCss._string_, `<type1>$1</type1>`);
  cssStr = cssStr.replace(tokenjs.modeCss.number, `<numberBasic>$1</numberBasic>`);
  cssStr = cssStr.replace(tokenjs.modeCss.at_, `<at>$1</at>`);
  cssStr = cssStr.replace(tokenjs.modeHtml.qoute, `<qoute>$1</qoute>`);
  cssStr = cssStr.replace(tokenjs.comments.css, `<comment>$1</comment>`);
  _css[c].innerHTML = cssStr;
 }
 }
 if(options.mode === "plain/css") {
   let CssStr1 = inputX_1.innerHTML;
   CssStr1 = CssStr1.replace(/<(.*?)>/g, ``);
   CssStr1 = CssStr1.replace(tokenjs.modeHtml.qoute, `<qoute>$1</qoute>`);
  if(CssStr1.match(/(?<!<(.*?)>)(\{|\})/)) {
  CssStr1 = CssStr1.replace(tokenjs.modeCss.bracket, `<bracket>$1</bracket>`);
  }
  CssStr1 = CssStr1.replace(tokenjs.modeCss._string_, `<type1>$1</type1>`);
  CssStr1 = CssStr1.replace(tokenjs.modeCss.number, `<numberBasic>$1</numberBasic>`);
  CssStr1 = CssStr1.replace(tokenjs.modeCss.at_, `<at>$1</at>`);
  CssStr1 = CssStr1.replace(tokenjs.comments.css, `<comment>$1</comment>`);
  inputX_1.innerHTML = CssStr1;
 }
 if(options.mode === "plain/javascript") {
   let JsStr1 = inputX_1.innerHTML;
   JsStr1 = JsStr1.replace(/(<[^br](.*?)>)/g, ``);
   JsStr1 = JsStr1.replace(tokenjs.modeJs.def, "<define>$1</define>");
   JsStr1 = JsStr1.replace(tokenjs.modeJs.keywords, `<keyword>$1</keyword>`);
   JsStr1 = JsStr1.replace(tokenjs.modeJs.number, `<numberbasic>$1</numberbasic>`);
   JsStr1 = JsStr1.replace(tokenjs.modeJs.qoute, `<qoute>$1</qoute>`);
   JsStr1 = JsStr1.replace(tokenjs.modeJs.tic, `<not>$1</not>`);
   JsStr1 = JsStr1.replace(tokenjs.comments.js[0], `<comment>$1</comment>`);
   JsStr1 = JsStr1.replace(tokenjs.comments.js[1], `<comment>$1</comment>`);
   JsStr1= JsStr1.replace(tokenjs.modeJs.regex, `<regex>$1</regex>`);
  inputX_1.innerHTML = JsStr1;
 }
 for(let b = 0; b < bracket.length; b++) {
  let brckt = bracket[b].innerHTML;
  brckt = brckt.replace(/<(.*?)>/g, ``);
  brckt = brckt.replace(tokenjs.modeHtml.qoute, `<qoute>$1</qoute>`);
  brckt = brckt.replace(tokenjs.modeCss.number, `<numberBasic>$1</numberBasic>`);
  brckt = brckt.replace(tokenjs.modeCss.value, `<value>$1</value>`);
  brckt = brckt.replace(tokenjs.modeCss._string_, `<type1>$1</type1>`);
  brckt = brckt.replace(tokenjs.modeCss.brValue, `<property>$1</property>`);
  brckt = brckt.replace(tokenjs.comments.css, `<comment>$1</comment>`)
  bracket[b].innerHTML = brckt;
 }
 //.....
 for(let q = 0; q < qoute.length; q++) {
   let str2 = qoute[q].innerHTML;
   str2 = str2.replace(/(<(.*?)>)/g, ``);
   qoute[q].innerHTML = str2;
 }
 for(let c = 0; c < comment.length; c++) {
   let str3 = comment[c].innerHTML;
   str3 = str3.replace(/(<(.*?)>)/g, ``);
   comment[c].innerHTML = str3;
 }
 for(let r = 0; r < _reg.length; r++) {
  let regStr = _reg[r].innerHTML;
  regStr = regStr.replace(/<(.*?)>/g, ``);
  regStr = regStr.replace(/(\\[a-zA-Z"']|\\\/|["'])/g, `<rg>$1</rg>`);
  regStr = regStr.replace(/(?<!&lt;)(^\/|\/$|\/(?=[gmiys]+))/g, `<ednreg>$1</ednreg>`);
  _reg[r].innerHTML = regStr;
 }
 for(let n = 0; n < not.length; n++) {
  let notation = not[n].innerHTML;
  notation = notation.replace(/<(.*?)>/g, ``);
  notation = notation.replace(tokenjs.modeJs.cfh, `<u_>$1</u_>`)
  not[n].innerHTML = notation;
 }
 for(let v = 0; v < _value.length; v++) {
  let vstr = _value[v].innerHTML;
  vstr = vstr.replace(tokenjs.modeCss.closeParam,  `<paran>$1</paran>`);
  _value[v].innerHTML = vstr;
 }
  console.log(inputX_1.innerHTML)
}


function insertText(txt1, txt2, container, options) {
 txt1.addEventListener("keyup", function(event) {
  new highlight(txt1, txt2, options);
 });
 txt1.addEventListener("paste", function() {
   txt2.innerText = txt1.value;
   new highlight(txt1, txt2, options);
 });
 container.addEventListener("click", function() {
  txt1.focus();
 })
} 
function BasicEditorJs(container, options) {
 if(container === "" || container === null || container === undefined) {
  console.error(`no container found at ${container.constrcutor}`)
   return false;
 }
 this.name = container.className || container.id;
 if(this.name === container.className) this.name = `.${this.name}`;
 if(this.name === container.id) this.name = `#${this.name}`;
 console.log(this.name)
 container.innerHTML = `
  <div class="codeEditor">
   <pre><textarea class="cursor input"></textarea><code class="syntax input" contenteditable></code></pre>
  </div>
 `;
 this.options = options;
 this.text = document.querySelector(`${this.name} .codeEditor pre .cursor`);
 this.syntax = document.querySelector(`${this.name} .codeEditor pre .syntax`);
 this.container = document.querySelector(`${this.name} .codeEditor`);
 this.Pre = document.querySelector(`${this.name} .codeEditor pre`);
 this.size = {
  width : parseInt(getComputedStyle(this.container, null).getPropertyValue("width")),
  height : parseInt(getComputedStyle(this.container, null).getPropertyValue("height"))
 };
 this.Pre.style.width = `${this.size.width}px`;
  if(this.options.value !== null || this.options.value !== undefined) this.text.value = this.options.value;
  if(this.options.editable === false) this.text.disabled = "disabled";
  this.text.placeholder = this.options.placeholder;
  if(this.options.placeholder === null || this.options.placeholder === undefined || this.options.placeholder === "") this.text.placeholder = "";
  
  new insertText(this.text, this.syntax, this.container, this.options);
 new highlight(this.text, this.syntax, this.options)
} 
let txt = `code is awesome.`;
let html = new BasicEditorJs(document.querySelector("#html-editor"), {
 value : txt,
 mode : "plain/html",
 editable : true
});
