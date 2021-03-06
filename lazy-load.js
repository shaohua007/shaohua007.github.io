class LazyLoad {
    constructor(options = {}) {
        this.options = Object.assign({
            className: 'lazy',   //  需要懒加载的图片的类名
            delay: 100,          //  设置防抖延时
            defaultSrc: './loading.gif'
        }, options)
        let imgEleArr = document.getElementsByClassName(this.options.className)
        this.eleArr = [...imgEleArr]
        this.init()              //  直接初始化调用懒加载
    }
    init() {
        for (let ele of this.eleArr) {
            ele.src = this.options.defaultSrc
        }
        this.start()
        this.loadCtr()
    }
    start() {
        const _this = this
        for (let ele of this.eleArr) {
            if (this.isLoad(ele) && !this.hasLoaded(ele)) {
                ele.src = ele.getAttribute('lazy-src')
                ele.onerror = () => ele.src = _this.options.defaultSrc  //  图片如果加载失败使用默认图片
            }
        }
    }
    loadCtr() {
        const _this = this
        window.onscroll = this.debounce(_this.start, _this.options.delay)
    }
    isLoad(curImg) {
        let clientH = document.body.clientHeight,
        imgTop = curImg.offsetTop,
        imgH = curImg.offsetHeight,
        winTop = window.pageYOffset
        //  图片在浏览器窗口可视范围内
        return winTop + clientH > imgTop && imgTop > winTop - imgH
    }
    hasLoaded(curImg) {
        return curImg.src === curImg.getAttribute('lazy-src')
    }
    debounce(func, delay) {
        let timer = null,_this = this
        return ()=> {
            timer && clearTimeout(timer)
            timer = setTimeout(()=> {
                timer = null
                func.call(_this)
            }, delay)
        }
    }
}
/*
(function () {
    let _lazyImg = function (option) {
        const options = {
            className: 'lazy', //  需要懒加载的图片的类名
            delay: 100,        // 设置防抖延时
            defaultSrc: './loading.gif'  //  默认图片资源
        }
        Object.assign(options, option)
        let imgEleArr = document.getElementsByClassName(options.className)
        const eleArr = Array.prototype.slice.call(imgEleArr)
        init()
        function init() {
            eleArr.forEach(function (ele) {
                ele.src = options.defaultSrc
            })
            start()
            loadCtr()
        }
        function start() {
            eleArr.forEach(function (ele) {
                if (isLoad(ele) && !hasLaded(ele)) {
                    ele.src = ele.getAttribute('lazy-src')
                }
            })
        }
        function loadCtr() {
            window.onscroll = debounce(start, options.delay)
        }
        function isLoad(curImg) {
            let clientH = document.body.clientHeight
            let imgTop = curImg.offsetTop
            let imgH = curImg.offsetHeight
            let winTop = window.pageYOffset
            //  确保图片在窗口可视范围内
            return winTop + clientH > imgTop && imgTop > winTop - imgH
        }
        function hasLaded(curImg) {
            return curImg.src === curImg.getAttribute('lazy-src')
        }
        function debounce(func, delay) {
            let timer = null;
            return function () {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(function () {
                    timer = null
                    func()
                }, delay)
            }
        }
    }
    window.lazyImg = _lazyImg
})()*/
