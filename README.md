# Mysterious-Spirit-of-Christmas-Future

For all your Secret Santa needs

https://main--mysterious-spirit-of-christmas-future.netlify.app/

### Functionality

This web app enables users to automatically pair someone to a random secret santa. Each individual recieves an individualised email with their gift recipient's name and (if selected) a customised message.

### Core Technology

-   Express
-   Zustand
-   React
-   Axios
-   Chakra UI Library
-   React-query
-   Web-pack
-   Rate-limiter
-   Nodemailer

### Purpose

I created this application with the intent of putting my development skills to the test. I have spent a significant amount of time in my current role working on the front-end and have been very happy with how far my skills have come.

The underlying notion was that whatever I made would be suitable for commercial use and easily scalable if required (not that that is likely, this was all in the name of practice). Additionally, I was intent on creating source code that was clean, easy to understand, and implemented React/commercial best practices. All components/hooks were created with the aim of being as loosely coupled as possible, and modulated to allow for easy reusibility.

Some exmaples include:

-   Placing state components as low down in the component tree as possible to segregate re-rendering to only where it is necessary
-   Following DRY principles
-   Maintaining as close to single responsibility as possible per function/component
-   Using shared utils files that implement useContext to export variables/functions which all share the same instance
-   Utilising useQuery for fetch requests to the API (instead of useEffect + api call) + maintaining synchronisation between the UI and server with useMutation (onSuccess/onError)
-   Modular Axios fetch request which can be implemented with any request in the app (and defaulted to POST instead of GET for improved security)
-   Ensuring components remain below 120 lines of length
-   Reusing components where possible
-   Custom types for readibility
-   Thorough error handling (displayed via a notification if thrown)
-   Using Maps instead of objects where applicable (namely in the pairing algorithm (mailer/index.ts) for greater efficiency when accessing the dictionaries keys)

UI design is definitely not my strongest asset, but I wanted to maintain a light-hearted and Christmas themed interface without letting things get out of hand.

I also started the project as a bare-bones Web-pack repo. I gained a wealth of knowledge from setting up, debugging and using Web-pack (and some mild anger issues from the frustration)

Although it is not 100% what would be considerd commercial ready, I am satisfied with where it is at for the sake of this task.

### Features

-   Validation for participant's name and emails
-   Custom email message generation
-   Dynamic snowflake background (can be toggled off or increased/decreased in density)
-   Rate limiting (3 requests per minute)
-   End-to-end encryption of participants data (email and name)
-   Automated emails via a custom email address
-   Success/failire notifications!
-   2 - 50 participant limit

### The Secret Santa Pairing Algorithm

Pretty straightforward:

-   Loop through participants
-   Pick a random index between 0 and number of participants (this is the giftee)
-   If the ID at that index doesn't match the current participant (the gifter)... pair them!
-   Remove giftee from stack
-   Rinse and repeat until someone breaks your algorithm and you have to refactor it

### Known Bugs

-   Background will shift when adding a participant
-   UI is not centered on mobile
-   Nothing else because I like to pretend that my coding is bullet proof

### NOTE

-   Not yet optimised for use on mobile
-   JWT authentication was considered on submission (to stop API spamming), but given the nature of the app is likely not necessary - the current rate limit mitigates the risk of a DDoS attack
-   The background is rendered entirely as a component which uses css/html to style up to 150 \*. Because of this it can cause some lag (but that's what the snow control button is for)
