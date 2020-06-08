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
                    ele.src = ele.getAttribute('pic')
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
})()
