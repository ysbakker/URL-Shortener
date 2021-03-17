# URL Shortener

This URL shortener was made to try out AWS Lambda and Dynamodb. I also used Vue instead of React for this project because I wanted to give it a shot. Finally, I wrote a small Golang http service that translates the slug (/asdf) into the correct URL. In hindsight, serverless functions were probably not the best fit for this project because the functions ususally take some time to "warm up" which adds latency to the request.

## Features (possibly)

- [x] Intuitive UI
- [x] Convert URL to `{domain}/[a-zA-Z]{5}`
- [ ] URL analytics
- [ ] Account system
- [ ] Pay for custom URL ([Stripe](https://stripe.com/docs/js)?)
