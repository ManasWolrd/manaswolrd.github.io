# VitalReverb User Manual

# Title Bar
![title](/assets/mannul/vitalreverb/title.png)

This is a clickable text area that displays the plugin name, version number, and the SIMD instruction set in use.  
If the plugin does not use dynamic SIMD dispatch, the instruction set name will not be shown.  
If your CPU does not support a suitable instruction set, it will display **unsupport cpu**.

![title_click](/assets/mannul/vitalreverb/title_click.png)

Clicking the title bar shows a menu. `goto github` will open the plugin's GitHub page in your browser.

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
**freeze**  
Pauses audio input and sets the reverb time to infinite to freeze the internal audio.  
> ℹ High frequencies still decay due to delay line interpolation.

---
**LOW CUT**  
A first-order high-pass filter on the audio input, attenuating low frequencies.

**HIGH CUT**  
A first-order low-pass filter on the audio input, attenuating high frequencies.

---
**LOW DAMP**  
High-pass filter cutoff frequency in the feedback filter, attenuating low frequencies.

**LOW GAIN**  
High-pass filter stopband attenuation in the feedback filter, attenuating low frequencies.

---
**HIGH DAMP**  
Low-pass filter cutoff frequency in the feedback filter, attenuating high frequencies.

**HIGH GAIN**  
Low-pass filter stopband attenuation in the feedback filter, attenuating high frequencies.

---
**CHOR AMT**  
Modulation amount of the delay lines (chorus).

**CHOR FREQ**  
Modulation rate of the delay lines (chorus).

---
**DELAY**  
Pre-delay time in milliseconds.

---
**SIZE**  
Reverb size.

---
**MIX**  
Dry/wet ratio.

---
**TIME**  
Reverb time in milliseconds.

# Extras
![right click on dial](/assets/mannul/warpcore/dial_click.png)

Right-click any knob to open a context menu.  
`enter` lets you type a value (note: JUCE may not set it precisely).  
`reset` resets to the default value (double-clicking the knob also does this).
