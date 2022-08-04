interface Artist {
    name: string;
    category: "artist";
}

interface Album {
    name: string;
    artistName: string;
    category: "album";
}

const artists: Artist[] = [
    {
        name: "Madonna",
        category: "artist",
    },
    {
        name: "Led Zeppelin",
        category: "artist",
    },
    {
        name: "Earth, Wind, and Fire",
        category: "artist",
    },
];

let albums: Album[] = [
    {
        name: "Like a Virgin",
        artistName: "Madonna",
        category: "album",
    },
    {
        name: "Like a Prayer",
        artistName: "Madonna",
        category: "album",
    },
    {
        name: "Houses of the Holy",
        artistName: "Led Zeppelin",
        category: "album",
    },
    {
        name: "In Through the Out Door",
        artistName: "Led Zeppelin",
        category: "album",
    },
];

//Exercises - To ensure that you get a good amount of practice, write type annotations for the return values of all functions
//1 - Write an extractName function that expects to be passed an object that has a name property and returns the value of that name property.

const extractName = (myObj: { name: string }): string => {
    return myObj.name;
};

//---------------------------------------------------------------------------------------------------------------------

//2 - Write a getAlbumsByArtistName function that expects to receive a string as an argument and returns an array of objects of the Album type whose artistName property matches the argument.

const getAlbumsByArtistName = (a: string): Album[] => {
    return albums.filter((item) => item.artistName == a);
};

//---------------------------------------------------------------------------------------------------------------------

//3 - Write a getArtistAndAlbumsByArtistName function that expects to receive a string as an argument and returns an array. The array it returns should contain:
// The one object of the Artist type whose name property matches the argument
// All of the objects of Album type whose artistName property matches the argument
// To find the objects of the Album type, use the getAlbumsByArtistName function that you wrote.

//declare a new type for the returned array, otherwise "not assignable to parameter of type never" error
type artistAlbum = (Artist | Album)[];

const getArtistAndAlbumsByArtistName = (arg: string): artistAlbum => {
    let filteredArray: artistAlbum = [];
    let artist = artists.find((item) => item.name == arg);
    if (artist) {
        filteredArray.push(artist, ...getAlbumsByArtistName(arg));
        return filteredArray;
    } else {
        return [];
    }
};

//irinas mistake?
// const getArtistAndAlbumsByArtistName = (arg: string): artistAlbum => {
//     let filteredArray: artistAlbum = [];
//     let artist: Artist;
//     artist = artists.find((item) => (item.name == arg));
//     //note spread operator before the function call - important to get the objects directly, not an array of objects
//     filteredArray.push(artist, ...getAlbumsByArtistName(arg));
//     return filteredArray;
// };

// It looks like TypeScript is a little unhappy with this line:
// artist = artists.find((item) => item.name = arg));
// It says:
// Type 'Artist | undefined' is not assignable to type 'Artist'.
// Type 'undefined' is not assignable to type 'Artist'.

// when she calls .find() on an array, TypeScript doesn't necessarily know that there will be an element of the array that matches. (stackoverflow forum guy said so)
// If nothing in the array matches, .find() will return undefined, so the return type in this case is Artist | undefined.
// However irina is assigning the result to a variable whose type is just Artist? *CONFIRMED YES*
// Basically TypeScript is reminding that you should handle the case where there's no matching artist
// the other thing I just spotted on that line is that you want a double equals - (item.name == arg) instead of (item.name = arg)
// as this will be mutating the artists array with the single equals, which we dont want(!!!). My solution above.

//---------------------------------------------------------------------------------------------------------------------

//4 - Write a getArtistWithAlbumNames function that expects to receive an array that contains a single object of the Artist type and any number of objects of the Album type (the idea is that the caller would obtain this array by calling the getArtistAndAlbumsByArtistName function). The getArtistWithAlbumNames function should return an object of a new type that has all the same properties as objects of the Artist type but with the addition of an albumNames property, whose value is an array of strings. The strings in the albumNames array should be extracted from the objects of the Album type in the array that was passed to getArtistWithAlbumNames.

interface ArtistAlbumNames extends Artist {
    albumNames: string[];
}

const getArtistWithAlbumNames = (
    arg: [Artist, ...Album[]]
): ArtistAlbumNames => {
    let [subObj, ...myArray] = arg; // note that i don't need to cast with `as` any more if we do it this way
    let names: string[] = [];
    for (let i = 0; i < myArray.length; i++) {
        names.push(myArray[i]["name"]);
    }

    let myObj: ArtistAlbumNames = {
        ...subObj,
        albumNames: names,
    };

    return myObj;
};

//irina
// const getArtistWithAlbumNames = (arg: artistAlbum): ArtistAlbumNames => {
//     let subObj: Artist = arg.find(
//         (item) => item.category === "artist"
//     ) as Artist; // <--- it's prob better to try to avoid type casting with `as` where possible because you're basically overriding the type checker, although in this case I think it might be okay.
//     // it's good to make sure that any assumptions you're relying on are expressed in the types - in the case of getArtistWithAlbumNames we're assuming that the argument will start with an artist and then contain some albums.
//     // console.log("subobj", subObj);
//     let myArray: Album[] = arg.filter((item) => {
//         return item.category === "album";
//     }) as Album[];
//     // console.log("myArray", myArray);
//     let names: string[] = [];
//     for (let i = 0; i < myArray.length; i++) {
//         names.push(myArray[i]["name"]);
//     }

//     let myObj: ArtistAlbumNames = {
//         ...subObj,
//         albumNames: names,
//     };

//     return myObj;
// };

//tests
// let madonna = getArtistAndAlbumsByArtistName("Madonna");
// console.log(getArtistWithAlbumNames(madonna));
//outputs
// {
//   name: 'Madonna',
//   category: 'artist',
//   albumNames: [ 'Like a Virgin', 'Like a Prayer' ]
// }

//---------------------------------------------------------------------------------------------------------------------


//Bonus
// Write an extractNames function that expects to receive two arguments of the same type and returns an array containing two strings. The arguments the function receives should be of a single type that has a name property (thus objects of both the Artist and Album types could be passed to it but so could objects of any other type that has a name property whose value is a string). The array that is returned should contain the values of the name properties belonging to the two arguments.

// irina - her way does the exact same thing as mine.
// const extractNames = <T extends { name: string }>(a: T, b: T): string[] => {
//     let nameArray: string[] = [];
//     nameArray.push(a.name, b.name);
//     return nameArray;
// };

const extractNames = <T extends { name: string }>(a: T, b: T): string[] => {
    return [a.name, b.name];
};

//test
console.log(
    extractNames(
        {
            name: "Madonna",
            category: "artist",
        },
        {
            country: "France",
            name: "Paris",
            population: 3000000,
        }
    )
);
// outputs
// ["Madonna", "Paris"];
