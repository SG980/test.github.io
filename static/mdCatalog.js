window.onload = function () {
    // 初始化目录
    let div = document.createElement('div')
    div.style.borderRight = '1px solid #eaecef'
    div.style.padding = '20px 0px'
    div.style.backgroundColor = '#FFFFFF'
    div.style.zIndex = '10'
    div.style.position = 'fixed'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.overflowY = 'auto'
    div.style.display = 'inline-block'
    div.style.maxWidth = '300px'
    div.style.height = '300px'
    div.className = 'MyDiv'

    var body = document.querySelector('body');
    body.appendChild(div)

    let h = document.querySelectorAll('h1,h2,h3,h4,h5,h6')
    // 文章中所有的h标签对象
    let HObjects = []
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
        a.style.borderLeft = '4px solid #FFFFFF'
        a.id = value.id

        div.appendChild(a)
        // 目录结构
        if (value.localName == 'h1') {
            a.style.margin = '5px 0px'
            a.style.fontSize = '20px'
            a.style.fontWeight = '500'
            a.style.paddingLeft = '30px'
        } else if (value.localName == 'h2') {
            a.style.paddingLeft = '50px'
        } else if (value.localName == 'h3') {
            a.style.paddingLeft = '70px'
        } else if (value.localName == 'h4') {
            a.style.paddingLeft = '70px'
        } else if (value.localName == 'h5') {
            a.style.paddingLeft = '70px'
        } else if (value.localName == 'h6') {
            a.style.paddingLeft = '70px'
        }
        HObjects.push(document.querySelector(`#${value.id}`))
    });
    // 目录中所有的a对象
    var alists = document.querySelectorAll('.MyDiv a')

    // 为所有的a标签绑定事件
    alists.forEach(value => {
        // 标记点击状态
        value.myStatu = 'false'
        // 鼠标滑入目录状态
        value.addEventListener('mouseenter', function () {
            this.style.color = '#3eaf7c'
        })
        // 鼠标滑出目录状态
        value.addEventListener('mouseleave', function () {
            if (this.myStatu !== 'true') {
                this.style.color = '#2c3e50'
            }
        })
        // 目录点击状态
        value.addEventListener('click', function () {
            alists.forEach(value => {
                value.myStatu = 'false'
                value.style.color = '#2c3e50'
                value.style.borderLeft = '4px solid #FFFFFF'
            });
            this.style.borderLeft = '4px solid #3eaf7c'
            this.style.color = '#3eaf7c'
            // 点击状态标记为ture
            this.myStatu = 'true'
        })
    });

    // 调整目录
    const getWindowInfo = () => {
        // 将文档高度赋值给目录高度
        div.style.height = window.innerHeight + 'px'
        // 文档可是宽度小于1000时隐藏目录
        if (window.innerWidth <= 1000) {
            div.style.display = 'None'
            body.style.paddingLeft = 30 + 'px'
            body.style.paddingRight = '30px'
        } else {
            div.style.display = 'inline-block'
            body.style.paddingLeft = '430px'
            body.style.paddingRight = '130px'
        }
    };
    // 监视浏览器窗口
    window.addEventListener('resize', getWindowInfo);
    // 初始布局
    getWindowInfo()
    // 监视页面滚动
    document.addEventListener("scroll", (event) => {
        // 遍历文章中所有的h标签对象
        HObjects.forEach(value => {
            // 判断每个对象的位置信息
            if (value.getBoundingClientRect().y <= 30 && value.getBoundingClientRect().y >= -10) {
                // 遍历目录中所有的a对象
                alists.forEach(a => {
                    a.myStatu = 'false'
                    a.style.color = '#2c3e50'
                    a.style.borderLeft = '4px solid #FFFFFF'
                })
                let vl = document.querySelector(`.MyDiv #${value.id}`)
                // 将对应的目录标题选中
                vl.style.borderLeft = '4px solid #3eaf7c'
                vl.style.color = '#3eaf7c'
                // 点击状态标记为ture
                vl.myStatu = 'true'
            }
        });
    });
}
