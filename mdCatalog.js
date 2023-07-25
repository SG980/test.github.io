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
    div.style.maxWidth = '400px'
    div.style.height = '300px'
    div.className = 'MyDiv'

    var body = document.querySelector('body');
    body.appendChild(div)

    let hList = document.querySelectorAll('h1,h2,h3,h4,h5,h6')
    let i = 0
    let div1_name_list = []
    let div2_name_list = []

    function createA(h, i) {  // 目录a标签生成功能
        if (h.querySelector('code')) {  // 判断是否有code标签
            h_text = h.querySelector('span').innerText + h.querySelector('code').innerText // 获取标题的名字
        } else {
            h_text = h.querySelector('span').innerText
        }
        let a = document.createElement('a')
        a.href = `#${h.id}`
        a.innerText = h_text
        a.style.display = 'inline-block';
        a.style.width = '100%'
        a.style.height = '40px'
        a.style.textDecoration = 'none'
        a.style.color = '#2c3e50'
        a.style.fontWeight = '350'
        a.style.lineHeight = '32px'
        a.style.paddingTop = '4px'
        a.style.marginRight = '20px'
        a.style.borderRadius = '5px'
        if (i === '1') {  // 根据目录等级设计缩进
            a.style.paddingLeft = '30px'
        } else if (i === '2') {
            a.style.paddingLeft = '60px'
        } else if (i === '3') {
            a.style.paddingLeft = '90px'
        }
        return a
    }

    hList.forEach((h) => {  // 收集标题制作嵌套目录
        i++;
        if (h.tagName[1] === '1') {
            a = createA(h, '1')  // 创建a标签

            let father_div = document.querySelector('.MyDiv')  // 父级标签
            let h_div = document.createElement('div')  // 制作div
            h_div.className = 'h_' + i
            div1_name_list.push(h_div.className)
            h_div.appendChild(a)
            father_div.appendChild(h_div)
        }
        else if (h.tagName[1] === '2') {
            a = createA(h, '2')  // 创建a标签

            let father_div = document.querySelector(`.${div1_name_list[div1_name_list.length - 1]}`)  // 父级标签
            let h2_div = document.createElement('div')  // 制作div
            h2_div.className = 'h_' + i
            div2_name_list.push(h2_div.className)
            h2_div.appendChild(a)
            father_div.appendChild(h2_div)
        } else if (h.tagName[1] === '3') {
            a = createA(h, '3')  // 创建a标签

            let father_h2_div = document.querySelector(`.${div2_name_list[div2_name_list.length - 1]}`)  // 父级标签
            let h3_div = document.createElement('div')  // 制作div
            h3_div.appendChild(a)
            father_h2_div.appendChild(h3_div)
        }

        h2 = document.querySelectorAll('.MyDiv > div > div')  // 目录中所有二级标题盒子
        h3 = document.querySelectorAll('.MyDiv > div > div > div')  // 目录中所有二级标题盒子
        h2.forEach((div) => {
            div.style.display = 'none'  // 隐藏
        })
        h3.forEach((div) => {
            div.style.display = 'none'  // 隐藏
        })
    })

    // 插入下拉图标功能
    function XiaLaLogo(divs, i) {
        divs.forEach((d1) => {  // 遍历所有一级目录
            d1.style.position = 'relative'
            if (d1.querySelector('div')) {  // 是否含有子目录
                let img = document.createElement('img')  // 塞入下拉图标
                img.src = '下拉2.png'
                img.style.width = '20px'
                img.style.height = '20px'
                img.style.position = 'absolute'
                img.style.top = '10px'
                // img.style.backgroundColor = 'red'
                if (i === '1') {
                    img.style.left = '10px'
                } else if (i === '2') {
                    img.style.left = '40px'
                }
                d1.appendChild(img)
            }
        })
    }
    
    h_divs = document.querySelectorAll('.MyDiv > div')  // 获取到所有一级目录
    XiaLaLogo(h_divs, '1')// 插入下拉图标

    h_divs.forEach((d1) => {  // 一级目录折叠
        let img = d1.querySelector('img')  // 下拉图标
        d1.addEventListener('click', function () {  
            let d2_all = document.querySelectorAll(`.${d1.className} > div`)  // 获取当前标题下的所有二级标题
            d2_all.forEach(element => {
                if (element.style.display === 'none') {  // 显示
                    element.style.display = 'block'  
                    img.src = '下拉.png'
                } else {  // 隐藏
                    element.style.display = 'none'
                    img.src = '下拉2.png'
                }
            });
        })
    })
    

    h2_divs = document.querySelectorAll('.MyDiv > div > div')  // 获取到所有二级目录
    XiaLaLogo(h2_divs, '2')// 插入下拉图标
    h2_divs.forEach((d2) => {  // 二级目录折叠
        let img = d2.querySelector('img')  // 下拉图标
        d2.addEventListener('click', function (e) {
            e.stopPropagation();  // 阻止事件冒泡
            let d3_all = document.querySelectorAll(`.${d2.className} > div`)  // 获取当前标题下的所有三级标题
            d3_all.forEach(element => {
                if (element.style.display === 'none') {  // 显示
                    element.style.display = 'block'
                    img.src = '下拉.png'
                } else {  // 隐藏
                    element.style.display = 'none'
                    img.src = '下拉2.png'
                }
            });
        })
    })

    h3_divs = document.querySelectorAll('.MyDiv > div > div > div')  // 获取到所有三级目录
    h3_divs.forEach((d3) => {  // 三级目录折叠
        d3.addEventListener('click', function (e) {
            e.stopPropagation();  // 阻止事件冒泡
        })
    })

    // mulu_div_all = document.querySelectorAll('.MyDiv div')
    mulu_a_all = document.querySelectorAll('.MyDiv a')
    mulu_a_all.forEach((a) => {
    
        a.addEventListener('mouseenter', function () {  // 鼠标悬停
            if (!a.state_) { 
                a.style.backgroundColor = '#FDEFEE'
            }
        })
        a.addEventListener('mouseleave', function () {  // 鼠标离开
            if (!a.state_) {
                a.style.backgroundColor = '#fff'
            }
        })
        a.addEventListener('click', function () {
            mulu_a_all.forEach((a) => {
                a.style.backgroundColor = '#fff'
                a.state_ = false
                a.style.borderLeft = 'none'
            })
            a.style.backgroundColor = '#FDEFEE'
            a.state_ = true
            a.style.borderLeft = '4px solid #e95f59'
        })
    })

    // 目录中所有的a对象
    var alists = document.querySelectorAll('.MyDiv a')
    // 将目录中所有的a标签取类名
    alists.forEach((a) => {
        a.className = "_" + a.id
    })

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
            body.style.paddingLeft = '300px'
            body.style.paddingRight = '30px'
        }
    };


    // 监视浏览器窗口
    window.addEventListener('resize', getWindowInfo);
    // 初始布局
    getWindowInfo()
    
}
