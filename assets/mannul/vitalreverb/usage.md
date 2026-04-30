# VitalReverb用户手册

# 标题栏
![title](/assets/mannul/vitalreverb/title.png)

这是一个可被点击的文字区域，显示了插件的名称，版本号和所使用的SIMD指令集名称。  
如果插件代码中未使用动态SIMD分配，则指令集名称不会显示。  
如果您的电脑没有合适的指令集运行，则会显示为**unsupport cpu**

![title_click](/assets/mannul/vitalreverb/title_click.png)

点击标题栏会显示菜单，`goto github`将会打开浏览器访问对应的插件页面。  

# 预设系统
![preset_click](/assets/mannul/warpcore/preset_click.png)

点击预设名称可查看更多菜单  
`init patch`重置为初始预设  
`rescan`重新扫描预设文件夹下的xml文件  
`factory`为内置的预设  
`user`为预设文件夹下的预设

`<`和`>`按钮切换上一个和下一个预设，如果您选择了`factory`则只在factory中循环，`user`同理  

![save_preset](/assets/mannul/warpcore/save_preset.png)

`save`保存当前预设到`user`文件夹，预设显示的名称将会和文件名保持一致，但不能设置为`default`名字  
`delete`将删除当前加载的`user`预设，预设名称将会设置为`deleted`

> ❗注意，如果DAW重新加载工程后，虽然预设显示为对应名称，但此时点击`<`和`>`会默认从`factory`的第一个预设开始切换！

# 参数
**freeze**  
暂停音频输入，并将混响时间提升至无限来冻结内部运行的音频  
> ℹ由于延迟线插值高频仍会衰减

---
**LOW CUT**  
音频输入的一阶高通滤波器，削弱低频

**HIGH CUT**  
音频输入的一阶低通滤波器，削弱高频

---
**LOW DAMP**  
反馈滤波器的高通滤波器截止频率，削弱低频

**LOW GAIN**  
反馈滤波器的高通滤波器的阻带幅度，削弱低频

---
**HIGH DAMP**  
反馈滤波器的低通滤波器截止频率，削弱高频

**HIGH GAIN**  
反馈滤波器的低通滤波器阻带幅度，削弱高频

---
**CHOR AMT**  
延迟线的调制量

**CHOR FREQ**  
延迟线的调制速度

---
**DELAY**  
预延迟时间，单位为毫秒

---
**SIZE**  
混响大小

---
**MIX**  
干湿比

---
**TIME**  
混响时间，单位为毫秒

# 补充
![right click on dial](/assets/mannul/warpcore/dial_click.png)

右键任意旋钮将弹出一个菜单  
`enter`输入想要的值，但JUCE可能不会设置的那么准确  
`reset`重置为默认值，双击旋钮也会触发该行为
