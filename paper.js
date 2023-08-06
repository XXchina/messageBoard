(function () {
    //程序入口
    var init = function () {
        initEvent()
    }

    var zIndex = 1
    var contain = document.querySelector('.contain')
    var paperWidth = 160
    var paperHeight = 200
    var inp = document.querySelector('.inp')
    var vWidth = document.documentElement.clientWidth
    var vHeight = document.documentElement.clientHeight

    //创建一个数组，用来保存数据
    var arr = ['吉时吉日喜如风 ，丰年丰月如风筝', '万丈高楼平地起，辉煌只能靠自己', '新年快乐', '快乐连连，笑容甜甜，钱包圆圆', '2022，我们一起努力', '加油，相信自己']

    //事件入口
    var initEvent = function () {
        //拖拽事件
        window.addEventListener('mousedown', paperDrap)
        //添加愿望
        inp.addEventListener('keypress', addWish)
        //关闭事件
        window.addEventListener('mousedown', close)
        //窗口发生改变事件
        window.addEventListener('resize', changeSize)
        //窗口右键菜单事件
        window.addEventListener('contextmenu',function(e){
            // 阻止默认行为
            e.preventDefault()
        })
    }

    initPaper(arr)
    /**
     * 初始化
     */
    function initPaper(arr) {
        arr.forEach(function (item) {
            createWish(item)
        })
    }


    /**
     * 在页面中添加一个愿望
     */
    function addWish(e) {
        if (e.key !== 'Enter' || inp.value === '') {
            return
        }
        var words = inp.value
        createWish(words)
        inp.value = ''
    }

    /**
     * 创建一个愿望
     * @param {text} words 
     */
    function createWish(words) {
        var div = document.createElement('div')
        div.className = 'paper'
        div.innerHTML = `
        <p>${words}</p>
        <span class="close">X</span>
        `
        //颜色随机
        div.style.backgroundColor = `rgb(${getRandomNum(100,200)},${getRandomNum(100,200)},${getRandomNum(100,200)},1)`
        //位置随机
        var maxLeft = document.documentElement.clientWidth - paperWidth
        var maxTop = document.documentElement.clientHeight - paperHeight - 120
        div.style.left = `${getRandomNum(maxLeft,0)}px`
        div.style.top = `${getRandomNum(maxTop,0)}px`
        contain.appendChild(div)
        div.style.zIndex = zIndex
    }
    /**
     * 获取随机数
     */
    function getRandomNum(max, min) {
        return Math.floor(Math.random() * (max + 1 - min) + min)
    }

    /**
     * 拖拽
     * @param {event} e 
     */
    function paperDrap(e) {
        var div = getDiv(e.target)
        if (!div) {
            return
        }
        div.style.zIndex = zIndex
        zIndex++
        var styles = getComputedStyle(div)
        var divLeft = parseFloat(styles.left)
        var divTop = parseFloat(styles.top)
        window.onmousemove = function (e) {
            divLeft += e.movementX
            divTop += e.movementY
            if (divLeft < 0) {
                divLeft = 0;
            }
            if (divTop < 0) {
                divTop = 0;
            }
            if (divLeft > document.documentElement.clientWidth - paperWidth) {
                divLeft = document.documentElement.clientWidth - paperWidth
            }
            if (divTop > document.documentElement.clientHeight - paperHeight - 120) {
                divTop = document.documentElement.clientHeight - paperHeight - 120
            }
            div.style.left = divLeft + 'px'
            div.style.top = divTop + 'px'

        }
        window.onmouseup = window.onmouseleave = function () {
            window.onmousemove = null
        }
    }
    /**
     * 获取元素
     */
    function getDiv(dom) {
        if (dom.className === 'paper') {
            return dom
        }
        if (dom.parentElement && dom.parentElement.className === 'paper' && dom.tagName === 'P') {
            return dom.parentElement
        }
    }

    /**
     * 改变窗口后，paper位置改变
     */
    function changeSize() {
        var disX = document.documentElement.clientWidth - vWidth
        var disY = document.documentElement.clientHeight - vHeight
        for (var i = 0; i < contain.children.length; i++) {
            var paper = contain.children[i];
            //改变paper的left值
            var left = parseFloat(paper.style.left)
            var right = vWidth - paperWidth - left
            var newLeft = left + left / (left + right) * disX
            paper.style.left = newLeft + 'px'
            //改变paper的top值
            var top = parseFloat(paper.style.top)
            var buttom = vHeight - paperHeight - top
            var newTop = top + top / (top + buttom) * disY
            paper.style.top = newTop + 'px'
        }

        vWidth = document.documentElement.clientWidth
        vHeight = document.documentElement.clientHeight
    }

    /**
     * 关闭功能
     */
    function close(e) {
        var span = e.target
        if (!span) {
            return
        }
        if (span.parentElement && span.className === 'close' && span.tagName === 'SPAN') {
            span.parentElement.remove()
        }
    }

    init()
})()