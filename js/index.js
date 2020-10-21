onload = () => {
    const doc = document;
    const input = doc.getElementById('email-input');
    input.addEventListener('focus', (e) => {
        let i = 0;
        keyEvent(i);
        input.addEventListener('keyup', (e) => {
            eventFunc(e);
            const lisLen = doc.querySelectorAll('li').length;
            if (event.keyCode === 40) {
                if (i === lisLen - 1) {
                    i = 0;
                } else {
                    ++i;
                }
            }
            else if (event.keyCode === 38) {
                if (i === 0) {
                    i = lisLen - 1;
                } else {
                    --i;
                }
            }
            else if (event.keyCode === 13) {
                if (input.value !== '') {
                    const text = doc.getElementsByTagName('li')[i].textContent;
                    input.value = text;
                    i = 0;
                    hiddenUl();
                }
            } else if (event.keyCode === 27) {
                e.target.select();
            } else {
                i = 0;
            }
            keyEvent(i);
        });
    });
    input.addEventListener('blur', (e) => {
        const lis = doc.querySelectorAll('li');
        for (let i = 0; i < lis.length; i++) {
            lis[i].setAttribute('class', '');
        }
    });
    const ul = doc.querySelector('ul');
    ul.addEventListener('click', (e) => {
        const text = e.target.textContent;
        input.value = text;
        hiddenUl();
        fc();
    });
    fc();
}
function eventFunc(e) {
    const inputValue = getInputValue(e.target);
    const trueOrFalse = isNull(inputValue);
    if (trueOrFalse) {

        const f = writeContent(inputValue);
        showUl(f);
    } else {
        hiddenUl();
    }
}
/*
获取输入的内容，并且去除内容去后的空格
*/
function getInputValue(element) {
    const inputText = element.value;
    return inputText.trim();
}
/*
判断字符串是否为空
*/
function isNull(str) {
    if (str) {
        return true;
    } else {
        return false;
    }
}
/*
先调用hiddenUl()方法，避免节点重复添加
传入一个包含li子节点的虚拟节点，然后装入ul中
*/
function showUl(content) {
    hiddenUl();
    const doc = document;
    const ul = doc.querySelector('ul');
    ul.appendChild(content);
}
/*
传入字符串，连接后缀，装入虚拟节点中
*/
function writeContent(str) {
    const postfixLists = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
    const afterString = afterSymbol(str);
    const len = afterString.length;
    str = beforeSymbol(str);
    if (Boolean(afterString)) {
        for (let i = postfixLists.length - 1; i >= 0; i--) {
            if (postfixLists[i].slice(0, afterString.length) !== afterString) {
                postfixLists.splice(i, 1);
            }
        }
    }
    // console.log(afterString);
    const doc = document;
    const ul = doc.querySelector('ul');
    const f = doc.createDocumentFragment();
    for (const postfixList of postfixLists) {
        const li = doc.createElement('li');
        li.textContent = str + '@' + postfixList;
        f.appendChild(li);
    }
    return f;
}
/*
将ul中子节点情况，亦达到隐藏提示框效果
*/
function hiddenUl() {
    const doc = document;
    const ul = doc.querySelector('ul');
    ul.textContent = '';
}
/*
截取 @ 符号之前的字符串
*/
function beforeSymbol(str) {
    const i = str.indexOf('@');
    if (i === -1) {
        return str;
    } else {
        return str.slice(0, i);
    }
}
/*
截取 @ 符号之后的字符串
*/
function afterSymbol(str) {
    const i = str.indexOf('@');
    if (i === -1) {
        return '';
    } else {
        return str.slice(i + 1);
    }
}
/*
设置对应li的class属性
*/
function keyEvent(num) {
    const doc = document;
    const lis = doc.querySelectorAll('li');
    for (let i = 0; i < lis.length; i++) {
        if (num === i) {
            lis[i].setAttribute('class', 'select');
        } else {
            lis[i].setAttribute('class', '');
        }
    }
}
/*
聚焦
*/
function fc() {
    const input = document.querySelector('input');
    input.focus();
}