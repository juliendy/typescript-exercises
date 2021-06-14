interface Artist {
    name: string;
    category: 'artist';
}

interface Album {
    name: string,
    artistName: string,
    category: 'album'
}

const artists: Artist[] = [
    {
        name: 'Madonna',
        category: 'artist'
    },
    {
        name: 'Led Zeppelin',
        category: 'artist'
    },
    {
        name: 'Earth, Wind, and Fire',
        category: 'artist'
    }
];

let albums: Album[] = [
    {
        name: 'Like a Virgin',
        artistName: 'Madonna',
        category: 'album'
    },
    {
        name: 'Like a Prayer',
        artistName: 'Madonna',
        category: 'album'
    },
    {
        name: 'Houses of the Holy',
        artistName: 'Led Zeppelin',
        category: 'album'
    },
    {
        name: 'In Through the Out Door',
        artistName: 'Led Zeppelin',
        category: 'album'
    }
];