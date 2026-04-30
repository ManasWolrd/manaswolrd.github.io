# SteepFlanger用户手册

# 标题栏
![title](/assets/mannul/steepflanger/title.png)

这是一个可被点击的文字区域，显示了插件的名称，版本号和所使用的SIMD指令集名称。  
如果插件代码中未使用动态SIMD分配，则指令集名称不会显示。  
如果您的电脑没有合适的指令集运行，则会显示为**unsupport cpu**

![title_click](/assets/mannul/steepflanger/title_click.png)

点击标题栏会显示菜单，`goto github`将会打开浏览器访问对应的插件页面。  
`scale`将在以后移除。

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

# LFO PART
![lfo part](/assets/mannul/steepflanger/lfo_part.png)

延迟时间=Delay + Lfo * Depth，单位为毫秒  

---
**Delay**  
基础延迟时间

---
**Depth**  
LFO控制的延迟时间，lfo的值为正弦波，0.0~1.0

---
**Speed**  
LFO运动的速度

---
**Phase**  
右声道的lfo提前左声道多少相位，0~360°，这里显示为0.0~1.0

---
**DryWet**  
> ❗如果启用了barberpole，那么即使drywet=0也会受到希尔伯特滤波器的非线性相位影响  

`FIR`：相当于从系数[1,0,...]过渡到当前系数  
`IIR`：混合干声和处理过的声音，在中途会有多出来的陷波

# Feedback
![feedback part](/assets/mannul/steepflanger/feedback_part.png)

---
**gain**  
反馈的作用量，从-0.95~0.95  
> ❗在最小相位FIR模式下，使用反馈会有意外的不稳定现象，因此反馈链路中还含有一个饱和限制幅度

---
**damp**
反馈链路中低通滤波器的截至频率，damp越大高频越多  

# FIR
![fir part](/assets/mannul/steepflanger/fir_part.png)

---
**fir**  
切换fir模式或者iir模式

---
**highpass**  
切换低通fir或高通fir

---
**min(Φ)**  
将fir系数转化为最小相位，这在高速LFO调制时能减少音高扭曲

---
**cutoff**  
fir的截止频率，用于控制陷波的宽度

---
**steep**  
fir系数的长度，越长陷波下降速度越快，像悬崖一样陡峭（名称由来），同时时间上的瞬态涂抹也会增强

---
**sidelobe**
构建fir滤波器的旁瓣大小，控制陷波的高度，有点像悬崖的高度

# FIR自定义
![fir custom part](/assets/mannul/steepflanger/fir_custom_part.png)

上方有幅度刻度的为幅度响应，下方为时间响应。  
红色表示当前系数的响应，绿色的表示自定义系数。  
左键为绘制，右键为清除该点。  

---
![fir custom op](/assets/mannul/steepflanger/fir_custom_op.png)

**copy**
复制红色（插件处理完成的fir系数）响应到绿色响应（自定义系数）

**clear**
清除绿色的时间响应

**reload**
将绿色的时间响应重新加载到fir滤波器中

**show ctm**
显示绿色的自定义响应，只有打开时才能在上面两个图表中进行自定义绘制

# IIR
![iir part](/assets/mannul/steepflanger/iir_part.png)

steepflanger中的iir模式以`切比雪夫I型滤波器`为基础  
> ❗iir模式在非整数延迟下会造成高频摆动

---
**highpass**  
切换低通IIR或者高通IIR

---
**cutoff**  
IIR滤波器的截止频率，控制陷波的宽度

---
**N.filter**  
控制IIR滤波器的个数，越多下降速度越快，同时时间上的瞬态涂抹加强（比FIR的更严重，特别是cutoff较低的情况下能延长到分钟级别）

---
**ripple**  
控制滤波器通带中的涟漪，在时间上体现为瞬态涂抹加强，以及音量会增加

# Barberpole
![barberpole part](/assets/mannul/steepflanger/barber_part.png)

理发店模块使得陷波始终向同一个方向移动来创造类似谢泼德音调

---
**enable**  
启用理发店模块，对干声会造成非线性相位影响

**speed**  
陷波移动的速度，过高的速度在某些设置下会产生奇怪的频率移动

**phase**  
手动控制陷波的移动位置

**stereo**
使右声道旋转0~90°的相位，但听起来不是很好

# 补充
![right click on dial](/assets/mannul/warpcore/dial_click.png)

右键任意旋钮将弹出一个菜单  
`enter`输入想要的值，但JUCE可能不会设置的那么准确  
`reset`重置为默认值，双击旋钮也会触发该行为

---
![right click on speed dial](/assets/mannul/steepflanger/speed_dial.png)

右键任意lfo的速度旋钮弹出一个菜单  
`enter`与`reset`同上  
`tempo sync`：频率以节奏显示，带有T的后缀为3/2倍率，带有D的后缀为2/3倍率。否则以hz显示。  
`ppq sync`：以 PPQ（Pulses Per Quarter，每四分音符的脉冲数）为单位同步到 DAW 的传输位置，LFO 相位随 PPQ 位置精确重置，适合需要精细到节拍内微时序的同步场景  
`tempo snap`：频率以节奏显示时，吸附到最近的频率值，否则进行线性插值  
`reset phase`：重置对应的lfo的相位
