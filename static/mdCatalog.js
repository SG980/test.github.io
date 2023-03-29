window.onload = function () {
    // 初始化目录
    let div = document.createElement('div')
    div.style.border = '1px solid #eaecef'
    div.style.padding = '20px'
    div.style.backgroundColor = '#FFFFFF'
    div.style.zIndex = '10'
    div.style.position = 'fixed'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.overflow = 'auto'
    div.style.display = 'inline-block'
    div.style.maxWidth = '300px'
    div.style.height = '300px'

    var body = document.querySelector('body');
    body.appendChild(div)
    // console.log(window.innerHeight);
    div.style.height = window.innerHeight + 'px'

    let h = document.querySelectorAll('h1,h2,h3,h4,h5,h6')
    h.forEach(value => {

        // 初始化a标签
        let a = document.createElement('a')
        a.innerText = value.innerText
        a.style.display = 'inline-block';
        a.style.width = '100%'
        a.style.height = '32px'
        a.href = `#${value.id}`
        a.style.textDecoration = 'none'
        a.style.color = '#2c3e50'
        a.style.fontWeight = '350'
        a.style.lineHeight = '32px'

        div.appendChild(a)


        // 调整层级
        if (value.localName == 'h1') {
            a.style.margin = '10px 0px'
            a.style.fontSize = '20px'
            a.style.fontWeight = '500'
        } else if (value.localName == 'h2') {
            a.style.paddingLeft = 20 + 'px'
        } else if (value.localName == 'h3') {
            a.style.paddingLeft = 40 + 'px'
        } else if (value.localName == 'h4') {
            a.style.paddingLeft = 40 + 'px'
        } else if (value.localName == 'h5') {
            a.style.paddingLeft = 40 + 'px'
        } else if (value.localName == 'h6') {
            a.style.paddingLeft = 40 + 'px'
        }
        // 监听鼠标事件
        a.addEventListener('mouseenter', function () {
            a.style.color = '#3eaf7c'
        })
        a.addEventListener('mouseleave', function () {
            a.style.color = '#2c3e50'
        })
    });

    // 调整布局
    const getWindowInfo = () => {
        div.style.height = window.innerHeight + 'px'
        if (window.innerWidth <= 700) {
            div.style.display = 'None'
            body.style.paddingLeft = 30 + 'px'
        } else {
            div.style.display = 'inline-block'
            body.style.paddingLeft = 300 + 'px'
        }

    };
    // 监视浏览器窗口
    window.addEventListener('resize', getWindowInfo);
    // 初始布局
    getWindowInfo()
}
