# WhiskerWatch

## Overview

WhiskerWatch is a place to reunite pet owners with their lost pets.

### Problem Space

Losing a pet is a distressing experience, pet owners often feel helpless and desperate to find their pets as quickly as possible. Relying on posters or word of mouth can be inefficient and limit the reach of the message.

### User Profile

**- Pet Owners:**

- who have lost a pet
- want to get the word out to as many people as possible
- want to make sure their message reaches the best audience (people in the location of where the pet was lost)

**- Community Members** (neighbors, good samaritans, animal lovers):

- who want to help people find their missing pets
- who should be aware if a pet is missing in their neighborhood so they can keep an eye out

### Features

**MVP:**

- As a user, I want to be able to post that my pet is missing
- As a user, I want to be able to give relevant information (such as: location, picture, temperament) about my pet that will help others identify them and approach them safely
- As a user, I want to be able to provide my contact information to be able to be reached if someone finds my pet

- As a user, I want to be able to see missing pets that have been reported in my area

**Future Implementations:**

- As a user, I want to be able to report that I have seen a pet, and where I saw it, if I was unable to successfully approach and take in the pet
- As a logged in user, I want to be able to update my lost pet listings, updating details or marking a pet as actively missing/found
- As a logged in user, I want to be able to message other users to communicate about their pets

## Implementation

### Tech Stack

**MVP:**

- React
- Sass
- Express
- Knex.js
- MySQL

**Future Implementations:**

- TypeScript
- Next.js
- User Authentication

### APIs

MVP:

- Google Maps API: [Docs](https://developers.google.com/maps/documentation/javascript/overview)

### Sitemap

MVP:

- Map & Pet List page
- Pet profile page
- Add pet page

Future Implementations:

- Register page
- Login page
- Account page
- Inbox page

### Mockups

**Pet List & Map Page**
![](assets/images/whisker-watch-map.png)

**Pet Profile Page**
![](assets/images/whisker-watch-pet.png)

**Add Pet Page**
![](assets/images/whisker-watch-form.png)

Design Inspiration

- [Pet List & Map Page](https://www.figma.com/community/file/1040515244782148525/property-listing-website-concept)
- [Pet Profile Page](https://www.figma.com/community/file/1120008181964013360/ui-kit-pet-adoption)

### Data

**MVP:**
![](assets/images/whisker-watch-mvp-data.png)

**Future Implementations:**
![](assets/images/whisker-watch-future-data.png)

**With Messaging System:**
![](assets/images/whisker-watch-messaging-data.png)

### Endpoints

**MVP:**

**GET /pets**

- Get list of pets, with an optional query for location

Optional Parameters:

- longitude: User-provided location as a number
- latitude: User-provided location as a number

Response:

```
[
    {
        "id": 1,
        "image": "https://example.com/images/pet1.jpg",
        "status": "missing",
        "name": "Buddy",
        "pet_type": "dog",
        "age": 3,
        "description": "Golden retriever with a red collar, very friendly.",
        "longitude": -122.4194,
        "latitude": 37.7749,
        "posted_date": "2024-11-01T10:30:00Z",
        "updated_date": "2024-11-10T15:45:00Z",
        "user_id": 42
    },
    ...
]
```

**POST /pets/**

- Add a new pet

Parameters:

- image, status, name, pet_type, age, description, longitude, latitude, user_id required in the request body

Request Body:

```
{
    "image": "https://example.com/images/pet1.jpg",
    "status": "missing",
    "name": "Buddy",
    "pet_type": "dog",
    "age": 3,
    "description": "Golden retriever with a red collar, very friendly.",
    "longitude": -122.4194,
    "latitude": 37.7749,
    "user_id": 42

}
```

Response:

```
{
    "id": 1,
    "image": "https://example.com/images/pet1.jpg",
    "status": "missing",
    "name": "Buddy",
    "pet_type": "dog",
    "age": 3,
    "description": "Golden retriever with a red collar, very friendly.",
    "longitude": -122.4194,
    "latitude": 37.7749,
    "posted_date": "2024-11-01T10:30:00Z",
    "updated_date": "2024-11-10T15:45:00Z",
    "user_id": 42
}
```

**GET /pets/:id**

- Get one pet with the given id

Parameters:

- id: number representing the id of the pet

Response:

```
{
    "id": 1,
    "image": "https://example.com/images/pet1.jpg",
    "status": "missing",
    "name": "Buddy",
    "pet_type": "dog",
    "age": 3,
    "description": "Golden retriever with a red collar, very friendly.",
    "longitude": -122.4194,
    "latitude": 37.7749,
    "posted_date": "2024-11-01T10:30:00Z",
    "updated_date": "2024-11-10T15:45:00Z",
    "user_id": 42
}
```

**Future Implementations:**

- PUT /pets/:id
- DELETE /pets/:id

- GET /pets/:id/sightings
- POST /pets/:id/sightings

- POST /users/register
- POST /users/login

- GET /users/:id/conversations
- POST /users/:id/conversations
- DELETE /users/:id/conversations
- GET /conversations/:id/messages
- POST /conversations/:id/messages

## Roadmap

**MVP:**

- Create client

  - React project with routes and boilerplate pages

- Create server
  - Express project with routing, with placeholder 200 responses
- Create migrations
- Create mock data
- Create seeds with mock data
- Deploy client and server projects so all commits will be reflected in production

- Feature: List Lost Pets in a Given Location

  - Build and style
  - Fetch and display a list of pets given a certain location
  - Create GET /pets endpoint

- Feature: Dynamic/Interactive Map of Lost Pets in a Given Location

  - Build and style
  - Integrate Google Maps API to display the list of lost pets in a given location on the map

- Feature: Pet Profile Page

  - Build and style
  - Get a pet by id and display all relevant data
  - Create GET /pets/:id endpoint

- Feature: Add Pet Page
  - Build and style
  - Create POST /pets endpoint

**Future Implementations:**

- Feature: Pet Sightings

  - Build and style component, implement into pet profile page
  - Create GET /pets/:id/sightings endpoint
  - Create add sighting form
  - Create POST /pets/:id/sightings endpoint

- Feature: User Authentication - Sign Up Page

  - Build and style
  - Create POST /users/register endpoint

- Feature: User Authentication - Login Page

  - Build and style
  - Create POST /users/login endpoint

- Feature: Implement JWT tokens

  - Server: Update expected requests / responses on protected endpoints
  - Client: Store JWT in local storage, include JWT on axios calls

- Feature: Account Page

  - Build and style
  - Create PUT /pets/:id endpoint
  - Create DELETE /pets/:id endpoint

- Feature: Messaging System DB

  - Add conversations and messages tables
  - Seed with mock data

- Feature: Inbox Page
  - Build and style
  - New conversation form
  - Create GET /users/:id/conversations endpoint
  - Create POST /users/:id/conversations endpoint
  - Create DELETE /users/:id/conversations endpoint
  - Create GET /conversations/:id/messages endpoint
  - Create POST /conversations/:id/messages endpoint

---

## Future Implementations

I have broken up the above sections based on MVP and plans for future implementations.

A summary would be that I plan to add a "sightings" feature where users can report a sighting of a pet if they happened to see it but were unable to approach/take in the pet. These sightings would be visble on a pet's profile page.

Additionally, I would like to implement user authentication and a messaging system for users to be able to message each other within the app.

I would also like to eventually convert this project to be built in some high-demand technologies in the industry such as TypeScript and Next.js.

Another feature that I think would be a valuable addition to this app would be a notification system where users could opt in to recieve email notifcations for various events. For example, recieving a message, new animal reported lost in your area, a sighting was left on your lost pet, etc.
