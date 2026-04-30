# SteepFlanger User Manual

# Title Bar
![title](/assets/mannul/steepflanger/title.png)

This is a clickable text area that displays the plugin name, version number, and the SIMD instruction set in use.  
If the plugin does not use dynamic SIMD dispatch, the instruction set name will not be shown.  
If your CPU does not support a suitable instruction set, it will display **unsupport cpu**.

![title_click](/assets/mannul/steepflanger/title_click.png)

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

# LFO PART
![lfo part](/assets/mannul/steepflanger/lfo_part.png)

Delay time = Delay + LFO * Depth, in milliseconds.

---
**Delay**  
Base delay time.

---
**Depth**  
Delay modulation depth controlled by the LFO. LFO value is a sine wave, range 0.0–1.0.

---
**Speed**  
LFO modulation speed.

---
**Phase**  
How much the right channel LFO leads the left channel, 0–360°. Displayed here as 0.0–1.0.

---
**DryWet**  
> ❗ If Barberpole is enabled, even with DryWet = 0, the Hilbert filter's non-linear phase will still affect the signal.  

`FIR` — Transitions from coefficients [1, 0, ...] to the current coefficients.  
`IIR` — Mixes dry and processed signals; additional notches may appear in between.

# Feedback
![feedback part](/assets/mannul/steepflanger/feedback_part.png)

---
**gain**  
Feedback amount, from –0.95 to 0.95.  
> ❗ In minimum-phase FIR mode, feedback can cause unexpected instability. A saturation limiter is included in the feedback path to constrain amplitude.

---
**damp**  
Cutoff frequency of the low-pass filter in the feedback path. Higher damp values let more high frequencies through.

# FIR
![fir part](/assets/mannul/steepflanger/fir_part.png)

---
**fir**  
Switches between FIR mode and IIR mode.

---
**highpass**  
Switches between low-pass FIR and high-pass FIR.

---
**min(Φ)**  
Converts FIR coefficients to minimum-phase. This reduces pitch warping during high-speed LFO modulation.

---
**cutoff**  
FIR cutoff frequency, controls the width of the notch.

---
**steep**  
Length of the FIR coefficients. Longer lengths produce steeper notch roll-offs (like a cliff — hence the name), but also increase temporal smearing of transients.

---
**sidelobe**  
Side lobe level of the FIR filter window. Controls the depth of the notch — like the height of a cliff.

# Custom FIR
![fir custom part](/assets/mannul/steepflanger/fir_custom_part.png)

The top plot shows the magnitude response (with amplitude scale), the bottom shows the time response.  
Red indicates the current coefficient response; green indicates the custom coefficients.  
Left-click to draw, right-click to clear a point.

---
![fir custom op](/assets/mannul/steepflanger/fir_custom_op.png)

**copy**  
Copies the red (plugin-processed FIR coefficients) response to the green (custom coefficients) response.

**clear**  
Clears the green time response.

**reload**  
Reloads the green time response into the FIR filter.

**show ctm**  
Shows the green custom response. Must be enabled to draw on the two plots above.

# IIR
![iir part](/assets/mannul/steepflanger/iir_part.png)

The IIR mode in SteepFlanger is based on the **Chebyshev Type I filter**.  
> ❗ IIR mode may cause high-frequency oscillation with non-integer delay values.

---
**highpass**  
Switches between low-pass IIR and high-pass IIR.

---
**cutoff**  
IIR filter cutoff frequency, controls notch width.

---
**N.filter**  
Number of IIR filters. More filters produce steeper roll-offs, but also increase temporal smearing (more severe than FIR — especially at low cutoff values, where smearing can extend to minutes).

---
**ripple**  
Controls passband ripple. In the time domain, this manifests as increased transient smearing and a volume boost.

# Barberpole
![barberpole part](/assets/mannul/steepflanger/barber_part.png)

The Barberpole module makes notches continuously move in the same direction, creating a Shepard-tone-like effect.

---
**enable**  
Enables the Barberpole module. Causes non-linear phase effects on the dry signal.

**speed**  
Notch movement speed. Excessively high speeds may produce strange frequency shifts under certain settings.

**phase**  
Manually controls the notch position.

**stereo**  
Rotates the right channel by 0–90° of phase. May not sound particularly good.

# Extras
![right click on dial](/assets/mannul/warpcore/dial_click.png)

Right-click any knob to open a context menu.  
`enter` lets you type a value (note: JUCE may not set it precisely).  
`reset` resets to the default value (double-clicking the knob also does this).

---
![right click on speed dial](/assets/mannul/steepflanger/speed_dial.png)

Right-click any LFO speed knob to open a context menu.  
`enter` and `reset` are the same as above.  
`tempo sync`: Frequency is displayed as a rhythmic division. Suffix `T` means 3/2 ratio, suffix `D` means 2/3 ratio. Otherwise displayed in Hz.  
`ppq sync`: Syncs to the DAW transport position in PPQ (Pulses Per Quarter). The LFO phase resets precisely according to the PPQ position, suitable for fine-grained micro-timing synchronization within a beat.  
`tempo snap`: When frequency is displayed as a rhythmic division, snaps to the nearest note value; otherwise performs linear interpolation.  
`reset phase`: Resets the corresponding LFO phase.
