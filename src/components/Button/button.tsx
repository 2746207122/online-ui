import classNames from "classnames"; // 引入 classnames 库，用于组合 CSS 类名
import React from "react"; // 引入 React 库

export enum ButtonSize { // 定义 ButtonSize 枚举，规定按钮的大小类型
    Large = 'lg', // 大尺寸
    Small = 'sm' // 小尺寸
}

export enum ButtonType { // 定义 ButtonType 枚举，规定按钮的类型
    Primary = 'Primary', // 主要按钮
    Default = 'default', // 默认按钮
    Danger = 'danger', // 危险按钮
    Link = 'link' // 链接按钮
}

interface BaseButtonProps { // 定义 BaseButtonProps 接口，规定组件的 props
    className ?: string; // CSS 类名
    disabled?: boolean; // 是否禁用状态
    size?: ButtonSize; // 按钮大小
    btnType?: ButtonType; // 按钮类型
    children: React.ReactNode, // 内容
    href ?: string // 链接地址
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>	
// 定义了 NativeButtonProps 类型，它继承了 BaseButtonProps 类型，并在其基础上添加了原生 HTML 按钮元素所支持的属性，例如 onClick、disabled 等
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// 定义了 AnchorButtonProps 类型，它同样继承了 BaseButtonProps 类型，并在其基础上添加了原生 HTML 锚点元素所支持的属性，例如 href、target 等。
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
//定义了 ButtonProps 类型，它是 NativeButtonProps 和 AnchorButtonProps 两个类型的并集，并使用 Partial 关键字将所有属性都变成可选的。这是因为在实际使用中，一个按钮组件可能只需要传递部分属性。

const Button: React.FC<ButtonProps> = (props) => { // 定义 Button 组件，并传入 BaseButtonProps 类型的 props 参数。
    const { btnType, className, disabled, size, children, href, ...restProps } = props // 解构出 props 中的属性值
    const classes = classNames('btn', className, { // 使用 classnames 函数生成 CSS 类名
        [`btn-${btnType}`]: btnType, // 如果有 btnType 属性，则生成对应的类名
        [`btn-${size}`]: size, // 如果有 size 属性，则生成对应的类名
        'disabled': (btnType === ButtonType.Link) && disabled // 如果是链接按钮且设置了禁用，则添加 disabled 类名
    })
    if(btnType === ButtonType.Link && href) { // 如果是链接按钮且设置了 href 属性，则渲染 a 标签
        return (
            <a className={classes} href={href} {...restProps} >
                {children}
            </a>
        )
    }
    return ( // 否则渲染 button 标签
        <button className={classes} disabled={disabled} {...restProps} >
            {children}
        </button>
    )
}

Button.defaultProps = { // 定义 Button 组件的默认 props 值
    disabled: false, // 不禁用
    btnType: ButtonType.Default // 默认类型为默认按钮
}

export default Button // 导出 Button 组件
