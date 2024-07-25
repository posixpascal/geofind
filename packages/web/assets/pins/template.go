package main

import (
	"encoding/json"
	"fmt"
	"image/color"
	"os"
	"text/template"
)

type Pin struct {
	PrimaryColor string

	Color1 string
	Color2 string
}

func lightenColor(c color.RGBA, factor float64) color.RGBA {
	r := uint8(float64(c.R) + (255-float64(c.R))*factor)
	g := uint8(float64(c.G) + (255-float64(c.G))*factor)
	b := uint8(float64(c.B) + (255-float64(c.B))*factor)
	return color.RGBA{R: r, G: g, B: b, A: c.A}
}

func darkenColor(c color.RGBA, factor float64) color.RGBA {
	r := uint8(float64(c.R) * (1 - factor))
	g := uint8(float64(c.G) * (1 - factor))
	b := uint8(float64(c.B) * (1 - factor))
	return color.RGBA{R: r, G: g, B: b, A: c.A}
}

func main() {
	colors := []color.RGBA{
		{R: 255, G: 99, B: 71, A: 255},   // Tomato
		{R: 135, G: 206, B: 235, A: 255}, // Sky Blue
		{R: 124, G: 252, B: 0, A: 255},   // Lawn Green
		{R: 255, G: 215, B: 0, A: 255},   // Gold
		{R: 255, G: 105, B: 180, A: 255}, // Hot Pink
		{R: 255, G: 165, B: 0, A: 255},   // Orange
		{R: 75, G: 0, B: 130, A: 255},    // Indigo
		{R: 173, G: 255, B: 47, A: 255},  // Green Yellow
		{R: 0, G: 191, B: 255, A: 255},   // Deep Sky Blue
		{R: 138, G: 43, B: 226, A: 255},  // Blue Violet
		{R: 240, G: 230, B: 140, A: 255}, // Khaki
		{R: 255, G: 20, B: 147, A: 255},  // Deep Pink
		{R: 34, G: 139, B: 34, A: 255},   // Forest Green
		{R: 255, G: 69, B: 0, A: 255},    // Red Orange
		{R: 218, G: 112, B: 214, A: 255}, // Orchid
		{R: 32, G: 178, B: 170, A: 255},  // Light Sea Green
		{R: 255, G: 127, B: 80, A: 255},  // Coral
		{R: 144, G: 238, B: 144, A: 255}, // Light Green
		{R: 100, G: 149, B: 237, A: 255}, // Cornflower Blue
		{R: 219, G: 112, B: 147, A: 255}, // Pale Violet Red
		{R: 255, G: 160, B: 122, A: 255}, // Light Salmon
		{R: 0, G: 250, B: 154, A: 255},   // Medium Spring Green
		{R: 0, G: 255, B: 255, A: 255},   // Cyan
		{R: 238, G: 130, B: 238, A: 255}, // Violet
		{R: 64, G: 224, B: 208, A: 255},  // Turquoise
		{R: 127, G: 255, B: 0, A: 255},   // Chartreuse
		{R: 255, G: 228, B: 181, A: 255}, // Moccasin
		{R: 255, G: 192, B: 203, A: 255}, // Pink
		{R: 154, G: 205, B: 50, A: 255},  // Yellow Green
		{R: 30, G: 144, B: 255, A: 255},  // Dodger Blue
		{R: 255, G: 69, B: 0, A: 255},    // Orange Red
		{R: 176, G: 224, B: 230, A: 255}, // Powder Blue
	}

	// Export the HTML table
	tmpl, err := template.New("_template.svg").ParseFiles("_template.svg")
	if err != nil {
		panic(err)
	}

	pinmap := map[int]string{}
	for index, c := range colors {
		c2 := darkenColor(c, 0.15)
		pin := Pin{
			Color1: fmt.Sprintf("#%02x%02x%02x", c.R, c.G, c.B),
			Color2: fmt.Sprintf("#%02x%02x%02x", c2.R, c2.G, c2.B),
		}

		output, err := os.OpenFile(fmt.Sprintf("%d.svg", index+1), os.O_TRUNC|os.O_RDWR|os.O_CREATE, os.ModePerm)
		defer output.Close()
		err = tmpl.Execute(output, pin)
		if err != nil {
			panic(err)
		}

		pinmap[index+1] = fmt.Sprintf("#%02x%02x%02x", c.R, c.G, c.B)
	}

	b, err := json.Marshal(pinmap)
	fmt.Println("Write the following to PINS.ts: ")
	fmt.Println(string(b))

}
