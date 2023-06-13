import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

// use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
const gf = new GiphyFetch('PcecVwHELKyzOn0mMVx54EpU4HsCvpE0');

// configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
const fetchGifs = offset => gf.trending({ offset, limit: 10 });

// Render the React Component and pass it your fetchGifs as a prop
export default function GifModal({ onClick }) {
    return (
        <Grid
            width={200}
            onGifClick={e => onClick(e)}
            columns={3}
            noLink={true}
            fetchGifs={fetchGifs}
        />
    );
}
