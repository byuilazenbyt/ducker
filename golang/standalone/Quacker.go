package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strings"
	"time"
)

const responses = `"Oh, really?","Quack, quack, quack...","QUACK!!!","That's quackers!", "You're quacking me up!"`

	func main() {

		// Capture user input from terminal
		reader := bufio.NewReader(os.Stdin)

		fmt.Println("Say something to the Ducker Duck!")
		msg, _ := reader.ReadString('\n')

		// Ignore what they said and just give back a ducky kind of response
		rand.Seed(time.Now().UnixNano())
		choices := strings.Split(responses, `","`)
		choice := rand.Intn(len(choices) - 1) + 1

		// Our response
		fmt.Println(fmt.Sprintf("%s? %s", strings.Replace(msg, "\n", "", -1), strings.Replace(choices[choice], `"`,"", -1)))
	}
