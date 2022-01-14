// this is where the main interface will be defined for our games
export interface Game {
    background_image: string;
    name: string;
    released: string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: number;
    esrb_rating: string;
    genres: Array<Genre>;
    parent_platforms: Array<ParentPlatform>;
    publishers: Array<Publishers>;
    ratings: Array<Rating>;
    screenshots: Array<Screenshots>;
    trailers: Array<Trailer>;

}

export interface APIResponse<T> {       //T is a dynamic type so whatever type we pass into our api resposne it will return as an array of that type
    results: Array<T>;
}

interface Genre {
    name:string;
}

interface ParentPlatform {
    platform: {
        name: string;
    };
}

interface Publishers {
    name: string;
}

interface Rating {
    id: number;
    count: number;
    title: string;
}

interface Screenshots {
    image: string;
}

interface Trailer {
    data: {
        max: string;
    };
}