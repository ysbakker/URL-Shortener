package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"unicode/utf8"

	"github.com/joho/godotenv"
)

func init() {
	godotenv.Load()
}

func main() {
	http.HandleFunc("/", resolve)
	log.Printf("Started listening on port %v", os.Getenv("PORT"))
	error := http.ListenAndServe(":"+os.Getenv("PORT"), nil)
	log.Fatalf("Fatal error: %v\n", error)
}

type Slug struct {
	Slug  string `json:"slug"`
	Url   string `json:"url"`
	Https bool   `json:"https"`
}

type Err struct {
	Message string `json:"message"`
}

func resolve(w http.ResponseWriter, req *http.Request) {
	var s Slug
	var e Err

	_, i := utf8.DecodeRuneInString(req.URL.Path)
	slug := req.URL.Path[i:]
	if slug == "favicon.ico" || slug == "" {
		http.Error(w, "404 Not Found", http.StatusNotFound)
		return
	}
	response, err := http.Get(fmt.Sprintf("https://api.vect.it/slugs/%v", slug))

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		panic(err)
	}

	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		panic(err)
	}

	if response.StatusCode != 200 {
		err = json.Unmarshal(body, &e)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			log.Println("/"+slug, err)
			return
		}
		http.Error(w, fmt.Sprint(response.Status), response.StatusCode)
		return
	}

	err = json.Unmarshal(body, &s)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		panic(err)
	}

	url := "https://"
	if !s.Https {
		url = "http://"
	}
	url += s.Url

	http.Redirect(w, req, url, http.StatusMovedPermanently)
}
