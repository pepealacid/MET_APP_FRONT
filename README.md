
# Musart - Museum Tour Guide Web Application

<img src="https://res.cloudinary.com/dygreuwyb/image/upload/v1689980195/Classy_gray_vnzu5w.svg" alt="Musart Logo" style="width: 100%; margin-right: 10px;"/>

Musart is a web application designed to help users find or create the perfect tour for a particular museum. Whether you have only a couple of hours available on your trip or want a guided tour to make the most of your museum visit, Musart provides comprehensive and tailored museum tours. The app selects the most important artworks, offers quick and comprehensible information about the pieces, and guides users through all the galleries to ensure they don't get lost inside the museum. Musart is available in 12 languages, and users can buy museum tickets directly from the app. Currently, the app is designed to suit the MET Museum, but it can be expanded to include other museums.

<img src="https://res.cloudinary.com/dygreuwyb/image/upload/v1689980819/Onboarding_1_aub3vd.svg" style="width: 200px;"/> <img src="https://res.cloudinary.com/dygreuwyb/image/upload/v1689981248/Detail_Artist_Short_arbqsi.png" style="width: 200px; margin-left: 40px; height: 432px"/> 

## Authors

• Ángeles Figueredo (full-stack developer) <br>
• Pepe Alacid (full-stack developer) <br>
• Cristina San Juan (UX/UI designer) <br>

<hr>

## Technologies Used

Musart is a full-stack single-page application that utilizes the following technologies:
### Frontend:
- ReactJS
- Node.js
- JavaScript
- React Router DOM (for frontend routing)
- Axios (for API communication)
- Chakra UI (React library for styling)
### Backend:
- Node.js
- Express (for handling the server)
- MongoDB (NoSQL database)
- Mongoose (to interact with MongoDB)
- JSON Web Token (JWT) for authentication
- Multer and Cloudinary (for image uploading)
- Third-party APIs: Artsy (for art piece and artist information), MET Museum API (for MET Museum's art collection)
<hr/>

## **Algorithms and Data Structures**

## Graph implementation

One of the many features of Musart is the ability to find the shortest path through the museum's galleries, so you can see all the desired artpieces in the minimum amount of time. 
This is actually a interesting heuristic problem that is known as **The Travelling Salesman Problem** 
( [More info](https://en.wikipedia.org/wiki/Travelling_salesman_problem)). 

In order to deal with this problem we implement a Graph data structured. Using an Adjacency matrix, that describe all the museum galleries as a graph vertices, and all the connections between galleries we created a graph that represented the museum accesibility.

This is a representation of the graph. *This is a simplify version for the sake of demostration, the graph used in the app has +700 vertices.*

<img src="https://res.cloudinary.com/dygreuwyb/image/upload/v1689979072/graph_jlapvj.png"  
alt="Markdown Monster icon"  
style="width: 400px; margin-right: 10px;" /><img src="https://www.includehelp.com/data-structure-tutorial/images/graph-7.jpg"  
alt="Markdown Monster icon"  
style="width: 200px; margin-right: 10px;" />


Once the Graph object is defined, and the galleries the user had to go were define we use the Dijisktra algorithm in order to find the shortest path between two galleries. 

```javascript
 dijkstra(vertices) {
        const distances = new Map();
        const previous = new Map();
        const queue = [];

        for (let vertex of this.adjList.keys()) {
            distances.set(vertex, Infinity);
            previous.set(vertex, null);
        }

        const startVertex = vertices[0];
        distances.set(startVertex, 0);
        queue.push(startVertex);

        while (queue.length > 0) {
            const currentVertex = queue.shift();

            for (let neighbor of this.adjList.get(currentVertex)) {
                const distance = distances.get(currentVertex) + 1;
                if (distance < distances.get(neighbor)) {
                    distances.set(neighbor, distance);
                    previous.set(neighbor, currentVertex);
                    queue.push(neighbor);
                }
            }
        }

        let maxDistanceVertex = vertices[0];
        for (let vertex of vertices) {
            if (distances.get(vertex) > distances.get(maxDistanceVertex)) {
                maxDistanceVertex = vertex;
            }
        }

        const shortestPath = [];
        let currentVertex = maxDistanceVertex;
        while (currentVertex !== null) {
            shortestPath.unshift(currentVertex);
            currentVertex = previous.get(currentVertex);
        }

        return shortestPath;
    }
```

After having a way to find the shortest path between 2 galleries, we define the museum Entrance and and decide the next closest gallery, and set that gallery as the next vertice in the path. The algorithm keeps finding next closest vertices and until all the galleries in the tour have been visited.

<img src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Bruteforce.gif"  
alt="Markdown Monster icon"  
style="width: 90%; margin-right: 10px; " />

# About the project

## Project Structure

Musart is divided into two separate projects:
### Backend:
The backend project has the following structure:
```txt
├── models
│   ├── user.js
│   ├── artist.js
│   ├── artwork.js
│   └── itinerary.js
├── routes
│   ├── auth.js
│   ├── artist.js
│   ├── artwork.js
│   └── itinerary.js
├── controllers
│   ├── authController.js
│   ├── artistController.js
│   ├── artworkController.js
│   └── itineraryController.js
└──
```

### Frontend:
The frontend project has the following structure:
``` txt
├── src
│   ├── components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── ...
│   ├── pages
│   │   ├── Home.js
│   │   ├── Gallery.js
│   │   ├── Itinerary.js
│   ├── utils
│   │   ├── graph.js
│   ├── App.js
│   ├── index.js
│   ├── services
└─
```
## Models

#### User.model.js
```javascript 
	{
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    artistsSaved: {
      type: [String],
    },
    artworksSaved: {
      type: [String],
    },
    intinerariesSaved: {
      type: [{ type: Schema.Types.ObjectId, ref: "Itinerary" }],
    },
  },
  {
    timestamps: true,
  }
);
````

#### Itinerary.model.js

```javascript
{
        name: {
            type: String,
            default: "Personalized Tour"
        },
        departments: [String],
        departmentsId: [Number],
        rating: [Number],
        artworkId: [Number],
        artworkData: [Object],
        desiredTime: [String],
        galleriesId: [String],
        path: [],
        picture: {
            type: String,
            default: "https://static01.nyt.com/images/2018/07/22/travel/22Getaway-1/22Getaway-1-superJumbo.jpg?quality=75&auto=webp"
        },
        calculatedTime: Number,
        tag: {
            type: String,
            default: null
        },
         artpieces: {
		      type: [{ type: Schema.Types.ObjectId, ref: "Artwork" }],
	    }
    }
```

#### Artwork.model.js

```javascript
{
    objectID: Number,
    isHighlight: Boolean,
    primaryImage: String,
    constituents: [Object],
    department: String,
    objectName: String,
    title: String,
    culture: String,
    period: String,
    artistDisplayName: String,
    artistDisplayBio: String,
    artistNationality: String,
    artistGender: String,
    artistWikidata_URL: String,
    objectURL: String,
    tags: [Object],
    objectWikidata_URL: String,
    GalleryNumber: String,
    artist: {
		      type: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
	    }
  },
  {
    timestamps: true,
  }
 }
```

#### Artist.model.js
```javascript
 {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
```
## Usage
To use Musart, follow these steps:
1. Create an account or log in to the app.
2. Choose the museum you want to visit (currently supports MET Museum).
3. Select your preferred language for the tour.
4. Browse through the recommended artworks and artists or create your own custom itinerary.
5. Get quick and comprehensible information about the art pieces.
6. Buy museum tickets directly from the app.
<hr/>

## Links
[**Figma**](https://www.figma.com/file/aSVQ5t4f8BU8QTvh9ytNQ9/Proyecto-Final---Museos?type=design&node-id=232%3A16865&mode=design&t=g9evhOZNswjVxL0i-1) Figma design by UX/UI designer.

[**Trello**](https://trello.com/b/gmRXXbbC/museum-squad) our trello card that we use when producing the app.

[**Slides**](https://tome.app/musart-eae/musart-descubre-el-met-de-nueva-york-a-tu-medida-clkd61eny00h7pp5rfum12ca4) that contains a teaser, and explanation of our journey developing Musart.

## Backlog
•  Login and Signup with Google or Apple ID <br>
•  Scan artpieces

## Demo
Check out the live demo of Musart at: [Link to the demo](url

<hr>

###  Github Repositories 

• [Backend](https://github.com/pepealacid/MET_APP_BACK)
• [Frontend](https://github.com/pepealacid/MET_APP_FRONT)



