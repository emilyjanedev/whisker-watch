# WhiskerWatch - [Link to Live Site](https://whiskerwatch.netlify.app/)

## Environment Setup

Google Maps API and Firebase Auth Accounts Required

1. Copy the `.env.example` file and rename it to `.env`
2. Fill in empty variables with your credentials for Google Maps API and Firebase Auth.
3. In your terminal, run `npm install` to install all dependencies
4. In your terminal run `npm run dev` and click on the provided url to see the website
5. You can create an account to post pets and report sightings, or you can just browse the pet map and pet listings without an account.

## Overview

WhiskerWatch is a platform dedicated to reuniting lost pets with their owners.

### Problem Space

Losing a pet is a distressing experience, pet owners often feel helpless and desperate to find their pets as quickly as possible. Relying on posters or word of mouth can be inefficient and limit the reach of the message. WhiskerWatch will help pet owner's reach the right people at the right time and also will also serve as a database of lost pets that people can reference if they find a pet and want to find the owner.

### User Profile

**- Pet Owners:**

- who have lost a pet
- want to get the word out to as many people as possible
- want to make sure their message reaches the best audience (people in the location of where the pet was lost)

**- Community Members** (neighbors, good samaritans, animal lovers):

- who want to help people find their missing pets
- who should be aware if a pet is missing in their neighborhood so they can keep an eye out

### Features

- As a user, I want to be able to post that my pet is missing
- As a user, I want to be able to give relevant information (such as: location, picture, temperament) about my pet that will help others identify them and approach them safely
- As a user, I want to be able to provide my contact information to be able to be reached if someone finds my pet
- As a user, I want to be able to see missing pets that have been reported in my area
- As a user, I want to be able to report that I have seen a pet, where I saw it, and if I was unable to successfully approach and take in the pet
- As a logged in user, I want to be able to update the details of my lost pet listings or removing a pet listing

## Implementation

### Tech Stack

Front-End:

- React
- Sass
- MUI - Custom Theming
- Google Maps API
- Geolocation API
- Firebase Authentication - Email/Password and Google OAuth

Back-End:

- Express Server
- Firebase Cloud Storage - User Uploaded Images
- Knex.js
- MySQL Database

### APIs

- Google Maps API: [Docs](https://developers.google.com/maps/documentation/javascript/overview)
- Geolocation API
- Firebase Auth API
- Firebase Storage API

### Sitemap

- Map & Pet List Page
- Pet Details Page
- Add Pet Page / Edit Pet Page
- Sign Up Page / Update Profile Page
- Login Page
- User Profile Page

### Mockups

**Pet List & Map Page**
![](./src/assets/images/whisker-watch-map.png)

**Pet Profile Page**
![](./src/ssets/images/whisker-watch-pet.png)

**Add Pet Page**
![](./src/assets/images/whisker-watch-form.png)

### Data

![](./src/assets/images/whisker-watch-db-map.png)

### Endpoints

Please reference the [WhiskerWatch API Repo](https://github.com/emilyjanedev/whisker-watch-api/) for detailed documentation on endpoints.

## Roadmap

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

- Feature: Pet Sightings

  - Build and style component, implement into pet profile page
  - Create GET /pets/:id/sightings endpoint
  - Create add sighting form
  - Create POST /pets/:id/sightings endpoint

- Feature: User Authentication - Sign Up Page

  - Build and style
  - Implement Firebase Authentication

- Feature: User Authentication - Login Page

  - Build and style
  - Implement Firebase Authentication

- Feature: Account Page

  - Build and style
  - Create PUT /pets/:id endpoint
  - Create DELETE /pets/:id endpoint

---

## Future Implementations

- In-app messaging system so that users can communicate about their lost pets seamlessly.
- More interactive map features. For example, click on the map to indicate where you lost or saw a pet.
- Notification system to notify users of pets missing in their area, if their listed pets recieved any new sightings, or if they recieved any new messages.
- More 0Auth sign in options such as Facebook, Microsoft, etc.
