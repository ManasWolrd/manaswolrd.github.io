# WarpCore用户手册

# 标题栏
![title](usage/title.png)

这是一个可被点击的文字区域，显示了插件的名称，版本号和所使用的SIMD指令集名称。  
如果插件代码中未使用动态SIMD分配，则指令集名称不会显示。  
如果您的电脑没有合适的指令集运行，则会显示为**unsupport cpu**

![title_click](usage/title_click.png)

点击标题栏会显示菜单，`goto github`将会打开浏览器访问对应的插件页面。  
`scale`将在以后移除。

# 预设系统
![preset_click](usage/preset_click.png)

点击预设名称可查看更多菜单  
`init patch`重置为初始预设  
`rescan`重新扫描预设文件夹下的xml文件  
`factory`为内置的预设  
`user`为预设文件夹下的预设

`<`和`>`按钮切换上一个和下一个预设，如果您选择了`factory`则只在factory中循环，`user`同理  

![save_preset](usage/save_preset.png)

`save`保存当前预设到`user`文件夹，预设显示的名称将会和文件名保持一致，但不能设置为`default`名字  
`delete`将删除当前加载的`user`预设，预设名称将会设置为`deleted`

> ❗注意，如果DAW重新加载工程后，虽然预设显示为对应名称，但此时点击`<`和`>`会默认从`factory`的第一个预设开始切换！

# 参数
**WARP**  
将 0 ~ FreqHigh 的频谱分割为该参数指定的段数，对每个段分别进行光谱反转。

---
**Freq High**  
设置反转频谱的最高频率，超过此频率的音频将会被过滤（静音）。

---
**Scale**  
控制每个频段反转装置中滤波器的截止频率。小于 1 会产生类似梳状滤波（谐振器）的效果；大于 1 会导致段间重叠，质感更粗糙。

---
**Poles**  
控制滤波器阶数（建议设为 2~4）。数值较低质感粗糙，数值较高则段间重叠减少，但会增加微弱的金属感。

---
**Pitch**  
在 Pitch 模式下控制输出音高；在 Formant 模式下移动共振峰而不改变音高。

---
**Dry/Wet**  
混合干声与反转湿声。由于滤波器的非线性相位，可能会产生陷波或奇特的相位抵消。

---
**Formant Mode**  
控制 Pitch 作用于前振荡器还是后振荡器，具体效果参考 **Pitch** 参数说明。

---
**Freq Mode**  
控制振荡器频率分布。0+xn 基本不反转第一个频段，而 1+xn 会。x+n 在某种程度上等同于将 Scale 翻倍。

---
**FillGap**  
控制滤波器频率缩放是否跟随**pitch**参数，这会导致梳妆滤波或者重叠的频率段。

# 补充
![right click on dial](usage/dial_click.png)

右键任意旋钮将弹出一个菜单  
`enter`输入想要的值，但JUCE可能不会设置的那么准确  
`reset`重置为默认值，双击旋钮也会触发该行为
