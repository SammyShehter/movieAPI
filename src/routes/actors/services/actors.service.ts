import debug from 'debug'
import axios from 'axios'
const log: debug.IDebugger = debug('app:actors-service')

class ActorService {
    //can be moved to env var
    private readonly apiKey = 'af941aaa59a39482baeca5556fe90392'

    private readonly filmList = [
        'Fantastic Four (2005)',
        'Fantastic Four: Rise of the Silver Surfer',
        'Iron Man',
        'The Incredible Hulk',
        'Iron Man 2',
        'Thor',
        'Captain America: The First Avenger',
        'The Avengers',
        'Iron Man 3',
        'Thor: The Dark World',
        'Captain America: The Winter Soldier',
        'Guardians of the Galaxy',
        'Avengers: Age of Ultron',
        'Ant-Man',
        'Fantastic Four (2015)',
        'Captain America: Civil War',
        'Doctor Strange',
        'Guardians of the Galaxy Vol. 2',
        'Spider-Man: Homecoming',
        'Thor: Ragnarok',
        'Black Panther',
        'Avengers: Infinity War',
        'Ant-Man and the Wasp',
        'Captain Marvel',
        'Avengers: Endgame',
        'Spider-Man: Far From Home',
    ]

    public localCache = new Map()

    getMovieListAndSave = async (actorID: number) => {
        try {
            const request = await axios.get(
                `https://api.themoviedb.org/3/person/${actorID}?api_key=${this.apiKey}`
            )
            const biography = request.data.biography
            const filmListTemp = []
            this.filmList.forEach(film => {
                const pattern = new RegExp(`${film}`);
                const match = pattern.test(biography)
                if(match) {
                    filmListTemp.push(film)
                }
            })
            this.localCache.set(actorID, filmListTemp)
            return filmListTemp
        } catch (e) {
            throw new Error('No internet')
        }
        
    }

    cacheAnswer = (actorID: number) => {
        const movieList = this.localCache.get(actorID)
        return movieList ? movieList : false
    }
}

export default new ActorService()
