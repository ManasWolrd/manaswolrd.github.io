# WarpCore User Manual

# Title Bar
![title](/assets/mannul/warpcore/title.png)

This is a clickable text area that displays the plugin name, version number, and the SIMD instruction set in use.  
If the plugin does not use dynamic SIMD dispatch, the instruction set name will not be shown.  
If your CPU does not support a suitable instruction set, it will display **unsupport cpu**.

![title_click](/assets/mannul/warpcore/title_click.png)

Clicking the title bar shows a menu. `goto github` will open the plugin's GitHub page in your browser.  
`scale` will be removed in a future version.

# Preset System
![preset_click](/assets/mannul/warpcore/preset_click.png)

Click the preset name to see more options.  
`init patch` resets to the initial preset.  
`rescan` rescans the preset folder for XML files.  
`factory` contains built-in presets.  
`user` contains your saved presets.

The `<` and `>` buttons cycle through the previous and next preset. If you selected `factory`, it cycles only within factory presets; same for `user`.

![save_preset](/assets/mannul/warpcore/save_preset.png)

`save` saves the current preset to the `user` folder. The displayed name will match the filename, but cannot be set to `default`.  
`delete` deletes the currently loaded `user` preset. The preset name will be set to `deleted`.

> ❗ Note: If the DAW reloads the project, the preset name may still be displayed, but clicking `<` and `>` will start from the first `factory` preset by default.

# Parameters
**WARP**  
Splits the 0–FreqHigh spectrum into the number of bands specified by this parameter, inverting each band independently.

---
**Freq High**  
Sets the highest frequency for spectral inversion. Audio above this frequency will be filtered out (silenced).

---
**Scale**  
Controls the cutoff frequency scaling of the filter in each band's inversion stage. Values below 1 produce a comb-filter-like (resonator) effect; values above 1 cause band overlap, resulting in a rougher texture.

---
**Poles**  
Controls the filter order (recommended: 2–4). Lower values produce a rougher texture; higher values reduce band overlap but add a slight metallic character.

---
**Pitch**  
In Pitch mode, controls the output pitch. In Formant mode, shifts formants without changing pitch.

---
**Dry/Wet**  
Blends the dry signal with the inverted wet signal. Due to the non-linear phase of the filters, notch filtering or unusual phase cancellation may occur.

---
**Formant Mode**  
Controls whether Pitch affects the front or back oscillator. See the **Pitch** parameter description for details.

---
**Freq Mode**  
Controls the oscillator frequency distribution. `0+xn` barely inverts the first band, while `1+xn` does. `x+n` is roughly equivalent to doubling the Scale value.

---
**FillGap**  
Controls whether the filter frequency scaling follows the **pitch** parameter, which may cause comb filtering or overlapping frequency bands.

# Extras
![right click on dial](/assets/mannul/warpcore/dial_click.png)

Right-click any knob to open a context menu.  
`enter` lets you type a value (note: JUCE may not set it precisely).  
`reset` resets to the default value (double-clicking the knob also does this).
